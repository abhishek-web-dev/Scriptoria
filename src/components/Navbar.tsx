import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Menu, X, LogIn, UserPlus } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, isAdmin, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAuthAction = () => {
    if (user) {
      if (isAdmin) {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } else {
      navigate('/auth');
    }
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled
        ? 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl shadow-lg border-b border-slate-200/50 dark:border-slate-700/50'
        : 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-md'
      }`}>
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">

          <Link to="/" className="flex items-center">
            <img
              src="/logo.png"
              alt="Scriptoria Publication House"
              className="h-20 md:h-20 w-80 object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">

            <Link
              to="/"
              className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 transition-all duration-300 relative group"
            >
              Home
            </Link>

            <a
              href="#about"
              className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 transition-all duration-300 relative group"
            >
              About
            </a>

            <a
              href="#services"
              className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 transition-all duration-300 relative group"
            >
              Services
            </a>

            <a
              href="#team"
              className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 transition-all duration-300 relative group"
            >
              Team
            </a>

            <a
              href="#faq"
              className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 transition-all duration-300 relative group"
            >
              FAQ
            </a>

            <a
              href="#contact"
              className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 transition-all duration-300 relative group"
            >
              Contact
            </a>


            {/* NEW MENU */}
            <Link
              to="/magazine"
              className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 transition-all duration-300 relative group"
            >
              Universal E-Magazine
            </Link>

          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            {user ? (
              <>
                <Button onClick={handleAuthAction} variant="outline">
                  {isAdmin ? 'Admin Panel' : 'Dashboard'}
                </Button>
                <Button onClick={signOut}>
                  Sign Out
                </Button>
              </>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button>
                    <LogIn className="h-4 w-4 mr-2" />
                    Login
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-48">

                  <DropdownMenuItem onClick={() => navigate('/auth?tab=signin')}>
                    <LogIn className="h-4 w-4 mr-2" />
                    Sign In
                  </DropdownMenuItem>

                  <DropdownMenuItem onClick={() => navigate('/auth?tab=signup')}>
                    <UserPlus className="h-4 w-4 mr-2" />
                    Sign Up
                  </DropdownMenuItem>

                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

        </div>
      </div>
    </nav>
  );
};