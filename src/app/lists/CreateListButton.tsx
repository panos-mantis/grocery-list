"use client"

import { Button } from '@mui/material'
import { useRouter } from 'next/navigation'
import React from 'react'



const CreateListButton = (props:{title:string})=> {
  const router =useRouter()


  const handleSubmit=async()=>{

    

    const response = await fetch("/api/handling/",
     {method:"POST",
     headers: {
      'Content-Type': 'application/json'
  },
     body:JSON.stringify(props.title),
    
     }
    );
    const listCreated = await response.json();
    router.push(`/lists/${listCreated.id}`)
  }
return(
  <Button variant="outlined" onClick={handleSubmit}>Create</Button>
)
}

export default CreateListButton