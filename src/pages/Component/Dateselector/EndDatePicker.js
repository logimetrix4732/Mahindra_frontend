// import "date-fns";
import React, { useState } from "react";
// import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
// import { format } from "@date-io/date-fns";
// import AdapterDateFns from "@mui/lab/AdapterDateFns";

// import {
//   MuiPickersUtilsProvider,
//   KeyboardTimePicker,
//   KeyboardDatePicker,
// } from "@material-ui/pickers";
import { InputLabel } from "@mui/material";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

export default function EndDatePicker({
  //   startLabel,
  endLabel,
  //   fromDate,
  //   setFromDate,
  toDate,
  setToDate,
}) {
  //   const handleFromDateChange = (date) => {
  //     setFromDate(date);
  //   };

  const handleToDateChange = (date) => {
    setToDate(date);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      {/* <KeyboardDatePicker
        margin="normal"
        size="small"
        id="date-picker-dialog"
        label={startLabel}
        format="dd/MM/yyyy"
        value={fromDate}
        onChange={handleFromDateChange}
        KeyboardButtonProps={{
          "aria-label": "change date",
        }}
        // InputProps={{
        //   style: {
        //     fontSize: ".8rem",
        //   },
        // }}
        inputVariant="outlined"
        inputProps={
          {
            // style: { height: "0.8rem" },
          }
        }
        // style={{ width: 180, marginBlock: 0, marginLeft: "1rem", paddingTop: 6 }}
      /> */}
      <KeyboardDatePicker
        margin="normal"
        size="small"
        // id="date-picker-dialog"z
        label={endLabel}
        format="dd/MM/yyyy"
        value={toDate}
        onChange={handleToDateChange}
        KeyboardButtonProps={{
          "aria-label": "change date",
        }}
        // InputProps={{
        //   style: {
        //     fontSize: ".8rem",
        //   },
        // }}
        inputVariant="outlined"
        inputProps={
          {
            // style: { height: "0.8rem" },
          }
        }
        // style={{ width: 180, marginBlock: 0, marginLeft: "1rem", paddingTop: 6 }}
      />
    </MuiPickersUtilsProvider>
  );
}
