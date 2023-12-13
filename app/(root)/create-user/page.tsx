"use client";
import CreateUser from "@/components/shared/create-user";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

const Page = () => {
  const router = useRouter();
  return (
    <div className="relative container py-2">
      <Button onClick={() => router.back()}>Back</Button>
      <CreateUser />
    </div>
  );
};

export default Page;
