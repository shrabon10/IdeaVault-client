"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { redirect, useSearchParams } from "next/navigation";
import React, { useState } from "react"; // 🎯 useState ইম্পোর্ট করা হয়েছে
import toast from "react-hot-toast";
import { BsGoogle } from "react-icons/bs";
import { FiEye, FiEyeOff } from "react-icons/fi"; // 🎯 আইকন ইম্পোর্ট করা হয়েছে

const Login = () => {
  const searchParams = useSearchParams();
  // 🎯 পাসওয়ার্ড শো/হাইড করার জন্য স্টেট
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const userData = Object.fromEntries(formData.entries());
    console.log(userData);

    const { data, error } = await authClient.signIn.email({
      email: userData?.email,
      password: userData?.password,
      rememberMe: true,
      callbackURL: searchParams.get("redirect") || "/",
    });

    if (data) {
      toast.success("Login Success");
      redirect("/login");
    } else {
      toast.error(`${error.message}`);
    }
  };

  const googleSignIn = async () => {
    const data = await authClient.signIn.social({
      provider: "google",
    });
    console.log(data);

    if (data) {
      toast.success("Google Sign-In successful");
    } else {
      toast.error(`Google Sign-In failed`);
    }
  };

  return (
    // 🎯 min-h আপডেট করা হয়েছে যেন স্ক্রিনের একদম মাঝখানে পারফেক্টলি ফিট হয়
    <div className="min-h-[5vh] flex flex-col justify-center items-center px-4 py-10 transition-colors duration-300">
      <div className="w-full max-w-md space-y-6">
        {/* টাইটেল সেকশন */}
        <div className="text-center space-y-2">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-base-content">
            Welcome Back
          </h2>
          <p className="text-sm font-medium text-base-content/60">
            Login to your account to continue
          </p>
        </div>

        {/* গ্লাস-মর্ফিক প্রিমিয়ামカード */}
        <div className="card bg-base-100/70 backdrop-blur-md border border-base-content/5 shadow-xl w-full p-2 sm:p-4 rounded-2xl">
          <div className="card-body p-6 sm:p-8">
            <form onSubmit={handleLogin} className="space-y-4">
              {/* ইমেইল ইনপুট ফিল্ড */}
              <div className="form-control w-full">
                <label className="label pt-0">
                  <span className="label-text font-bold text-base-content/70">
                    Email Address
                  </span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="name@example.com"
                  className="input input-bordered w-full rounded-xl bg-base-200/50 focus:input-primary transition-all duration-200 font-medium"
                  required
                />
              </div>

              {/* পাসওয়ার্ড ইনপুট ফিল্ড */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-bold text-base-content/70">
                    Password
                  </span>
                </label>

                {/* 🎯 পাসওয়ার্ড ইনপুট এবং টগল বাটনের জন্য রিলেটিভ কন্টেইনার */}
                <div className="relative mt-1">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="••••••••"
                    className="input input-bordered w-full rounded-xl bg-base-200/50 focus:input-primary pr-12 transition-all duration-200 font-medium"
                    required
                  />
                  {/* শো/হাইড টগল বাটন */}
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-base-content/50 hover:text-primary transition-colors duration-200 cursor-pointer p-1"
                  >
                    {showPassword ? (
                      <FiEyeOff size={18} />
                    ) : (
                      <FiEye size={18} />
                    )}
                  </button>
                </div>
              </div>

              {/* লিংক ও নেভিগেশন এরিয়া */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 text-xs font-semibold text-base-content/60">
                <a className="link link-hover hover:text-primary transition-colors cursor-pointer">
                  Forgot password?
                </a>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span>Don&apos;t have an account?</span>
                  <Link
                    href="/register"
                    className="link link-primary font-bold"
                  >
                    Register
                  </Link>
                </div>
              </div>

              {/* সাবমিট বাটন */}
              <div className="form-control pt-4">
                <button
                  type="submit"
                  className="btn w-full btn-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/30 active:scale-[0.98] transition-all duration-200 cursor-pointer"
                >
                  Log In
                </button>
              </div>
            </form>

            {/* ডিভাইডার */}
            <div className="divider text-xs font-bold text-base-content/30 my-6">
              OR CONTINUE WITH
            </div>

            {/* গুগল সাইন-ইন বাটন */}
            <button
              onClick={googleSignIn}
              className="btn btn-outline border-base-content/20 hover:bg-base-content/5 hover:text-base-content w-full rounded-xl flex items-center justify-center gap-2.5 font-bold active:scale-[0.98] transition-all cursor-pointer"
            >
              <BsGoogle className="text-red-500 text-base" />
              <span>Google Account</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;