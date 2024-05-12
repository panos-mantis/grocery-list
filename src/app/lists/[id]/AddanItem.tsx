"use client"

import { Button, Stack, TextField } from '@mui/material'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const AddAnItem = (props:{listId:number}) => {
    const [itemText, setItemText]=  useState<string>("")
    const router = useRouter();
    const refreshData = () => {
      router.replace(`/lists/${props.listId}`)
      router.refresh()
    }
    const handleSubmit=async()=>{
        const body = {text:itemText, listId:props.listId }
        const response = await fetch("/api/handling/items",
         {method:"POST",
         headers: {
          'Content-Type': 'application/json'
      },
         body:JSON.stringify(body),
        
         }
        );
        const stuff = await response.json()
        console.log(stuff)
        refreshData()
      }
      
      const handleTyping = (event: React.ChangeEvent<HTMLInputElement>)=> {
        const target = event.target as HTMLInputElement
        if (target) {
            setItemText(target.value)
            console.log(itemText)
    }}  
  return (
    <Stack  direction="row" spacing={2} justifyContent="center" alignItems="center">
         <TextField id="outlined-basic" label="Add an item" variant="standard"  margin="dense" onChange={handleTyping}/>
         <Button variant="outlined" onClick={handleSubmit}>Add item</Button>
    </Stack>
   
  )
}

export default AddAnItem