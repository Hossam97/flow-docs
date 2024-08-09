"use client"
import { ClientSideSuspense, RoomProvider } from "@liveblocks/react/suspense";
import React from "react";
import Loader from "./Loader";
import Header from "./Header";
import { Editor } from "./editor/Editor";
import ActiveCollaborators from "./ActiveCollaborators";

const CollaborativeRoom = ({roomId, roomMetadata}: CollaborativeRoomProps) => {
  return (
    <RoomProvider id={roomId}>
      <ClientSideSuspense fallback={<Loader />}>
        <div className="collaborative-room">
          <Header>
            <div className="flex w-full flex-1 justify-end gap-2">
              <ActiveCollaborators />
            </div>
          </Header>
          <Editor />
        </div>
      </ClientSideSuspense>
    </RoomProvider>
  );
};

export default CollaborativeRoom;
