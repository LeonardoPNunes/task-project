"use client";

import { useForm } from "react-hook-form";
import { Icons } from "../ui/icons";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";

const schema = z.object({
  email: z.string().email({ message: "Email inválido" })
});

export function UserRecoveryForm({
  className,
  id,
  ...props
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: ""
    },
  });
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
  };

  return (
    <div{...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-5 w-[99%] ">

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
          <div className="flex items-center justify-center w-full mt-2">
            <Button
              className="bg-[#FDFDFC] text-[#0057B8] hover:bg-[#FDFDFC] hover:text-[#0057B8] font-[500] h-[48px] w-[90%] "
              disabled={isLoading}
            >
              {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Finalizar
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
