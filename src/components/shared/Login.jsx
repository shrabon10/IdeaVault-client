"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { redirect, useSearchParams } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import { BsGoogle } from "react-icons/bs";

const Login = () => {
  const searchParams = useSearchParams();
  const handleLogin = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const userData = Object.fromEntries(formData.entries());
    console.log(userData);

    const { data, error } = await authClient.signIn.email({
      email: userData?.email, // required
      password: userData?.password, // required
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
      toast.success("Login Success");
    } else {
      toast.error(`Google Sign-In failed`);
    }
  };
  return (
    <div className="space-y-5 max-w-sm mx-auto px-2">
      <h2 className="text-3xl font-bold text-center">Login Account</h2>
      <form
        onSubmit={handleLogin}
        className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl"
      >
        <div className="card-body">
          <fieldset className="fieldset">
            <label className="label">Email</label>
            <input
              type="email"
              className="input w-full"
              name="email"
              placeholder="Email"
            />
            <label className="label">Password</label>
            <input
              type="password"
              className="input w-full"
              name="password"
              placeholder="Password"
            />
            <div className="flex items-center justify-between flex-wrap gap-2">
              <a className="link link-hover text-xs ">Forgot password?</a>
              <span className="flex items-center gap-2">
                Haven&apos;t any account?
                <Link href={"/register"} className="link link-primary text-xs ">
                  Register
                </Link>
              </span>
            </div>
            <button type="submit" className="btn btn-primary mt-4">
              Login
            </button>
          </fieldset>
        </div>
      </form>{" "}
      <div className="divider">OR</div>
      <button onClick={googleSignIn} className="btn w-full">
        <BsGoogle></BsGoogle> Continue with google
      </button>
    </div>
  );
};

export default Login;
