"use client"

import { Button } from '@mui/material'
import { useRouter } from 'next/navigation'
import React from 'react'



const EditListItemButton = (props:{title:string ,id:number,pageId:number,})=> {
  const router =useRouter()
  const refreshData = () => {
    router.replace(`/lists/${props.pageId}`);
    router.refresh()
  }  

  const handleSubmit=async()=>{
    try{
      const body = {text:props.title, id:props.id}
    

    const response = await fetch("/api/handling/items/update",
     {method:"PUT",
     headers: {
      'Content-Type': 'application/json'
  },
     body:JSON.stringify(body),

     }
    );
    refreshData()
    }
    catch (error) {
      console.error('Error updating the tittle:', error);}
    
  }
return(
  <Button variant="outlined" onClick={handleSubmit}>Update </Button>
)
}

export default EditListItemButton