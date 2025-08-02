'use client';

import React, { useState } from 'react';
import { AuthForm } from '@/components/auth/auth-form';

export default function AuthPage() {
  const [mode, setMode] = useState<'login' | 'signup'>('login');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            ROI Calculator Pro
          </h1>
          <p className="text-muted-foreground">
            Professional ROI calculations for your business
          </p>
        </div>
        
        <AuthForm 
          mode={mode} 
          onModeChange={setMode}
          onSuccess={(user) => {
            console.log('Authentication successful:', user);
          }}
        />
      </div>
    </div>
  );
}