"use client";
import EditModal from "@/components/modals/edit-modal";
import { Button } from "@/components/ui/button";
import { IUser } from "@/types";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import copy from "copy-text-to-clipboard";
import dateFormat from "dateformat";

interface Props {
  params: { userId: string };
}

const Page = ({ params }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<IUser>();
  const [opentModal, setOpenModal] = useState(false);

  const router = useRouter();

  const getUser = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_DATA_URL}/${params.userId}`
      );
      setUser(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      setIsLoading(true);
      await axios.delete(`${process.env.NEXT_PUBLIC_DATA_URL}/${id}`);
      router.push("/");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const onBack = () => {
    router.back();
  };

  return (
    <div className="relative container mx-auto flex items-start py-3 gap-[16px]">
      {opentModal && (
        <EditModal
          setUser={setUser}
          user={user}
          setOpenModal={setOpenModal}
          id={params.userId}
        />
      )}
      {isLoading ? (
        <div className="fixed w-screen min-h-screen top-0 left-0 flex items-center justify-center bg-black/20 ">
          <Loader2 className="animate-spin text-black" size={32} />
        </div>
      ) : (
        <>
          <Button onClick={onBack} variant={"default"}>
            Back
          </Button>
          <div className="flex flex-col space-y-2">
            <p>Name: {user?.name}</p>
            <p>Username: {user?.username}</p>
            <p
              className="hover:border-b-[1px] hover:border-black"
              onClick={() => {
                // copy(user.email);
              }}
            >
              Email: {user?.email}
            </p>
            <p>Contact: {user?.contact}</p>
            <p>Role: {user?.roleName}</p>
            <p>Address: {user?.address}</p>
            <p>CreatedAt: {dateFormat(user?.createdAt)}</p>
            <p>
              ModifiedAt:{" "}
              {user?.modifiedAt
                ? dateFormat(user?.modifiedAt)
                : "The user has not changed his data yet!"}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={() => setOpenModal(true)} variant={"outline"}>
              Edit
            </Button>
            <Button
              onClick={() => handleDelete(params.userId)}
              variant={"destructive"}
            >
              Delete
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Page;
