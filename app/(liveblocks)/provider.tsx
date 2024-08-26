"use client";

import { ReactNode } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import Loader from "@/components/Loader";
import { getClerkUsers, getDocumentUsers } from "@/lib/actions/user.actions";
import { useUser } from "@clerk/nextjs";

export function Provider({ children }: { children: ReactNode }) {
  const {user: clerkUser} = useUser();
  return (
    <LiveblocksProvider
    authEndpoint="/api/liveblocks-auth"
    resolveUsers={async ({ userIds }) => {
      const users = await getClerkUsers({ userIds });
      return users;
    }}
    
    resolveMentionSuggestions={async({text, roomId}) => {
      const roomUsers = await getDocumentUsers({
        text,
        currentUser: clerkUser?.emailAddresses[0].emailAddress!,
        roomId
      });
      return roomUsers;
    }}
    >
      {/* <RoomProvider id="my-room"> */}
        <ClientSideSuspense fallback={<Loader />}>
          {children}
        </ClientSideSuspense>
      {/* </RoomProvider> */}
    </LiveblocksProvider>
  );
}
