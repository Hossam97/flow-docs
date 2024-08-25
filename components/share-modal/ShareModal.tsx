import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import React, { useState } from "react";
import { Button } from "../ui/button";
import ShareDialog from "./ShareDialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

const ShareModal = ({
  roomId,
  creatorId,
  currentUserType,
  collaborators,
}: ShareDocumentDialogProps) => {


  return (
      <ShareDialog
        currentUserType={currentUserType}
        collaborators={collaborators}
        creatorId={creatorId}
        roomId={roomId}
      />
  );
};

export default ShareModal;
