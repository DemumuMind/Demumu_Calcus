'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { Calculator as CalcType } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calculator as CalculatorIcon, Delete, Equal } from 'lucide-react';

interface ArithmeticCalculatorProps {
  calculator: CalcType;
  initialParams?: Record<string, string>;
}

export function ArithmeticCalculator({ calculator, initialParams }: ArithmeticCalculatorProps) {
  const [display, setDisplay] = useState(() => {
    // Pre-fill display from URL param if provided
    if (initialParams?.value && !isNaN(Number(initialParams.value))) {
      return initialParams.value;
    }
    return '0';
  });
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [history, setHistory] = useState<string>('');

  const displayRef = useRef(display);
  const previousValueRef = useRef(previousValue);
  const operationRef = useRef(operation);
  const waitingForOperandRef = useRef(waitingForOperand);

  displayRef.current = display;
  previousValueRef.current = previousValue;
  operationRef.current = operation;
  waitingForOperandRef.current = waitingForOperand;

  const calculate = useCallback((left: number, right: number, op: string): number => {
    switch (op) {
      case '+': return left + right;
      case '-': return left - right;
      case '×': return left * right;
      case '÷': return right !== 0 ? left / right : 0;
      default: return right;
    }
  }, []);

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
      setHistory(`${d} ${op}`);
    } else if (op_) {
      const currentValue = pv || 0;
      const newValue = calculate(currentValue, inputValue, op_);

      setPreviousValue(newValue);
      setDisplay(String(newValue));
      setHistory(`${newValue} ${op}`);
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
      
      setDisplay(String(newValue));
      setHistory(`${pv} ${op} ${inputValue} =`);
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  }, [calculate]);

  const clear = useCallback(() => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
    setHistory('');
  }, []);

  const toggleSign = useCallback(() => {
    const d = displayRef.current;
    const newValue = parseFloat(d) * -1;
    setDisplay(String(newValue));
  }, []);

  const inputPercent = useCallback(() => {
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

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key;
      
      if (key >= '0' && key <= '9') {
        inputNumber(key);
      } else if (key === '.') {
        inputDecimal();
      } else if (key === 'Enter' || key === '=') {
        performCalculation();
      } else if (key === 'Escape' || key === 'c' || key === 'C') {
        clear();
      } else if (key === '+') {
        inputOperation('+');
      } else if (key === '-') {
        inputOperation('-');
      } else if (key === '*') {
        inputOperation('×');
      } else if (key === '/') {
        inputOperation('÷');
      } else if (key === 'Backspace') {
        const d = displayRef.current;
        if (d.length > 1) {
          setDisplay(d.slice(0, -1));
        } else {
          setDisplay('0');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [inputNumber, inputDecimal, performCalculation, clear, inputOperation]);

  const buttons = [
    { label: 'C', onClick: clear, className: 'bg-secondary text-secondary-foreground hover:bg-secondary/80' },
    { label: '±', onClick: toggleSign, className: 'bg-secondary text-secondary-foreground hover:bg-secondary/80' },
    { label: '%', onClick: inputPercent, className: 'bg-secondary text-secondary-foreground hover:bg-secondary/80' },
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
    { label: '=', onClick: performCalculation, className: 'bg-primary text-primary-foreground hover:bg-primary/90' },
  ];

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <CalculatorIcon className="h-5 w-5 text-primary" />
          Калькулятор
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Display */}
        <div className="rounded-lg bg-muted p-4 text-right">
          {history && (
            <p className="text-sm text-muted-foreground mb-1">{history}</p>
          )}
          <p className="text-3xl font-mono font-bold tracking-wide text-foreground overflow-hidden">
            {display}
          </p>
        </div>

        {/* Keypad */}
        <div className="grid grid-cols-4 gap-2">
          {buttons.map((button, index) => (
            <Button
              key={index}
              onClick={button.onClick}
              className={`h-14 text-lg font-medium ${button.className} ${button.label === '0' ? 'col-span-2' : ''}`}
              variant={button.label.match(/[C±%]/) ? 'secondary' : button.label.match(/[÷×\-+=]/) ? 'default' : 'outline'}
            >
              {button.label}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
