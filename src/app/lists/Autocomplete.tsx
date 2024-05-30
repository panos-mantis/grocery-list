"use client";
import { Autocomplete, TextField, Typography } from "@mui/material";
import { List } from "@prisma/client";
import { useRouter } from "next/navigation";
import { potato } from "../actions/serverActions";
const AutocompleteComponent = (props: { lists: List[] }) => {
  const router = useRouter();

  if (!props.lists) {
    return <Typography variant="h2"></Typography>;
  } else {
    return (
      <Autocomplete
        disablePortal
        id="auto-complete-lists"
        options={props.lists}
        sx={{ width: 400 }}
        renderInput={(params) => (
          <TextField {...params} label="Choose an existing list" />
        )}
        renderOption={(props, option) => (
          <li {...props} key={option.id}>
            <Typography variant="body1">{option.label}</Typography>
          </li>
        )}
        onChange={(event, value) => {
          if (value) {
            router.push(`/lists/${value.id}`);
          }
        }}
        getOptionLabel={(option) => option.label ?? "nothing"}
      />
    );
  }
};

export default AutocompleteComponent;
