"use server";
import { nanoid } from "nanoid";
import { liveblocks } from "../liveblocks";
import { revalidatePath } from "next/cache";
import { getAccessType, parseStringify } from "../utils";

export const createDocument = async ({
  userId,
  email,
}: CreateDocumentParams) => {
  const roomId = nanoid();
  const usersAccesses: RoomAccesses = {
    [email]: ["room:write"],
  };
  const metadata = {
    title: "Untitled document",
    creatorId: userId,
    email,
  };

  try {
    const room = await liveblocks.createRoom(roomId, {
      defaultAccesses: ["room:write"],
      usersAccesses,
      metadata,
    });
    revalidatePath("/");

    return parseStringify(room);
  } catch (error) {
    console.log("An error happened while creating a room");
  }
};

export const getDocument = async ({
  roomId,
  userId,
}: {
  roomId: string;
  userId: string;
}) => {
  const room = await liveblocks.getRoom(roomId);
  const userHasAccessToRoom = Object.keys(room.usersAccesses).includes(userId);
  // if (!userHasAccessToRoom) throw new Error("You have no access to this room!");
  return parseStringify(room);
};

export const getAllDocuments = async (userEmail: string) => {
  try {
    const rooms = await liveblocks.getRooms({ userId: userEmail });
    if (!rooms) console.log("error");
    return parseStringify(rooms);
  } catch (error) {
    console.log("Error while fetching rooms", error);
  }
};

export const updateDocument = async (roomId: string, title: string) => {
  try {
    const updatedRoom = await liveblocks.updateRoom(roomId, {
      metadata: {
        title,
      },
    });
    revalidatePath(`/documents/${roomId}`);
    return parseStringify(updatedRoom);
  } catch (error) {
    console.log(`Error happened while updating a room: ${error}`);
  }
};

export const updateDocumentAccess = async (
  roomId: string,
  email: string,
  userType: UserType
) => {
  try {
    const usersAccesses: RoomAccesses = {
      [email]: getAccessType(userType) as AccessType,
    };
    const room = await liveblocks.updateRoom(roomId, {
      usersAccesses,
    });

    if (room) {
      // TODO: notify the invitee with the access changes
    }
    revalidatePath(`document/${roomId}`);
    return parseStringify(room);
  } catch (error) {
    console.log("Error while updating the document access:", error);
  }
};

export const removeCollaborator = async (roomId: string, email: string) => {
  try {
    const room = await liveblocks.updateRoom(roomId, {
      usersAccesses: {
        [email]: null,
      },
    });
    revalidatePath(`document/${roomId}`);
    return parseStringify(room);
  } catch (error) {
    console.log("Error while removing a collaborator:", error);
  }
};
