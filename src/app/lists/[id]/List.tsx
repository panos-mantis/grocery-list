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

import { List as ListType } from '@prisma/client';
import { item as ListTypeItem } from '@prisma/client';
import { useRouter } from 'next/navigation';

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
        console.log(potato);
        refreshData()
        
        // Remove the deleted item from the list
        props.list.items = props.list.items.filter(item => item.id !== id);
      } catch (error) {
        console.error('Error deleting item:', error);
      }
    };

    
  
    return (
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {props.list.items.map((item) => {
          const labelId = `checkbox-list-label-${item.text}`;
  
          return (
            <ListItem
              key={item.id}
              secondaryAction={
                <IconButton edge="end" aria-label="comments" onClick={() => handleItemDelete(item.id)}>
                  <DeleteOutlineRoundedIcon />
                </IconButton>
              }
              disablePadding
            >
              <ListItemButton role={undefined} onClick={handleToggle(item.id)} dense>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={checked.indexOf(item.id) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={` ${item.text} `} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    );
  }
  