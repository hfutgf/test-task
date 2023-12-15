"use client";

import User from "@/components/shared/user";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import debounce from "lodash.debounce";
import axios from "axios";
import { useEffect, useState } from "react";
import { IUser } from "@/types";
import { Loader2 } from "lucide-react";
import { Table, TableBody } from "@/components/ui/table";
import { DatePicker } from "@/components/shared/date-picker";

export default function Home() {
  const [allUsers, setAllUsers] = useState<IUser[]>([]);
  const [users, setUsers] = useState<IUser[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [date, setDate] = useState<Date>();

  const getUsers = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_DATA_URL}`);
      setUsers(data);
      setAllUsers(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const onInput = async (e: any) => {
    const text = e.target.value;
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_DATA_URL}?name=${text}`
      );
      setUsers(data);
      if (!text.length) {
        setUsers(allUsers);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onSort = async (e: any) => {
    const value = e.target.value;

    try {
      setIsLoading(true);
      if (value === "user" || value === "admin") {
        const data = allUsers.filter(
          (u) => u.roleName.toLocaleLowerCase() === value.toLocaleLowerCase()
        );
        setUsers(data);
      } else {
        setUsers(allUsers);
      }

      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const change = date?.toString().split(" ").splice(0, 3).join(" ");
    if (change) {
      const filterUsers = allUsers.filter(
        (u) =>
          new Date(u.createdAt).toString().split(" ").splice(0, 3).join(" ") ===
          change
      );
      setUsers(filterUsers);
    } else {
      setUsers(allUsers);
    }
  }, [date]);

  return (
    <div className="container mx-auto py-2 relative">
      <div className="flex items-center">
        <Button>
          <Link href={"/create-user"}>Create User</Link>
        </Button>
        <form className="flex items-center ml-20 gap-2">
          <Input
            onInput={debounce(onInput, 500)}
            placeholder="Search by name..."
          />
          <Button variant={"secondary"} type="submit">
            Search
          </Button>
        </form>

        <div className="ml-20">
          <select onChange={onSort}>
            <option value="all">All</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div className="ml-20">
          <DatePicker date={date} setDate={setDate} />
        </div>
      </div>
      <div className="mt-2">
        <div>
          {isLoading && (
            <div className="fixed w-screen min-h-screen top-0 left-0 flex items-center justify-center bg-black/20 ">
              <Loader2 className="animate-spin text-black" size={32} />
            </div>
          )}
          <Table>
            <TableBody>
              {!users.length ? (
                <p className="flex items-center justify-center text-[32px] fixed min-h-full w-screen left-0 ">
                  Users does not exist
                </p>
              ) : (
                users.map((user) => (
                  <User
                    key={user.id}
                    users={users}
                    setUsers={setUsers}
                    user={user}
                    setIsLoading={setIsLoading}
                  />
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
