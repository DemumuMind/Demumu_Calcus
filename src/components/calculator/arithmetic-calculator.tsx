'use client';

import { useState, useCallback, useEffect } from 'react';
import { Calculator as CalcType } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calculator as CalculatorIcon, Delete, Equal } from 'lucide-react';

interface ArithmeticCalculatorProps {
  calculator: CalcType;
}

export function ArithmeticCalculator({ calculator }: ArithmeticCalculatorProps) {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [history, setHistory] = useState<string>('');

  const calculate = useCallback((left: number, right: number, op: string): number => {
    switch (op) {
      case '+': return left + right;
      case '-': return left - right;
      case '×': return left * right;
      case '÷': return right !== 0 ? left / right : 0;
      default: return right;
    }
  }, []);

  const inputNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(num);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const inputOperation = (op: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
      setHistory(`${display} ${op}`);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setPreviousValue(newValue);
      setDisplay(String(newValue));
      setHistory(`${newValue} ${op}`);
    }

    setWaitingForOperand(true);
    setOperation(op);
  };

  const performCalculation = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      
      setDisplay(String(newValue));
      setHistory(`${previousValue} ${operation} ${inputValue} =`);
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
    setHistory('');
  };

  const toggleSign = () => {
    const newValue = parseFloat(display) * -1;
    setDisplay(String(newValue));
  };

  const inputPercent = () => {
    const currentValue = parseFloat(display);
    if (currentValue === 0) return;
    
    const newValue = currentValue / 100;
    setDisplay(String(newValue));
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  // Keyboard support
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
        if (display.length > 1) {
          setDisplay(display.slice(0, -1));
        } else {
          setDisplay('0');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [display, previousValue, operation, waitingForOperand]);

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
