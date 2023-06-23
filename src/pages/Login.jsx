import React, { useState } from "react";
import loginBg from "../img/login_bg.png";
import fb from "../img/facebook.png";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import {login} from '../api';
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { loginSuccess } from "../features/login/loginSlice";
function Login() {
  const account = [
    {
      email: "user1@gmail.com",
      password: "pass1",
      firstName: "User 1",
      avatar:"https://picsum.photos/200"
    },
    {
      email: "user2@gmail.com",
      password: "pass2",
      firstName: "User 1",
      avatar:"https://picsum.photos/200"
    },
  ];
  const [errorMessage, setErrorMessage] = useState(false);
  const dispatch = useDispatch();
  let history = useHistory();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      // let checkAcc = account.find(
      //   (acc) => acc.email === values.email && acc.password === values.password
      // );
      let checkAcc = await login(values.email, values.password)
      let accData = checkAcc.data
      if (accData) {
        accData.avatar = "https://img.freepik.com/premium-vector/3d-simple-user-icon-isolated_169241-7120.jpg"
        setErrorMessage(false)
        formik.resetForm();
        dispatch(loginSuccess(accData))
        history.push("/")
        
      } else {
        setErrorMessage(true)
      }
    },
  });

  return (
    <div
      className="Login-section min-h-screen bg-cover bg-no-repeat bg-fixed bg-center"
      style={{ backgroundImage: `url(${loginBg})` }}
    >
      <div class="h-full flex items-center justify-center">
        <div class="w-96 p-4 bg-white shadow-lg my-16 text-center px-5 rounded-xl">
          <h1 className="text-xl font-semibold py-2">V I E T N A M G O</h1>
          <h1 className="text-2xl font-bold py-2">Welcome to 'local'</h1>

          <form
            className="space-y-4 md:space-y-6 text-left mt-4"
            action="#"
            onSubmit={(event) => {
              event.preventDefault();
              formik.handleSubmit(event);
            }}
          >
            <div>
							<label>
								Email<span className="text-red-500">*</span>
							</label>
              <input
                type="email"
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-500 text-gray-900 italic sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="Type your email"
                onChange={formik.handleChange}
                value={formik.values.email}
                required
              />
            </div>
            <div>
							<label>
								Password<span className="text-red-500">*</span>
							</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-500 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                onChange={formik.handleChange}
                value={formik.values.password}
                required
              />
            </div>
            {errorMessage ? <div className="error-notify">
                <h1 className="text-center text-red-500">Email or password is incorrect!</h1>
            </div> :<></>}
            <div className="flex items-center justify-between">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="remember"
                    aria-describedby="remember"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="remember" className="text-gray-400 italic">
                    Remember me
                  </label>
                </div>
              </div>
              <a
                href="#"
                className="text-sm font-medium text-primary-600 hover:underline duration-500 italic"
              >
                Forgot password?
              </a>
            </div>
            <button
              type="submit"
              className="w-full text-white bg-black border border-white focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:bg-white hover:border hover:border-black hover:text-black ease-in duration-500"
            >
              Sign in
            </button>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400 italic text-center">
              Don’t have an account yet?{" "}
              <a
                href="/register"
                className="font-medium text-primary-600 hover:underline dark:text-primary-500"
              >
                Sign up
              </a>
            </p>

            <div className="divider-or ">
              <p className=" text-center before:w-24 relative before:content-[''] before:h-px before:bg-black before:left-0 before:block before:absolute before:top-1/2 after:w-24 after:content-[''] after:h-px after:bg-black after:right-0 after:block after:absolute after:top-1/2">
                Or Sign in with
              </p>
            </div>
            <div className="another-login">
              <div className="google-login">
                <button
                  aria-label="Continue with google"
                  role="button"
                  className="focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-700 py-2.5 px-4 border rounded-lg border-gray-700 flex items-center w-full mt-5 hover:bg-slate-100"
                >
                  <img
                    src="https://tuk-cdn.s3.amazonaws.com/can-uploader/sign_in-svg2.svg"
                    alt="google"
                  />
                  <p className="text-base font-medium ml-12 text-gray-700">
                    Continue with Google
                  </p>
                </button>
              </div>
              <div className="facebook-login">
                <button
                  aria-label="Continue with facebook"
                  role="button"
                  className="focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-700 py-2.5 px-4 border rounded-lg border-gray-700 flex items-center w-full mt-5 hover:bg-slate-100"
                >
                  <img src={fb} alt="facebook" />
                  <p className="text-base font-medium ml-12 text-gray-700">
                    Continue with Facebook
                  </p>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
