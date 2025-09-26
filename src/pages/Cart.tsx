import React, { useState, useContext, createContext, ReactNode } from 'react';
import { ShoppingCart, Plus, Minus, X, CreditCard, Check, LogIn } from 'lucide-react'; // 💡 NEW: Import LogIn icon
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
// 💡 NEW: Import useAuth hook
import { useAuth } from '../contexts/AuthContext';
// 💡 NEW: Import useNavigate to handle stateful navigation
import { useNavigate } from 'react-router-dom';


// --- Types (Can be moved to a central types file, e.g., types.ts)
// ... (Course, CartItem, PurchasedCourse, CartContextType interfaces remain the same)
interface Course {
  id: number;
  title: string;
  category?: string;
  level: string;
  duration: string;
  questions: number;
  participants: number;
  rating: number;
  price: string;
  tags?: string[];
  description?: string;
  thumbnail?: string;
}

interface CartItem extends Course {
  quantity: number;
}

interface PurchasedCourse extends CartItem {
  purchaseDate: string;
  progress: number;
  status: 'not-started' | 'in-progress' | 'completed';
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (course: Course) => void;
  removeFromCart: (courseId: number) => void;
  updateQuantity: (courseId: number, quantity: number) => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  purchasedCourses: PurchasedCourse[];
  completePurchase: (items: CartItem[]) => void;
}

// --- Context & Hook
const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

// --- Provider
interface CartProviderProps {
    children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
// ... (CartProvider content remains the same)
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [purchasedCourses, setPurchasedCourses] = useState<PurchasedCourse[]>([]);

  const addToCart = (course: Course) => {
    setCartItems(prev => {
      if (prev.find(item => item.id === course.id)) {
        return prev; // Item already in cart
      }
      return [...prev, { ...course, quantity: 1 }];
    });
  };

  const removeFromCart = (courseId: number) => {
    setCartItems(prev => prev.filter(item => item.id !== courseId));
  };

  const updateQuantity = (courseId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(courseId);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.id === courseId ? { ...item, quantity } : item
      )
    );
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const price = item.price === 'Free' ? 0 : parseFloat(item.price.replace('$', ''));
      return total + (price * item.quantity);
    }, 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const completePurchase = (items: CartItem[]) => {
    const newPurchases: PurchasedCourse[] = items.map(item => ({
      ...item,
      purchaseDate: new Date().toISOString(),
      progress: 0,
      status: 'not-started',
    }));
    setPurchasedCourses(prev => [...prev, ...newPurchases]);
  };

  const value: CartContextType = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    getTotalPrice,
    getTotalItems,
    clearCart,
    isCartOpen,
    setIsCartOpen,
    purchasedCourses,
    completePurchase
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};


// --- Cart Component (The Dialog UI)
export const Cart = ({ navigateTo }: { navigateTo: (path: string) => void }) => {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice, clearCart, isCartOpen, setIsCartOpen, completePurchase } = useCart();
  // 💡 NEW: Use the useAuth hook to check authentication status
  const { isAuthenticated, loading } = useAuth(); 
  
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isPurchased, setIsPurchased] = useState(false);
  // 💡 NEW: Use useNavigate from react-router-dom for state passing
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!isAuthenticated) return; 

    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setIsPurchased(true);
      completePurchase(cartItems); // Add items to purchased list
      setTimeout(() => {
        setIsPurchased(false);
        clearCart();
        setIsCartOpen(false);
        navigateTo('/my-learning'); // Navigate after purchase
      }, 2000);
    }, 2000);
  };

  // 💡 NEW: Function to redirect to login with cart state
  const redirectToLoginWithCart = () => {
    setIsCartOpen(false); // Close cart dialog before navigating
    navigate('/login', { 
      state: { 
        // Pass the original destination path (Courses page, etc.)
        from: { pathname: window.location.pathname }, 
        // Pass the current cart items so they can be restored after login
        cartItems: cartItems 
      } 
    });
  };

  if (isPurchased) {
    return (
      <Dialog open={isCartOpen} onOpenChange={setIsCartOpen}>
// ... (Purchase successful dialog remains the same)
        <DialogContent className="max-w-md">
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-green-600 mb-2">Purchase Successful!</h3>
            <p className="text-muted-foreground mb-4">Your courses are now in "My Learning".</p>
            <Button onClick={() => {
              setIsPurchased(false);
              clearCart();
              setIsCartOpen(false);
              navigateTo('/my-learning');
            }}>
              Go to My Learning
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isCartOpen} onOpenChange={setIsCartOpen}>
      <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            Shopping Cart ({cartItems.length})
          </DialogTitle>
        </DialogHeader>

        {cartItems.length === 0 ? (
// ... (Empty cart state remains the same)
          <div className="text-center py-8">
            <ShoppingCart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Your cart is empty</p>
            <Button onClick={() => { setIsCartOpen(false); navigateTo('/courses'); }} className="mt-4">
              Browse Courses
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item) => (
// ... (Individual cart item display remains the same)
              <div key={item.id} className="flex items-center gap-4 p-4 border rounded-lg">
                <div className="flex-1">
                  <h4 className="font-semibold">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.level} • {item.duration}</p>
                  <p className="font-bold text-primary">
                    {item.price === 'Free' ? 'Free' : `$${(parseFloat(item.price.replace('$', '')) * item.quantity).toFixed(2)}`}
                  </p>
                </div>
                
                <div className="flex items-center gap-2">
                    <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                    >
                        <Minus className="w-4 h-4" />
                    </Button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                        <Plus className="w-4 h-4" />
                    </Button>
                </div>

                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}

            <div className="border-t pt-4">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-bold">Total: ${getTotalPrice().toFixed(2)}</span>
                <Button variant="outline" size="sm" onClick={clearCart}>Clear Cart</Button>
              </div>
              
              {/* 💡 NEW: Conditional rendering/disabling based on authentication */}
              {!isAuthenticated && cartItems.length > 0 && !loading && (
                <div className="mb-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 rounded-lg">
                    <p className="text-sm font-medium text-yellow-800 dark:text-yellow-300">
                        Please login to complete your purchase.
                    </p>
                </div>
              )}

              <Button 
                className="w-full" 
                // 💡 MODIFIED: Use the new redirectToLoginWithCart function
                onClick={isAuthenticated ? handleCheckout : redirectToLoginWithCart} 
                disabled={isCheckingOut || cartItems.length === 0 || loading}
              >
                {/* 💡 LOGIC: Display "Login to Checkout" if not authenticated, otherwise "Checkout" */}
                {isCheckingOut ? (
                  <div className="flex items-center gap-2 justify-center">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Processing...
                  </div>
                ) : !isAuthenticated && cartItems.length > 0 ? (
                    <><LogIn className="w-4 h-4 mr-2" /> Login to Checkout</>
                ) : (
                  <><CreditCard className="w-4 h-4 mr-2" /> Checkout</>
                )}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};