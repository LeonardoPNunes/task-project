"use client";

import { useForm } from "react-hook-form";
import { Icons } from "../ui/icons.jsx";
import { Button } from "../ui/button.jsx";
import { Input } from "../ui/input.jsx";
import { Label } from "../ui/label.jsx";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { InputPassword } from "../ui/input-password.jsx";
import { useEffect, useState } from "react";
import bcrypt from 'bcryptjs';
import api from "@/services/api.js";
import { toast } from "react-toastify";

const schema = z.object({
    name: z.string().min(7, { message: "Nome precisa ser maior que 4 caracteres" }),
    email: z.string().email({ message: "Email inválido" }),
    password: z
    .string()
    .min(4, { message: "Senha precisa ser maior que 4 caracteres" }),
    confirmPassword: z
    .string()
    .min(4, { message: "Senha precisa ser maior que 4 caracteres" }),
    cep: z.string().min(8, { message: "CEP inválido" }),
    state: z.string().min(3, { message: "Estado inválido" }),
    city: z.string().min(3, { message: "Cidade inválida" }),
    road: z.string().min(3, { message: "Rua inválida" }),
    neighborhood: z.string().min(3, { message: "Bairro inválido" }),
    numberlocation: z.number().min(1, { message: "Numero inválido" }),
});

function UserRegisterForm({ className, ...props }) {
  
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name:"",
      email: "",
      password: "",
      confirmPassword: "",
      cep: "",
      state:"",
      city: "",
      neighborhood: "",
      road: "",
      numberlocation: 0,
    },
  });
  const watchcep = watch("cep");
  const navigation = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const onSubmit = async (data) => {
    setIsLoading(true);
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(data.password, saltRounds);
    try {
      if (data?.password != data?.confirmPassword) {
        setError("confirmPassword", {
          type: "custom",
          message: "As senhas precisam ser iguais",
        })
        setIsLoading(false);
        return;
      }
        const response = {
          name: data.name,
          email: data.email,
          password: hashedPassword,
          cep: data.cep,
          state: data.state,
          city: data.city,
          neighborhood: data.neighborhood,
          road: data.road,
          numberlocation: data.numberlocation,
        }
        localStorage.setItem('dataRegister', JSON.stringify(response))
        
        toast.success('Cadastro realizado com sucesso!', {
          position: 'top-right',
          autoClose: 3000,
        });
        setIsLoading(true);
        setTimeout(() => {
          navigation.push("login");
        }, 1000);
        setIsLoading(false);
        reset();
    } catch (error) {
      setIsLoading(false);
      toast.error('Ocorreu um erro ao registrar. Tente novamente.', {
        position: 'top-right',
        autoClose: 2000,
    });
    }
  };

  useEffect(() => {
    async function handleSearch(){
      setIsLoading(true);
      try{
        const response = await api.get(`${watchcep}/json`);
        const address = {
          cep:response?.data?.cep, 
          state:response?.data?.estado, 
          city:response?.data?.localidade, 
          neighborhood:response?.data?.bairro, 
          road:response?.data?.logradouro,
        };
        Object.entries(address).forEach(([key, value]) => {
          setValue(key, value);
        });
        setIsLoading(false);
      }catch(err){
        alert("Não foi possivel encontrar esse CEP");
        setIsLoading(false);
  
      }
    }
    if (watchcep?.length === 8) {
      handleSearch();
    }

  }, [watchcep?.length]);
  return (
    <div
      {...props}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-5 w-[99%] ">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Cidade
            </Label>

            <Input
              id="name"
              placeholder="Nome Completo"
              className="placeholder-zinc-300 border-0 text-black text-[15px] rounded-none border-b-2 border-white ring-0 ring-white-500 focus:ring-offset-2  focus:outline-none  max-w-[500px] focus:rounded-sm"
              type="text"
              autoCapitalize="none"
              autoComplete="off"
              autoCorrect="off"
              {...register("name")}
            />
            {errors.name?.message && (
              <p className="text-sm  text-center mt-2 text-gray-300">
                {errors.name?.message}
              </p>
            )}
          </div>
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
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Confirme a senha
            </Label>

            <InputPassword
              id="confirmPassword"
              placeholder="Confirme a senha"
              className=" placeholder-zinc-300 border-0 text-black text-[15px] border-b-2 rounded-none  border-white-400 ring-0 ring-white-500 focus:ring-offset-2  focus:outline-none max-w-[500px] focus:rounded-sm"
              type="password"
              autoCapitalize="none"
              disabled={isLoading}
              {...register("confirmPassword")}
            />
            {errors.confirmPassword?.message && (
              <p className="text-sm  text-center mt-2 text-gray-300">
                {errors.confirmPassword?.message}
              </p>
            )}
          </div>

          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              CEP
            </Label>

            <Input
              id="cep"
              placeholder="CEP"
              className="placeholder-zinc-300 border-0 text-black text-[15px] rounded-none border-b-2 border-white ring-0 ring-white-500 focus:ring-offset-2  focus:outline-none  max-w-[500px] focus:rounded-sm"
              type="text"
              autoCapitalize="none"
              autoComplete="off"
              autoCorrect="off"
              disabled={isLoading}
              {...register("cep")}
            />
            {errors.cep?.message && (
              <p className="text-sm  text-center mt-2 text-gray-300">
                {errors.cep?.message}
              </p>
            )}
          </div>
          
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Estado
            </Label>

            <Input
              id="state"
              placeholder="Estado"
              className="placeholder-zinc-300 border-0 text-black text-[15px] rounded-none border-b-2 border-white ring-0 ring-white-500 focus:ring-offset-2  focus:outline-none  max-w-[500px] focus:rounded-sm"
              type="text"
              autoCapitalize="none"
              autoComplete="off"
              autoCorrect="off"
              disabled={true}
              onChange={() => setValue("state", data.state)}
              {...register("state")}
            />
            {errors.state?.message && (
              <p className="text-sm  text-center mt-2 text-gray-300">
                {errors.state?.message}
              </p>
            )}
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Cidade
            </Label>

            <Input
              id="city"
              placeholder="Cidade"
              className="placeholder-zinc-300 border-0 text-black text-[15px] rounded-none border-b-2 border-white ring-0 ring-white-500 focus:ring-offset-2  focus:outline-none  max-w-[500px] focus:rounded-sm"
              type="text"
              autoCapitalize="none"
              autoComplete="off"
              autoCorrect="off"
              disabled={true}
              {...register("city")}
            />
            {errors.city?.message && (
              <p className="text-sm  text-center mt-2 text-gray-300">
                {errors.city?.message}
              </p>
            )}
          </div>

          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Bairro
            </Label>

            <Input
              id="neighborhood"
              placeholder="Bairro"
              className="placeholder-zinc-300 border-0 text-black text-[15px] rounded-none border-b-2 border-white ring-0 ring-white-500 focus:ring-offset-2  focus:outline-none  max-w-[500px] focus:rounded-sm"
              type="text"
              autoCapitalize="none"
              autoComplete="off"
              autoCorrect="off"
              disabled={true}
              {...register("neighborhood")}
            />
            {errors.neighborhood?.message && (
              <p className="text-sm  text-center mt-2 text-gray-300">
                {errors.neighborhood?.message}
              </p>
            )}
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Rua
            </Label>

            <Input
              id="road"
              placeholder="Rua"
              className="placeholder-zinc-300 border-0 text-black text-[15px] rounded-none border-b-2 border-white ring-0 ring-white-500 focus:ring-offset-2  focus:outline-none  max-w-[500px] focus:rounded-sm"
              type="text"
              autoCapitalize="none"
              autoComplete="off"
              autoCorrect="off"
              disabled={true}
              {...register("road")}
            />
            {errors.road?.message && (
              <p className="text-sm  text-center mt-2 text-gray-300">
                {errors.road?.message}
              </p>
            )}
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Numero
            </Label>

            <Input
              id="numberlocation"
              placeholder="Numero"
              className="placeholder-zinc-300 border-0 text-black text-[15px] rounded-none border-b-2 border-white ring-0 ring-white-500 focus:ring-offset-2  focus:outline-none  max-w-[500px] focus:rounded-sm"
              type="number"
              autoCapitalize="none"
              autoComplete="off"
              autoCorrect="off"
              disabled={isLoading}
              {...register("numberlocation",{
                valueAsNumber: true,
              })}
            />
            {errors.numberlocation?.message && (
              <p className="text-sm  text-center mt-2 text-gray-300">
                {errors.numberlocation?.message}
              </p>
            )}
          </div>
          <Button
            type="submit"
            className="bg-[#FDFDFC] text-[#0057B8] hover:bg-[#FDFDFC] hover:text-[#0057B8] font-[500] h-[38px] w-[100%]"
            disabled={isLoading}
          >
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Entrar
          </Button>
        </div>
      </form>
    </div>
  );
}

export default UserRegisterForm;