"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { redirect, useSearchParams } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import { BsGoogle } from "react-icons/bs";

export const metadata = {
  title: "IdeaVault | Register",
  description: "This is register page",
};

const Register = () => {
  const searchParams = useSearchParams();
  const handleRegister = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const userData = Object.fromEntries(formData.entries());
    console.log(userData);
    console.log(userData);

    const { data, error } = await authClient.signUp.email({
      name: userData?.name,
      email: userData?.email, // required
      image: userData?.image,
      password: userData?.password, // required
      callbackURL: searchParams.get("redirect") || "/",
    });

    if (data) {
      toast.success("Register Success");
      redirect("/login");
    } else {
      toast.error(`${error.message}`);
    }
  };

  const googleSignUp = async () => {
    const data = await authClient.signIn.social({
      provider: "google",
    });

    if (data) {
      toast.success("Login Success");
    } else {
      toast.error(`Google Sign-In failed`);
    }
  };
  return (
    <div className="space-y-5 max-w-sm mx-auto px-2">
      <h2 className="text-3xl font-bold text-center">Register Account</h2>
      <form
        onSubmit={handleRegister}
        className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl"
      >
        <div className="card-body">
          <fieldset className="fieldset">
            <label className="label">Name</label>
            <input
              type="text"
              className="input w-full"
              name="name"
              placeholder="Name"
            />
            <label className="label">Email</label>
            <input
              type="email"
              className="input w-full"
              name="email"
              placeholder="Email"
            />
            <label className="label">Image URL</label>
            <input
              type="text"
              className="input w-full"
              name="image"
              placeholder="ImageURL"
            />
            <label className="label">Password</label>

            <input
              type="password"
              className="input validator w-full"
              required
              name="password"
              placeholder="Password"
              minLength={6}
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
              title="Must be at least 8 characters, including number, lowercase letter, and uppercase letter"
            />

            <p className="validator-hint">
              Must be at least 8 characters, including
              <br />
              At least one number
              <br />
              At least one lowercase letter
              <br />
              At least one uppercase letter
            </p>

            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                Already have an account?
                <Link href={"/login"} className="link link-primary">
                  Login
                </Link>
              </span>
            </div>
            <button type="submit" className="btn btn-primary mt-4">
              Register
            </button>
          </fieldset>
        </div>
      </form>{" "}
      <div className="divider">OR</div>
      <button onClick={googleSignUp} className="btn w-full">
        <BsGoogle></BsGoogle> Continue with google
      </button>
    </div>
  );
};

export default Register;
