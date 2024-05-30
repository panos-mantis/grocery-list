"use client";

import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";
import { createNewList } from "../actions/serverActions";

const CreateListButton = (props: { title: string }) => {
  const router = useRouter();

  const handleSubmit = async () => {
    const listCreated = await createNewList(props.title);
    router.push(`/lists/${listCreated.id}`);
  };
  return (
    <Button variant="outlined" onClick={handleSubmit}>
      Create
    </Button>
  );
};

export default CreateListButton;
