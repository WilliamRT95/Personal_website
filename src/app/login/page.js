"use client";
import { useState } from "react";
import Navbar from "../ui/Navbar";
import Image from "next/image";
import Footer from "../ui/footer";

export default function Page() {
  const [activeTab, setActiveTab] = useState("signin"); // 'signin' or 'login'

  const toggleTab = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      <Navbar />
      <div className='min-h-screen flex flex-col items-center justify-center p-4 md:pt-20 rounded-2xl'>
        <div className='relative inline-block font-caveat'>
          <Image
            src='/images/profilepic.png'
            alt='profile picture'
            width={75}
            height={64.2}
            className='block transition-all duration-300 ease-out'
            style={{
              position: "fixed",
              top: "20px",
              left: "20px",
              zIndex: 100,
              marginTop: 0,
            }}
          />
        </div>
        <div className='rounded-2xl mt-1 max-w-5xl max-h-full w-full flex flex-row border-2 border-solid border-gray-200 shadow-[0_3px_12px_0,0_1px_2px_0] shadow-gray-200 bg-white'>
          {/* Sign Up Section */}
          <div
            onClick={() => toggleTab("signin")}
            className={`transition-all duration-500 relative ${
              activeTab === "signin"
                ? "w-4/5 md:w-3/5 p-8 z-10"
                : "w-1/5 md:w-2/5 p-6 z-0 m-1 blur-[0.5px] bg-[url(/images/arches.png)] [writing-mode:vertical-rl] md:[writing-mode:horizontal-tb]"
            }`}
          >
            <h2 className='text-2xl font-bold text-gray-800 mb-6'>Sign up</h2>
            <form
              className={`${
                activeTab === "signin" ? "block" : "hidden md:block"
              }`}
            >
              <div className='space-y-4'>
                <div>
                  <label
                    className='block text-gray-700 mb-2'
                    htmlFor='signup-name'
                  >
                    Full Name
                  </label>
                  <input
                    id='signup-name'
                    type='text'
                    className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-300 ease-in-out animated-glow'
                    placeholder='Enter your name'
                  />
                </div>
                <div>
                  <label
                    className='block text-gray-700 mb-2'
                    htmlFor='signup-email'
                  >
                    Email Address
                  </label>
                  <input
                    id='signup-email'
                    type='email'
                    className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-300 ease-in-out animated-glow'
                    placeholder='Enter your email'
                  />
                </div>
                <div>
                  <label
                    className='block text-gray-700 mb-2'
                    htmlFor='signup-password'
                  >
                    Password
                  </label>
                  <input
                    id='signup-password'
                    type='password'
                    className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-300 ease-in-out animated-glow'
                    placeholder='Create a password'
                  />
                </div>
                <div>
                  <label
                    className='block text-gray-700 mb-2'
                    htmlFor='signup-confirm'
                  >
                    Confirm Password
                  </label>
                  <input
                    id='signup-confirm'
                    type='password'
                    className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-300 ease-in-out animated-glow'
                    placeholder='Confirm your password'
                  />
                </div>
                <div className='flex items-center'>
                  <input
                    id='terms'
                    type='checkbox'
                    className='h-4 w-4 text-blue-600'
                  />
                  <label htmlFor='terms' className='ml-2 text-sm text-gray-600'>
                    I agree to the{" "}
                    <a href='#' className='text-buttons hover:underline'>
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href='#' className='text-buttons hover:underline'>
                      Privacy Policy
                    </a>
                  </label>
                </div>
                <button
                  type='submit'
                  className='w-full bg-buttons text-white py-2 px-4 rounded-lg hover:bg-buttons-hoover transition-colors font-medium'
                >
                  Sign Up
                </button>
              </div>
            </form>

            {/* Overlay for signup section */}
            {activeTab !== "signin" && (
              <div
                className='absolute inset-0 bg-nav mix-blend-multiply rounded-2xl flex items-center justify-center cursor-pointer'
                onClick={() => toggleTab("signin")}
              ></div>
            )}
          </div>

          {/* Login Section */}
          <div
            onClick={() => toggleTab("login")}
            className={`transition-all duration-500 relative ${
              activeTab === "login"
                ? "w-4/5 md:w-3/5 p-8 z-10"
                : "w-1/5 md:w-2/5 p-6 m-1 blur-[0.5px] bg-[url(/images/arches.png)] [writing-mode:vertical-rl] md:[writing-mode:horizontal-tb]"
            }`}
          >
            <h2 className='text-2xl font-bold text-gray-800 mb-6'>Log in</h2>
            <form
              className={`${
                activeTab === "login" ? "block" : "hidden md:block"
              }`}
            >
              <div className='space-y-4'>
                <div>
                  <label
                    className='block text-gray-700 mb-2'
                    htmlFor='login-email'
                  >
                    Email Address
                  </label>
                  <input
                    id='login-email'
                    type='email'
                    className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                    placeholder='Enter your email'
                  />
                </div>
                <div>
                  <label
                    className='block text-gray-700 mb-2'
                    htmlFor='login-password'
                  >
                    Password
                  </label>
                  <input
                    id='login-password'
                    type='password'
                    className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                    placeholder='Enter your password'
                  />
                </div>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center'>
                    <input
                      id='remember'
                      type='checkbox'
                      className='h-4 w-4 text-buttons'
                    />
                    <label
                      htmlFor='remember'
                      className='ml-2 text-sm text-gray-600'
                    >
                      Remember me
                    </label>
                  </div>
                  <a href='#' className='text-sm text-buttons hover:underline'>
                    Forgot Password?
                  </a>
                </div>
                <button
                  type='submit'
                  className='w-full bg-buttons text-white py-2 px-4 rounded-lg hover:bg-buttons-hoover transition-colors font-medium'
                >
                  Log In
                </button>
              </div>
            </form>
            <div
              className={`mt-6 ${
                activeTab === "login" ? "block" : "hidden md:block"
              }`}
            >
              <div className='relative'>
                <div className='absolute inset-0 flex items-center'>
                  <div className='w-full border-t border-gray-300'></div>
                </div>
                <div className='relative flex justify-center text-sm'>
                  <span className='px-2 bg-white text-gray-500'>
                    Or continue with
                  </span>
                </div>
              </div>
              <div className='mt-6 grid grid-cols-2 gap-3'>
                <button className='w-full flex items-center justify-center px-3 py-2 border rounded-lg text-gray-700 hover:border-buttons-hoover'>
                  <svg className='h-5 w-5 mr-2' viewBox='0 0 24 24'>
                    <path
                      d='M12.545 10.239v3.821h5.445c-0.643 2.507-2.836 4.298-5.445 4.298-3.226 0-5.845-2.619-5.845-5.845s2.619-5.845 5.845-5.845c1.324 0 2.545 0.446 3.521 1.197l2.665-2.665c-1.701-1.585-3.977-2.558-6.186-2.558-5.259 0-9.518 4.259-9.518 9.518s4.259 9.518 9.518 9.518c5.259 0 9.518-4.259 9.518-9.518 0-0.635-0.063-1.263-0.191-1.861l-9.327-0.060z'
                      fill='#4285F4'
                    />
                    <path
                      d='M12.545 10.239l9.327 0.060c0.127 0.598 0.191 1.226 0.191 1.861 0 5.259-4.259 9.518-9.518 9.518-5.259 0-9.518-4.259-9.518-9.518s4.259-9.518 9.518-9.518c2.209 0 4.485 0.973 6.186 2.558l-2.665 2.665c-0.975-0.751-2.197-1.197-3.521-1.197-3.226 0-5.845 2.619-5.845 5.845s2.619 5.845 5.845 5.845c2.609 0 4.802-1.791 5.445-4.298h-5.445v-3.821z'
                      fill='none'
                    />
                  </svg>
                  Google
                </button>
                <button className='w-full flex items-center justify-center px-3 py-2 border rounded-lg text-gray-700 hover:border-buttons-hoover'>
                  <svg className='h-5 w-5 mr-2' viewBox='0 0 24 24'>
                    <path
                      d='M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z'
                      fill='#3b5998'
                    />
                  </svg>
                  Facebook
                </button>
              </div>
            </div>

            {/* Overlay for login section */}
            {activeTab !== "login" && (
              <div
                className='absolute inset-0 bg-nav mix-blend-multiply rounded-2xl flex items-center justify-center cursor-pointer'
                onClick={() => toggleTab("login")}
              ></div>
            )}
          </div>
        </div>
        <div className='text-gray-400 mx-4 my-1'>
          <p>
            *This is not a functional login form. It is a display of the
            switcher functionality from log in to sign up.
          </p>
        </div>
      </div>

      <Footer />
    </>
  );
}
