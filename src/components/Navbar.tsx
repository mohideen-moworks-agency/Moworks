import React from 'react';
import { useAuth } from '../contexts/AuthContext';

function Navbar() {
  const { user, signIn, signOut, error } = useAuth();

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <img src="/moworks-logo.svg" alt="Moworks Logo" className="h-8 w-auto" />
            <span className="text-xl font-bold text-gray-900">
              Moworks.AI
            </span>
          </div>
          
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="text-sm">
                  <p className="text-gray-900 font-medium">{user.email}</p>
                  <p className="text-gray-500 text-xs">Pro Account</p>
                </div>
                <button
                  onClick={signOut}
                  className="px-4 py-2 text-sm font-medium text-white 
                           bg-[#FF8360] hover:bg-[#ff6b40] transition-colors 
                           duration-200 rounded-lg"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={signIn}
                className="px-4 py-2 text-sm font-medium text-white 
                         bg-[#FF8360] hover:bg-[#ff6b40] transition-colors 
                         duration-200 rounded-lg"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
        {error && !error.includes('auth/unauthorized-domain') && (
          <div className="bg-red-50 text-red-700 px-4 py-2 text-sm rounded-lg mb-4">
            {error}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;