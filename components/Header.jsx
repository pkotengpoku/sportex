import Image from 'next/image'
import React from 'react'
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import SubHeader from './SubHeader';
import { useState } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import SearchTab from './SearchTab';

const Header = () => {
  const { data: session } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '/';

  const handleSignInWithProvider = (providerId) => {
    setIsModalOpen(false); // Close modal before redirecting
    signIn(providerId, { callbackUrl: currentUrl });
  };

  const handleSignInWithEmail = async () => {
    if (emailInput) {
      setIsModalOpen(false); // Close modal
      await signIn('email', { email: emailInput, callbackUrl: '/' }); 
      alert('Check your email for a magic link!');
    }
  };
  const router = useRouter();
  const {cart} = useCart()

  const handleSignOut = () => {
    setIsModalOpen(false);
    signOut({ callbackUrl: currentUrl});
  };
  return (
    <div>
      <div className="w-full h-fit border-b border-gray-200">
  <div className="flex items-center justify-between mx-4 py-2">
    {/* Left: Logo */}
    <div
      className="relative h-12 w-40 cursor-pointer"
      onClick={() => router.push("/")}
    >
      <Image
        src="/sportex_cropped.png"
        alt="Sportex logo"
        fill
        className="object-cover"
      />
    </div>

    {/* Middle: Search (take up available space) */}
    <div className="flex-1 max-w-2xl px-1">
      <SearchTab />
    </div>

    {/* Right: Icons */}
    <div className="flex items-center gap-6">
      {/* Profile */}
      <button onClick={() => setIsModalOpen(true)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 
               20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 
               0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
          />
        </svg>
      </button>

      {/* Wishlist */}
      <button>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 
               0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 
               3.75 3 5.765 3 8.25c0 7.22 9 12 9 
               12s9-4.78 9-12Z"
          />
        </svg>
      </button>

      {/* Cart */}
      <div
        className="relative cursor-pointer"
        onClick={() => router.push("/cart")}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 
               0v4.5m11.356-1.993 
               1.263 12c.07.665-.45 1.243-1.119 
               1.243H4.25a1.125 1.125 0 0 
               1-1.12-1.243l1.264-12A1.125 
               1.125 0 0 1 5.513 
               7.5h12.974c.576 0 1.059.435 
               1.119 1.007ZM8.625 10.5a.375.375 
               0 1 1-.75 0 .375.375 0 0 1 .75 
               0Zm7.5 0a.375.375 0 1 1-.75 
               0 .375.375 0 0 1 .75 0Z"
          />
        </svg>
        {/* Badge */}
        {cart.length > 0 && (
          <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
            {cart.length}
          </div>
        )}
      </div>
    </div>
  </div>
  <SubHeader />
</div>

      {/* Overlay + Modal Container */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Background overlay (invisible, just for clicks) */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          />

          {/* Modal box (relative to the viewport) */}
          <div className="relative bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden">
            {/* Modal Header */}
            <div className="relative border-b border-gray-200 py-3 text-center">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 hover:bg-gray-100 rounded-full p-2 text-xl"
              >
                &times;
              </button>
              <h2 className="text-lg font-semibold text-gray-800">Accedi o registrati</h2>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {session ? (
                // Profile view when logged in
                <>
                  <h3 className="text-2xl font-bold mb-2 text-gray-900">Welcome, {session.user.name}!</h3>
                  <p className="text-gray-600 mb-6">Email: {session.user.email}</p>
                  <button
                    onClick={handleSignOut}
                    className="w-full py-3 text-white bg-red-600 rounded-lg shadow-md hover:bg-red-700 transition-colors font-semibold"
                  >
                    Log Out
                  </button>
                </>
              ) : (
                // Login/Signup view when logged out
                <>
                  <h3 className="text-2xl font-bold mb-6 text-gray-900">Ti diamo il benvenuto sulla tua app!</h3>

                  {/* Primary Email Input */}
                  <div className="mb-4">
                    <input
                      type="email"
                      placeholder="Indirizzo email"
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-amber-400 outline-none transition-all text-gray-800"
                    />
                  </div>

                  {/* Continue Button for Email */}
                  <button
                    onClick={handleSignInWithEmail}
                    disabled={!emailInput}
                    className="w-full py-3 text-white bg-amber-500 rounded-lg shadow-md hover:bg-amber-600 transition-colors font-semibold disabled:bg-amber-300"
                  >
                    Continua
                  </button>

                  <div className="flex items-center justify-center my-6">
                    <span className="h-px bg-gray-300 flex-grow"></span>
                    <span className="px-3 text-gray-500 text-sm">o</span>
                    <span className="h-px bg-gray-300 flex-grow"></span>
                  </div>

                  {/* Social Login Buttons */}
                  <div className="space-y-4">
                    <button
                      onClick={() => handleSignInWithProvider('google')}
                      className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
                    >
                      <img src="https://www.svgrepo.com/show/303108/google-symbol.svg" alt="Google" className="w-5 h-5" />
                      Continua con Google
                    </button>
                    
                    <button
                      onClick={() => handleSignInWithProvider('apple')}
                      className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
                    >
                      <img src="https://www.svgrepo.com/show/303132/apple-15-logo.svg" alt="Apple" className="w-5 h-5" />
                      Continua con Apple
                    </button>

                    <button
                      onClick={() => handleSignInWithProvider('facebook')}
                      className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
                    >
                      <img src="https://www.svgrepo.com/show/303111/facebook-1-logo.svg" alt="Facebook" className="w-5 h-5" />
                      Continua con Facebook
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Header
