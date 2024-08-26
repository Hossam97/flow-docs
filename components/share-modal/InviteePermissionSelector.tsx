import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const InviteePermissionSelector = ({
  inviteeType,
  setInviteeType,
}: {
  inviteeType: UserType;
  setInviteeType: React.Dispatch<React.SetStateAction<UserType>>;
}) => {
    const changeInviteeTypeHandler = (type: string) => {
        setInviteeType(type as UserType);
    }
  return (
    <Select value={inviteeType} onValueChange={(type: string) => changeInviteeTypeHandler(type)}>
      <SelectTrigger className="shad-select">
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="border-none bg-dark-200">
        <SelectItem value="viewer" className="shad-select-item">Viewer</SelectItem>
        <SelectItem value="editor" className="shad-select-item">Editor</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default InviteePermissionSelector;
