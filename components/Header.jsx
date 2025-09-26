"use client"
import Image from 'next/image'
import React, { useState } from 'react'
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import SubHeader from './SubHeader';
import { signIn, signOut, useSession } from 'next-auth/react';
import SearchTab from './SearchTab';

const Header = () => {
  const { data: session } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '/';
  const router = useRouter();
  const { cart } = useCart();
  const [openDropdown, setOpenDropdown] = useState(null);

  const menuItems = [
    { title: 'Acquatici', links: ['Surf', 'Kayak', 'SUP', 'Windsurf', 'Kitesurf'] },
    { title: 'Invernali', links: ['Sci', 'Snowboard', 'Pattinaggio', 'Ciaspole', 'Motoslitta'] },
    { title: 'Terra', links: ['Golf', 'Bowling', 'Tennis', 'Pickleball'] },
    { title: 'Avventura', links: ['Arrampicata', 'Trekking', 'Camping', 'Rafting'] },
    { title: 'Squadra', links: ['Calcio', 'Basket', 'Pallavolo', 'Football'] },
    { title: 'Ciclismo', links: ['Bici da corsa', 'Mountain Bike', 'E-bike'] }
  ];

  const handleSignInWithProvider = (providerId) => {
    setIsModalOpen(false);
    signIn(providerId, { callbackUrl: currentUrl });
  };

  const handleSignInWithEmail = async () => {
    if (emailInput) {
      setIsModalOpen(false);
      await signIn('email', { email: emailInput, callbackUrl: '/' });
      alert('Check your email for a magic link!');
    }
  };

  const handleSignOut = () => {
    setIsModalOpen(false);
    signOut({ callbackUrl: currentUrl });
  };

  return (
    <div className="w-full">
      <div className="w-full h-fit border-b border-gray-200">
        <div className='flex'>
          {/* Menu button for drawer */}
          <div className='w-fit my-auto md:hidden cursor-pointer' onClick={()=>{setMenuOpen(true)}}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8 ml-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
            </svg>
          </div>

          <div className="flex items-center justify-between mx-4 py-2 gap-3 w-full">
            {/* Left: Logo */}
            <div
              className="relative h-10 w-28 md:h-12 md:w-40 cursor-pointer"
              onClick={() => router.push("/")}
            >
              <Image
                src="/sportex_cropped.png"
                alt="Sportex logo"
                fill
                className="object-contain"
              />
            </div>

            {/* Middle: Search */}
            <div className="flex-1 max-w-xl px-1 hidden sm:block">
              <SearchTab />
            </div>

            {/* Right: Icons */}
            <div className="flex items-center gap-4 md:gap-6">
              {/* Profile */}
              <button onClick={() => setIsModalOpen(true)} aria-label="Profile">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 
                     3.75 3.75 0 0 1 7.5 0ZM4.501 
                     20.118a7.5 7.5 0 0 1 14.998 
                     0A17.933 17.933 
                     0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"/>
                </svg>
              </button>

              {/* Wishlist */}
              <button aria-label="Wishlist">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 
                     0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 
                     3.75 3 5.765 3 8.25c0 7.22 9 12 9 
                     12s9-4.78 9-12Z"/>
                </svg>
              </button>

              {/* Cart */}
              <div className="relative cursor-pointer" onClick={() => router.push("/cart")}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 
                     0v4.5m11.356-1.993 
                     1.263 12c.07.665-.45 1.243-1.119 
                     1.243H4.25a1.125 1.125 0 0 
                     1-1.12-1.243l1.264-12A1.125 
                     1.125 0 0 1 5.513 
                     7.5h12.974c.576 0 1.059.435 
                     1.119 1.007ZM8.625 10.5a.375.375 
                     0 1 1-.75 0 .375.375 0 0 1 .75 
                     0Zm7.5 0a.375.375 0 1 1-.75 
                     0 .375.375 0 0 1 .75 0Z"/>
                </svg>
                {cart.length > 0 && (
                  <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {cart.length}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* SubHeader + Mobile search */}
        <div className="block sm:hidden p-2">
          <SearchTab />
        </div>
        <div className='hidden md:flex'>
          <SubHeader />
        </div>
      </div>

      {/* Drawer (slides left to right) */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Overlay */}
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setMenuOpen(false)}
          />

          {/* Drawer */}
          {/* Drawer */}
<div
  className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
    menuOpen ? "translate-x-0" : "-translate-x-full"
  }`}
>
  <div className="p-4 border-b flex justify-between items-center">
    <h2 className="text-lg font-bold text-gray-800">Menu</h2>
    <button onClick={() => setMenuOpen(false)} className="text-gray-600 hover:text-gray-800">
      ✕
    </button>
  </div>

  <div className="p-4 space-y-2">
    {menuItems.map((item, idx) => {
      const isOpen = openDropdown === idx;

      return (
        <div key={idx} className="border-b">
          {/* Menu title */}
          <button
            onClick={() => setOpenDropdown(isOpen ? null : idx)}
            className="flex justify-between items-center w-full py-2 text-left font-semibold text-gray-700 hover:text-amber-500"
          >
            {item.title}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`w-4 h-4 transform transition-transform ${isOpen ? "rotate-180" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Submenu */}
          <div
            className={`overflow-hidden transition-all duration-300 ${
              isOpen ? "max-h-40" : "max-h-0"
            }`}
          >
            <ul className="pl-4 pb-2 space-y-1">
              {item.links.map((link, linkIdx) => (
                <li
                  key={linkIdx}
                  className="text-gray-600 hover:text-amber-500 cursor-pointer"
                  onClick={() => {
                    setMenuOpen(false);
                    router.push(`/category/${link.toLowerCase()}`);
                  }}
                >
                  {link}
                </li>
              ))}
            </ul>
          </div>
        </div>
      );
    })}
  </div>
</div>

        </div>
      )}

      {/* Modal (unchanged) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-3">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          />
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
                <>
                  <h3 className="text-2xl font-bold mb-6 text-gray-900">Ti diamo il benvenuto!</h3>
                  <div className="mb-4">
                    <input
                      type="email"
                      placeholder="Indirizzo email"
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-amber-400 outline-none transition-all text-gray-800"
                    />
                  </div>
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
                  <div className="space-y-3">
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
  