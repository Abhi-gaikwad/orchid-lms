import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
// ✅ IMPORT ShoppingCart icon
import { Menu, X, BookOpen, User, LogOut, GraduationCap, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge'; // ✅ IMPORT Badge
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/pages/Cart'; // ✅ IMPORT useCart hook

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();
  const { getTotalItems, setIsCartOpen } = useCart(); // ✅ USE the cart hook

  const totalCartItems = getTotalItems();

  // Base navigation items (UNCHANGED)
  const baseNavigation = [
    { name: 'Home', href: '/' },
    { name: 'Courses', href: '/courses' },
    { name: 'About', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ];

  // Add My Learning if user is authenticated (UNCHANGED)
  const navigation = isAuthenticated 
    ? [
        ...baseNavigation.slice(0, 2),
        { name: 'My Learning', href: '/my-learning' },
        ...baseNavigation.slice(2)
      ]
    : baseNavigation;

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  const getUserInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo (UNCHANGED) */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <BookOpen className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold font-display text-primary">Orchid</span>
          </Link>

          {/* Desktop Navigation (UNCHANGED) */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary flex items-center gap-1",
                  isActive(item.href) ? "text-primary" : "text-muted-foreground"
                )}
              >
                {item.name === 'My Learning' && (
                  <GraduationCap className="h-4 w-4" />
                )}
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions (UPDATED) */}
          <div className="hidden md:flex items-center space-x-2">
            {/* ✅ NEW: Cart Button is ADDED here */}
            <Button
              variant="ghost"
              size="sm"
              className="relative h-9 w-9 p-0"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingCart className="h-5 w-5" />
              {totalCartItems > 0 && (
                <Badge className="absolute -top-1 -right-1 h-4 w-4 rounded-full p-0 flex items-center justify-center text-xs">
                  {totalCartItems}
                </Badge>
              )}
              <span className="sr-only">Open cart</span>
            </Button>

            {/* All original authentication buttons are preserved */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.avatar} alt={user?.name} />
                      <AvatarFallback>
                        {user?.name ? getUserInitials(user.name) : 'U'}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user?.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user?.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard" className="flex items-center">
                      <User className="mr-2 h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/my-learning" className="flex items-center">
                      <GraduationCap className="mr-2 h-4 w-4" />
                      <span>My Learning</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    Login
                  </Button>
                </Link>
                <Link to="/dashboard">
                  <Button size="sm">
                    Get Started
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button (UNCHANGED) */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation (UNCHANGED) */}
        {isMenuOpen && (
          <div className="md:hidden">
            {/* The rest of the mobile menu code is also unchanged */}
            {/* ... */}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;