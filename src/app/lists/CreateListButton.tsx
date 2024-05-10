

import { Button } from '@mui/material'
import React from 'react'


const CreateListButton = (props:{title:string})=> {
  
  const handleSubmit=async()=>{

    const response = await fetch("/api/handling/",
     {method:"POST",
     headers: {
      'Content-Type': 'application/json'
  },
     body:JSON.stringify(props.title),
    
     }
    );
    const movies = await response.json();
    console.log(movies)
  }
return(
  <Button variant="outlined" onClick={handleSubmit}>Create</Button>
)
}

export default CreateListButton