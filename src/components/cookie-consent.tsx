'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Cookie, X } from 'lucide-react';

const CONSENT_KEY = 'calcus-cookie-consent';

export function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(CONSENT_KEY);
    if (!consent) {
      setShow(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(CONSENT_KEY, 'accepted');
    setShow(false);
  };

  const decline = () => {
    localStorage.setItem(CONSENT_KEY, 'declined');
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-in slide-in-from-bottom-4 duration-300">
      <Card className="mx-auto max-w-3xl border shadow-lg">
        <CardContent className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4">
          <Cookie className="h-6 w-6 text-primary shrink-0 mt-0.5 sm:mt-0" />
          <div className="flex-1 text-sm">
            <p className="font-medium mb-1">Мы используем файлы cookie</p>
            <p className="text-muted-foreground">
              Для улучшения работы сайта и аналитики мы используем Яндекс.Метрику и файлы cookie.
              Нажимая «Принять», вы соглашаетесь с обработкой данных согласно 152-ФЗ «О персональных данных».
            </p>
          </div>
          <div className="flex gap-2 shrink-0">
            <Button size="sm" variant="outline" onClick={decline}>
              Отклонить
            </Button>
            <Button size="sm" onClick={accept}>
              Принять
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
