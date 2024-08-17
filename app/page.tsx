import AddDocBtn from "@/components/AddDocBtn";
import Header from "@/components/Header";
import { getAllDocuments } from "@/lib/actions/room.actions";
import { dateConverter } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const Home = async () => {
  const user = await currentUser();
  if (!user) redirect("/sign-in ");

  const documents = await getAllDocuments(user.emailAddresses[0].emailAddress);
  console.log(documents)
  return (
    <main className="home-container">
      <Header className="sticky left-0 top-0">
        <p>Notifications</p>
      </Header>

      {documents.data.length > 0 ? (
        <div className="document-list-container">
          <div className="document-list-title">
            <h3 className="text-28-semibold">All documents</h3>
            <AddDocBtn
            userId={user.id}
            email={user.emailAddresses[0].emailAddress}
          />
          </div>
          <ul className="document-ul">
            {documents.data.map((doc:any) => (
              <li key={doc.id} className="document-list-item">
              <Link
                href={`documents/${doc.id}`}
                 className="flex flex-1 items-center gap-4"
              >
                <div className="hidden sm:block rounded-md bg-dark-500 p-2">
                  <Image src="assets/icons/doc.svg" alt="file" height={40} width={40} />
                </div>
                <div className="space-y-1">
                  <p className="line-clamp-1 text-lg">{doc.metadata.title}</p>
                  <p className="text-sm font-light text-blue-100">{`Created about ${dateConverter(doc.createdAt)}`}</p>
                </div>
              </Link>
            </li>
            ))}
          </ul>
        </div>
      ) : (        
        <div className="document-list-empty">
          <Image
            src="assets/icons/doc.svg"
            alt="Document"
            width={40}
            height={40}
            className="mx-auto"
          />

          <AddDocBtn
            userId={user.id}
            email={user.emailAddresses[0].emailAddress}
          />
        </div>
      )}
    </main>
  );
};

export default Home;
