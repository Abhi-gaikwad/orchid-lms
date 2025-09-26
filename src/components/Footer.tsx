import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-space-navy text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-space-purple">
                <BookOpen className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold font-display">Orchid</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Transforming education through adaptive learning and comprehensive assessments. 
              Empowering students to achieve their full potential.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-space-purple transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-space-purple transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-space-purple transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-space-purple transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/courses" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Courses & Exams
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Blog & Resources
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Platform */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Platform</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/login" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Student Login
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Dashboard
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Take Practice Test
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Track Progress
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Help Center
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-space-purple" />
                <span className="text-gray-300 text-sm">support@Orchid.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-space-purple" />
                <span className="text-gray-300 text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-space-purple" />
                <span className="text-gray-300 text-sm">123 Education St, Learning City</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © 2024 Orchid. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;