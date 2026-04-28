const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // 1. Main page
  console.log('=== MAIN PAGE ===');
  await page.goto('https://calcus.su/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);
  
  const mainTitle = await page.title();
  console.log('Title:', mainTitle);
  
  // Get all links that look like categories
  const allLinks = await page.$$eval('a', links => 
    links.filter(l => {
      const text = l.textContent.trim();
      const href = l.getAttribute('href') || '';
      return text.length > 2 && href.startsWith('/') && !href.includes('//');
    }).map(l => ({
      text: l.textContent.trim().substring(0, 80),
      href: l.getAttribute('href')
    }))
  );
  
  // Deduplicate
  const seen = new Set();
  const uniqueLinks = [];
  for (const link of allLinks) {
    if (!seen.has(link.href)) {
      seen.add(link.href);
      uniqueLinks.push(link);
    }
  }
  
  console.log('\nAll unique internal links (' + uniqueLinks.length + '):');
  uniqueLinks.forEach(l => console.log('-', l.text, '->', l.href));
  
  // 2. Visit first category - math
  console.log('\n=== CATEGORY: Наука и Учёба ===');
  await page.goto('https://calcus.su/nauka-i-ucheba', { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);
  
  const catLinks = await page.$$eval('a', links => 
    links.filter(l => {
      const text = l.textContent.trim();
      const href = l.getAttribute('href') || '';
      return text.length > 0 && href.startsWith('/') && !href.includes('//') && href !== '/nauka-i-ucheba';
    }).map(l => ({
      text: l.textContent.trim().substring(0, 80),
      href: l.getAttribute('href')
    }))
  );
  
  const seenCat = new Set();
  const uniqueCatLinks = [];
  for (const link of catLinks) {
    if (!seenCat.has(link.href)) {
      seenCat.add(link.href);
      uniqueCatLinks.push(link);
    }
  }
  
  console.log('Calculators in category (' + uniqueCatLinks.length + '):');
  uniqueCatLinks.slice(0, 20).forEach(l => console.log('-', l.text, '->', l.href));
  
  // Save some calculator URLs for detailed analysis
  const calculatorUrls = uniqueCatLinks.slice(0, 5).map(l => 'https://calcus.su' + l.href);
  
  // 3. Detailed analysis of calculators
  for (let i = 0; i < Math.min(5, calculatorUrls.length); i++) {
    const url = calculatorUrls[i];
    console.log('\n=== CALCULATOR ' + (i+1) + ': ' + url + ' ===');
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    
    const title = await page.title();
    console.log('Title:', title);
    
    // Check for form inputs
    const inputs = await page.$$eval('input, select, textarea', elements => 
      elements.map(el => ({
        tag: el.tagName.toLowerCase(),
        type: el.type || '',
        name: el.name || '',
        placeholder: el.placeholder || '',
        id: el.id || '',
        label: el.labels && el.labels[0] ? el.labels[0].textContent.trim() : ''
      }))
    );
    console.log('Form inputs:', JSON.stringify(inputs, null, 2));
    
    // Check for buttons
    const buttons = await page.$$eval('button', btns => 
      btns.map(b => b.textContent.trim()).filter(t => t.length > 0)
    );
    console.log('Buttons:', buttons.slice(0, 10));
    
    // Check for result areas
    const resultTexts = await page.$$eval('[class*="result"], [class*="output"], [class*="answer"]', els => 
      els.map(el => el.textContent.trim().substring(0, 100))
    );
    console.log('Result elements:', resultTexts.slice(0, 5));
    
    // Check for tabs or additional sections
    const tabTexts = await page.$$eval('[role="tab"], .tab, [class*="tab"]', tabs => 
      tabs.map(t => t.textContent.trim()).filter(t => t.length > 0)
    );
    console.log('Tabs:', tabTexts.slice(0, 10));
  }
  
  await browser.close();
})();
