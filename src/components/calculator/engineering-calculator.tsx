'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { Calculator as CalcType } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calculator as CalculatorIcon, Delete, RotateCcw } from 'lucide-react';

interface EngineeringCalculatorProps {
  calculator: CalcType;
  initialParams?: Record<string, string>;
}

export function EngineeringCalculator({ calculator: _calculator, initialParams }: EngineeringCalculatorProps) {
  const [display, setDisplay] = useState(() => {
    if (initialParams?.value && !isNaN(Number(initialParams.value))) {
      return initialParams.value;
    }
    return '0';
  });
  const [expression, setExpression] = useState('');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [memory, setMemory] = useState<number>(0);
  const [showHistory, setShowHistory] = useState(false);

  const displayRef = useRef(display);
  const previousValueRef = useRef(previousValue);
  const operationRef = useRef(operation);
  const waitingForOperandRef = useRef(waitingForOperand);
  const memoryRef = useRef(memory);
  const historyRef = useRef(history);

  displayRef.current = display;
  previousValueRef.current = previousValue;
  operationRef.current = operation;
  waitingForOperandRef.current = waitingForOperand;
  memoryRef.current = memory;
  historyRef.current = history;

  const calculate = useCallback((left: number, right: number, op: string): number => {
    switch (op) {
      case '+': return left + right;
      case '-': return left - right;
      case '×': return left * right;
      case '÷': return right !== 0 ? left / right : 0;
      default: return right;
    }
  }, []);

  const factorial = useCallback((n: number): number => {
    if (n < 0) return NaN;
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= Math.floor(n); i++) {
      result *= i;
      if (!isFinite(result)) return Infinity;
    }
    return result;
  }, []);

  const evaluateExpression = useCallback((expr: string): number => {
    try {
      // Replace display symbols with JS math equivalents
      let normalized = expr
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/π/g, String(Math.PI))
        .replace(/e/g, String(Math.E))
        .replace(/\^/g, '**');

      const funcs: Record<string, (x: number) => number> = {
        'sin': Math.sin,
        'cos': Math.cos,
        'tan': Math.tan,
        'ln': Math.log,
        'log': Math.log10,
        'sqrt': Math.sqrt,
        'abs': Math.abs,
      };

      for (const [name, fn] of Object.entries(funcs)) {
        const regex = new RegExp(`${name}\\(([^)]+)\\)`, 'g');
        normalized = normalized.replace(regex, (_match, inner) => {
          const val = evaluateExpression(inner);
          return String(fn(val));
        });
      }

      normalized = normalized.replace(/(\d+(?:\.\d+)?)!/g, (_match, n) => {
        return String(factorial(Number(n)));
      });

      const result = Function('"use strict"; return (' + normalized + ')')();
      if (!isFinite(result) || isNaN(result)) return NaN;
      return result;
    } catch {
      return NaN;
    }
  }, [factorial]);

  const inputNumber = useCallback((num: string) => {
    const d = displayRef.current;
    const w = waitingForOperandRef.current;
    if (w) {
      setDisplay(num);
      setWaitingForOperand(false);
    } else {
      setDisplay(d === '0' ? num : d + num);
    }
  }, []);

  const inputOperation = useCallback((op: string) => {
    const d = displayRef.current;
    const pv = previousValueRef.current;
    const op_ = operationRef.current;
    const inputValue = parseFloat(d);

    if (pv === null) {
      setPreviousValue(inputValue);
      setExpression(`${d} ${op}`);
    } else if (op_) {
      const currentValue = pv || 0;
      const newValue = calculate(currentValue, inputValue, op_);

      setPreviousValue(newValue);
      setDisplay(String(newValue));
      setExpression(`${newValue} ${op}`);
    } else {
      setExpression(`${d} ${op}`);
    }

    setWaitingForOperand(true);
    setOperation(op);
  }, [calculate]);

  const performCalculation = useCallback(() => {
    const d = displayRef.current;
    const pv = previousValueRef.current;
    const op = operationRef.current;
    const inputValue = parseFloat(d);

    if (pv !== null && op) {
      const newValue = calculate(pv, inputValue, op);
      const expr = `${pv} ${op} ${inputValue} = ${newValue}`;

      setDisplay(String(newValue));
      setExpression('');
      setHistory(prev => [expr, ...prev].slice(0, 10));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  }, [calculate]);

  const clear = useCallback(() => {
    setDisplay('0');
    setExpression('');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  }, []);

  const clearEntry = useCallback(() => {
    setDisplay('0');
  }, []);

  const backspace = useCallback(() => {
    const d = displayRef.current;
    if (d.length > 1) {
      setDisplay(d.slice(0, -1));
    } else {
      setDisplay('0');
    }
  }, []);

  const _toggleSign = useCallback(() => {
    const d = displayRef.current;
    const newValue = parseFloat(d) * -1;
    setDisplay(String(newValue));
  }, []);

  const _inputPercent = useCallback(() => {
    const d = displayRef.current;
    const currentValue = parseFloat(d);
    if (currentValue === 0) return;
    const newValue = currentValue / 100;
    setDisplay(String(newValue));
  }, []);

  const inputDecimal = useCallback(() => {
    const d = displayRef.current;
    const w = waitingForOperandRef.current;
    if (w) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (d.indexOf('.') === -1) {
      setDisplay(d + '.');
    }
  }, []);

  const inputPi = useCallback(() => {
    setDisplay(String(Math.PI));
    setWaitingForOperand(true);
  }, []);

  const _inputE = useCallback(() => {
    setDisplay(String(Math.E));
    setWaitingForOperand(true);
  }, []);

  const applyUnary = useCallback((fn: (n: number) => number, label: string) => {
    const d = displayRef.current;
    const val = parseFloat(d);
    const result = fn(val);
    const expr = `${label}(${d}) = ${result}`;
    setDisplay(String(result));
    setHistory(prev => [expr, ...prev].slice(0, 10));
    setWaitingForOperand(true);
  }, []);

  const applyPower = useCallback((exp: number, label: string) => {
    const d = displayRef.current;
    const val = parseFloat(d);
    const result = Math.pow(val, exp);
    const expr = `${d}${label} = ${result}`;
    setDisplay(String(result));
    setHistory(prev => [expr, ...prev].slice(0, 10));
    setWaitingForOperand(true);
  }, []);

  const inputPower = useCallback(() => {
    const d = displayRef.current;
    setExpression(`${d} ^ `);
    setPreviousValue(parseFloat(d));
    setOperation('^');
    setWaitingForOperand(true);
  }, []);

  const performPower = useCallback(() => {
    const d = displayRef.current;
    const pv = previousValueRef.current;
    if (pv !== null) {
      const inputValue = parseFloat(d);
      const result = Math.pow(pv, inputValue);
      const expr = `${pv} ^ ${inputValue} = ${result}`;
      setDisplay(String(result));
      setExpression('');
      setHistory(prev => [expr, ...prev].slice(0, 10));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  }, []);

  const memoryAdd = useCallback(() => {
    const d = displayRef.current;
    const val = parseFloat(d);
    setMemory(prev => prev + val);
  }, []);

  const memorySubtract = useCallback(() => {
    const d = displayRef.current;
    const val = parseFloat(d);
    setMemory(prev => prev - val);
  }, []);

  const memoryRecall = useCallback(() => {
    setDisplay(String(memoryRef.current));
    setWaitingForOperand(true);
  }, []);

  const memoryClear = useCallback(() => {
    setMemory(0);
  }, []);

  const inputParen = useCallback((paren: string) => {
    const d = displayRef.current;
    const w = waitingForOperandRef.current;
    if (w || d === '0') {
      setDisplay(paren);
      setWaitingForOperand(false);
    } else {
      setDisplay(d + paren);
    }
  }, []);

  const inputFactorial = useCallback(() => {
    const d = displayRef.current;
    const val = parseFloat(d);
    const result = factorial(val);
    const expr = `${d}! = ${result}`;
    setDisplay(String(result));
    setHistory(prev => [expr, ...prev].slice(0, 10));
    setWaitingForOperand(true);
  }, [factorial]);

  const handleExpressionEval = useCallback(() => {
    const d = displayRef.current;
    const result = evaluateExpression(d);
    if (!isNaN(result)) {
      const expr = `${d} = ${result}`;
      setDisplay(String(result));
      setHistory(prev => [expr, ...prev].slice(0, 10));
      setWaitingForOperand(true);
    }
  }, [evaluateExpression]);

  const isExpressionMode = useCallback((): boolean => {
    const d = displayRef.current;
    return /[sin|cos|tan|ln|log|sqrt|abs|π|e|(|)|^|!]/.test(d) || /[+−×÷]/.test(d);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key;

      if (key >= '0' && key <= '9') {
        inputNumber(key);
      } else if (key === '.') {
        inputDecimal();
      } else if (key === 'Enter' || key === '=') {
        if (operationRef.current === '^') {
          performPower();
        } else {
          performCalculation();
        }
      } else if (key === 'Escape') {
        clear();
      } else if (key === 'Backspace') {
        backspace();
      } else if (key === '+') {
        inputOperation('+');
      } else if (key === '-') {
        inputOperation('-');
      } else if (key === '*') {
        inputOperation('×');
      } else if (key === '/') {
        event.preventDefault();
        inputOperation('÷');
      } else if (key === '(') {
        inputParen('(');
      } else if (key === ')') {
        inputParen(')');
      } else if (key === '^') {
        inputPower();
      } else if (key === '!') {
        inputFactorial();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [inputNumber, inputDecimal, performCalculation, clear, inputOperation, backspace, inputParen, inputPower, performPower, inputFactorial]);

  const scientificButtons = [
    { label: 'sin', onClick: () => applyUnary(Math.sin, 'sin'), className: 'bg-secondary text-secondary-foreground hover:bg-secondary/80' },
    { label: 'cos', onClick: () => applyUnary(Math.cos, 'cos'), className: 'bg-secondary text-secondary-foreground hover:bg-secondary/80' },
    { label: 'tan', onClick: () => applyUnary(Math.tan, 'tan'), className: 'bg-secondary text-secondary-foreground hover:bg-secondary/80' },
    { label: 'ln', onClick: () => applyUnary(Math.log, 'ln'), className: 'bg-secondary text-secondary-foreground hover:bg-secondary/80' },
    { label: 'log', onClick: () => applyUnary(Math.log10, 'log'), className: 'bg-secondary text-secondary-foreground hover:bg-secondary/80' },
    { label: 'eˣ', onClick: () => applyUnary(Math.exp, 'e^'), className: 'bg-secondary text-secondary-foreground hover:bg-secondary/80' },
    { label: 'x²', onClick: () => applyPower(2, '²'), className: 'bg-secondary text-secondary-foreground hover:bg-secondary/80' },
    { label: 'xʸ', onClick: inputPower, className: 'bg-secondary text-secondary-foreground hover:bg-secondary/80' },
    { label: '√', onClick: () => applyUnary(Math.sqrt, '√'), className: 'bg-secondary text-secondary-foreground hover:bg-secondary/80' },
    { label: 'π', onClick: inputPi, className: 'bg-secondary text-secondary-foreground hover:bg-secondary/80' },
    { label: 'x!', onClick: inputFactorial, className: 'bg-secondary text-secondary-foreground hover:bg-secondary/80' },
    { label: 'abs', onClick: () => applyUnary(Math.abs, 'abs'), className: 'bg-secondary text-secondary-foreground hover:bg-secondary/80' },
    { label: '(', onClick: () => inputParen('('), className: 'bg-secondary text-secondary-foreground hover:bg-secondary/80' },
    { label: ')', onClick: () => inputParen(')'), className: 'bg-secondary text-secondary-foreground hover:bg-secondary/80' },
  ];

  const memoryButtons = [
    { label: 'MC', onClick: memoryClear, title: 'Очистить память' },
    { label: 'MR', onClick: memoryRecall, title: 'Вызвать из памяти' },
    { label: 'M+', onClick: memoryAdd, title: 'Добавить в память' },
    { label: 'M-', onClick: memorySubtract, title: 'Вычесть из памяти' },
  ];

  const basicButtons = [
    { label: 'C', onClick: clear, className: 'bg-destructive/10 text-destructive hover:bg-destructive/20' },
    { label: 'CE', onClick: clearEntry, className: 'bg-secondary text-secondary-foreground hover:bg-secondary/80' },
    { label: '⌫', onClick: backspace, className: 'bg-secondary text-secondary-foreground hover:bg-secondary/80' },
    { label: '÷', onClick: () => inputOperation('÷'), className: 'bg-primary text-primary-foreground hover:bg-primary/90' },
    { label: '7', onClick: () => inputNumber('7'), className: 'bg-background hover:bg-accent' },
    { label: '8', onClick: () => inputNumber('8'), className: 'bg-background hover:bg-accent' },
    { label: '9', onClick: () => inputNumber('9'), className: 'bg-background hover:bg-accent' },
    { label: '×', onClick: () => inputOperation('×'), className: 'bg-primary text-primary-foreground hover:bg-primary/90' },
    { label: '4', onClick: () => inputNumber('4'), className: 'bg-background hover:bg-accent' },
    { label: '5', onClick: () => inputNumber('5'), className: 'bg-background hover:bg-accent' },
    { label: '6', onClick: () => inputNumber('6'), className: 'bg-background hover:bg-accent' },
    { label: '-', onClick: () => inputOperation('-'), className: 'bg-primary text-primary-foreground hover:bg-primary/90' },
    { label: '1', onClick: () => inputNumber('1'), className: 'bg-background hover:bg-accent' },
    { label: '2', onClick: () => inputNumber('2'), className: 'bg-background hover:bg-accent' },
    { label: '3', onClick: () => inputNumber('3'), className: 'bg-background hover:bg-accent' },
    { label: '+', onClick: () => inputOperation('+'), className: 'bg-primary text-primary-foreground hover:bg-primary/90' },
    { label: '0', onClick: () => inputNumber('0'), className: 'col-span-2 bg-background hover:bg-accent' },
    { label: '.', onClick: inputDecimal, className: 'bg-background hover:bg-accent' },
    {
      label: '=',
      onClick: () => {
        if (operationRef.current === '^') {
          performPower();
        } else if (isExpressionMode()) {
          handleExpressionEval();
        } else {
          performCalculation();
        }
      },
      className: 'bg-primary text-primary-foreground hover:bg-primary/90'
    },
  ];

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <CalculatorIcon className="h-5 w-5 text-primary" />
          Инженерный калькулятор
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Display */}
        <div className="rounded-lg bg-muted p-4 text-right">
          {expression && (
            <p className="text-sm text-muted-foreground mb-1">{expression}</p>
          )}
          <p className="text-3xl font-mono font-bold tracking-wide text-foreground overflow-hidden">
            {display}
          </p>
        </div>

        {/* Memory buttons */}
        <div className="flex gap-1">
          {memoryButtons.map((btn) => (
            <Button
              key={btn.label}
              onClick={btn.onClick}
              title={btn.title}
              className="flex-1 h-9 text-xs font-medium bg-muted hover:bg-muted/80"
              variant="ghost"
            >
              {btn.label}
            </Button>
          ))}
        </div>

        {/* Scientific keypad */}
        <div className="grid grid-cols-7 gap-1">
          {scientificButtons.map((button) => (
            <Button
              key={button.label}
              onClick={button.onClick}
              className={`h-10 text-xs font-medium ${button.className}`}
              variant="secondary"
            >
              {button.label}
            </Button>
          ))}
        </div>

        {/* Basic keypad */}
        <div className="grid grid-cols-4 gap-2">
          {basicButtons.map((button, index) => (
            <Button
              key={index}
              onClick={button.onClick}
              className={`h-14 text-lg font-medium ${button.className} ${button.label === '0' ? 'col-span-2' : ''}`}
              variant={button.label === 'C' ? 'destructive' : button.label.match(/[CE⌫]/) ? 'secondary' : button.label.match(/[÷×\-+=]/) ? 'default' : 'outline'}
            >
              {button.label === '⌫' ? <Delete className="h-5 w-5" /> : button.label}
            </Button>
          ))}
        </div>

        {/* History toggle */}
        {history.length > 0 && (
          <div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowHistory(!showHistory)}
              className="text-xs text-muted-foreground"
            >
              <RotateCcw className="h-3 w-3 mr-1" />
              {showHistory ? 'Скрыть историю' : `История (${history.length})`}
            </Button>
            {showHistory && (
              <div className="mt-2 space-y-1 rounded-lg bg-muted/50 p-3 text-sm font-mono text-muted-foreground">
                {history.map((entry, idx) => (
                  <p key={idx} className="truncate">{entry}</p>
                ))}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
