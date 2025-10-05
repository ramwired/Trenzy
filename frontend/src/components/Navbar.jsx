
import { ShoppingCart, UserPlus, LogIn, LogOut, Lock } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";
import { useState, useEffect } from "react";


const Navbar = () => {
  const { user, logout } = useUserStore();
  const isAdmin = user?.role === "admin";
  const { cart } = useCartStore();

  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-gray-900/95 backdrop-blur-md border-b border-emerald-800">
      <div className="max-w-6xl mx-auto px-4 py-2 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">
         
          <Link to="/" className="flex items-center gap-3">
            <div className="w-9 h-9 bg-emerald-600 rounded flex items-center justify-center text-white font-bold">
              T
            </div>
            <span className="hidden sm:inline text-2xl font-semibold text-emerald-300">
              Trenzy
            </span>
          </Link>

         
          <nav className="hidden md:flex items-center gap-10">
            <Link
              to="/"
              className="text-gray-200 hover:text-emerald-300 transition text-lg"
            >
              Home
            </Link>

            {user && (
              <Link
                to="/cart"
                className="relative flex items-center gap-2 text-gray-200 hover:text-emerald-300 transition"
              >
                <ShoppingCart size={18} />
                <span className="hidden sm:inline text-lg">Cart</span>
                {cart.length > 0 && (
                  <span className="absolute -top-2 -left-3 bg-emerald-500 text-white rounded-full px-2 py-0.5 text-xs">
                    {cart.length}
                  </span>
                )}
              </Link>
            )}

            {isAdmin && (
              <Link
                to="/secret-dashboard"
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1 rounded-md text-sm font-medium transition"
              >
                <Lock size={14} />
                <span className="hidden sm:inline text-base">Dashboard</span>
              </Link>
            )}

            {user ? (
              <button
                onClick={logout}
                className="inline-flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded-md text-sm transition"
              >
                <LogOut size={16} />
                <span className="hidden sm:inline text-base">Log Out</span>
              </button>
            ) : (
              <>
                <Link
                  to="/signup"
                  className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-3 py-1 rounded-md text-sm transition"
                >
                  <UserPlus size={14} />
                  <span className="hidden sm:inline text-base">Sign Up</span>
                </Link>
                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded-md text-sm transition"
                >
                  <LogIn size={14} />
                  <span className="hidden sm:inline text-base">Login</span>
                </Link>
              </>
            )}
          </nav>

         
          <div className="md:hidden flex items-center">
            <button
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="p-2 rounded-md text-gray-200 hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            >
              {open ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      
      <div
        className={`md:hidden transform transition-all duration-300 origin-top ${
          open
            ? "max-h-screen opacity-100"
            : "max-h-0 opacity-0 pointer-events-none"
        }`}
        aria-hidden={!open}
      >
        <div className="bg-white shadow-md border-t border-emerald-100">
          <div className="px-4 py-4">
          
            <div className="flex items-center justify-between mb-3">
              <Link
                to="/"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3"
              >
                <div className="w-8 h-8 bg-emerald-600 rounded flex items-center justify-center text-white font-bold">
                  T
                </div>
                <span className="text-lg font-semibold text-gray-800">
                  Trenzy
                </span>
              </Link>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="p-2 rounded text-gray-600 hover:bg-gray-100 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <nav className="flex flex-col gap-2">
              <Link
                to="/"
                onClick={() => setOpen(false)}
                className="block py-3 px-3 rounded-md text-gray-800 hover:bg-emerald-50 hover:text-emerald-700 font-medium mt-3"
              >
                Home
              </Link>

              {user && (
                <Link
                  to="/cart"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between py-3 px-3 rounded-md text-gray-800 hover:bg-emerald-50 hover:text-emerald-700"
                >
                  <div className="flex items-center gap-3">
                    <ShoppingCart size={18} />
                    <span>Cart</span>
                  </div>
                  {cart.length > 0 && (
                    <span className="bg-emerald-600 text-white rounded-full px-2 py-0.5 text-xs">
                      {cart.length}
                    </span>
                  )}
                </Link>
              )}

              {isAdmin && (
                <Link
                  to="/secret-dashboard"
                  onClick={() => setOpen(false)}
                  className="py-3 px-3 rounded-md bg-emerald-600 text-white text-center font-medium"
                >
                  <div className="inline-flex items-center gap-2 justify-center">
                    <Lock size={16} />
                    <span>Dashboard</span>
                  </div>
                </Link>
              )}

              <div className="border-t my-2" />

              {user ? (
                <button
                  onClick={() => {
                    logout();
                    setOpen(false);
                  }}
                  className="w-full text-left py-3 px-3 rounded-md text-gray-800 hover:bg-emerald-50 hover:text-emerald-700 flex items-center gap-3"
                >
                  <LogOut size={16} />
                  <span>Log Out</span>
                </button>
              ) : (
                <>
                  <Link
                    to="/signup"
                    onClick={() => setOpen(false)}
                    className="block w-full py-3 px-3 rounded-md bg-emerald-600 text-white text-center font-medium"
                  >
                    <div className="inline-flex items-center justify-center gap-2">
                      <UserPlus size={16} />
                      <span>Sign Up</span>
                    </div>
                  </Link>

                  <Link
                    to="/login"
                    onClick={() => setOpen(false)}
                    className="block w-full py-3 px-3 rounded-md bg-gray-100 text-gray-800 text-center hover:bg-gray-200"
                  >
                    <div className="inline-flex items-center justify-center gap-2">
                      <LogIn size={16} />
                      <span>Login</span>
                    </div>
                  </Link>
                </>
              )}

              <div className="mt-3 text-sm text-gray-500">
                <p>Need help?</p>
                <a
                  href="mailto:support@example.com"
                  className="text-emerald-600"
                >
                  sreeram.codes@gmail.com
                </a>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
