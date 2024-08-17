import React, { useEffect, useRef, useState } from "react";
import { Input } from "./input";
import Image from "next/image";
import { updateDocument } from "@/lib/actions/room.actions";

type DocumentTitleEditorProps = {
  roomId: string;
  documentTitle: string;
};

const DocumentTitleEditor = ({
  roomId,
  documentTitle,
}: DocumentTitleEditorProps) => {
  const [title, setTitle] = useState(documentTitle);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const inputContainerRef = useRef<HTMLDivElement>(null);


  const currentUserPermission = "editor";

  const handleTitleChange = (e: any) => {
    if (e.target.value !== documentTitle) {
      setTitle(e.target.value);
    }
  };

  const handleTitleUpdate = async (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      setIsLoading(true);
      try {
        const updatedDocument = await updateDocument(roomId, title);
        if (updatedDocument) {
          setIsEditingTitle(false)
        };
      } catch (error) {
        console.log("Error:", error);
      }
      // TODO: BUG: The revalidatePath() takes a bit of a time and the isLoading flag is being set
      // before the path is revalidated, which is causing the "saving..." text to disappear before
      // the new title gets saved.
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const handleClickOutsideTitleInput = async (e: MouseEvent) => {
      if(inputContainerRef.current && !inputContainerRef.current.contains(e.target as Node)){
        setIsEditingTitle(false);
        await updateDocument(roomId, title);
      };
    };
      document.addEventListener('mousedown', handleClickOutsideTitleInput);
      return () => document.removeEventListener('mousedown', handleClickOutsideTitleInput);

    
  }, [roomId, documentTitle, title]);

  useEffect(() => {
    if (isEditingTitle && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditingTitle]);

  return (
    <>
      <div
        ref={inputContainerRef}
        className="flex w-fit items-center justify-center gap-2"
        onClick={() => setIsEditingTitle(true)}
      >
        {isEditingTitle && !isLoading ? (
          <Input
            ref={inputRef}
            onChange={handleTitleChange}
            onKeyDown={handleTitleUpdate}
            disabled={!isEditingTitle}
            placeholder="Enter a title"
            className="document-title-input"
          />
        ) : (
          <>
            <p className="document-title">{documentTitle}</p>
          </>
        )}
        {currentUserPermission === "editor" && !isEditingTitle && (
          <Image
            src="/assets/icons/edit.svg"
            alt="edit"
            height={20}
            width={20}
            onClick={() => setIsEditingTitle(true)}
            className="pointer"
          />
        )}
        {currentUserPermission !== "editor" && !isEditingTitle && (
          <p className="view-only-tag">View only</p>
        )}
        {isLoading && <p className="text-sm text-gray-400">Saving...</p>}
      </div>
    </>
  );
};

export default DocumentTitleEditor;
