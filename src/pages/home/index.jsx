"use client";

import React from "react";
import Home from "@/components/home/home";
import "../../app/globals.css";
import { getSession, SessionProvider } from "next-auth/react";
import { UserProvider } from "../../context/userContext";

export async function getServerSideProps(context) {
  const session = await getSession(context);
  return {
    props: {
      session,
    },
  };
}
export default function HomeScreen({ session }) {
  return (
    <div className="items-center justify-center flex min-h-screen bg-[#0057B8] py-10">
      <SessionProvider session={session}>
        <UserProvider>
            <Home />
        </UserProvider>
      </SessionProvider>

    </div>
  );
}
