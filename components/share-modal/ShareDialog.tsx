import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import Image from "next/image";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import InviteePermissionSelector from "./InviteePermissionSelector";
import Invitee from "./Invitee";
import { useSelf } from "@liveblocks/react/suspense";


const ShareDialog = ({
  currentUserType,
  collaborators,
  roomId,
  creatorId,
}: ShareDialogProps) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [inviteeType, setInviteeType] = useState<UserType>("viewer");
  const [email, setEmail] = useState("");
  const user = useSelf();

  const shareDocumentHandler = () => {};
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger
          className="gradient-blue rounded-md h-9 gap-2 px-4"
          disabled={currentUserType !== "editor"}
        >
          <div className="flex gap-2">
            <Image
              src="/assets/icons/share.svg"
              alt="share"
              height={30}
              width={30}
              className="min-w-4 md:size-5"
            />
            <p className="hidden sm:block px-2">Share</p>
          </div>
        </DialogTrigger>
        <DialogContent className="shad-dialog">
          <DialogHeader>
            <DialogTitle>Manage who can access this document</DialogTitle>
            <DialogDescription>
              Add or revoke access to collaborators by email address
            </DialogDescription>
            <div className="p-2">
              <Label htmlFor="email" className="mt-8 text-blue-100">
                Email
              </Label>
              <div className="flex items-center gap-3">
                <div className="flex flex-1 rounded-md bg-dark-400">
                  <Input
                    id="email"
                    placeholder="Enter the invitee email address"
                    value={email}
                    className="share-input"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <InviteePermissionSelector
                    inviteeType={inviteeType}
                    setInviteeType={setInviteeType}
                  />
                </div>
                <Button
                  type="submit"
                  onClick={shareDocumentHandler}
                  className="gradient-blue flex h-full gap-1 px-5"
                  disabled={isLoading}
                >
                  {isLoading ? "Sending..." : "Invite"}
                </Button>
              </div>

              <div>
                <ul>
                  {collaborators.map((collaborator) => (
                    <Invitee
                      key={collaborator.id}
                      roomId={roomId}
                      creatorId={creatorId}
                      email={collaborator.email}
                      invitee={collaborator}
                      user={user.info}
                    />
                  ))}
                </ul>
              </div>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ShareDialog;
