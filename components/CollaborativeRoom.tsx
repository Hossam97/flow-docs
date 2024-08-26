"use client";
import { ClientSideSuspense, RoomProvider } from "@liveblocks/react/suspense";
import React, { useEffect, useRef, useState } from "react";
import Loader from "./Loader";
import Header from "./Header";
import { Editor } from "./editor/Editor";
import ActiveCollaborators from "./ActiveCollaborators";
import DocumentTitleEditor from "./ui/DocumentTitleEditor";
import ShareModal from "./share-modal/ShareModal";

const CollaborativeRoom = ({
  roomId,
  roomMetadata,
  users,
  currentUserType,
}: CollaborativeRoomProps) => {
  return (
    <RoomProvider id={roomId}>
      <ClientSideSuspense fallback={<Loader />}>
        <div className="collaborative-room">
          <Header>
            <DocumentTitleEditor
              roomId={roomId}
              documentTitle={roomMetadata.title}
            />
            <span className="view-only-tag">{currentUserType === 'viewer' && 'View only'}</span>
            <div className="flex w-full flex-1 justify-end gap-2">
              <ActiveCollaborators />
              <ShareModal
                roomId={roomId}
                creatorId={roomMetadata.creatorId}
                collaborators={users!}
                currentUserType={currentUserType!}
              />
            </div>
          </Header>
          <Editor roomId={roomId} currentUserType={currentUserType!} />
        </div>
      </ClientSideSuspense>
    </RoomProvider>
  );
};

export default CollaborativeRoom;
