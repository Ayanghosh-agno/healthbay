import React, { useState, useRef } from "react";
import { Link, useHistory } from "react-router-dom";

import { FaArrowLeft } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

import CircleIconButton from "../components/CircleIconButton";
import InputField from "../components/InputField";
import FilledButton from "../components/FilledButton";
import OutlinedButton from "../components/OutlinedButton";

import { useAuth } from "../contexts/AuthContext";

function Login() {
  const history = useHistory();
  const { signInEmail, regGoogle } = useAuth();

  const email = useRef();
  const password = useRef();

  const [loading, setLoading] = useState(false);
  const [validationErr, setValidationErr] = useState("");

  const handleSubmitSignup = async function (e) {
    e.preventDefault();
    setLoading(true);
    try {
      await signInEmail(email.current.value, password.current.value);
    } catch (e) {
      setValidationErr(e.message);
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async function (e) {
    e.preventDefault();
    setLoading(true);
    await regGoogle();
    setLoading(false);
  };

  return (
    <div className="flex flex-col justify-center h-screen">
      <CircleIconButton
        className="mt-4 ml-2 z-10"
        icon={<FaArrowLeft />}
        onClick={() => history.push("/welcome")}
      />
      <div className="flex flex-row justify-between items-end pl-6 mb-4 -mt-6">
        <div className="font-bold text-4xl underline pb-4">Login</div>
        <img className="w-64" src="/assets/images/sign-up.png" alt="Signup" />
      </div>
      <form onSubmit={handleSubmitSignup} className="mx-6">
        <div className="flex flex-col mb-4">
          <label className="font-semibold uppercase" htmlFor="email">
            Your Email
          </label>
          <InputField
            className="mt-1 text-lg"
            type="email"
            id="email"
            ref={email}
            error={validationErr}
          />
        </div>
        <div className="flex flex-col">
          <label className="font-semibold uppercase" htmlFor="password">
            Password
          </label>
          <InputField
            className="mt-1 text-lg font-bold tracking-widest"
            type="password"
            id="password"
            ref={password}
            error={validationErr}
          />
        </div>
        <div className="flex flex-row mt-4 items-start space-x-2 mb-4">
          <input type="checkbox" id="remember" className="bg-primary w-6 h-6" />
          <label htmlFor="remember">Remember Me</label>
        </div>
        {validationErr && (
          <div className="text-red-600 -mt-2">{validationErr}</div>
        )}
        <FilledButton className="mt-2 mb-4 w-full" loading={loading}>
          Login
        </FilledButton>
        <OutlinedButton
          onClick={signInWithGoogle}
          loading={loading}
          className="w-full"
        >
          <FcGoogle className="mr-4" />
          Sign in with Google
        </OutlinedButton>
        <div className="mt-6">
          Don't have an account?{" "}
          <Link to="/register" className="text-primary underline">
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
