import React from "react";
import { Link, useHistory } from "react-router-dom";

import { FaArrowLeft } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

import CircleIconButton from "../components/CircleIconButton";
import InputField from "../components/InputField";
import FilledButton from "../components/FilledButton";
import OutlinedButton from "../components/OutlinedButton";

function Register() {
  const history = useHistory();

  return (
    <div className="flex flex-col justify-center">
      <CircleIconButton
        className="mt-4 ml-2"
        icon={<FaArrowLeft />}
        onClick={history.goBack}
      />
      <div className="flex flex-row justify-between items-end pl-6 mb-4 -mt-2">
        <div className="font-bold text-4xl underline pb-2">Create Account</div>
        <img src="/assets/images/create-acc.png" />
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
          <input type="checkbox" id="agree" className="bg-primary w-6 h-6" />
          <label for="agree">
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
        <FilledButton className="mt-6 mb-4 w-full">Create Account</FilledButton>
        <OutlinedButton className="w-full">
          <FcGoogle className="mr-4" />
          Sign up with Google
        </OutlinedButton>
        <div className="mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-primary underline">
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
