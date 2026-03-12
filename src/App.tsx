import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";

import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import UserDashboard from "./pages/UserDashboard";
import Admin from "./pages/Admin";
import AdminPanel from "./pages/AdminPanel";
import NotFound from "./pages/NotFound";

import MagazineApp from "./magazine/MagazineApp";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />

      <BrowserRouter>
        <AuthProvider>
          <Routes>

            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/dashboard" element={<UserDashboard />} />
            <Route path="/user-dashboard" element={<UserDashboard />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin-panel" element={<AdminPanel />} />

            {/* Magazine Project */}
            <Route path="/magazine/*" element={<MagazineApp />} />

            <Route path="*" element={<NotFound />} />

          </Routes>
        </AuthProvider>
      </BrowserRouter>

    </TooltipProvider>
  </QueryClientProvider>
);

export default App;