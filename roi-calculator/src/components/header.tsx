'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Calculator, User, LogOut, Settings, Menu, X } from 'lucide-react';
// import { useAuth } from '@/contexts/auth-context';

export function Header() {
  // const { user, logout, isLoading } = useAuth(); // Temporarily disabled
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      // await logout(); // Temporarily disabled
      window.location.href = '/';
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Calculator className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-foreground">
              ROI Calculator Pro
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              href="/#calculator" 
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Calculator
            </Link>
            <Link 
              href="/#features" 
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Features
            </Link>
          </nav>

          {/* Desktop Authentication - Temporarily disabled */}
          <div className="hidden md:flex items-center space-x-4">
            {/* {isLoading ? (
              <div className="h-9 w-20 bg-slate-200 animate-pulse rounded"></div>
            ) : user ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {user.name || user.email}
                  </span>
                </div>
                
                {user.role === 'ADMIN' && (
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/admin">
                      <Settings className="h-4 w-4 mr-1" />
                      Admin
                    </Link>
                  </Button>
                )}
                
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  Logout
                </Button>
              </div>
            ) : ( */}
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" asChild>
                  <Link href="/auth">Login</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link href="/auth">Sign Up</Link>
                </Button>
              </div>
            {/* )} */}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-slate-200">
            <nav className="flex flex-col space-y-4">
              <Link 
                href="/#calculator" 
                className="text-muted-foreground hover:text-foreground transition-colors px-2 py-1"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Calculator
              </Link>
              <Link 
                href="/#features" 
                className="text-muted-foreground hover:text-foreground transition-colors px-2 py-1"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Features
              </Link>
              
              {/* Mobile Authentication - Temporarily disabled */}
              <div className="pt-4 border-t border-slate-200">
                {/* {isLoading ? (
                  <div className="h-9 w-20 bg-slate-200 animate-pulse rounded"></div>
                ) : user ? (
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 px-2 py-1">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {user.name || user.email}
                      </span>
                    </div>
                    
                    {user.role === 'ADMIN' && (
                      <Button variant="outline" size="sm" className="w-full" asChild>
                        <Link href="/admin" onClick={() => setIsMobileMenuOpen(false)}>
                          <Settings className="h-4 w-4 mr-2" />
                          Admin Dashboard
                        </Link>
                      </Button>
                    )}
                    
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="w-full"
                      onClick={() => {
                        handleLogout();
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </Button>
                  </div>
                ) : ( */}
                  <div className="space-y-2">
                    <Button variant="outline" size="sm" className="w-full" asChild>
                      <Link href="/auth" onClick={() => setIsMobileMenuOpen(false)}>
                        Login
                      </Link>
                    </Button>
                    <Button size="sm" className="w-full" asChild>
                      <Link href="/auth" onClick={() => setIsMobileMenuOpen(false)}>
                        Sign Up
                      </Link>
                    </Button>
                  </div>
                {/* )} */}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}