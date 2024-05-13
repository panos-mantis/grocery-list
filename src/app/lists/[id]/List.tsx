"use client"

import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

import { List as ListType } from '@prisma/client';
import { item as ListTypeItem } from '@prisma/client';
import { useRouter } from 'next/navigation';
import EditListModal from './EditListModal';

type ListTypeWithRelations= ListType&{
   items:ListTypeItem[]
}

export default function CheckboxList(props: { list: ListTypeWithRelations }) {
    const [checked, setChecked] = React.useState<number[]>([]);
    const router = useRouter();
    
    const refreshData = () => {
      router.replace(`/lists/${props.list.id}`);
      router.refresh()
    }
  
    const handleToggle = (value: number) => () => {
      const currentIndex = checked.indexOf(value);
      const newChecked = [...checked];
  
      if (currentIndex === -1) {
        newChecked.push(value);
      } else {
        newChecked.splice(currentIndex, 1);
      }
  
      setChecked(newChecked);
    };
  
    const handleItemDelete = async (id: number) => {
      try {
        const response = await fetch("/api/handling/items", {
          method: "DELETE",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ id })
        });
        const potato = await response.json();
        console.log(potato)
        refreshData()
        
        props.list.items = props.list.items.filter(item => item.id !== id);
      } catch (error) {
        console.error('Error deleting item:', error);
      }
    };
  
    const handleQuantityChange = async (itemId: number, value: number) => {
      try {
        const response = await fetch("/api/handling/items", {
          method: "PUT",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ id: itemId, quantity: value })
        });
        const updatedItem = await response.json();
        const updatedItems = props.list.items.map(item =>
          item.id === updatedItem.id ? { ...item, quantity: updatedItem.quantity } : item
        );
        props.list.items = updatedItems;
        refreshData();
      } catch (error) {
        console.error('Error updating quantity:', error);
      }
    };
  
    return (
      <List sx={{ width: '100%', maxWidth: 800, bgcolor: 'background.paper' }}>
        {props.list.items.map((item) => {
          const labelId = `checkbox-list-label-${item.text}`;
          return (
            <ListItem
              key={item.id}
              secondaryAction={
                <React.Fragment>
                 
                  <IconButton edge="end" aria-label="delete"  onClick={() => handleItemDelete(item.id)}>
                    <DeleteOutlineRoundedIcon />
                  </IconButton>
      
                </React.Fragment>
              }
              disablePadding
            >
              <ListItemButton role={undefined} dense>
                <ListItemIcon onClick={handleToggle(item.id)}>
                  <Checkbox
                    edge="start"
                    checked={checked.indexOf(item.id) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={` ${item.text} `} />
                <ListItemText id={labelId} primary={` ${item.quantity} `} />
                <IconButton aria-label="decrease quantity" onClick={() => handleQuantityChange(item.id, item.quantity - 1)}>
                  <RemoveIcon />
                </IconButton>
                <IconButton aria-label="increase quantity" onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>
                  <AddIcon />
                </IconButton>
                <EditListModal pageId={props.list.id} id={item.id} text={item.text}></EditListModal>
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    );
}
