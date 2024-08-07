"use server";
import { nanoid } from "nanoid";
import { liveblocks } from "../liveblocks";
import { revalidatePath } from "next/cache";
import { parseStringify } from "../utils";

export const createDocument = async ({
  userId,
  email,
}: CreateDocumentParams) => {
  const roomId = nanoid();
    const usersAccesses: RoomAccesses = {
        [email]: ["room:write"]
    }
    const documentMetadata = {
        title: 'Untitled document',
        creatorId: userId,
        email
    }

  try {
    const room = await liveblocks.createRoom(roomId, {
        defaultAccesses: [],
        usersAccesses,
        metadata: documentMetadata
      });
      revalidatePath('/');

      return parseStringify(room);
  } catch (error) {
    console.log('An error happened while creating a room')
  }
  
};
