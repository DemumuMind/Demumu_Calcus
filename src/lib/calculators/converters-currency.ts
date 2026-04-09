import { Calculator } from '../types';

export const currencyConverters: Calculator[] = [
  // 1. USD to RUB
  {
    id: 'usd-to-rub',
    slug: 'usd-v-rub',
    title: 'USD в RUB',
    description: 'Конвертер доллара США в российский рубль',
    category: 'konvertery',
    subcategory: 'conv-valyuty',
    type: 'converter',
    inputs: [
      { name: 'amount', label: 'Сумма USD', type: 'number', placeholder: '1', defaultValue: 1 }
    ],
    outputs: [{ name: 'result', label: 'Результат', type: 'text' }],
    calculate: (inputs) => {
      const rate = 92.5;
      const result = Number(inputs.amount) * rate;
      return [{ value: `${Number(inputs.amount)} USD = ${result.toFixed(2)} RUB (курс ≈ ${rate})`, label: 'Конвертация' }];
    },
    content: {
      howTo: 'Введите сумму в долларах США. Результат покажет эквивалент в российских рублях.',
      about: 'Конвертер валют для перевода долларов США в российские рубли. Курс примерный, для точных расчётов используйте актуальный курс.',
      usage: 'Подходит для быстрой оценки стоимости товаров и услуг.',
      formula: 'Сумма в RUB = Сумма в USD × Курс USD/RUB',
      faq: [
        { question: 'Откуда берётся курс?', answer: 'Курс примерный, обновляется периодически. Для точных расчётов уточняйте текущий курс ЦБ РФ или коммерческих банков.' },
        { question: 'Можно ли конвертировать обратно?', answer: 'Да, используйте калькулятор RUB в USD или разделите на курс.' }
      ],
      sources: [{ title: 'ЦБ РФ', url: 'https://www.cbr.ru/currency_base/daily/' }],
      updatedAt: '2026-04-07'
    }
  },
  // 2. EUR to RUB
  {
    id: 'eur-to-rub',
    slug: 'eur-v-rub',
    title: 'EUR в RUB',
    description: 'Конвертер евро в российский рубль',
    category: 'konvertery',
    subcategory: 'conv-valyuty',
    type: 'converter',
    inputs: [{ name: 'amount', label: 'Сумма EUR', type: 'number', placeholder: '1', defaultValue: 1 }],
    outputs: [{ name: 'result', label: 'Результат', type: 'text' }],
    calculate: (inputs) => {
      const rate = 98.7;
      const result = Number(inputs.amount) * rate;
      return [{ value: `${Number(inputs.amount)} EUR = ${result.toFixed(2)} RUB (курс ≈ ${rate})`, label: 'Конвертация' }];
    },
    content: {
      howTo: 'Введите сумму в евро. Результат покажет эквивалент в российских рублях.',
      about: 'Конвертер евро в российские рубли.',
      formula: 'Сумма в RUB = Сумма в EUR × Курс EUR/RUB',
      faq: [{ question: 'Как часто обновляется курс?', answer: 'Курс примерный. Для актуальных данных смотрите курс ЦБ РФ.' }],
      sources: [{ title: 'ЦБ РФ', url: 'https://www.cbr.ru/currency_base/daily/' }],
      updatedAt: '2026-04-07'
    }
  },
  // 3. GBP to RUB
  {
    id: 'gbp-to-rub',
    slug: 'gbp-v-rub',
    title: 'GBP в RUB',
    description: 'Конвертер фунта стерлингов в российский рубль',
    category: 'konvertery',
    subcategory: 'conv-valyuty',
    type: 'converter',
    inputs: [{ name: 'amount', label: 'Сумма GBP', type: 'number', placeholder: '1', defaultValue: 1 }],
    outputs: [{ name: 'result', label: 'Результат', type: 'text' }],
    calculate: (inputs) => {
      const rate = 115.3;
      const result = Number(inputs.amount) * rate;
      return [{ value: `${Number(inputs.amount)} GBP = ${result.toFixed(2)} RUB (курс ≈ ${rate})`, label: 'Конвертация' }];
    },
    content: {
      howTo: 'Введите сумму в фунтах стерлингов.',
      about: 'Конвертер британского фунта в российские рубли.',
      formula: 'Сумма в RUB = Сумма в GBP × Курс GBP/RUB',
      faq: [],
      sources: [{ title: 'ЦБ РФ', url: 'https://www.cbr.ru/currency_base/daily/' }],
      updatedAt: '2026-04-07'
    }
  },
  // 4. CNY to RUB
  {
    id: 'cny-to-rub',
    slug: 'cny-v-rub',
    title: 'CNY в RUB',
    description: 'Конвертер китайского юаня в российский рубль',
    category: 'konvertery',
    subcategory: 'conv-valyuty',
    type: 'converter',
    inputs: [{ name: 'amount', label: 'Сумма CNY', type: 'number', placeholder: '1', defaultValue: 1 }],
    outputs: [{ name: 'result', label: 'Результат', type: 'text' }],
    calculate: (inputs) => {
      const rate = 12.8;
      const result = Number(inputs.amount) * rate;
      return [{ value: `${Number(inputs.amount)} CNY = ${result.toFixed(2)} RUB (курс ≈ ${rate})`, label: 'Конвертация' }];
    },
    content: {
      howTo: 'Введите сумму в юанях.',
      about: 'Конвертер китайского юаня в российские рубли.',
      formula: 'Сумма в RUB = Сумма в CNY × Курс CNY/RUB',
      faq: [],
      sources: [{ title: 'ЦБ РФ', url: 'https://www.cbr.ru/currency_base/daily/' }],
      updatedAt: '2026-04-07'
    }
  },
  // 5. JPY to RUB
  {
    id: 'jpy-to-rub',
    slug: 'jpy-v-rub',
    title: 'JPY в RUB',
    description: 'Конвертер японской иены в российский рубль',
    category: 'konvertery',
    subcategory: 'conv-valyuty',
    type: 'converter',
    inputs: [{ name: 'amount', label: 'Сумма JPY', type: 'number', placeholder: '100', defaultValue: 100 }],
    outputs: [{ name: 'result', label: 'Результат', type: 'text' }],
    calculate: (inputs) => {
      const rate = 0.62;
      const result = Number(inputs.amount) * rate;
      return [{ value: `${Number(inputs.amount)} JPY = ${result.toFixed(2)} RUB (курс ≈ ${rate})`, label: 'Конвертация' }];
    },
    content: {
      howTo: 'Введите сумму в иенах.',
      about: 'Конвертер японской иены в российские рубли.',
      formula: 'Сумма в RUB = Сумма в JPY × Курс JPY/RUB',
      faq: [],
      sources: [{ title: 'ЦБ РФ', url: 'https://www.cbr.ru/currency_base/daily/' }],
      updatedAt: '2026-04-07'
    }
  },
  // 6. CHF to RUB
  {
    id: 'chf-to-rub',
    slug: 'chf-v-rub',
    title: 'CHF в RUB',
    description: 'Конвертер швейцарского франка в российский рубль',
    category: 'konvertery',
    subcategory: 'conv-valyuty',
    type: 'converter',
    inputs: [{ name: 'amount', label: 'Сумма CHF', type: 'number', placeholder: '1', defaultValue: 1 }],
    outputs: [{ name: 'result', label: 'Результат', type: 'text' }],
    calculate: (inputs) => {
      const rate = 102.4;
      const result = Number(inputs.amount) * rate;
      return [{ value: `${Number(inputs.amount)} CHF = ${result.toFixed(2)} RUB (курс ≈ ${rate})`, label: 'Конвертация' }];
    },
    content: {
      howTo: 'Введите сумму в швейцарских франках.',
      about: 'Конвертер швейцарского франка в российские рубли.',
      formula: 'Сумма в RUB = Сумма в CHF × Курс CHF/RUB',
      faq: [],
      sources: [{ title: 'ЦБ РФ', url: 'https://www.cbr.ru/currency_base/daily/' }],
      updatedAt: '2026-04-07'
    }
  },
  // 7. BTC to RUB
  {
    id: 'btc-to-rub',
    slug: 'btc-v-rub',
    title: 'BTC в RUB',
    description: 'Конвертер биткоина в российский рубль',
    category: 'konvertery',
    subcategory: 'conv-kriptovalyuty',
    type: 'converter',
    inputs: [{ name: 'amount', label: 'Сумма BTC', type: 'number', placeholder: '0.001', defaultValue: 0.001, step: 0.0001 }],
    outputs: [{ name: 'result', label: 'Результат', type: 'text' }],
    calculate: (inputs) => {
      const rate = 5500000;
      const result = Number(inputs.amount) * rate;
      return [{ value: `${Number(inputs.amount)} BTC = ${result.toLocaleString('ru-RU')} RUB (курс ≈ ${rate.toLocaleString('ru-RU')})`, label: 'Конвертация' }];
    },
    content: {
      howTo: 'Введите количество биткоинов. Результат покажет эквивалент в рублях.',
      about: 'Конвертер криптовалюты Bitcoin (BTC) в российские рубли.',
      usage: 'Для оценки стоимости криптовалютных активов.',
      formula: 'Сумма в RUB = Сумма в BTC × Курс BTC/RUB',
      faq: [
        { question: 'Насколько актуален курс?', answer: 'Курс криптовалют очень волатилен. Для точных расчётов используйте актуальные данные криптобирж.' },
        { question: 'Можно ли конвертировать сатоши?', answer: '1 BTC = 100,000,000 сатоши. Введите дробное значение BTC.' }
      ],
      sources: [{ title: 'CoinMarketCap', url: 'https://coinmarketcap.com/' }],
      updatedAt: '2026-04-07'
    }
  },
  // 8. ETH to RUB
  {
    id: 'eth-to-rub',
    slug: 'eth-v-rub',
    title: 'ETH в RUB',
    description: 'Конвертер эфириума в российский рубль',
    category: 'konvertery',
    subcategory: 'conv-kriptovalyuty',
    type: 'converter',
    inputs: [{ name: 'amount', label: 'Сумма ETH', type: 'number', placeholder: '1', defaultValue: 1, step: 0.01 }],
    outputs: [{ name: 'result', label: 'Результат', type: 'text' }],
    calculate: (inputs) => {
      const rate = 185000;
      const result = Number(inputs.amount) * rate;
      return [{ value: `${Number(inputs.amount)} ETH = ${result.toLocaleString('ru-RU')} RUB (курс ≈ ${rate.toLocaleString('ru-RU')})`, label: 'Конвертация' }];
    },
    content: {
      howTo: 'Введите количество эфириума.',
      about: 'Конвертер криптовалюты Ethereum (ETH) в российские рубли.',
      formula: 'Сумма в RUB = Сумма в ETH × Курс ETH/RUB',
      faq: [],
      sources: [{ title: 'CoinMarketCap', url: 'https://coinmarketcap.com/' }],
      updatedAt: '2026-04-07'
    }
  },
  // 9. USDT to RUB
  {
    id: 'usdt-to-rub',
    slug: 'usdt-v-rub',
    title: 'USDT в RUB',
    description: 'Конвертер Tether (USDT) в российский рубль',
    category: 'konvertery',
    subcategory: 'conv-kriptovalyuty',
    type: 'converter',
    inputs: [{ name: 'amount', label: 'Сумма USDT', type: 'number', placeholder: '1', defaultValue: 1 }],
    outputs: [{ name: 'result', label: 'Результат', type: 'text' }],
    calculate: (inputs) => {
      const rate = 92.8;
      const result = Number(inputs.amount) * rate;
      return [{ value: `${Number(inputs.amount)} USDT = ${result.toFixed(2)} RUB (курс ≈ ${rate})`, label: 'Конвертация' }];
    },
    content: {
      howTo: 'Введите количество USDT.',
      about: 'Tether (USDT) — стейблкоин, привязанный к доллару США.',
      formula: 'Сумма в RUB = Сумма в USDT × Курс USDT/RUB',
      faq: [{ question: 'Что такое USDT?', answer: 'USDT (Tether) — криптовалюта, привязанная к курсу доллара США 1:1.' }],
      sources: [{ title: 'CoinMarketCap', url: 'https://coinmarketcap.com/' }],
      updatedAt: '2026-04-07'
    }
  },
  // 10. USD to EUR
  {
    id: 'usd-to-eur',
    slug: 'usd-v-eur',
    title: 'USD в EUR',
    description: 'Конвертер доллара в евро',
    category: 'konvertery',
    subcategory: 'conv-valyuty',
    type: 'converter',
    inputs: [{ name: 'amount', label: 'Сумма USD', type: 'number', placeholder: '1', defaultValue: 1 }],
    outputs: [{ name: 'result', label: 'Результат', type: 'text' }],
    calculate: (inputs) => {
      const rate = 0.94;
      const result = Number(inputs.amount) * rate;
      return [{ value: `${Number(inputs.amount)} USD = ${result.toFixed(2)} EUR (курс ≈ ${rate})`, label: 'Конвертация' }];
    },
    content: {
      howTo: 'Введите сумму в долларах США.',
      about: 'Конвертер доллара США в евро.',
      formula: 'Сумма в EUR = Сумма в USD × Курс USD/EUR',
      faq: [],
      sources: [{ title: 'ECB', url: 'https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml' }],
      updatedAt: '2026-04-07'
    }
  },
  // 11. USD to GBP
  {
    id: 'usd-to-gbp',
    slug: 'usd-v-gbp',
    title: 'USD в GBP',
    description: 'Конвертер доллара в фунт стерлингов',
    category: 'konvertery',
    subcategory: 'conv-valyuty',
    type: 'converter',
    inputs: [{ name: 'amount', label: 'Сумма USD', type: 'number', placeholder: '1', defaultValue: 1 }],
    outputs: [{ name: 'result', label: 'Результат', type: 'text' }],
    calculate: (inputs) => {
      const rate = 0.80;
      const result = Number(inputs.amount) * rate;
      return [{ value: `${Number(inputs.amount)} USD = ${result.toFixed(2)} GBP (курс ≈ ${rate})`, label: 'Конвертация' }];
    },
    content: {
      howTo: 'Введите сумму в долларах.',
      about: 'Конвертер доллара США в британский фунт стерлингов.',
      formula: 'Сумма в GBP = Сумма в USD × Курс USD/GBP',
      faq: [],
      sources: [{ title: 'Bank of England', url: 'https://www.bankofengland.co.uk/' }],
      updatedAt: '2026-04-07'
    }
  },
  // 12. TRY to RUB
  {
    id: 'try-to-rub',
    slug: 'try-v-rub',
    title: 'TRY в RUB',
    description: 'Конвертер турецкой лиры в российский рубль',
    category: 'konvertery',
    subcategory: 'conv-valyuty',
    type: 'converter',
    inputs: [{ name: 'amount', label: 'Сумма TRY', type: 'number', placeholder: '1', defaultValue: 1 }],
    outputs: [{ name: 'result', label: 'Результат', type: 'text' }],
    calculate: (inputs) => {
      const rate = 2.85;
      const result = Number(inputs.amount) * rate;
      return [{ value: `${Number(inputs.amount)} TRY = ${result.toFixed(2)} RUB (курс ≈ ${rate})`, label: 'Конвертация' }];
    },
    content: {
      howTo: 'Введите сумму в турецких лирах.',
      about: 'Конвертер турецкой лиры в российские рубли.',
      formula: 'Сумма в RUB = Сумма в TRY × Курс TRY/RUB',
      faq: [],
      sources: [{ title: 'ЦБ РФ', url: 'https://www.cbr.ru/currency_base/daily/' }],
      updatedAt: '2026-04-07'
    }
  },
  // 13. KZT to RUB
  {
    id: 'kzt-to-rub',
    slug: 'kzt-v-rub',
    title: 'KZT в RUB',
    description: 'Конвертер казахстанского тенге в российский рубль',
    category: 'konvertery',
    subcategory: 'conv-valyuty',
    type: 'converter',
    inputs: [{ name: 'amount', label: 'Сумма KZT', type: 'number', placeholder: '100', defaultValue: 100 }],
    outputs: [{ name: 'result', label: 'Результат', type: 'text' }],
    calculate: (inputs) => {
      const rate = 0.185;
      const result = Number(inputs.amount) * rate;
      return [{ value: `${Number(inputs.amount)} KZT = ${result.toFixed(2)} RUB (курс ≈ ${rate})`, label: 'Конвертация' }];
    },
    content: {
      howTo: 'Введите сумму в тенге.',
      about: 'Конвертер казахстанского тенге в российские рубли.',
      formula: 'Сумма в RUB = Сумма в KZT × Курс KZT/RUB',
      faq: [],
      sources: [{ title: 'ЦБ РФ', url: 'https://www.cbr.ru/currency_base/daily/' }],
      updatedAt: '2026-04-07'
    }
  },
  // 14. BYN to RUB
  {
    id: 'byn-to-rub',
    slug: 'byn-v-rub',
    title: 'BYN в RUB',
    description: 'Конвертер белорусского рубля в российский рубль',
    category: 'konvertery',
    subcategory: 'conv-valyuty',
    type: 'converter',
    inputs: [{ name: 'amount', label: 'Сумма BYN', type: 'number', placeholder: '1', defaultValue: 1 }],
    outputs: [{ name: 'result', label: 'Результат', type: 'text' }],
    calculate: (inputs) => {
      const rate = 28.5;
      const result = Number(inputs.amount) * rate;
      return [{ value: `${Number(inputs.amount)} BYN = ${result.toFixed(2)} RUB (курс ≈ ${rate})`, label: 'Конвертация' }];
    },
    content: {
      howTo: 'Введите сумму в белорусских рублях.',
      about: 'Конвертер белорусского рубля в российские рубли.',
      formula: 'Сумма в RUB = Сумма в BYN × Курс BYN/RUB',
      faq: [],
      sources: [{ title: 'ЦБ РФ', url: 'https://www.cbr.ru/currency_base/daily/' }],
      updatedAt: '2026-04-07'
    }
  },
  // 15. UAH to RUB
  {
    id: 'uah-to-rub',
    slug: 'uah-v-rub',
    title: 'UAH в RUB',
    description: 'Конвертер украинской гривны в российский рубль',
    category: 'konvertery',
    subcategory: 'conv-valyuty',
    type: 'converter',
    inputs: [{ name: 'amount', label: 'Сумма UAH', type: 'number', placeholder: '1', defaultValue: 1 }],
    outputs: [{ name: 'result', label: 'Результат', type: 'text' }],
    calculate: (inputs) => {
      const rate = 2.25;
      const result = Number(inputs.amount) * rate;
      return [{ value: `${Number(inputs.amount)} UAH = ${result.toFixed(2)} RUB (курс ≈ ${rate})`, label: 'Конвертация' }];
    },
    content: {
      howTo: 'Введите сумму в гривнах.',
      about: 'Конвертер украинской гривны в российские рубли.',
      formula: 'Сумма в RUB = Сумма в UAH × Курс UAH/RUB',
      faq: [],
      sources: [{ title: 'ЦБ РФ', url: 'https://www.cbr.ru/currency_base/daily/' }],
      updatedAt: '2026-04-07'
    }
  },
  // 16. XAU to RUB (золото)
  {
    id: 'xau-to-rub',
    slug: 'zoloto-v-rub',
    title: 'Золото в RUB',
    description: 'Конвертер цены золота в российские рубли за грамм и унцию',
    category: 'konvertery',
    subcategory: 'conv-dragocennye-metally',
    type: 'converter',
    inputs: [
      { name: 'amount', label: 'Количество', type: 'number', placeholder: '1', defaultValue: 1 },
      { name: 'unit', label: 'Единица', type: 'select', options: [{ value: 'gram', label: 'Грамм' }, { value: 'ounce', label: 'Тройская унция' }], defaultValue: 'gram' }
    ],
    outputs: [{ name: 'result', label: 'Результат', type: 'text' }],
    calculate: (inputs) => {
      const ratePerGram = 8500;
      const amount = Number(inputs.amount);
      const unit = String(inputs.unit);
      const multiplier = unit === 'ounce' ? 31.1035 : 1;
      const result = amount * ratePerGram * multiplier;
      const unitLabel = unit === 'ounce' ? 'тройских унций' : 'грамм';
      return [{ value: `${amount} ${unitLabel} золота = ${result.toLocaleString('ru-RU')} RUB`, label: 'Стоимость золота' }];
    },
    content: {
      howTo: 'Введите количество золота и выберите единицу измерения (грамм или тройская унция).',
      about: 'Конвертер стоимости золота в российские рубли. 1 тройская унция = 31.1035 грамм.',
      usage: 'Для оценки стоимости золотых изделий и инвестиций.',
      formula: 'Стоимость = Количество (г) × Цена за грамм',
      faq: [
        { question: 'Что такое тройская унция?', answer: 'Тройская унция — единица измерения драгоценных металлов, равная 31.1034768 грамм.' },
        { question: 'Учитывается ли проба?', answer: 'Калькулятор показывает цену за чистое золото (999 проба). Для ювелирных изделий примените коэффициент пробы.' }
      ],
      sources: [{ title: 'ЦБ РФ', url: 'https://www.cbr.ru/hd_base/metall/' }],
      updatedAt: '2026-04-07'
    }
  }
];
