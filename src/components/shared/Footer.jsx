import { Mail, Phone, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import { FaFacebookF, FaInstagram, FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-[#050816] text-white">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-600/20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-600/20 blur-3xl rounded-full"></div>

      <div className="relative container mx-auto px-6 py-20">
        {/* Main Footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14 border-b border-white/10 pb-14">
          
          {/* Brand */}
          <div className="space-y-5">
            <h2 className="text-4xl font-black tracking-tight bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              IdeaVault
            </h2>

            <p className="text-gray-400 leading-relaxed text-sm sm:text-base">
              A modern platform where creators, innovators, and dreamers share
              unique ideas, discover inspiration, and connect with creative
              minds worldwide.
            </p>

            <button className="group mt-4 flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:scale-105 duration-300 shadow-lg shadow-blue-600/20 cursor-pointer">
              Explore Ideas
              <ArrowUpRight
                size={18}
                className="group-hover:translate-x-1 group-hover:-translate-y-1 transition"
              />
            </button>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6">Quick Links</h3>

            <div className="flex flex-col gap-4 text-gray-400">
              {["Ideas", "Add Idea", "My Ideas", "Interactions"].map(
                (item, i) => (
                  <Link
                    href="/"
                    key={i}
                    className="hover:text-white hover:translate-x-2 transition-all duration-300"
                  >
                    {item}
                  </Link>
                )
              )}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold mb-6">Contact</h3>

            <div className="space-y-5 text-gray-400">
              <div className="flex items-center gap-3 hover:text-white transition">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <Phone size={18} />
                </div>
                <span>+1 234 567 890</span>
              </div>

              <div className="flex items-center gap-3 hover:text-white transition">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <Mail size={18} />
                </div>
                <span>example@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-xl font-bold mb-6">Follow Us</h3>

            <div className="flex gap-4">
              <button className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-blue-600 hover:scale-110 transition-all duration-300 cursor-pointer">
                <FaFacebookF size={20} />
              </button>

              <button className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-pink-600 hover:scale-110 transition-all duration-300 cursor-pointer">
                <FaInstagram size={20} />
              </button>

              <button className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white hover:text-black hover:scale-110 transition-all duration-300 cursor-pointer">
                <FaXTwitter size={20} />
              </button>
            </div>

            <div className="mt-8 p-5 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl">
              <p className="text-sm text-gray-400 leading-relaxed">
                Join our growing creative community and turn your imagination
                into innovation.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-gray-500 text-sm">
          <p>© 2026 IdeaVault. All rights reserved.</p>

          <div className="flex gap-6">
            <Link href="/" className="hover:text-white transition">
              Privacy Policy
            </Link>

            <Link href="/" className="hover:text-white transition">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;