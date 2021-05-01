import React, { useState, useRef } from "react";
import { Link, useHistory } from "react-router-dom";

import { FaArrowLeft } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

import CircleIconButton from "../components/CircleIconButton";
import InputField from "../components/InputField";
import FilledButton from "../components/FilledButton";
import OutlinedButton from "../components/OutlinedButton";

import { useAuth } from "../contexts/AuthContext";

function Register() {
  const history = useHistory();
  const { regEmail, regGoogle } = useAuth();

  const email = useRef();
  const password = useRef();

  const [validationErr, setValidationErr] = useState("");

  const handleSubmitSignup = async function (e) {
    e.preventDefault();
    try {
      await regEmail(email.current.value, password.current.value);
    } catch (e) {
      setValidationErr(e.message);
    }
  };

  const signUpWithGoogle = async function (e) {
    e.preventDefault();
    await regGoogle();
  };

  return (
    <div className="flex flex-col justify-center h-screen">
      <CircleIconButton
        className="mt-4 ml-2"
        icon={<FaArrowLeft />}
        onClick={() => history.push("/welcome")}
      />
      <div className="flex flex-row justify-between items-end pl-6 mb-4 -mt-2">
        <div className="font-bold text-4xl underline pb-2">Create Account</div>
        <img src="/assets/images/create-acc.png" alt="Create account" />
      </div>
      <form onSubmit={handleSubmitSignup} className="mx-6">
        <div className="flex flex-col mb-4">
          <label className="font-semibold uppercase" htmlFor="email">
            Your Email
          </label>
          <InputField
            className="mt-1 text-lg"
            type="text"
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
        <div className="flex flex-row mt-4 mb-4 items-start space-x-2">
          <input type="checkbox" id="agree" className="bg-primary w-6 h-6" />
          <label htmlFor="agree">
            I agree to the{" "}
            <Link to="/toc" className="text-primary underline">
              Terms & Conditions
            </Link>{" "}
            and{" "}
            <Link to="/privacy" className="text-primary underline">
              Privacy Policy
            </Link>{" "}
            of HealthBay.
          </label>
        </div>
        {validationErr && (
          <div className="text-red-600 -mt-2">{validationErr}</div>
        )}
        <FilledButton className="mt-2 mb-4 w-full">Create Account</FilledButton>
        <OutlinedButton onClick={signUpWithGoogle} className="w-full">
          <FcGoogle className="mr-4" />
          Sign up with Google
        </OutlinedButton>
        <div className="mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-primary underline">
            Log In
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Register;
