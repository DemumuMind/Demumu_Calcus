const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  
  // === DESKTOP ANALYSIS ===
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  
  // 1. Check dark mode / theme
  console.log('=== THEME & DESIGN ===');
  await page.goto('https://calcus.su/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);
  
  const htmlClasses = await page.$eval('html', el => el.className);
  const hasDarkClass = htmlClasses.includes('dark');
  const hasLightClass = htmlClasses.includes('light');
  console.log('HTML classes:', htmlClasses);
  console.log('Has dark class:', hasDarkClass);
  console.log('Has light class:', hasLightClass);
  
  // Check for theme toggle button
  const themeToggle = await page.$$eval('button, [role="switch"], label', els => 
    els.filter(el => el.textContent.toLowerCase().includes('тем') || 
                     el.title.toLowerCase().includes('тем') ||
                     el.getAttribute('aria-label')?.toLowerCase().includes('тем') ||
                     el.className.toLowerCase().includes('theme') ||
                     el.className.toLowerCase().includes('dark'))
      .map(el => ({ text: el.textContent.trim().substring(0, 30), className: el.className.substring(0, 50) }))
  );
  console.log('Theme toggles found:', themeToggle);
  
  // Get main color from CSS
  const primaryColor = await page.evaluate(() => {
    const el = document.querySelector('[class*="bg-blue"], [class*="bg-primary"], button');
    if (el) return window.getComputedStyle(el).backgroundColor;
    return null;
  });
  console.log('Primary button color:', primaryColor);
  
  // 2. Search functionality
  console.log('\n=== SEARCH ===');
  const searchInput = await page.$('input[placeholder*="Поиск"]');
  if (searchInput) {
    console.log('Search input found');
    await searchInput.fill('процент');
    await page.waitForTimeout(1500);
    const searchResults = await page.$$eval('[class*="result"], [class*="suggestion"], li', els => 
      els.map(el => el.textContent.trim().substring(0, 60)).filter(t => t.length > 0)
    );
    console.log('Search results for "процент":', searchResults.slice(0, 10));
  } else {
    console.log('Search input NOT found');
  }
  
  // 3. Check for share buttons / social
  console.log('\n=== SOCIAL / SHARE ===');
  const socialElements = await page.$$eval('a, button', els => 
    els.filter(el => {
      const text = (el.textContent + ' ' + el.title + ' ' + (el.getAttribute('aria-label') || '')).toLowerCase();
      return text.includes('поделиться') || text.includes('share') || text.includes('вконтакте') || 
             text.includes('telegram') || text.includes('whatsapp') || text.includes('facebook') ||
             text.includes('twitter') || text.includes('vk') || text.includes('ok.ru') ||
             text.includes('одноклассник');
    }).map(el => el.textContent.trim().substring(0, 40))
  );
  console.log('Social/share elements:', socialElements);
  
  // 4. Visit detailed calculators
  const calcUrls = [
    'https://calcus.su/kalkulyator-drobej',
    'https://calcus.su/kalkulyator-procentov',
    'https://calcus.su/kalkulyator-imt',
    'https://calcus.su/kalkulyator-kalorij-kbzhu',
    'https://calcus.su/ipotechnyj-kalkulyator'
  ];
  
  for (const url of calcUrls) {
    console.log('\n=== CALCULATOR: ' + url + ' ===');
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2500);
    
    // Page title and meta
    const title = await page.title();
    const description = await page.$eval('meta[name="description"]', el => el.content).catch(() => 'no description');
    console.log('Title:', title);
    console.log('Meta description:', description.substring(0, 200));
    
    // Check for h1
    const h1 = await page.$eval('h1', el => el.textContent.trim()).catch(() => 'no h1');
    console.log('H1:', h1);
    
    // All sections/text blocks on page
    const headings = await page.$$eval('h2, h3, h4', hs => 
      hs.map(h => h.tagName + ': ' + h.textContent.trim().substring(0, 80))
    );
    console.log('Headings:', headings);
    
    // Form structure
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
    
    // Check for result/copy buttons
    const allButtons = await page.$$eval('button', btns => 
      btns.map(b => b.textContent.trim()).filter(t => t.length > 0)
    );
    console.log('All buttons:', allButtons.slice(0, 15));
    
    // Check for copy functionality
    const copyElements = await page.$$eval('*', els => 
      els.filter(el => {
        const text = (el.textContent + ' ' + el.title + ' ' + (el.getAttribute('aria-label') || '')).toLowerCase();
        return text.includes('копировать') || text.includes('copy') || text.includes('скопировать');
      }).map(el => el.textContent.trim().substring(0, 40))
    );
    console.log('Copy elements:', copyElements.slice(0, 5));
    
    // Check for history/favorites
    const favHistory = await page.$$eval('*', els => 
      els.filter(el => {
        const text = (el.textContent + ' ' + el.title + ' ' + (el.getAttribute('aria-label') || '')).toLowerCase();
        return text.includes('избранное') || text.includes('история') || text.includes('истори') || 
               text.includes('сохран') || text.includes('закладк') || text.includes('favorite') ||
               text.includes('history') || text.includes('недавн');
      }).map(el => el.textContent.trim().substring(0, 40))
    );
    console.log('Fav/History elements:', favHistory.slice(0, 5));
    
    // Check for FAQ / SEO content
    const hasFaq = await page.$$eval('*', els => 
      els.some(el => {
        const text = el.textContent.toLowerCase();
        return text.includes('частые вопросы') || text.includes('faq') || text.includes('вопросы и ответы');
      })
    );
    console.log('Has FAQ section:', hasFaq);
    
    // Check for ads / yandex
    const ads = await page.$$eval('*', els => 
      els.filter(el => {
        const id = el.id || '';
        const cls = el.className || '';
        return id.includes('yandex') || cls.includes('yandex') || 
               id.includes('advert') || cls.includes('advert') ||
               id.includes('ads') || cls.includes('ads') ||
               id.includes('banner') || cls.includes('banner');
      }).length
    );
    console.log('Ad-related elements count:', ads);
  }
  
  await page.close();
  
  // === MOBILE ANALYSIS ===
  console.log('\n\n=== MOBILE VIEWPORT (iPhone 12) ===');
  const mobilePage = await browser.newPage({ 
    viewport: { width: 390, height: 844 },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1'
  });
  
  await mobilePage.goto('https://calcus.su/', { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(3000);
  
  const mobileTitle = await mobilePage.title();
  console.log('Mobile title:', mobileTitle);
  
  // Check hamburger menu
  const menuBtn = await mobilePage.$('button:has-text("Меню")');
  console.log('Menu button visible:', !!menuBtn);
  
  // Check mobile layout - are categories visible?
  const mobileCats = await mobilePage.$$eval('a', links => 
    links.filter(l => {
      const rect = l.getBoundingClientRect();
      return rect.width > 0 && rect.height > 0 && l.textContent.trim().length > 0;
    }).map(l => l.textContent.trim().substring(0, 50))
  );
  console.log('Visible mobile links (first 10):', mobileCats.slice(0, 10));
  
  // Try opening a calculator on mobile
  await mobilePage.goto('https://calcus.su/kalkulyator-imt', { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(2000);
  
  const mobileInputs = await mobilePage.$$eval('input, select', inputs => 
    inputs.map(i => ({
      type: i.type || i.tagName.toLowerCase(),
      placeholder: i.placeholder || '',
      visible: i.getBoundingClientRect().width > 0
    }))
  );
  console.log('Mobile calculator inputs:', mobileInputs);
  
  await mobilePage.close();
  
  // === PERFORMANCE ===
  console.log('\n\n=== PERFORMANCE ===');
  const perfPage = await browser.newPage();
  await perfPage.goto('https://calcus.su/', { waitUntil: 'load' });
  const timing = await perfPage.evaluate(() => {
    const t = performance.timing;
    return {
      loadTime: t.loadEventEnd - t.navigationStart,
      domContentLoaded: t.domContentLoadedEventEnd - t.navigationStart,
      firstPaint: performance.getEntriesByName('first-paint')[0]?.startTime,
      firstContentfulPaint: performance.getEntriesByName('first-contentful-paint')[0]?.startTime
    };
  });
  console.log('Performance metrics:', timing);
  
  await perfPage.close();
  await browser.close();
})();
