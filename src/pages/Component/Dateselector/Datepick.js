import * as React from "react";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { styled } from "@mui/system";

const StyledDatePicker = styled(DatePicker)({
  // Add your custom styles here to adjust the size of the DatePicker
  // For example:
  backgroundColor: "whitesmoke",
  width: "150px", // Adjust width as needed
  "& .MuiInputBase-root": {
    height: "40px", // Adjust height as needed
    fontSize: "0.875rem", // Adjust font size as needed
  },
});

export default function Datepick({
  startLabel,
  endLabel,
  fromDate,
  setFromDate,
  toDate,
  setToDate,
}) {
  const handleFromDateChange = (date) => {
    setFromDate(date);
  };

  const handleToDateChange = (date) => {
    setToDate(date);
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} style={{ backgroundColor: "red" }}>
      <StyledDatePicker
        label={startLabel}
        // size="small"
        format="dd/MM/yyyy"
        value={fromDate}
        onChange={handleFromDateChange}
        // className={classes.datePicker}
      />
      <StyledDatePicker
        sx={{ marginLeft: "0.5rem", size: "small" }}
        label={endLabel}
        format="dd/MM/yyyy"
        // size="small"
        value={toDate}
        onChange={handleToDateChange}
      />
    </LocalizationProvider>
  );
}
