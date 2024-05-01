"use client"

import { Autocomplete, Button, Stack, TextField } from "@mui/material"


interface option{
  id :number ,
  label : string,
  key: number
}


const Page =()=>{

  const groceryLists:option[]= [{id:1,label:"potato1", key:1},{id:2,label:"potato2", key:2},{id:3,label:"potato3", key:3}]

  /* The home page should contain the following :
  2 buttons : one that makes a pop up for you to add another list 
              one that give you access to the lists that you have already created */
  return (
  <Stack direction="row" spacing={10}>
  <Button variant="contained">Contained</Button>  
  <Autocomplete
  disablePortal
  id="auto-complete-lists"
  options={groceryLists} //here we will add all the lists created after we ask them from backend
  sx={{ width: 300 }}
  renderInput={(params) => <TextField  {...params} label="Choose an existing list" />}
/>
    </Stack>
    
  );
}

export default Page
