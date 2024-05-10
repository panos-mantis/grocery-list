"use client"

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {Stack, TextField } from '@mui/material';
import CreateListButton from './CreateListButton';
import { useState } from 'react';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function NewListModal() {
  const [open, setOpen] = useState(false);
  const [ title , setTitle] = useState<string>("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleTyping = (event: React.ChangeEvent<HTMLInputElement>)=> {
    const target = event.target as HTMLInputElement
    if (target) {
        setTitle(target.value)
        console.log(title)
}}


  
  

  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>Add a new Grocery List</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h5" component="h5">
            Please give a title to your grocery list
          </Typography>
          <Stack  direction="row" spacing={5}>
          <TextField id="outlined-basic" label="List Title" variant="standard"  margin="dense" onChange={handleTyping}/>
          <CreateListButton title={title} />
          </Stack>
         
        </Box>
      </Modal>
    </div>
  );
}
