'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Timer, Play, Pause, RotateCcw, Bell, Volume2, VolumeX } from 'lucide-react';
import { 
  timerPresets, 
  formatTime,
  formatTimeText,
  type TimerPreset,
} from '@/lib/timers';

interface TimerComponentProps {
  initialTimer?: TimerPreset;
  initialSeconds?: number;
}

export function TimerComponent({
  initialTimer,
  initialSeconds = 60,
}: TimerComponentProps) {
  const [selectedTimerId, setSelectedTimerId] = useState<string>(
    initialTimer?.id || '1-min'
  );
  const [totalSeconds, setTotalSeconds] = useState<number>(
    initialTimer?.seconds || initialSeconds
  );
  const [timeLeft, setTimeLeft] = useState<number>(
    initialTimer?.seconds || initialSeconds
  );
  const [isRunning, setIsRunning] = useState(false);
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  const [customHours, setCustomHours] = useState('0');
  const [customMinutes, setCustomMinutes] = useState('1');
  const [customSeconds, setCustomSeconds] = useState('0');

  const audioContextRef = useRef<AudioContext | null>(null);
  const startTimestampRef = useRef<number | null>(null);
  const remainingAtPauseRef = useRef<number>(0);
  const animFrameRef = useRef<number | null>(null);

  const getAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    }
    if (audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }
    return audioContextRef.current;
  }, []);

  const playBeep = useCallback(() => {
    try {
      const ctx = getAudioContext();
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.frequency.value = 800;
      oscillator.type = 'sine';

      gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);

      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.5);
    } catch {
      // AudioContext may still fail if no user gesture — silent fallback
    }
  }, [getAudioContext]);

  const playAlarm = useCallback(() => {
    if (!isSoundEnabled) return;
    for (let i = 0; i < 3; i++) {
      setTimeout(() => playBeep(), i * 600);
    }
  }, [isSoundEnabled, playBeep]);

  // Timer tick using Date.now() delta — no drift
  useEffect(() => {
    if (!isRunning) {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
        animFrameRef.current = null;
      }
      return;
    }

    startTimestampRef.current = Date.now();
    remainingAtPauseRef.current = timeLeft;

    const tick = () => {
      if (startTimestampRef.current === null) return;

      const elapsed = Math.floor((Date.now() - startTimestampRef.current) / 1000);
      const newTimeLeft = Math.max(0, remainingAtPauseRef.current - elapsed);

      setTimeLeft(newTimeLeft);

      if (newTimeLeft <= 0) {
        setIsRunning(false);
        playAlarm();
        startTimestampRef.current = null;
        return;
      }

      animFrameRef.current = requestAnimationFrame(tick);
    };

    animFrameRef.current = requestAnimationFrame(tick);

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
        animFrameRef.current = null;
      }
    };
  }, [isRunning, playAlarm]); // eslint-disable-line react-hooks/exhaustive-deps

  const toggleTimer = () => {
    if (isRunning) {
      // Pausing — snapshot remaining time
      remainingAtPauseRef.current = timeLeft;
    }
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(totalSeconds);
    startTimestampRef.current = null;
  };

  const handleTimerSelect = (timerId: string | null) => {
    if (!timerId) return;
    const timer = timerPresets.find((t) => t.id === timerId);
    if (timer) {
      setSelectedTimerId(timerId);
      setTotalSeconds(timer.seconds);
      setTimeLeft(timer.seconds);
      setIsRunning(false);
      startTimestampRef.current = null;
    }
  };

  const setCustomTime = () => {
    const hours = parseInt(customHours) || 0;
    const minutes = parseInt(customMinutes) || 0;
    const seconds = parseInt(customSeconds) || 0;
    const total = hours * 3600 + minutes * 60 + seconds;

    if (total > 0) {
      setSelectedTimerId('custom');
      setTotalSeconds(total);
      setTimeLeft(total);
      setIsRunning(false);
      startTimestampRef.current = null;
    }
  };

  const progress = totalSeconds > 0 ? ((totalSeconds - timeLeft) / totalSeconds) * 100 : 0;
  const timeDisplay = formatTime(timeLeft);

  const quickPresets = timerPresets.filter((t) => 
    ['5-min', '10-min', '15-min', '25-min', '30-min'].includes(t.id)
  );

  return (
    <div className="space-y-6">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Timer className="h-5 w-5 text-primary" />
            Таймер обратного отсчёта
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Готовые таймеры</Label>
            <Select value={selectedTimerId} onValueChange={handleTimerSelect}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="max-h-[300px]">
                <SelectItem value="custom">Произвольное время</SelectItem>
                {timerPresets.map((timer) => (
                  <SelectItem key={timer.id} value={timer.id}>
                    {timer.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2 flex-wrap">
            {quickPresets.map((timer) => (
              <Button
                key={timer.id}
                variant={selectedTimerId === timer.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleTimerSelect(timer.id)}
              >
                {timer.name}
              </Button>
            ))}
          </div>

          {selectedTimerId === 'custom' && (
            <div className="space-y-4 border rounded-lg p-4">
              <Label>Произвольное время</Label>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <Label className="text-xs">Часы</Label>
                  <Input
                    type="number"
                    min="0"
                    max="24"
                    value={customHours}
                    onChange={(e) => setCustomHours(e.target.value)}
                  />
                </div>
                <div>
                  <Label className="text-xs">Минуты</Label>
                  <Input
                    type="number"
                    min="0"
                    max="59"
                    value={customMinutes}
                    onChange={(e) => setCustomMinutes(e.target.value)}
                  />
                </div>
                <div>
                  <Label className="text-xs">Секунды</Label>
                  <Input
                    type="number"
                    min="0"
                    max="59"
                    value={customSeconds}
                    onChange={(e) => setCustomSeconds(e.target.value)}
                  />
                </div>
              </div>
              <Button onClick={setCustomTime} className="w-full">
                Установить время
              </Button>
            </div>
          )}

          <div className="text-center py-8">
            <div className="w-full bg-muted rounded-full h-3 mb-6 overflow-hidden">
              <div 
                className="bg-primary h-full transition-all duration-1000"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className={`text-6xl md:text-7xl font-mono font-bold ${
              timeLeft <= 10 && timeLeft > 0 ? 'text-red-500 animate-pulse' : 'text-primary'
            }`}>
              {timeDisplay}
            </div>

            <p className="text-muted-foreground mt-2">
              {formatTimeText(timeLeft)}
            </p>
          </div>

          <div className="flex justify-center gap-3">
            <Button
              size="lg"
              onClick={toggleTimer}
              className="px-8"
            >
              {isRunning ? (
                <><Pause className="h-5 w-5 mr-2" /> Пауза</>
              ) : (
                <><Play className="h-5 w-5 mr-2" /> Старт</>
              )}
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={resetTimer}
            >
              <RotateCcw className="h-5 w-5 mr-2" /> Сброс
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => setIsSoundEnabled(!isSoundEnabled)}
            >
              {isSoundEnabled ? (
                <Volume2 className="h-5 w-5" />
              ) : (
                <VolumeX className="h-5 w-5" />
              )}
            </Button>
          </div>

          {timeLeft === 0 && (
            <div className="text-center p-4 bg-red-50 border border-red-200 rounded-lg dark:bg-red-950/20 dark:border-red-800">
              <p className="text-red-600 dark:text-red-400 font-medium flex items-center justify-center gap-2">
                <Bell className="h-5 w-5" />
                Время вышло!
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Как использовать</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Выберите готовый таймер из списка или установите произвольное время</li>
            <li>• Нажмите «Старт» для начала обратного отсчёта</li>
            <li>• «Пауза» остановит таймер, «Сброс» вернёт к начальному значению</li>
            <li>• По окончании прозвучит звуковой сигнал (если включён звук)</li>
            <li>• Таймер работает даже при свёрнутой вкладке браузера</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
