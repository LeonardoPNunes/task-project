"use client";
import react, { useEffect, useContext } from "react";
import users from "../../mocks/listUsers.js";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import PaginatedUserList from "../usersList/userList.jsx";
import { UserContext } from "../../context/userContext.js";

function Home({ className, ...props }) {
  const {data, setData} = useContext(UserContext);
  const { data: session, status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== "undefined") {
      setData(JSON.parse(localStorage.getItem("dataRegister")));
    }
  }, []);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
    if (status === 'loading') {
      return <div>Carregando...</div>;
    }
  }, [status, router]);
  
  return (
    status !== 'unauthenticated' &&
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

      <PaginatedUserList users={users}/>
    </div>
  );
}

export default Home;
