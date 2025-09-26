import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, BookOpen, AlertCircle, Loader2, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/contexts/AuthContext';
// 💡 NEW: Import useCart and CartItem type
import { useCart } from './Cart'; 
import { CartItem } from './Cart'; // Assuming CartItem is exported from Cart.tsx

// Demo credentials
const DEMO_CREDENTIALS = {
// ... (DEMO_CREDENTIALS remains the same)
  email: 'demo@Orchid.com',
  password: 'demo123',
  user: {
    id: '1',
    name: 'Alex Johnson',
    email: 'demo@Orchid.com',
    avatar: '/api/placeholder/100/100'
  }
};

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login, isAuthenticated } = useAuth();
  // 💡 NEW: Get setIsCartOpen from useCart
  const { setIsCartOpen, addToCart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  // Get the intended destination from navigation state, default to dashboard
  const from = location.state?.from?.pathname || '/dashboard';
  // 💡 NEW: Extract cartItems from state
  const stateCartItems: CartItem[] | undefined = location.state?.cartItems;

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      // 💡 MODIFIED: Handle cart restoration and opening
      if (stateCartItems && stateCartItems.length > 0) {
        // Restore cart items and open cart dialog
        stateCartItems.forEach(item => addToCart(item)); 
        
        // Navigate to the 'from' page (e.g., /courses) before opening the cart
        navigate(from, { replace: true });
        
        // Open the cart dialog on the destination page
        setIsCartOpen(true); 
      } else {
        // Normal redirection (to dashboard or previous page)
        navigate(from, { replace: true });
      }
    }
  }, [isAuthenticated, navigate, from, stateCartItems, addToCart, setIsCartOpen]);


  // ... (fillDemoCredentials and handleSubmit remain the same)
  // Auto-fill demo credentials (for testing purposes)
  const fillDemoCredentials = () => {
    setEmail(DEMO_CREDENTIALS.email);
    setPassword(DEMO_CREDENTIALS.password);
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Basic validation
    if (!email || !password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    if (!email.includes('@')) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Check demo credentials
      if (email === DEMO_CREDENTIALS.email && password === DEMO_CREDENTIALS.password) {
        // Simulate successful login
        const success = await login(email, password, DEMO_CREDENTIALS.user);
        
        if (success) {
          // The useEffect hook handles the final navigation and cart opening
          // No need to navigate here
        } else {
          setError('Login failed. Please try again.');
        }
      } else {
        setError('Invalid email or password. Use demo credentials to test.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-hero p-4">
      {/* ... (Login UI remains the same) */}
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary">
              <BookOpen className="h-6 w-6 text-primary-foreground" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold font-display">Welcome Back</CardTitle>
          <p className="text-muted-foreground">Sign in to your Orchid account</p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Demo Credentials Info */}
          <Alert className="border-blue-200 bg-blue-50">
            <AlertCircle className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-800">
              <div className="space-y-2">
                <p className="font-medium">Demo Credentials:</p>
                <p className="text-sm">Email: demo@Orchid.com</p>
                <p className="text-sm">Password: demo123</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={fillDemoCredentials}
                  className="mt-2 text-blue-600 border-blue-300 hover:bg-blue-100"
                >
                  Auto-fill Demo Credentials
                </Button>
              </div>
            </AlertDescription>
          </Alert>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Email address" 
                type="email" 
                className="pl-10"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                autoComplete="email"
              />
            </div>
            
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Password" 
                type={showPassword ? "text" : "password"}
                className="pl-10 pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                disabled={loading}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>

            <Button 
              type="submit" 
              className="w-full btn-hero-primary"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>

          <div className="text-center space-y-2">
            <Link to="#" className="text-sm text-primary hover:underline">
              Forgot your password?
            </Link>
            <p className="text-sm text-muted-foreground">
              Don't have an account?{' '}
              <Link to="/register" className="text-primary hover:underline font-medium">
                Sign up here
              </Link>
            </p>
          </div>

          {/* Additional Info */}
          <div className="text-center pt-4 border-t">
            <p className="text-xs text-muted-foreground">
              Use the demo credentials above to test the My Learning page and other authenticated features.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;