import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, BookOpen, LogOut, GraduationCap, ShoppingCart, LayoutDashboard, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
import { useCart } from '@/pages/Cart';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();
  const { getTotalItems, setIsCartOpen } = useCart();

  const totalCartItems = getTotalItems();

  const handleLogout = () => {
    logout();
  };

  const baseNavigation = [
    { name: 'Home', href: '/' },
    { name: 'Courses', href: '/courses' },
    { name: 'About', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ];

  const currentPath = location.pathname;

  // Function to render the user avatar/login button for the mobile header (remains the same)
  const renderMobileUserAction = () => {
    if (isAuthenticated) {
      // User is logged in: show the Avatar dropdown
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-9 w-9 rounded-full p-0">
              <Avatar className="h-9 w-9">
                <AvatarImage src={user?.avatar} alt={user?.name || 'User'} />
                <AvatarFallback className="bg-primary/10 text-primary">{user?.name?.[0] || 'U'}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          {/* Dropdown content (remains the same: Dashboard, My Learning, Logout) */}
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
            <Link to="/dashboard">
              <DropdownMenuItem onClick={() => setIsMenuOpen(false)}>
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  <span>Dashboard</span>
              </DropdownMenuItem>
            </Link>
            <Link to="/my-learning">
              <DropdownMenuItem onClick={() => setIsMenuOpen(false)}>
                  <GraduationCap className="mr-2 h-4 w-4" />
                  <span>My Learning</span>
              </DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    } else {
      // User is not logged in: show a visible Login icon
      return (
        <Link to="/login">
          <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
            <User className="h-5 w-5" />
          </Button>
        </Link>
      );
    }
  };


  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          
          {/* Logo and Branding (Remains the same) */}
          <Link to="/" className="flex items-center space-x-2 text-lg font-bold">
            <BookOpen className="h-6 w-6 text-primary" />
            <span className="font-display">Orchid</span>
          </Link>

          {/* Desktop Navigation - 💡 MODIFIED HERE */}
          <nav className="hidden md:flex items-center space-x-1">
            {baseNavigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  'px-3 py-2 text-sm font-medium transition-colors hover:text-primary',
                  currentPath === item.href ? 'text-primary font-bold' : 'text-foreground'
                )}
              >
                {item.name}
              </Link>
            ))}
            
            {/* 💡 NEW: My Learning in Desktop Menu */}
            {isAuthenticated && (
              <Link
                to="/my-learning"
                className={cn(
                  'px-3 py-2 text-sm font-medium transition-colors hover:text-primary border-l ml-3 pl-4',
                  currentPath === '/my-learning' ? 'text-primary font-bold' : 'text-foreground'
                )}
              >
                My Learning
              </Link>
            )}

          </nav>

          {/* Desktop Right Side Actions (Remains the same) */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Cart Button (Remains the same) */}
            <Button
              variant="ghost"
              size="sm"
              className="relative"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingCart className="h-5 w-5" />
              {totalCartItems > 0 && (
                <Badge
                  variant="default"
                  className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs"
                >
                  {totalCartItems}
                </Badge>
              )}
            </Button>

            {/* Desktop User/Login Logic (Remains the same) */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={user?.avatar} alt={user?.name || 'User'} />
                      <AvatarFallback className="bg-primary/10 text-primary">{user?.name?.[0] || 'U'}</AvatarFallback>
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
                    <Link to="/dashboard">
                      <DropdownMenuItem>
                          <LayoutDashboard className="mr-2 h-4 w-4" />
                          <span>Dashboard</span>
                      </DropdownMenuItem>
                    </Link>
                    <Link to="/my-learning">
                      <DropdownMenuItem>
                          <GraduationCap className="mr-2 h-4 w-4" />
                          <span>My Learning</span>
                      </DropdownMenuItem>
                    </Link>
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

          {/* Mobile menu and Action Buttons (Remains the same) */}
          <div className="md:hidden flex items-center space-x-2">
            
            {/* 1. Mobile Cart Button */}
            <Button
              variant="ghost"
              size="sm"
              className="relative"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingCart className="h-5 w-5" />
              {totalCartItems > 0 && (
                <Badge
                  variant="default"
                  className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs"
                >
                  {totalCartItems}
                </Badge>
              )}
            </Button>

            {/* 2. Mobile User/Login Icon (Always visible) */}
            {renderMobileUserAction()}

            {/* 3. Mobile Menu Button (Hamburger) */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation (Collapsible Menu Content) - 💡 FIX APPLIED HERE */}
        {isMenuOpen && (
          <div className={cn(
            "md:hidden absolute top-16 left-0 right-0 z-50 bg-background shadow-lg border-t",
            "transition-transform duration-300 ease-in-out"
          )}>
            <nav className="flex flex-col p-4 space-y-2">
              {/* Base Links */}
              {baseNavigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={cn(
                    'block px-3 py-2 text-base font-medium transition-colors hover:bg-accent hover:text-primary rounded-md',
                    currentPath === item.href ? 'bg-accent text-primary font-bold' : 'text-foreground'
                  )}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* 💡 My Learning link shown on mobile if authenticated */}
              {isAuthenticated && (
                <Link 
                  to="/my-learning" 
                  onClick={() => setIsMenuOpen(false)} 
                  className="flex items-center px-3 py-2 text-base font-medium hover:bg-accent rounded-md border-t pt-2 mt-2 text-primary"
                >
                  <GraduationCap className="mr-2 h-4 w-4" />
                  My Learning
                </Link>
              )}
              
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;