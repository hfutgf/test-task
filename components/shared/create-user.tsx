"use client";

import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { IUser } from "@/types";

const CreateUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const { register, handleSubmit } = useForm<IUser>();

  const onSubmit: SubmitHandler<IUser> = async (data) => {
    try {
      setIsLoading(true);
      await axios.post(`${process.env.NEXT_PUBLIC_DATA_URL}`, {
        ...data,
        createdAt: new Date(),
        modifiedAt: null,
      });
      router.push("/");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <div className="flex  items-center w-full min-h-screen justify-center">
      {isLoading && (
        <div className="fixed w-screen h-screen top-0 left-0 flex items-center justify-center bg-black/10">
          <Loader2 className="animate-spin  text-black" size={32} />
        </div>
      )}
      <form
        className="flex flex-col items-center w-[300px] space-y-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input required placeholder="Name" type="text" {...register("name")} />
        <Input
          required
          placeholder="Username"
          type="text"
          {...register("username")}
        />
        <Input
          required
          placeholder="Email"
          type="text"
          {...register("email")}
        />
        <Input
          required
          placeholder="Contact"
          type="number"
          {...register("contact")}
        />
        <Input
          required
          placeholder="Role"
          type="text"
          {...register("roleName")}
        />
        <Input
          required
          placeholder="Address"
          type="text"
          {...register("address")}
        />
        <Button className="w-full" variant="outline">
          Add
        </Button>
      </form>
    </div>
  );
};

export default CreateUser;
