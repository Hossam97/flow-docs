'use server';

import { clerkClient } from "@clerk/nextjs/server";

export const getClerkUsers = async({userIds}: {userIds: string[]}) => {
    try {
        const {data} = await clerkClient.users.getUserList({
            emailAddress: userIds
        });
        console.log('Data:', data)
    } catch (error) {
        console.log(`Error while fetching users: ${error}`)
    }
}