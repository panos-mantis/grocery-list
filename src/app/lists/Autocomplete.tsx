"use client"
import { Autocomplete, Button, Stack, TextField, Typography } from "@mui/material"
import { List } from "@prisma/client"


const AutocompleteComponent =(props:{lists:List[]})=>{
  
  
  
  console.log(props.lists)
  /* The home page should contain the following :
  2 buttons : one that makes a pop up for you to add another list 
              one that give you access to the lists that you have already created */
  if(!props.lists) {
    return(<Typography variant="h2"></Typography>)
  }
  else{
    return (
        <Autocomplete
        disablePortal
        id="auto-complete-lists"
        options={props.lists} 
        sx={{ width: 300 }}
        renderInput={(params) => <TextField  {...params} label="Choose an existing list" />}
        onChange={(event)=> {
            const target = event.target as HTMLButtonElement;
            if (target) console.log(target.innerText);
        }}
      /> 
        )
  }           
 
}   

export default AutocompleteComponent
