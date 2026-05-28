"use client";

import { signOut, useSession } from "@/lib/auth-client";
import { MenuIcon, Moon, Sun, X, User, LogOut } from "lucide-react";
import Image from "next/image"; // 🎯 next/image ইম্পোর্ট করা হলো
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { useTheme } from "next-themes";

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const pathName = usePathname();
  const { data } = useSession();
  const user = data?.user;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const linkStyle = (path) => {
    const isActive = pathName === path;
    return `text-sm font-bold tracking-tight transition-all duration-200 hover:text-blue-600 ${
      isActive
        ? "text-blue-600 font-extrabold scale-102"
        : "text-base-content/80 hover:text-base-content"
    }`;
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-base-100/60 backdrop-blur-xl border-b border-base-content/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.03)] transition-colors duration-300">
      <div className="container mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* ১. লোগো সেকশন - টেক্সট গ্রেডিয়েন্ট লোগো */}
          <div className="flex-shrink-0 flex items-center">
            <Link
              href={"/"}
              className="transition-transform hover:scale-[1.02] active:scale-98"
            >
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent drop-shadow-sm select-none">
                IdeaVault
              </h1>
            </Link>
          </div>

          {/* ২. ডেস্কটপ নেভিগেশন লিংকসমূহ */}
          <nav className="hidden lg:flex items-center gap-6">
            <Link className={linkStyle("/")} href={"/"}>
              Home
            </Link>
            <Link className={linkStyle("/ideas")} href={"/ideas"}>
              Ideas
            </Link>
            <Link className={linkStyle("/addIdea")} href={"/addIdea"}>
              Add Idea
            </Link>
            <Link className={linkStyle("/myIdeas")} href={"/myIdeas"}>
              My Ideas
            </Link>
            <Link
              className={linkStyle("/myInteractions")}
              href={"/myInteractions"}
            >
              My Interactions
            </Link>
          </nav>

          {/* ৩. ডেস্কটপ রাইট বাটন ও ইউজার মেনু */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              className="p-2.5 rounded-full border border-base-content/10 bg-base-content/5 text-base-content/80 hover:bg-base-content/10 transition-all cursor-pointer"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              aria-label="Toggle theme"
            >
              {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
            </button>

            {user ? (
              <div className="flex items-center gap-3">
                <div className="dropdown dropdown-end">
                  {/* 🎯 ডেস্কটপ ইউজার এভাটার: next/image ব্যবহার করা হয়েছে */}
                  <div
                    tabIndex={0}
                    role="button"
                    className="relative w-11 h-11 rounded-full ring-2 ring-blue-500/30 ring-offset-2 ring-offset-base-100/40 overflow-hidden bg-base-content/5 shadow-md"
                  >
                    <Image
                      src={
                        user?.image ||
                        "https://images.unsplash.com/photo-1534528741775-53994a69daeb"
                      }
                      alt="User Avatar"
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu mt-3 w-52 p-2 shadow-2xl rounded-xl bg-base-100/80 backdrop-blur-xl border border-base-content/10 text-base-content"
                  >
                    <li>
                      <Link
                        href="/profile"
                        className="flex items-center gap-2.5 rounded-lg py-2.5 hover:bg-base-content/10"
                      >
                        <User size={16} /> Profile
                      </Link>
                    </li>
                  </ul>
                </div>
                <button
                  onClick={() => signOut()}
                  className="px-5 py-2.5 text-sm font-bold text-white bg-red-600 hover:bg-red-500 rounded-xl shadow-lg shadow-red-500/10 active:scale-[0.98] transition-all cursor-pointer"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2.5">
                <Link href={"/login"}>
                  <button className="px-5 py-2.5 text-sm font-bold text-base-content border border-base-content/10 bg-base-content/5 hover:bg-base-content/10 rounded-xl transition-all cursor-pointer">
                    Login
                  </button>
                </Link>
                <Link href={"/register"}>
                  <button className="px-5 py-2.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-xl shadow-lg shadow-blue-500/10 transition-all cursor-pointer">
                    Register
                  </button>
                </Link>
              </div>
            )}
          </div>

          {/* ৪. মোবাইল রেসপন্সিভ রাইট সাইড */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              className="p-2 rounded-full border border-base-content/10 bg-base-content/5 text-base-content/80 transition-colors"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
            </button>

            <div className="dropdown dropdown-end" onClick={handleMenuToggle}>
              <div
                tabIndex={0}
                role="button"
                className="p-2 rounded-full border border-base-content/10 bg-base-content/5 text-base-content hover:bg-base-content/10 transition-all"
              >
                {isMenuOpen ? <X size={18} /> : <MenuIcon size={18} />}
              </div>

              <ul
                tabIndex={0}
                className="dropdown-content menu mt-3 w-56 p-3 shadow-3xl rounded-2xl bg-base-100/90 backdrop-blur-2xl border border-base-content/10 gap-1.5 z-[999]"
              >
                <div className="flex flex-col gap-1 pb-3.5 border-b border-base-content/5">
                  <Link
                    className={`${linkStyle("/")} p-2.5 hover:bg-base-content/5 rounded-lg`}
                    href={"/"}
                  >
                    Home
                  </Link>
                  <Link
                    className={`${linkStyle("/ideas")} p-2.5 hover:bg-base-content/5 rounded-lg`}
                    href={"/ideas"}
                  >
                    Ideas
                  </Link>
                  <Link
                    className={`${linkStyle("/addIdea")} p-2.5 hover:bg-base-content/5 rounded-lg`}
                    href={"/addIdea"}
                  >
                    Add Idea
                  </Link>
                  <Link
                    className={`${linkStyle("/myIdeas")} p-2.5 hover:bg-base-content/5 rounded-lg`}
                    href={"/myIdeas"}
                  >
                    My Ideas
                  </Link>
                  <Link
                    className={`${linkStyle("/myInteractions")} p-2.5 hover:bg-base-content/5 rounded-lg`}
                    href={"/myInteractions"}
                  >
                    My Interactions
                  </Link>
                </div>

                {!user && (
                  <div className="flex flex-col gap-2.5 pt-3.5">
                    <Link href={"/login"} className="w-full">
                      <button className="w-full py-2.5 text-center text-sm font-bold text-base-content border border-base-content/10 rounded-xl">
                        Login
                      </button>
                    </Link>
                    <Link href={"/register"} className="w-full">
                      <button className="w-full py-2.5 text-center text-sm font-bold text-white bg-blue-600 rounded-xl">
                        Register
                      </button>
                    </Link>
                  </div>
                )}
              </ul>
            </div>

            {/* 🎯 মোবাইল ইউজার এভাটার: next/image ব্যবহার করা হয়েছে */}
            {user && (
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="relative w-9 h-9 rounded-full ring-2 ring-blue-500/30 overflow-hidden bg-base-content/5 shadow-xl"
                >
                  <Image
                    src={
                      user?.image ||
                      "https://images.unsplash.com/photo-1534528741775-53994a69daeb"
                    }
                    alt="User Avatar"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu mt-3 w-52 p-2 shadow-3xl rounded-xl bg-base-100/80 backdrop-blur-xl border border-base-content/10 text-base-content"
                >
                  <li>
                    <Link
                      href="/profile"
                      className="flex items-center gap-2.5 rounded-lg py-2.5 hover:bg-base-content/5"
                    >
                      <User size={16} /> Profile
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={() => signOut()}
                      className="flex items-center gap-2.5 rounded-lg py-2.5 text-red-600 hover:bg-red-500/10"
                    >
                      <LogOut size={16} /> Sign Out
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;