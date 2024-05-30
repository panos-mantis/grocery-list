"use client";

import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import { List as ListType, item } from "@prisma/client";
import { item as ListTypeItem } from "@prisma/client";
import EditListModal from "./EditListModal";
import {
  createListItem,
  deleteItem,
  toggleItem,
} from "@/app/actions/serverActions";
import { Button, Stack, TextField } from "@mui/material";

type ListTypeWithRelations = ListType & {
  items: ListTypeItem[];
};

export default function CheckboxList(props: { list: ListTypeWithRelations }) {
  const [checked, setChecked] = React.useState<number[]>([]);

  const [items, setItems] = React.useState<item[]>(props.list.items);
  const [itemText, setItemText] = React.useState<string>("");

  const handleTyping = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    if (target) {
      setItemText(target.value);
      console.log(itemText);
    }
  };

  const handleAddItem = async () => {
    try {
      if (!itemText.trim()) {
        return;
      }
      const newItem = await createListItem(itemText, props.list.id);
      const updatedItems = [...items, newItem];
      setItems(updatedItems);
    } catch (error) {
      console.error(error);
    }
  };

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
      toggleItem(value, true);
    } else {
      newChecked.splice(currentIndex, 1);
      toggleItem(value, false);
    }

    setChecked(newChecked);
  };

  const handleItemDelete = async (id: number) => {
    const updatedItems = items.filter((item) => item.id !== id);
    console.log(updatedItems);
    setItems(updatedItems);
    deleteItem(id);
  };

  const handleQuantityChange = async (itemId: number, value: number) => {
    try {
      const response = await fetch("/api/handling/items", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: itemId, quantity: value }),
      });
      const updatedItem = await response.json();
      const updatedItems = props.list.items.map((item) =>
        item.id === updatedItem.id
          ? { ...item, quantity: updatedItem.quantity }
          : item
      );
      props.list.items = updatedItems;
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  return (
    <>
      <Stack
        direction="row"
        spacing={2}
        justifyContent="center"
        alignItems="center"
      >
        <TextField
          id="outlined-basic"
          label="Add an item"
          variant="standard"
          margin="dense"
          onChange={handleTyping}
        />
        <Button variant="outlined" onClick={handleAddItem}>
          Add item
        </Button>
      </Stack>
      <List sx={{ width: "100%", maxWidth: 800, bgcolor: "background.paper" }}>
        {items.map((item) => {
          const labelId = `checkbox-list-label-${item.text}`;
          return (
            <ListItem
              key={item.id}
              secondaryAction={
                <React.Fragment>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleItemDelete(item.id)}
                  >
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
                    checked={checked.includes(item.id)}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ "aria-labelledby": labelId }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={` ${item.text} `} />
                <ListItemText id={labelId} primary={` ${item.quantity} `} />
                <IconButton
                  aria-label="decrease quantity"
                  onClick={() =>
                    handleQuantityChange(item.id, item.quantity - 1)
                  }
                >
                  <RemoveIcon />
                </IconButton>
                <IconButton
                  aria-label="increase quantity"
                  onClick={() =>
                    handleQuantityChange(item.id, item.quantity + 1)
                  }
                >
                  <AddIcon />
                </IconButton>
                <EditListModal
                  pageId={props.list.id}
                  id={item.id}
                  text={item.text}
                ></EditListModal>
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </>
  );
}
