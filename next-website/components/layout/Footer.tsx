import Link from 'next/link';
import Image from 'next/image';
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="ngo-container">
        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Organization Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Image
                src="/assets/img/logos/logo.png"
                alt="SARVAARTH & SEVAARTH FOUNDATION"
                width={100}
                height={40}
                className="h-10 w-auto"
              />
              <div>
                <div className="text-lg font-bold">SARVAARTH & SEVAARTH</div>
                <div className="text-sm text-gray-400">FOUNDATION</div>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed">
              READY TO HELP ALWAYS IN ALL WAYS
              Founded on October 4, 2023, with a mission to empower lives through healthcare and education.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-ngo-blue transition-colors">
                <Facebook className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-ngo-blue transition-colors">
                <Twitter className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-ngo-blue transition-colors">
                <Instagram className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-ngo-blue transition-colors">
                <Linkedin className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/activities" className="text-gray-400 hover:text-white transition-colors">
                  Our Activities
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-gray-400 hover:text-white transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/media" className="text-gray-400 hover:text-white transition-colors">
                  Media Gallery
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Get Involved */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Get Involved</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/donate" className="text-gray-400 hover:text-ngo-orange transition-colors">
                  Make a Donation
                </Link>
              </li>
              <li>
                <Link href="/volunteer" className="text-gray-400 hover:text-ngo-orange transition-colors">
                  Become a Volunteer
                </Link>
              </li>
              <li>
                <Link href="/membership" className="text-gray-400 hover:text-ngo-orange transition-colors">
                  Join as Member
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-ngo-orange transition-colors">
                  Partner with Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-ngo-blue mt-0.5" />
                <div className="text-gray-400">
                  <div>SARVAARTH & SEVAARTH FOUNDATION</div>
                  <div>RZF-756/48 Rajnagar-2, New Delhi-110077</div>
                  <div>India</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-ngo-blue" />
                <span className="text-gray-400">+91 9313702100</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-ngo-blue" />
                <span className="text-gray-400">info@sarvaarth.in</span>
              </div>
            </div>
          </div>
        </div>

        {/* Leadership Team */}
        <div className="border-t border-gray-800 py-8">
          <h3 className="text-lg font-semibold mb-4 text-center">Our Leadership</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <h4 className="font-medium text-ngo-blue">Ms. Meneka Singh</h4>
              <p className="text-gray-400 text-sm">President</p>
            </div>
            <div>
              <h4 className="font-medium text-ngo-blue">Ms. Kusum Rathore</h4>
              <p className="text-gray-400 text-sm">Secretary (School Principal)</p>
            </div>
            <div>
              <h4 className="font-medium text-ngo-blue">Mr. Manoj Singh</h4>
              <p className="text-gray-400 text-sm">Vice President (Sai Eye Care Hospital, Lucknow)</p>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2023 SARVAARTH & SEVAARTH FOUNDATION. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Terms of Service
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Transparency
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
