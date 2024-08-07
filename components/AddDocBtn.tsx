"use client";

import { createDocument } from "@/lib/actions/room.actions";
import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

const AddDocBtn = ({ userId, email }: AddDocumentBtnProps) => {
  const router = useRouter();
  const handleAddDocument = async () => {
    const room = await createDocument({ userId, email });
    if (room) router.push(`/documents/${room.id}`);
  };

  return (
    <Button
      type="submit"
      onClick={handleAddDocument}
      className="gradient-blue flex gap-1 shadow-md"
    >
      <Image
        src="assets/icons/add.svg"
        alt="Add a document"
        height={30}
        width={30}
      />
      <p className="hidden sm:block">Create a new document</p>
    </Button>
  );
};

export default AddDocBtn;
