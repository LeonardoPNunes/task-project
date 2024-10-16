"use client";

import React from "react";
import "../../app/globals.css";
import UserRegisterForm from "../../components/register/user-register";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function RegisterScreen() {
  return (
    <div>

    <div className="items-center justify-center flex flex-col min-h-screen bg-[#0057B8] py-10">
      <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-yellow-500 mb-10">
        Cadastre-se
      </h1>
      <UserRegisterForm />
    </div>
      <ToastContainer />
    </div>
  );
}
