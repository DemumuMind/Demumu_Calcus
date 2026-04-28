const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  
  // 1. Check converter category (has 205 tools!)
  console.log('=== CONVERTER CATEGORY ===');
  await page.goto('https://calcus.su/konvertery', { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);
  
  const convLinks = await page.$$eval('a', links => 
    links.filter(l => {
      const text = l.textContent.trim();
      const href = l.getAttribute('href') || '';
      return text.length > 0 && href.startsWith('/') && !href.includes('//') && href !== '/konvertery';
    }).map(l => ({
      text: l.textContent.trim().substring(0, 80),
      href: l.getAttribute('href')
    }))
  );
  const seen = new Set();
  const unique = [];
  for (const l of convLinks) { if (!seen.has(l.href)) { seen.add(l.href); unique.push(l); } }
  console.log('Converters count:', unique.length);
  unique.slice(0, 15).forEach(l => console.log('-', l.text, '->', l.href));
  
  // 2. Check popular calculations section on percent calculator
  console.log('\n=== POPULAR CALCULATIONS SECTION ===');
  await page.goto('https://calcus.su/kalkulyator-procentov', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  
  const popular = await page.$$eval('a, button', els => 
    els.filter(el => {
      const parent = el.closest('section, div, article');
      if (!parent) return false;
      const parentText = parent.textContent.toLowerCase();
      return parentText.includes('популярные') && parentText.includes('расчёт');
    }).map(el => el.textContent.trim().substring(0, 60))
  );
  console.log('Popular calculations links:', popular.slice(0, 10));
  
  // 3. Check breadcrumbs
  console.log('\n=== BREADCRUMBS ===');
  const breadcrumbs = await page.$$eval('nav, [class*="breadcrumb"], [class*="breadcrump"]', els => 
    els.map(el => el.textContent.trim().substring(0, 200))
  );
  console.log('Breadcrumb texts:', breadcrumbs.slice(0, 3));
  
  // 4. Check for Yandex ads or any advertising
  console.log('\n=== ADVERTISING ===');
  const pageContent = await page.content();
  const hasYandexAds = pageContent.includes('yandex') && (pageContent.includes('ads') || pageContent.includes('adfox') || pageContent.includes('RTB'));
  const hasGoogleAds = pageContent.includes('googlesyndication') || pageContent.includes('adsbygoogle');
  console.log('Has Yandex ads:', hasYandexAds);
  console.log('Has Google ads:', hasGoogleAds);
  
  // 5. Check for manifest and service worker
  console.log('\n=== PWA FEATURES ===');
  const hasManifest = await page.$eval('link[rel="manifest"]', el => el.href).catch(() => false);
  console.log('Has manifest:', !!hasManifest);
  
  const swContent = pageContent.includes('serviceWorker') || pageContent.includes('navigator.serviceWorker');
  console.log('Has service worker reference:', swContent);
  
  // 6. Check keyboard navigation / accessibility
  console.log('\n=== ACCESSIBILITY ===');
  const lang = await page.$eval('html', el => el.lang);
  console.log('HTML lang:', lang);
  
  // 7. Test mobile menu interaction
  console.log('\n=== MOBILE MENU TEST ===');
  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await mobile.goto('https://calcus.su/', { waitUntil: 'networkidle' });
  await mobile.waitForTimeout(2000);
  
  const menuBtn = await mobile.$('button:has-text("Меню")');
  if (menuBtn) {
    await menuBtn.click();
    await mobile.waitForTimeout(1000);
    const menuItems = await mobile.$$eval('a, button', els => 
      els.filter(el => {
        const rect = el.getBoundingClientRect();
        return rect.width > 0 && rect.height > 0 && el.textContent.trim().length > 0;
      }).map(el => el.textContent.trim().substring(0, 40))
    );
    console.log('Visible items after menu click:', menuItems.slice(0, 15));
  }
  await mobile.close();
  
  // 8. Check specific subcategories
  console.log('\n=== SUBCATEGORIES CHECK ===');
  const subcats = [
    'https://calcus.su/matematicheskie',
    'https://calcus.su/finansovye',
    'https://calcus.su/geometriya',
    'https://calcus.su/fizika',
    'https://calcus.su/pitanie-i-ves',
    'https://calcus.su/stroitelnye-materialy'
  ];
  
  for (const url of subcats) {
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1500);
    const title = await page.title();
    const calcCount = await page.$$eval('a[href^="/"]', links => 
      links.filter(l => {
        const href = l.getAttribute('href') || '';
        return href.length > url.length - 5 && !href.includes('//') && href !== url;
      }).length
    );
    console.log(url.replace('https://calcus.su', '') + ':', title.split('—')[0].trim(), '- ~' + calcCount + ' links');
  }
  
  await browser.close();
})();
