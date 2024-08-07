import { ClientSideSuspense, RoomProvider } from "@liveblocks/react/suspense";
import React from "react";
import Loader from "./Loader";
import Header from "./Header";
import { Editor } from "./editor/Editor";

const CollaborativeRoom = () => {
  return (
    <RoomProvider id="my-room">
      <ClientSideSuspense fallback={<Loader />}>
        <div className="collaborative-room">
            <Header>
                <></>
            </Header>
            <Editor />
        </div>
      </ClientSideSuspense>
    </RoomProvider>
  );
};

export default CollaborativeRoom;
