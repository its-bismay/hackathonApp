import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/clerk-react";

const languages = [
  { code: 'en', label: 'EN' },
  { code: 'hi', label: 'हि' },
  { code: 'bn', label: 'বাং' },
  { code: 'ta', label: 'தமி' },
  { code: 'te', label: 'తె' },
  { code: 'kn', label: 'ಕ' },
];

const navLinks = [
  { label: 'Explore', href: '/explore' },
  { label: 'Facilities', href: '/facilities' },
  { label: 'About Us', href: '/about' },
];

export default function Navbar() {
  const { isSignedIn } = useUser();

  // eslint-disable-next-line no-unused-vars
  const [scrolled, setScrolled] = useState(false);
  const [langIndex, setLangIndex] = useState(0);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const changeLanguage = (index) => {
    const lang = languages[index];
    setLangIndex(index);
    setIsLangOpen(false);

    const select = document.querySelector(".goog-te-combo");

    if (select) {
      select.value = lang.code;
      select.dispatchEvent(new Event("change"));
    } else {
      console.warn("Google Translate not loaded yet");
    }
  };

  return (
    <>
      <div id="google_translate_element" style={{ display: "none" }}></div>

      <nav className="fixed top-0 left-0 right-0 z-50 bg-background shadow-sm border-b border-border transition-all duration-300 text-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                📄
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-violet-500 bg-clip-text text-transparent">
                CitizenBridge
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    location.pathname === link.href
                      ? 'bg-purple-100 text-purple-700'
                      : 'text-slate-600 hover:text-purple-600 hover:bg-purple-50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-3">
              {!isSignedIn ? (
                <>
                  <SignInButton mode="modal">
                    <button className="px-4 py-2 text-sm text-purple-600 hover:bg-purple-50 rounded-lg">
                      Login
                    </button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <button className="px-5 py-2 text-sm text-white bg-gradient-to-r from-purple-600 to-violet-600 rounded-xl">
                      Register
                    </button>
                  </SignUpButton>
                </>
              ) : (
                <>
                  <Link to="/dashboard" className="px-4 py-2 text-sm text-purple-600 hover:bg-purple-50 rounded-lg">
                    Dashboard
                  </Link>
                  <UserButton afterSignOutUrl="/" />
                </>
              )}

              <div className="relative flex items-center">
                <button
                  onClick={() => setIsLangOpen(!isLangOpen)}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-purple-200 text-purple-600 bg-purple-50 hover:bg-purple-100 flex items-center gap-1.5"
                >
                  🌐 {languages[langIndex]?.label}
                </button>

                <div
                  className={`absolute top-full -right-0 mt-1 bg-white/95 backdrop-blur-sm border border-gray-200 rounded-xl shadow-lg py-2 flex flex-col gap-1 min-w-[60px] z-50 transition-all duration-200 ${
                    isLangOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
                  }`}
                >
                  {languages.map((lang, index) => (
                    <button
                      key={lang.code}
                      onClick={() => changeLanguage(index)}
                      className={`px-3 py-1.5 text-xs rounded-lg border-0 text-left hover:bg-purple-50 w-full ${
                        langIndex === index
                          ? "bg-purple-100 text-purple-700 font-medium"
                          : "text-gray-700"
                      }`}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              className="md:hidden p-2"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              ☰
            </button>

          </div>
        </div>
      </nav>
    </>
  );
}
