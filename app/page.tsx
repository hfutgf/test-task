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

export default function Home() {
  const [allUsers, setAllUsers] = useState<IUser[]>([]);
  const [users, setUsers] = useState<IUser[]>([]);
  const [isLoading, setIsLoading] = useState(false);

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
              {users.map((user) => (
                <User
                  users={users}
                  setUsers={setUsers}
                  user={user}
                  setIsLoading={setIsLoading}
                />
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
