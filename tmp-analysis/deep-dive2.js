const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  
  const calcUrls = [
    'https://calcus.su/kalkulyator-procentov',
    'https://calcus.su/kalkulyator-imt',
    'https://calcus.su/kalkulyator-kalorij-kbzhu',
    'https://calcus.su/ipotechnyj-kalkulyator'
  ];
  
  for (const url of calcUrls) {
    console.log('\n=== CALCULATOR: ' + url + ' ===');
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2500);
    
    const title = await page.title();
    const description = await page.$eval('meta[name="description"]', el => el.content).catch(() => 'no description');
    console.log('Title:', title);
    console.log('Meta description:', description.substring(0, 200));
    
    const h1 = await page.$eval('h1', el => el.textContent.trim()).catch(() => 'no h1');
    console.log('H1:', h1);
    
    const headings = await page.$$eval('h2, h3, h4', hs => 
      hs.map(h => h.tagName + ': ' + h.textContent.trim().substring(0, 80))
    );
    console.log('Headings:', headings);
    
    const formInputs = await page.$$eval('input, select, textarea', inputs => 
      inputs.map(i => ({
        tag: i.tagName,
        type: i.type || 'select',
        placeholder: i.placeholder || '',
        label: i.labels && i.labels[0] ? i.labels[0].textContent.trim() : 
               (i.getAttribute('aria-label') || '')
      }))
    );
    console.log('Inputs:', JSON.stringify(formInputs, null, 2));
    
    const allButtons = await page.$$eval('button', btns => 
      btns.map(b => b.textContent.trim()).filter(t => t.length > 0)
    );
    console.log('All buttons:', allButtons.slice(0, 15));
    
    const hasFaq = await page.$$eval('*', els => 
      els.some(el => {
        const text = el.textContent.toLowerCase();
        return text.includes('частые вопросы') || text.includes('faq') || text.includes('вопросы и ответы');
      })
    );
    console.log('Has FAQ:', hasFaq);
    
    // Safe ad check
    const ads = await page.$$eval('[id], [class]', els => 
      els.filter(el => {
        const id = el.id || '';
        const cls = typeof el.className === 'string' ? el.className : '';
        return id.includes('yandex') || cls.includes('yandex') || 
               id.includes('advert') || cls.includes('advert') ||
               id.includes('ads') || cls.includes('ads') ||
               id.includes('banner') || cls.includes('banner');
      }).length
    );
    console.log('Ad-related elements count:', ads);
  }
  
  // Test actual functionality on IMT calculator
  console.log('\n=== FUNCTIONAL TEST: IMT Calculator ===');
  await page.goto('https://calcus.su/kalkulyator-imt', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  
  // Find and fill inputs
  const inputs = await page.$$('input');
  console.log('Number of inputs:', inputs.length);
  
  if (inputs.length >= 2) {
    await inputs[0].fill('175'); // height
    await inputs[1].fill('70');  // weight
    
    // Find calculate button
    const calcBtn = await page.$('button:has-text("Рассчитать")');
    if (calcBtn) {
      console.log('Found calculate button');
      await calcBtn.click();
      await page.waitForTimeout(1500);
      
      // Get result text
      const resultText = await page.$eval('[class*="result"], [class*="output"], h2, h3', el => el.textContent.trim()).catch(() => 'no result');
      console.log('Result after calculation:', resultText);
      
      // Get all visible text that might be result
      const visibleText = await page.$$eval('p, div, span', els => 
        els.filter(el => {
          const rect = el.getBoundingClientRect();
          return rect.width > 0 && rect.height > 0 && el.textContent.includes('ИМТ');
        }).map(el => el.textContent.trim().substring(0, 100))
      );
      console.log('IMT-related text:', visibleText.slice(0, 5));
    }
  }
  
  // Check for copy buttons
  console.log('\n=== COPY FUNCTIONALITY CHECK ===');
  await page.goto('https://calcus.su/kalkulyator-drobej', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  
  const inputs2 = await page.$$('input');
  if (inputs2.length >= 6) {
    await inputs2[0].fill('1'); // whole 1
    await inputs2[1].fill('1'); // num 1
    await inputs2[2].fill('2'); // den 2
    await inputs2[3].fill('0'); // whole 2
    await inputs2[4].fill('1'); // num 2
    await inputs2[5].fill('4'); // den 4
    
    const calcBtn2 = await page.$('button:has-text("Рассчитать")');
    if (calcBtn2) {
      await calcBtn2.click();
      await page.waitForTimeout(1500);
      
      // Check for copy button in result
      const copyBtn = await page.$('button:has-text("Копировать"), button[title*="копировать"], [class*="copy"]');
      console.log('Copy button found after calc:', !!copyBtn);
    }
  }
  
  await browser.close();
})();
