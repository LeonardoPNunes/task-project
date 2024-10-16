"use client";

import React from "react";
import UserAuthForm from "../../components/auth/userAuth";
import Link from "next/link";
import "../../app/globals.css";


export default function LoginScreen() {


  return (
    <div className="  relative h-screen w-full flex-col  items-center justify-center flex  bg-[#0057B8] text-center">
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-yellow-500 mb-10">
            Login
        </h1>
        <UserAuthForm />

        <div className="flex flex-col justify-center items-center  ">
          <div className="flex flex-row absolute gap-3  bottom-[80px]">
            <p className="text-center  justify-center items-center  text-white flex flex-row  text-sm   ">
              Esqueceu a senha ?
            </p>
            <Link 
            href="/recovery"
            className="text-white text-sm font-[500]  cursor-pointer "
            >   
                Recupere aqui
            </Link>
          </div>
        </div>
    </div>
  );
}
