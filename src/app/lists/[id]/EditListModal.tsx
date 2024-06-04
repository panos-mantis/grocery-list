"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { IconButton, Stack, TextField } from "@mui/material";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import EditListItemButton from "./EditListButton";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function UpdateItemModal(props: {
  id: number;
  text: string;
  pageId: number;
}) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState<string>(props.text);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleTyping = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    if (target) {
      setTitle(target.value);
      console.log(title);
    }
  };

  return (
    <div>
      <IconButton aria-label="edit" edge="end" onClick={() => handleOpen()}>
        <EditIcon />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h5" component="h5">
            Change the name of the item
          </Typography>
          <Stack direction="row" spacing={5}>
            <TextField
              id="outlined-basic"
              label="List Title"
              variant="standard"
              margin="dense"
              value={title}
              onChange={handleTyping}
            />
            <EditListItemButton
              pageId={props.pageId}
              id={props.id}
              title={title}
            ></EditListItemButton>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
