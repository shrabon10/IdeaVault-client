"use client";

import { signOut, useSession } from "@/lib/auth-client";
import { MenuIcon, Moon, Sun, X } from "lucide-react";
import Image from "next/image";
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

  return (
    <div className="bg-base-100 border-b border-gray-200 fixed top-0 left-0 w-full mb-20 z-50">
      <div className="navbar container mx-auto justify-between">
        <div className="navbar-start">
          <Link href={"/"} className="flex items-center gap-2">
            <Image
              src={"/assets/logo.png"}
              alt="logo"
              width={200}
              height={150}
              className="w-full h-20"
            ></Image>
          </Link>
        </div>

        <div className="hidden gap-4 navbar-center lg:flex text-gray-500">
          <Link
            className={`font-bold ${pathName === "/" && "text-blue-500"}`}
            href={"/"}
          >
            Home
          </Link>
          <Link
            className={`
              font-bold
              ${pathName === "/ideas" && "text-blue-500"}
            `}
            href={"/ideas"}
          >
            Ideas
          </Link>
          <Link
            className={`
              font-bold
              ${pathName === "/addIdea" && "text-blue-500"}
            `}
            href={"/addIdea"}
          >
            Add Idea
          </Link>
          <Link
            className={`
              font-bold
              ${pathName === "/myIdeas" && "text-blue-500"}
            `}
            href={"/myIdeas"}
          >
            My Ideas
          </Link>
          <Link
            className={`
              font-bold
              ${pathName === "/myInteractions" && "text-blue-500"}
            `}
            href={"/myInteractions"}
          >
            My Interactions
          </Link>
        </div>
  

        <div className="navbar-end  hidden lg:flex items-center gap-4">
          <button
            className=" cursor-pointer btn-circle"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            {theme === "light" ? <Moon></Moon> : <Sun></Sun>}
          </button>
          {user ? (
            <div className=" hidden lg:flex items-center justify-center gap-2">
              <div className="dropdown dropdown-center">
                <div tabIndex={0} role="button">
                  <div className="avatar">
                    <div className="w-12">
                      <Image
                        src={user?.image}
                        alt="Avatar"
                        width={100}
                        height={100}
                        className="w-full h-full rounded-full"
                      />
                    </div>
                  </div>
                </div>
                <ul
                  tabIndex="-1"
                  className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
                >
                  <li>
                    <Link href="/profile">Profile</Link>
                  </li>
                </ul>
              </div>
              <button
                onClick={() => signOut()}
                className="btn bg-red-500 text-white font-bold"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="hidden lg:flex gap-2">
              <Link href={"/login"}>
                <button className="py-2 px-6 cursor-pointer hover:scale-105 duration-700 border border-primary rounded-lg font-semibold">
                  Login
                </button>
              </Link>
              <Link href={"/register"}>
                <button className="py-2 px-6 hover:scale-105 duration-700 bg-primary text-gray-200 cursor-pointer rounded-lg font-semibold">
                  Register
                </button>
              </Link>
            </div>
          )}
        </div>

        <div className="navbar-end items-center gap-3 lg:hidden">
          <button
            className=" cursor-pointer btn-circle"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            {theme === "light" ? <Moon></Moon> : <Sun></Sun>}
          </button>
          <div className="dropdown dropdown-end" onClick={handleMenuToggle}>
            <div tabIndex={0} role="button" className="btn btn-circle ">
              <span className="duration-700">
                {isMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
              </span>
            </div>

            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-[999] mt-2 w-52 p-2 shadow"
            >
              <div className="flex flex-col gap-4 text-gray-500 pb-3">
                <Link
                  className={`font-bold ${pathName === "/" && "text-blue-500"}`}
                  href={"/"}
                >
                  Home
                </Link>
                <Link
                  className={`
              font-bold
              ${pathName === "/ideas" && "text-blue-500"}
            `}
                  href={"/ideas"}
                >
                  Ideas
                </Link>
                <Link
                  className={`
              font-bold
              ${pathName === "/addIdea" && "text-blue-500"}
            `}
                  href={"/addIdea"}
                >
                  Add Idea
                </Link>
                <Link
                  className={`
              font-bold
              ${pathName === "/myIdeas" && "text-blue-500"}
            `}
                  href={"/myIdeas"}
                >
                  My Ideas
                </Link>
                <Link
                  className={`
              font-bold
              ${pathName === "/myInteractions" && "text-blue-500"}
            `}
                  href={"/myInteractions"}
                >
                  My Interactions
                </Link>
              </div>
              <div className="pt-3">
                {!user && (
                  <div className="flex flex-col gap-2 pt-3 border-t border-gray-300">
                    <Link href={"/login"}>
                      <button className="w-full py-2 px-6 cursor-pointer hover:scale-105 duration-700 border border-primary rounded-lg font-semibold">
                        Login
                      </button>
                    </Link>
                    <Link href={"/register"}>
                      <button className="w-full py-2 px-6 hover:scale-105 duration-700 bg-primary text-gray-200 cursor-pointer rounded-lg font-semibold">
                        Register
                      </button>
                    </Link>
                  </div>
                )}
              </div>
            </ul>
          </div>
          {user && (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button">
                <div className="avatar">
                  <div className="w-12">
                    <Image
                      src={user?.image}
                      alt="Avatar"
                      width={100}
                      height={100}
                      className="w-full h-full rounded-full"
                    />
                  </div>
                </div>
              </div>
              <ul
                tabIndex="0"
                className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
              >
                <li>
                  <Link href="/profile">Profile</Link>
                </li>
                <li>
                  <button onClick={() => signOut()}>Sign Out</button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
