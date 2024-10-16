"use client";
import React from "react";
import { UserRecoveryForm } from "../../components/recovery/user-recovery";
import "../../app/globals.css";

export default function RecoveryScreen() {

  return (
    <div className="  relative h-screen w-full flex-col items-center justify-center flex  bg-[#0057B8]">
     <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-yellow-500 mb-10">
            Esqueci a senha
      </h1>
      <UserRecoveryForm />
    </div>
  );
}
