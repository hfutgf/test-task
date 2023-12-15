"use client";
import axios from "axios";
import React, { SetStateAction, useEffect, useState } from "react";
import { TableCell, TableRow } from "../ui/table";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { IUser } from "@/types";

interface Props {
  user: IUser;
  users: IUser[];
  setUsers: React.Dispatch<SetStateAction<IUser[]>>;
  setIsLoading: React.Dispatch<SetStateAction<boolean>>;
}

const User = ({ setUsers, user, users, setIsLoading }: Props) => {
  const router = useRouter();

  const clickToCell = (id: string) => {
    router.push(`/profile/${id}`);
  };

  const handleDelete = async (e: any, id: string) => {
    e.stopPropagation();
    try {
      setIsLoading(true);
      await axios.delete(`${process.env.NEXT_PUBLIC_DATA_URL}/${id}`);
      setIsLoading(false);
      const filterUsers = users.filter((u) => u.id !== id);
      setUsers(filterUsers);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <TableRow
      className="cursor-pointer "
      onClick={() => clickToCell(user.id)}
      key={user.id}
    >
      <TableCell className="font-medium">{user.name}</TableCell>
      <TableCell>{user.username}</TableCell>
      <TableCell>{user.email}</TableCell>
      <TableCell>{user.roleName}</TableCell>
      <TableCell>{user.address}</TableCell>
      <TableCell className="text-right">{user.contact}</TableCell>

      <TableCell>
        <Button
          onClick={(e) => handleDelete(e, user.id)}
          variant={"destructive"}
        >
          Delete
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default User;
