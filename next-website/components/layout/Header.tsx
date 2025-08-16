"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About Us', href: '/about' },
  { name: 'Activities', href: '/activities' },
  { name: 'Projects', href: '/projects' },
  { name: 'Media', href: '/media' },
  { name: 'Contact', href: '/contact' },
];

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="ngo-container flex items-center justify-between h-16 lg:h-20">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/assets/img/logos/logo.png"
              alt="SARVAARTH & SEVAARTH FOUNDATION"
              width={120}
              height={48}
              className="h-12 w-auto"
              priority
            />
            <div className="hidden sm:block">
              <div className="text-lg font-bold text-ngo-blue">
                SARVAARTH & SEVAARTH
              </div>
              <div className="text-xs text-gray-600">FOUNDATION</div>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-gray-700 hover:text-ngo-blue font-medium transition-colors duration-200"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="hidden lg:flex items-center space-x-4">
          <Link href="/volunteer">
            <Button variant="outline" className="border-ngo-blue text-ngo-blue hover:bg-ngo-blue hover:text-white">
              Volunteer
            </Button>
          </Link>
          <Link href="/membership">
            <Button variant="outline" className="border-ngo-orange text-ngo-orange hover:bg-ngo-orange hover:text-white">
              Join Us
            </Button>
          </Link>
          <Link href="/donate">
            <Button className="bg-ngo-blue hover:bg-ngo-blue-light">
              Donate Now
            </Button>
          </Link>
        </div>

        {/* Mobile menu button */}
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Open main menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <div className="flex flex-col space-y-4 mt-6">
              {/* Mobile Logo */}
              <div className="flex items-center space-x-2 mb-6">
                <Image
                  src="/assets/img/logos/logo.png"
                  alt="SARVAARTH & SEVAARTH FOUNDATION"
                  width={100}
                  height={40}
                  className="h-10 w-auto"
                />
                <div>
                  <div className="text-lg font-bold text-ngo-blue">
                    SARVAARTH & SEVAARTH
                  </div>
                  <div className="text-xs text-gray-600">FOUNDATION</div>
                </div>
              </div>

              {/* Mobile Navigation */}
              <div className="flex flex-col space-y-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-gray-700 hover:text-ngo-blue font-medium py-2 text-lg transition-colors duration-200"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              {/* Mobile CTA Buttons */}
              <div className="flex flex-col space-y-3 pt-6 border-t">
                <Link href="/volunteer" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full border-ngo-blue text-ngo-blue hover:bg-ngo-blue hover:text-white">
                    Volunteer
                  </Button>
                </Link>
                <Link href="/membership" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full border-ngo-orange text-ngo-orange hover:bg-ngo-orange hover:text-white">
                    Join Us
                  </Button>
                </Link>
                <Link href="/donate" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full bg-ngo-blue hover:bg-ngo-blue-light">
                    Donate Now
                  </Button>
                </Link>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
};

export default Header;
