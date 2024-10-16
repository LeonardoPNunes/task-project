"use client";
import { useEffect, useContext, useState } from "react";
import users from "../../mocks/listUsers.js";
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import PaginatedUserList from "../usersList/userList.jsx";
import { UserContext } from "../../context/userContext.js";

function Home({ className, ...props }) {
  const { data, setData } = useContext(UserContext);
  const router = useRouter();
  const [sessionData,setSessionData] = useState({});

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedData = localStorage.getItem("dataRegister");
      if (storedData) {
        setData(JSON.parse(storedData));
      }
    }
  }, [setData]);

  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession();
      setSessionData(session);

      if (!session?.user) {
        router.push('/login');
      }
    };

    fetchSession();
  }, [router]);

  if (sessionData) {
    return (
      <div {...props} className={`p-6 bg-gray-100 w-9/12 ${className}`}>
        <div className="mb-6 p-4 bg-blue-500 rounded-lg shadow-md text-white">
          <h2 className="text-xl font-semibold">Olá, {data?.name}</h2>
          <p className="mt-2">Seus dados são:</p>
          <div className="mt-2">
            <p>Email: {data?.email}</p>
            <p>CEP: {data?.cep}</p>
            <p>Estado: {data?.state}</p>
            <p>Cidade: {data?.city}</p>
            <p>Bairro: {data?.neighborhood}</p>
            <p>Rua: {data?.road}</p>
            <p>Número: {data?.numberlocation}</p>
          </div>
        </div>
  
        <PaginatedUserList users={users} />
      </div>
    );
  }

  return null;
}

export default Home;
