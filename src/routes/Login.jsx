import React from "react";
import { Link, useHistory } from "react-router-dom";

import { FaArrowLeft } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

import CircleIconButton from "../components/CircleIconButton";
import InputField from "../components/InputField";
import FilledButton from "../components/FilledButton";
import OutlinedButton from "../components/OutlinedButton";

function Login() {
  const history = useHistory();

  return (
    <div className="flex flex-col justify-center">
      <CircleIconButton
        className="mt-4 ml-2"
        icon={<FaArrowLeft />}
        onClick={() => history.push("/")}
      />
      <div className="flex flex-row justify-between items-end pl-6 mb-4 -mt-6">
        <div className="font-bold text-4xl underline pb-2">Sign In</div>
        <img src="/assets/images/sign-up.png" />
      </div>
      <div className="mx-6">
        <div className="flex flex-col mb-4">
          <label className="font-semibold uppercase" for="email">
            Your Email
          </label>
          <InputField className="mt-1 text-lg" type="text" id="email" />
        </div>
        <div className="flex flex-col">
          <label className="font-semibold uppercase" for="password">
            Password
          </label>
          <InputField className="mt-1 text-lg" type="password" id="password" />
        </div>
        <div className="flex flex-row mt-4 items-start space-x-2">
          <input type="checkbox" id="remember" className="bg-primary w-6 h-6" />
          <label for="remember">Remember Me</label>
        </div>
        <FilledButton className="mt-6 mb-4 w-full">Login</FilledButton>
        <OutlinedButton className="w-full">
          <FcGoogle className="mr-4" />
          Sign in with Google
        </OutlinedButton>
        <div className="mt-6">
          Don't have an account?{" "}
          <Link to="/register" className="text-primary underline">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
