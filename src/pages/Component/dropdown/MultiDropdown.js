import * as React from "react";
// import OutlinedInput from "@mui/material/OutlinedInput";
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";
// import ListItemText from "@mui/material/ListItemText";
// import { makeStyles } from "@material-ui/core/styles";
import {
  OutlinedInput,
  InputLabel,
  MenuItem,
  FormControl,
  ListItemText,
  Select,
  Checkbox,
  FormHelperText,
} from "@mui/material";

// import Select from "@mui/material/Select";
// import Checkbox from "@mui/material/Checkbox";

const ITEM_HEIGHT = 120;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

// const names = [
//   "Oliver Hansen",
//   "Van Henry",
//   "April Tucker",
//   "Ralph Hubbard",
//   "Omar Alexander",
//   "Carlos Abbott",
//   "Miriam Wagner",
//   "Bradley Wilkerson",
//   "Virginia Andrews",
//   "Kelly Snyder",
// ];

export default function MultiDropdown({
  label,
  items = [],
  selectedItems = [],
  handleChange,
  error,
  helperText,
}) {
  // const classes = useStyles();

  const isAllSelected = items.length > 0 && selectedItems.length === items.length;

  const isChecked = (items, item) => {
    let isChecked = false;
    items.forEach((element) => {
      if (element === item) {
        isChecked = true;
      }
    });
    return isChecked;
  };
  //   const [personName, setPersonName] = React.useState([]);

  //   const handleChange = (event) => {
  //     const {
  //       target: { value },
  //     } = event;
  //     setPersonName(
  //       // On autofill we get a stringified value.
  //       typeof value === "string" ? value.split(",") : value
  //     );
  //   };

  return (
    <>
      <FormControl sx={{ minWidth: 150, maxWidth: 150 }} error={error} size="small">
        <InputLabel id={`${label}-select-label`}>{label}</InputLabel>
        <Select
          labelId={`${label}-select-label`}
          id={`${label}-select`}
          value={selectedItems}
          multiple
          style={{ height: "40px", backgroundColor: "whitesmoke" }}
          onChange={handleChange}
          label={label}
          input={<OutlinedInput label={label} />}
          renderValue={(data) => data.join(", ")}
          MenuProps={MenuProps}
        >
          <MenuItem
            value="all"
            // classes={{
            //   root: isAllSelected ? classes.selectedAll : "",
            // }}
            size="small"
            style={{ paddingBlock: 0 }}
          >
            {/* <ListItemIcon> */}
            <Checkbox
              style={{ paddingBlock: 0, transform: "scale(0.8)" }}
              size="Small"
              color="primary"
              primaryTypographyProps={{ variant: "body2" }}
              //   classes={{ indeterminate: classes.indeterminateColor }}

              checked={isAllSelected || items.length === 0}
              indeterminate={selectedItems.length > 0 && selectedItems.length < items.length}
            />
            {/* </ListItemIcon> */}
            <ListItemText
              // classes={{ primary: classes.selectAllText }}
              //   classes={{ primary: classes.listItemText }}
              primary="Select All"
              primaryTypographyProps={{ variant: "body2" }}
              size="small"
              // style={{ paddingTop: ".05rem" }}
            />
          </MenuItem>
          {items.map((element, index) => (
            <MenuItem key={element} value={element} size="small">
              <Checkbox
                checked={isChecked(selectedItems, element)}
                size="small"
                style={{ paddingBlock: 0, transform: "scale(0.8)" }}

                // checked={personName.indexOf(name) > -1}
              />
              <ListItemText primary={element} primaryTypographyProps={{ variant: "body2" }} />
            </MenuItem>
          ))}
        </Select>
        {error && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
    </>
  );
}
