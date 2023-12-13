"use client";

import React, { SetStateAction, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { IUser } from "@/types";
import axios from "axios";
import { useRouter } from "next/navigation";

interface Props {
  setOpenModal: React.Dispatch<SetStateAction<boolean>>;
  setUser: React.Dispatch<SetStateAction<IUser | null>>;
  id: string;
  user: IUser | null;
}

const EditModal = ({ setOpenModal, id, user, setUser }: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit } = useForm<IUser>();

  const onSubmit: SubmitHandler<IUser> = async (values) => {
    try {
      setIsLoading(true);
      const { data } = await axios.put(
        `${process.env.NEXT_PUBLIC_DATA_URL}/${id}`,
        {
          ...values,
          modifiedAt: new Date(),
        }
      );
      setUser(data);
      setOpenModal(false);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed h-screen w-screen bg-black/30  top-0 left-0 flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[500px] bg-white rounded-[10px] flex flex-col space-y-2 p-4"
      >
        <Input
          required
          placeholder="Name"
          type="text"
          {...register("name")}
          defaultValue={user?.name}
        />
        <Input
          required
          placeholder="Username"
          type="text"
          {...register("username")}
          defaultValue={user?.username}
        />
        <Input
          required
          placeholder="Email"
          type="text"
          {...register("email")}
          defaultValue={user?.email}
        />
        <Input
          required
          placeholder="Contact"
          type="number"
          {...register("contact")}
          defaultValue={user?.contact}
        />
        <Input
          required
          placeholder="Role"
          type="text"
          {...register("roleName")}
          defaultValue={user?.roleName}
        />
        <Input
          required
          placeholder="Address"
          type="text"
          {...register("address")}
          defaultValue={user?.address}
        />
        <div className="flex  space-x-5 items-center">
          <Button type="submit" className="w-full">
            Edit
          </Button>
          <Button
            onClick={() => setOpenModal(false)}
            type="button"
            variant={"destructive"}
            className="w-full"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditModal;
