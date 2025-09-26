import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Context Imports
import { AuthProvider } from "./contexts/AuthContext";
// 💡 Import Cart and CartProvider
import { Cart, CartProvider } from "./pages/Cart"; 

import Home from "./pages/Home";
import Courses from "./pages/Courses";
import About from "./pages/About";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import MyLearning from "./pages/MyLearning";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <CartProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            {/* 💡 MODIFIED: Render the Cart component here so it is ALWAYS mounted */}
            <Cart navigateTo={(path: string) => window.location.pathname = path} /> 
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/about" element={<About />} />
              <Route path="/blog" element={<Blog />} />
              {/* 💡 REMOVED: The dedicated /Cart route is no longer needed */}
              {/* <Route
                path="/Cart"
                element={
                  <Cart navigateTo={(path: string) => window.location.pathname = path} />
                }
              /> */}
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route 
                path="/my-learning" 
                element={
                  <ProtectedRoute>
                    <MyLearning />
                  </ProtectedRoute>
                } 
              />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </CartProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;