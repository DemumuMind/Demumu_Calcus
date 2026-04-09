#!/usr/bin/env node
/**
 * NanoClaw - Zero-dependency interactive AI agent session manager
 * Persistent markdown history with operational controls
 * 
 * Storage: ~/.claude/claw/<session>.md
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const os = require('os');

const CLAW_DIR = path.join(os.homedir(), '.claude', 'claw');

function ensureClawDir() {
  if (!fs.existsSync(CLAW_DIR)) {
    fs.mkdirSync(CLAW_DIR, { recursive: true });
  }
}

function getSessionFile(sessionName) {
  return path.join(CLAW_DIR, `${sessionName}.md`);
}

function getTimestamp() {
  return new Date().toISOString().replace('T', ' ').slice(0, 19);
}

function loadHistory(sessionName) {
  const file = getSessionFile(sessionName);
  if (!fs.existsSync(file)) return [];
  
  const content = fs.readFileSync(file, 'utf8');
  const turns = [];
  const lines = content.split('\n');
  
  let currentTurn = null;
  for (const line of lines) {
    if (line.startsWith('## ')) {
      if (currentTurn) turns.push(currentTurn);
      currentTurn = { timestamp: line.slice(3).trim(), content: '' };
    } else if (currentTurn) {
      currentTurn.content += line + '\n';
    }
  }
  if (currentTurn) turns.push(currentTurn);
  
  return turns;
}

function saveToHistory(sessionName, role, content, metadata = {}) {
  const file = getSessionFile(sessionName);
  const timestamp = getTimestamp();
  
  const entry = `## ${timestamp}\n\n**${role}**:\n\n${content}\n\n`;
  
  if (metadata.model) {
    entry += `*Model: ${metadata.model}*\n`;
  }
  entry += '---\n\n';
  
  fs.appendFileSync(file, entry);
}

function listSessions() {
  ensureClawDir();
  const files = fs.readdirSync(CLAW_DIR).filter(f => f.endsWith('.md'));
  return files.map(f => f.slice(0, -3));
}

function exportSession(sessionName, format, outputPath) {
  const turns = loadHistory(sessionName);
  
  let output = '';
  
  switch (format) {
    case 'json':
      output = JSON.stringify(turns, null, 2);
      break;
    case 'txt':
      output = turns.map(t => `[${t.timestamp}]\n${t.content.trim()}`).join('\n\n');
      break;
    case 'md':
    default:
      output = `# Session: ${sessionName}\n\n` + 
               turns.map(t => `## ${t.timestamp}\n\n${t.content.trim()}`).join('\n\n');
  }
  
  if (outputPath) {
    fs.writeFileSync(outputPath, output);
    console.log(`📁 Exported to: ${outputPath}`);
  } else {
    console.log(output);
  }
}

function showMetrics(sessionName) {
  const turns = loadHistory(sessionName);
  const stats = {
    totalTurns: turns.length,
    userMessages: turns.filter(t => t.content.includes('**user**')).length,
    assistantMessages: turns.filter(t => t.content.includes('**assistant**')).length,
    fileSize: 0
  };
  
  const file = getSessionFile(sessionName);
  if (fs.existsSync(file)) {
    stats.fileSize = (fs.statSync(file).size / 1024).toFixed(2) + ' KB';
  }
  
  console.log(`📊 Session: ${sessionName}`);
  console.log(`   Total turns: ${stats.totalTurns}`);
  console.log(`   User messages: ${stats.userMessages}`);
  console.log(`   Assistant messages: ${stats.assistantMessages}`);
  console.log(`   File size: ${stats.fileSize}`);
}

function compactSession(sessionName, keepRecent = 10) {
  const turns = loadHistory(sessionName);
  if (turns.length <= keepRecent) {
    console.log('Nothing to compact');
    return;
  }
  
  const oldCount = turns.length - keepRecent;
  const file = getSessionFile(sessionName);
  
  // Create compaction header
  const header = `# Compaction: ${getTimestamp()}\n\n` +
                 `> Compacted ${oldCount} old turns. Kept ${keepRecent} recent.\n\n`;
  
  // Keep only recent turns
  const recentTurns = turns.slice(-keepRecent);
  const content = header + recentTurns.map(t => `## ${t.timestamp}\n\n${t.content.trim()}`).join('\n\n');
  
  fs.writeFileSync(file, content);
  console.log(`✅ Compacted: removed ${oldCount} old turns, kept ${keepRecent}`);
}

async function interactiveSession(sessionName, options = {}) {
  ensureClawDir();
  
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: `\x1b[36m[${sessionName}]\x1b[0m> `
  });
  
  console.log(`\n🐾 NanoClaw Session: ${sessionName}`);
  console.log('Type /help for commands, exit to quit\n');
  
  rl.prompt();
  
  rl.on('line', (input) => {
    const cmd = input.trim();
    
    if (cmd === 'exit') {
      rl.close();
      return;
    }
    
    if (cmd === '/help') {
      console.log(`
Claw Commands:
  /help                    Show this help
  /clear                   Clear session history
  /history                 Print full conversation history
  /sessions                List saved sessions
  /model [name]            Show/set model (current: ${options.model || 'default'})
  /load <skill>            Hot-load a skill (simulated)
  /branch <name>           Branch current session
  /search <query>          Search across sessions
  /compact                 Compact old turns, keep recent 10
  /export <format> [path]  Export session (md|json|txt)
  /metrics                 Show session metrics
  exit                     Quit
`);
      rl.prompt();
      return;
    }
    
    if (cmd === '/history') {
      const turns = loadHistory(sessionName);
      turns.forEach(t => {
        console.log(`\n## ${t.timestamp}`);
        console.log(t.content);
      });
      rl.prompt();
      return;
    }
    
    if (cmd === '/sessions') {
      const sessions = listSessions();
      console.log('\n📁 Saved sessions:');
      sessions.forEach(s => console.log(`   - ${s}${s === sessionName ? ' (current)' : ''}`));
      rl.prompt();
      return;
    }
    
    if (cmd === '/clear') {
      const file = getSessionFile(sessionName);
      if (fs.existsSync(file)) {
        fs.writeFileSync(file, `# Session: ${sessionName}\n\n`);
        console.log('✅ Session cleared');
      }
      rl.prompt();
      return;
    }
    
    if (cmd === '/metrics') {
      showMetrics(sessionName);
      rl.prompt();
      return;
    }
    
    if (cmd === '/compact') {
      compactSession(sessionName);
      rl.prompt();
      return;
    }
    
    if (cmd.startsWith('/model')) {
      const model = cmd.split(' ')[1];
      if (model) {
        options.model = model;
        console.log(`✅ Model set to: ${model}`);
      } else {
        console.log(`Current model: ${options.model || 'default'}`);
      }
      rl.prompt();
      return;
    }
    
    if (cmd.startsWith('/branch ')) {
      const newName = cmd.split(' ')[1];
      if (newName) {
        const oldFile = getSessionFile(sessionName);
        const newFile = getSessionFile(newName);
        if (fs.existsSync(oldFile)) {
          fs.copyFileSync(oldFile, newFile);
          console.log(`✅ Branched to: ${newName}`);
        }
      }
      rl.prompt();
      return;
    }
    
    if (cmd.startsWith('/export ')) {
      const parts = cmd.split(' ');
      const format = parts[1] || 'md';
      const outputPath = parts[2];
      exportSession(sessionName, format, outputPath);
      rl.prompt();
      return;
    }
    
    if (cmd.startsWith('/search ')) {
      const query = cmd.slice(8);
      const turns = loadHistory(sessionName);
      const matches = turns.filter(t => t.content.toLowerCase().includes(query.toLowerCase()));
      console.log(`\n🔍 Found ${matches.length} matches for "${query}":`);
      matches.forEach(m => console.log(`   [${m.timestamp}]`));
      rl.prompt();
      return;
    }
    
    if (cmd.startsWith('/load ')) {
      const skill = cmd.split(' ')[1];
      console.log(`✅ Skill loaded: ${skill}`);
      rl.prompt();
      return;
    }
    
    // Regular message - save it
    if (cmd) {
      saveToHistory(sessionName, 'user', cmd, { model: options.model });
      console.log(`  [Saved to session]\n`);
    }
    
    rl.prompt();
  });
  
  rl.on('close', () => {
    console.log('\n👋 Session ended. History saved.');
    process.exit(0);
  });
}

// Main entry
const args = process.argv.slice(2);
const sessionName = process.env.CLAW_SESSION || 'default';
const model = process.env.CLAW_MODEL || 'sonnet';

if (args.includes('--help') || args.includes('-h')) {
  console.log(`
NanoClaw - Interactive AI session manager

Usage: node scripts/claw.js [options]

Environment Variables:
  CLAW_SESSION    Session name (default: default)
  CLAW_MODEL      Model to use (default: sonnet)
  CLAW_SKILLS     Comma-separated skills to load

Commands in session:
  /help, /history, /sessions, /clear, /metrics, /compact
  /export <format>, /branch <name>, /search <query>
`);
  process.exit(0);
}

interactiveSession(sessionName, { model });
