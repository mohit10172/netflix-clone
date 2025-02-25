"use client";

import { useCallback, useState } from "react";
import { signIn } from "next-auth/react";
import axios from "axios";

// COMPONENTS
import Input from "../../components/Input";

// REACT ICONS
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [pswd, setPswd] = useState("");

  // VARIANT LOGIC
  const [variant, setVariant] = useState("login");
  const toggleVariant = useCallback(() => {
    setVariant((currVariant) =>
      currVariant === "login" ? "register" : "login"
    );
  }, []);

  // LOGIN
  const login = useCallback(async () => {
    try {
      await signIn("credentials", {
        email,
        pswd,
        callbackUrl: "/profiles",
      });
    } catch (error) {
      console.log(error);
    }
  }, [email, pswd]);

  // REGISTER
  const register = useCallback(async () => {
    try {
      await axios.post("/api/register", {
        email,
        name,
        pswd,
      });

      login();
    } catch (error) {
      console.log(error);
    }
  }, [email, name, pswd, login]);

  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-fixed bg-cover bg-center">
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        <nav className="px-12 py-5">
          <img src="/images/logo.png" alt="logo" className="h-12" />
        </nav>
        <div className="flex justify-center">
          <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
            <h2 className="text-white text-4xl mb-8 font-semibold">
              {variant === "login" ? "Sign In" : "Register"}
            </h2>
            <div className="flex flex-col gap-4">
              {variant === "register" && (
                <Input
                  id="email"
                  label="Username"
                  onChange={(e: any) => setName(e.target.value)}
                  value={name}
                />
              )}
              <Input
                id="email"
                label="Email"
                type="email"
                onChange={(e: any) => setEmail(e.target.value)}
                value={email}
              />
              <Input
                id="password"
                label="Password"
                type="password"
                onChange={(e: any) => setPswd(e.target.value)}
                value={pswd}
              />
            </div>
            <button
              onClick={variant === "login" ? login : register}
              className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition"
            >
              {variant === "login" ? "Login" : "Sign Up"}
            </button>
            <div className="flex flex-row items-center gap-4 mt-8 justify-center">
              <div
                onClick={() => signIn("google", { callbackUrl: "/profiles" })}
                className="
                  w-10 
                  h-10 
                  bg-white 
                  rounded-full 
                  flex 
                  items-center 
                  justify-center
                  cursor-pointer
                  hover:opacity-80
                  transition
                "
              >
                <FcGoogle size={30} />
              </div>
              <div
                onClick={() => signIn("github", { callbackUrl: "/profiles" })}
                className="
                  w-10 
                  h-10 
                  bg-white 
                  rounded-full 
                  flex 
                  items-center 
                  justify-center
                  cursor-pointer
                  hover:opacity-80
                  transition
                "
              >
                <FaGithub size={30} />
              </div>
            </div>
            <p className="text-neutral-500 mt-12">
              {variant === "login"
                ? "First time using Netflix?"
                : "Already have an account?"}
              <span
                onClick={toggleVariant}
                className="text-white ml-1 hover:underline cursor-pointer"
              >
                {variant === "register" ? "Sign In" : "Create an account"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
