"use client";

import { useForm } from "react-hook-form";
import { Icons } from "../ui/icons";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { InputPassword } from "../ui/input-password.jsx";
import { useEffect, useState } from "react";
import bcrypt from 'bcryptjs';
import { toast } from "react-toastify";
import { signIn, getSession } from "next-auth/react";

const schema = z.object({
  email: z.string().email({ message: "Email inválido" }),
  password: z
    .string()
    .min(4, { message: "Senha precisa ser maior que 4 caracteres" }),
});

function UserAuthForm({ className, ...props }) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const navigation = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [dataSaved,setDataSaved] = useState({
    email: "",
    password: ""
  });

  
  const onSubmit = async (data) => {
    setIsLoading(true);
  
    if (dataSaved.email !== data.email) {
      setError("email", {
        type: "custom",
        message: "Usuário não encontrado",
      });
      setIsLoading(false);
      return;
    }
  
    const isValid = bcrypt.compareSync(data.password, dataSaved.password);
    if (!isValid) {
      setError("password", {
        type: "custom",
        message: "Senha incorreta",
      });
      setIsLoading(false);
      return;
    }
  
    const result = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    });
  
    if (result.error) {
      setIsLoading(false);
      toast.error('Ocorreu um erro ao entrar. Tente novamente.', {
        position: 'top-right',
        autoClose: 2000,
      });
      return;
    } else {
      toast.success('Login realizado com sucesso!', {
        position: 'top-right',
        autoClose: 3000,
      });
  
      const session = await getSession();
    console.log(session)
      if (session) {
        setTimeout(() => {
          navigation.push('/home');
        }, 2000);
      }
      
      setIsLoading(false);
    }
  };
  const handleClick = () => {
    navigation.push("/register");
  };
    useEffect(() => {
    if (typeof window !== "undefined") {
      const savedData = localStorage.getItem("dataRegister");
      
      if (savedData) {
        try {
          const parsedData = JSON.parse(savedData);
          setDataSaved(parsedData);
        } catch (error) {
          console.error("Erro ao analisar os dados", error);
        }
      } else {
      }
    }
  }, []);
  return (
    <div
      {...props}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-5 w-[99%]  ">
        <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>

            <Input
              id="email"
              placeholder="Email"
              className="placeholder-zinc-300 border-0 text-black text-[15px] rounded-none border-b-2 border-white ring-0 ring-white-500 focus:ring-offset-2  focus:outline-none  max-w-[500px] focus:rounded-sm"
              type="text"
              autoCapitalize="none"
              autoComplete="off"
              autoCorrect="off"
              {...register("email")}
            />
            {errors?.email?.message && (
              <p className="text-sm  text-center mt-2 text-gray-300">
                {errors?.email?.message}
              </p>
            )}
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Senha
            </Label>

            <InputPassword
              id="password"
              placeholder="Senha"
              className=" placeholder-zinc-300 border-0 text-black text-[15px] border-b-2 rounded-none  border-white-400 ring-0 ring-white-500 focus:ring-offset-2  focus:outline-none max-w-[500px] focus:rounded-sm"
              type="password"
              autoCapitalize="none"
              disabled={isLoading}

              {...register("password")}
            />
            {errors.password?.message && (
              <p className="text-sm  text-center mt-2 text-gray-300">
                {errors.password?.message}
              </p>
            )}
          </div>

          <Button
          type="submit"
            className="bg-[#FDFDFC] text-[#0057B8] hover:bg-[#FDFDFC] hover:text-[#0057B8] font-[500] h-[35px] w-[100%]"
            disabled={isLoading}
          >       
                {isLoading ? <Icons.spinner className="mr-2 h-4 w-4 animate-spin" /> : "Entrar"}

          </Button>
          <Button
          onClick={handleClick}
            className="bg-[#FDFDFC] text-[#0057B8] hover:bg-[#FDFDFC] hover:text-[#0057B8] font-[500] h-[38px] w-[100%]"
          >
            Cadastre-se
          </Button>
        </div>
      </form>
    </div>
  );
}

export default UserAuthForm;