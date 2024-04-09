import * as React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export default function SingleDropdown({ label, items, handleChange, selectedItem }) {
  //   const handleChange = (event) => {
  //     setAge(event.target.value);
  //   };

  return (
    <FormControl sx={{ minWidth: 120 }} size="small">
      {/* style={{ color: "black" }} */}
      <InputLabel id="demo-select-small-label">{label}</InputLabel>
      <Select
        // style={{
        //   width: "100px",
        //   height: "40px",

        // }}
        style={{
          // width: "100px",
          height: "40px",
          backgroundColor: "whitesmoke",
        }}
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={selectedItem}
        label={label}
        onChange={handleChange}
      >
        {/* <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem> */}
        {items.map((item) => (
          <MenuItem key={item} value={item}>
            {item}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
