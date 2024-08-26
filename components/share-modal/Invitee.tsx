import Image from "next/image";
import React, { useState } from "react";
import InviteePermissionSelector from "./InviteePermissionSelector";
import { Button } from "../ui/button";
import { removeCollaborator } from "@/lib/actions/room.actions";

const Invitee = ({ roomId, creatorId, email, invitee, user }: InviteeProps) => {
  const [inviteeType, setInviteeType] = useState(invitee.userType || "viewer");
  const [isLoading, setIsLoading] = useState(false);

  const handleRemoveCollaborator = async(email: string) => {
    setIsLoading(true);
    await removeCollaborator(roomId, email);
    setIsLoading(false);
  }
  return (
    <li className="flex items-center justify-between gap-2 py-3">
      <div className="flex mt-4 gap-2">
        <Image
          src={invitee.avatar}
          alt={invitee.name}
          height={40}
          width={40}
          className="rounded-full size-9"
        />
        <div>
          <p className="line-clamp-1 text-sm font-semibold leading-4 text-white">
            {invitee.name}
          </p>

          {isLoading && (
            <span className="text-10-regular pl-2 text-blue-100">
              "updating..."
            </span>
          )}
          <p className="text-sm font-light text-blue-100">{invitee.email}</p>
        </div>
      </div>
      {creatorId === invitee.id ? (
        <p className="text-sm text-blue-100">Owner</p>
      ) : (
        <div className="flex items-center">
          <InviteePermissionSelector
            inviteeType={inviteeType}
            setInviteeType={setInviteeType}
          />
        <Button type='submit' className="bg-red-500" onClick={() => handleRemoveCollaborator(invitee.email)}>Remove</Button>
        </div>

      )}
    </li>
  );
};

export default Invitee;
