import type { ComputeFn } from './compute-helpers';

export const computeMap_missing_1: Record<string, ComputeFn> = {
  'kilometry-v-metry': (inputs) => {
    const value = Number(inputs.value);
    const from = String(inputs.from);
    const to = String(inputs.to);
    if (isNaN(value)) return [{ value: '\u2014', label: '\u0420\u0435\u0437\u0443\u043b\u044c\u0442\u0430\u0442' }];
    const factor = from === 'km' ? 1000 : 0.001;
    const result = value * factor;
    const fromLabel = from === 'km' ? '\u043a\u043c' : '\u043c';
    const toLabel = to === 'km' ? '\u043a\u043c' : '\u043c';
    return [{ value: `${value} ${fromLabel} = ${result.toFixed(4).replace(/\.?0+$/, '')} ${toLabel}`, label: '\u0420\u0435\u0437\u0443\u043b\u044c\u0442\u0430\u0442' }];
  },
  'metry-v-santimetry': (inputs) => {
    const value = Number(inputs.value);
    const from = String(inputs.from);
    const to = String(inputs.to);
    if (isNaN(value)) return [{ value: '\u2014', label: '\u0420\u0435\u0437\u0443\u043b\u044c\u0442\u0430\u0442' }];
    const factor = from === 'm' ? 100 : 0.01;
    const result = value * factor;
    const fromLabel = from === 'm' ? '\u043c' : '\u0441\u043c';
    const toLabel = to === 'm' ? '\u043c' : '\u0441\u043c';
    return [{ value: `${value} ${fromLabel} = ${result.toFixed(4).replace(/\.?0+$/, '')} ${toLabel}`, label: '\u0420\u0435\u0437\u0443\u043b\u044c\u0442\u0430\u0442' }];
  },
  'santimetry-v-millimetry': (inputs) => {
    const value = Number(inputs.value);
    const from = String(inputs.from);
    const to = String(inputs.to);
    if (isNaN(value)) return [{ value: '\u2014', label: '\u0420\u0435\u0437\u0443\u043b\u044c\u0442\u0430\u0442' }];
    const factor = from === 'cm' ? 10 : 0.1;
    const result = value * factor;
    const fromLabel = from === 'cm' ? '\u0441\u043c' : '\u043c\u043c';
    const toLabel = to === 'cm' ? '\u0441\u043c' : '\u043c\u043c';
    return [{ value: `${value} ${fromLabel} = ${result.toFixed(4).replace(/\.?0+$/, '')} ${toLabel}`, label: '\u0420\u0435\u0437\u0443\u043b\u044c\u0442\u0430\u0442' }];
  },
  'kilogrammy-v-grammy': (inputs) => {
    const value = Number(inputs.value);
    const from = String(inputs.from);
    const to = String(inputs.to);
    if (isNaN(value)) return [{ value: '\u2014', label: '\u0420\u0435\u0437\u0443\u043b\u044c\u0442\u0430\u0442' }];
    const factor = from === 'kg' ? 1000 : 0.001;
    const result = value * factor;
    const fromLabel = from === 'kg' ? '\u043a\u0433' : '\u0433';
    const toLabel = to === 'kg' ? '\u043a\u0433' : '\u0433';
    return [{ value: `${value} ${fromLabel} = ${result.toFixed(4).replace(/\.?0+$/, '')} ${toLabel}`, label: '\u0420\u0435\u0437\u0443\u043b\u044c\u0442\u0430\u0442' }];
  },
  'tonny-v-kilogrammy': (inputs) => {
    const value = Number(inputs.value);
    const from = String(inputs.from);
    const to = String(inputs.to);
    if (isNaN(value)) return [{ value: '\u2014', label: '\u0420\u0435\u0437\u0443\u043b\u044c\u0442\u0430\u0442' }];
    const factor = from === 't' ? 1000 : 0.001;
    const result = value * factor;
    const fromLabel = from === 't' ? '\u0442' : '\u043a\u0433';
    const toLabel = to === 't' ? '\u0442' : '\u043a\u0433';
    return [{ value: `${value} ${fromLabel} = ${result.toFixed(4).replace(/\.?0+$/, '')} ${toLabel}`, label: '\u0420\u0435\u0437\u0443\u043b\u044c\u0442\u0430\u0442' }];
  },
  'karati-v-grammy': (inputs) => {
    const value = Number(inputs.value);
    const from = String(inputs.from);
    const to = String(inputs.to);
    if (isNaN(value)) return [{ value: '\u2014', label: '\u0420\u0435\u0437\u0443\u043b\u044c\u0442\u0430\u0442' }];
    const factor = from === 'ct' ? 0.2 : 5;
    const result = value * factor;
    const fromLabel = from === 'ct' ? '\u043a\u0430\u0440\u0430\u0442' : '\u0433';
    const toLabel = to === 'ct' ? '\u043a\u0430\u0440\u0430\u0442' : '\u0433';
    return [{ value: `${value} ${fromLabel} = ${result.toFixed(4).replace(/\.?0+$/, '')} ${toLabel}`, label: '\u0420\u0435\u0437\u0443\u043b\u044c\u0442\u0430\u0442' }];
  },
  'kg-bagazha-v-funty': (inputs) => {
    const value = Number(inputs.value);
    const from = String(inputs.from);
    const to = String(inputs.to);
    if (isNaN(value)) return [{ value: '\u2014', label: '\u0420\u0435\u0437\u0443\u043b\u044c\u0442\u0430\u0442' }, { value: '\u0421\u0442\u0430\u043d\u0434\u0430\u0440\u0442: 23 \u043a\u0433 (50.7 \u0444\u0443\u043d\u0442\u043e\u0432) \u2014 \u0431\u043e\u043b\u044c\u0448\u0438\u043d\u0441\u0442\u0432\u043e \u0430\u0432\u0438\u0430\u043a\u043e\u043c\u043f\u0430\u043d\u0438\u0439', label: 'airlineInfo' }];
    const factor = from === 'kg' ? 2.20462 : 0.453592;
    const result = value * factor;
    const fromLabel = from === 'kg' ? '\u043a\u0433' : '\u0444\u0443\u043d\u0442\u043e\u0432';
    const toLabel = to === 'kg' ? '\u043a\u0433' : '\u0444\u0443\u043d\u0442\u043e\u0432';
    return [
      { value: `${value} ${fromLabel} = ${result.toFixed(4).replace(/\.?0+$/, '')} ${toLabel}`, label: '\u0420\u0435\u0437\u0443\u043b\u044c\u0442\u0430\u0442' },
      { value: '\u0421\u0442\u0430\u043d\u0434\u0430\u0440\u0442: 23 \u043a\u0433 (50.7 \u0444\u0443\u043d\u0442\u043e\u0432) \u2014 \u0431\u043e\u043b\u044c\u0448\u0438\u043d\u0441\u0442\u0432\u043e \u0430\u0432\u0438\u0430\u043a\u043e\u043c\u043f\u0430\u043d\u0438\u0439', label: 'airlineInfo' }
    ];
  },
  'funty-bagazha-v-kg': (inputs) => {
    const value = Number(inputs.value);
    const from = String(inputs.from);
    const to = String(inputs.to);
    if (isNaN(value)) return [{ value: '\u2014', label: '\u0420\u0435\u0437\u0443\u043b\u044c\u0442\u0430\u0442' }, { value: '\u0421\u0442\u0430\u043d\u0434\u0430\u0440\u0442: 50.7 \u0444\u0443\u043d\u0442\u043e\u0432 (23 \u043a\u0433) \u2014 \u0431\u043e\u043b\u044c\u0448\u0438\u043d\u0441\u0442\u0432\u043e \u0430\u0432\u0438\u0430\u043a\u043e\u043c\u043f\u0430\u043d\u0438\u0439', label: 'airlineInfo' }];
    const factor = from === 'lb' ? 0.453592 : 2.20462;
    const result = value * factor;
    const fromLabel = from === 'lb' ? '\u0444\u0443\u043d\u0442\u043e\u0432' : '\u043a\u0433';
    const toLabel = to === 'lb' ? '\u0444\u0443\u043d\u0442\u043e\u0432' : '\u043a\u0433';
    return [
      { value: `${value} ${fromLabel} = ${result.toFixed(4).replace(/\.?0+$/, '')} ${toLabel}`, label: '\u0420\u0435\u0437\u0443\u043b\u044c\u0442\u0430\u0442' },
      { value: '\u0421\u0442\u0430\u043d\u0434\u0430\u0440\u0442: 50.7 \u0444\u0443\u043d\u0442\u043e\u0432 (23 \u043a\u0433) \u2014 \u0431\u043e\u043b\u044c\u0448\u0438\u043d\u0441\u0442\u0432\u043e \u0430\u0432\u0438\u0430\u043a\u043e\u043c\u043f\u0430\u043d\u0438\u0439', label: 'airlineInfo' }
    ];
  },
  'ppi-v-dpi': (inputs) => {
    const value = Number(inputs.value);
    const from = String(inputs.from);
    const to = String(inputs.to);
    if (isNaN(value)) return [{ value: '\u2014', label: '\u0420\u0435\u0437\u0443\u043b\u044c\u0442\u0430\u0442' }];
    const fromLabel = from === 'ppi' ? 'PPI' : 'DPI';
    const toLabel = to === 'ppi' ? 'PPI' : 'DPI';
    return [{ value: `${value} ${fromLabel} = ${value} ${toLabel}. \u041f\u0440\u0438\u043c\u0435\u0447\u0430\u043d\u0438\u0435: \u0447\u0430\u0441\u0442\u043e \u043e\u0431\u043e\u0437\u043d\u0430\u0447\u0430\u044e\u0442 \u043e\u0434\u043d\u043e \u0438 \u0442\u043e \u0436\u0435 (1:1)`, label: '\u0420\u0435\u0437\u0443\u043b\u044c\u0442\u0430\u0442' }];
  },
  'sm-v-dyujmy-diagonal': (inputs) => {
    const value = Number(inputs.value);
    const from = String(inputs.from);
    const to = String(inputs.to);
    if (isNaN(value)) return [{ value: '\u2014', label: '\u0420\u0435\u0437\u0443\u043b\u044c\u0442\u0430\u0442' }];
    const factor = from === 'cm' ? 0.393701 : 2.54;
    const result = value * factor;
    const fromLabel = from === 'cm' ? '\u0441\u043c' : '\u0434\u044e\u0439\u043c\u043e\u0432';
    const toLabel = to === 'cm' ? '\u0441\u043c' : '\u0434\u044e\u0439\u043c\u043e\u0432';
    return [{ value: `${value} ${fromLabel} = ${result.toFixed(4).replace(/\.?0+$/, '')} ${toLabel}`, label: '\u0420\u0435\u0437\u0443\u043b\u044c\u0442\u0430\u0442' }];
  },
  'sootnoshenie-storon-v-degrees': (inputs) => {
    const width = Number(inputs.width);
    const height = Number(inputs.height);
    if (isNaN(width) || isNaN(height) || width <= 0 || height <= 0) return [{ value: '\u2014', label: '\u0423\u0433\u043e\u043b \u0434\u0438\u0430\u0433\u043e\u043d\u0430\u043b\u0438' }];
    const angle = Math.atan2(height, width) * 180 / Math.PI;
    return [{ value: `${angle.toFixed(2)}\u00b0`, label: '\u0423\u0433\u043e\u043b \u0434\u0438\u0430\u0433\u043e\u043d\u0430\u043b\u0438' }];
  },
  'razmer-fayla': (inputs) => {
    const value = Number(inputs.value);
    const fromUnit = String(inputs.fromUnit);
    if (isNaN(value)) {
      return [
        { value: '\u2014', label: '\u0411\u0438\u0442\u044b', unit: 'b' },
        { value: '\u2014', label: '\u0411\u0430\u0439\u0442\u044b', unit: 'B' },
        { value: '\u2014', label: '\u041a\u0438\u043b\u043e\u0431\u0430\u0439\u0442\u044b', unit: 'KB' },
        { value: '\u2014', label: '\u041c\u0435\u0433\u0430\u0431\u0430\u0439\u0442\u044b', unit: 'MB' },
        { value: '\u2014', label: '\u0413\u0438\u0433\u0430\u0431\u0430\u0439\u0442\u044b', unit: 'GB' },
        { value: '\u2014', label: '\u0422\u0435\u0440\u0430\u0431\u0430\u0439\u0442\u044b', unit: 'TB' }
      ];
    }
    const factors: Record<string, number> = {
      bit: 1,
      byte: 8,
      KB: 8192,
      MB: 8388608,
      GB: 8589934592,
      TB: 8796093022208
    };
    const inBits = value * (factors[fromUnit] || 1);
    const fmt = (n: number) => {
      if (n === 0) return '0';
      const abs = Math.abs(n);
      if (abs < 1e-6 || abs >= 1e12) return n.toExponential(4).replace(/e([+-]?)(\d+)/, '\u00d710^$1$2');
      let s = n.toFixed(6);
      if (s.includes('.')) s = s.replace(/\.?0+$/, '');
      return s;
    };
    return [
      { value: fmt(inBits), label: '\u0411\u0438\u0442\u044b', unit: 'b' },
      { value: fmt(inBits / 8), label: '\u0411\u0430\u0439\u0442\u044b', unit: 'B' },
      { value: fmt(inBits / 8192), label: '\u041a\u0438\u043b\u043e\u0431\u0430\u0439\u0442\u044b', unit: 'KB' },
      { value: fmt(inBits / 8388608), label: '\u041c\u0435\u0433\u0430\u0431\u0430\u0439\u0442\u044b', unit: 'MB' },
      { value: fmt(inBits / 8589934592), label: '\u0413\u0438\u0433\u0430\u0431\u0430\u0439\u0442\u044b', unit: 'GB' },
      { value: fmt(inBits / 8796093022208), label: '\u0422\u0435\u0440\u0430\u0431\u0430\u0439\u0442\u044b', unit: 'TB' }
    ];
  },
};
