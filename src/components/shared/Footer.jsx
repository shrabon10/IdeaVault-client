import { Mail, Phone } from "lucide-react";
import Image from "next/image";
import React from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-black text-whit px-6">
      <div className="container mx-auto py-20 space-y-5 text-white">
        <div className="space-y-10 lg:flex items-center flex-col text-start md:flex-row gap-10 justify-start lg:justify-between pb-4 border-b border-gray-700">
          <div className="space-y-5 max-w-120">
            <h2 className="text-4xl font-bold text-white">IdeaVault</h2>
            <p className="text-xs sm:text-base">
              IdeaVault is a modern idea-sharing platform where creators,
              thinkers, and innovators can post, explore, and discover unique
              ideas from around the world. From startup concepts to creative
              solutions, IdeaVault helps turn imagination into inspiration
              through a collaborative community experience.
            </p>
          </div>

          <div className="space-y-5">
            <h2 className="text-2xl font-bold">Ideas</h2>

            <div className="flex flex-col gap-3 text-gray-500 text-lg">
              <p className="hover:text-blue-500 duration-200 cursor-pointer">
                Ideas
              </p>

              <p className="hover:text-blue-500 duration-200 cursor-pointer">
                Add Idea
              </p>

              <p className="hover:text-blue-500 duration-200 cursor-pointer">
                My Ideas
              </p>

              <p className="hover:text-blue-500 duration-200 cursor-pointer">
                My Interactions
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold  text-white">Contact Us</h2>

              <div className="space-y-3 text-gray-400">
                <div className="flex items-center gap-2 hover:text-white transition">
                  <span className="font-medium flex gap-2 items-center">
                    <Phone></Phone> Phone:
                  </span>
                  <span>+1 234 567 890</span>
                </div>

                <div className="flex items-center gap-2 hover:text-white transition">
                  <span className="font-medium flex items-center gap-2">
                    <Mail></Mail> Email:
                  </span>
                  <span>example@gmail.com</span>
                </div>
              </div>
              <div className="space-y-6 flex flex-col">
                <h2 className="text-2xl font-bold">Social Links</h2>
                <div className="flex gap-4 items-center ">
                  <button
                    className="cursor-pointer text-blue-500 rounded-full border-none hover:scale-105 duration-700 bg-white tooltip tooltip-primary tooltip-bottom"
                    data-tip="Facebook"
                  >
                    <FaFacebook size={40}></FaFacebook>
                  </button>
                  <button
                    className="cursor-pointer text-purple-500 hover:scale-105 duration-700 tooltip tooltip-bottom tooltip-secondary"
                    data-tip="Instagram"
                  >
                    <FaInstagram size={40}></FaInstagram>
                  </button>
                  <button
                    className="cursor-pointer  tooltip tooltip-bottom tooltip-info hover:scale-105 duration-700"
                    data-tip="Twitter"
                  >
                    <FaXTwitter size={40}></FaXTwitter>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="text-[14px] md:text-base">
          <p>Copyright © 2026 Mahmudul Hasan Nirab. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
