import React, { useState } from "react";
import { validateEmail } from "../../utils/helper";
import PasswordInput from "../../components/Input/PasswordInput";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosinstance";
import Header from "../../components/Header/Header";

const SignUp = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const Navigate = useNavigate()

  const handleSignUp = async (e) => {
    e.preventDefault();

    // validate user name
    if (!userName) {
      setError("Please enter a user name.");
      return;
    }

    // validate email
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    // validate password
    if (!password) {
      setError("Please enter the password.");
      return;
    } 
    // validate password confirm
    if (!confirmPassword) {
      setError("Please enter the confirm password.");
      return;
    } else if (confirmPassword != password) {
      setError("The password do not match.");
      return;
    }

    setError("");

    // CAll API sign up
    try {
      const response = await axiosInstance.post("/create-account", {
        fullName: userName,
        email: email,
        password: password}
      )
      // handle successful register response
      if (response.data && response.data.error) {
        setError(response.data.message)
        return
      }
      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken)
        Navigate("/dashboard")
      }
    } catch (error) {
      // handle register error
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message)
      } else {
        setError("An unexpected error occurred. Please try again.")
      }
    }
  };

  return (
    <>
      <Header />

      <div className="flex items-center justify-center mt-28">
        <div className="w-96 border rounded bg-white px-7 py-10">
          <form onSubmit={handleSignUp}>
            <h4 className="text-2xl mb-7">Sign Up</h4>
            <input
              type="text"
              placeholder="User Name"
              className="input-box focus-within:bg-blue-50"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Email"
              className="input-box focus-within:bg-blue-50"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <PasswordInput
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {error && <p className="text-red-500 text-xs pb-1">{error}</p>}
            <button type="submit" className="btn-primary">
              Create Account
            </button>
            <p className="text-sm text-center mt-4">
              Already have an account?{"   "}
              <Link to="/login" className="text-blue-700 font-bold underline">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
