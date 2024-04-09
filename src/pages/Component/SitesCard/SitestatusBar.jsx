import { CircularProgress, Grid, IconButton, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
// import SiteCalendar from "../SiteCalendar";
import { useLocation } from "react-router-dom";
// import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
// import { MuiPickersUtilsProvider } from "@material-ui/pickers";
// import DateFnsUtils from "@date-io/date-fns";
// import { DatePicker, KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// import AdapterDateFns from "@mui/lab/AdapterDateFns";
// import { DatePicker, Space, TimePicker } from "antd";
// import AdapterDateFns from "@mui/material/AdapterDateFns";
import EventIcon from "@material-ui/icons/Event";
import SiteCalendar from "./SiteCalendar";
import { styled } from "@mui/system";

const StyledDatePicker = styled(DatePicker)({
  // Add your custom styles here to adjust the size of the DatePicker
  // For example:
  width: "150px", // Adjust width as needed
  "& .MuiInputBase-root": {
    height: "40px", // Adjust height as needed
    fontSize: "0.875rem", // Adjust font size as needed
  },
});

// import moment from "moment";
const SitestatusBar = ({
  sitestatusBar,
  status,
  timestamp,
  handleClickOpen,
  handleTimeReset,
  setIsNextCount,
  setOpenDateTimePicker,
  getMinDateForPicker,
  selectedDate,
  getFormattedDateAndTimeString,
  openDateTimePicker,
  handleDateChange,
}) => {
  const [value, setValue] = React.useState(new Date("2014-08-18T21:11:54"));
  // const [selectedDate, setSelectedDate] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);

  // const handleDateChange = (date) => {
  //   setSelectedDate(date);
  //   handleClose();
  // };

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const location = useLocation();
  let siteName = location?.state?.site;
  let capacity = location?.state?.capacity;
  const date = new Date();
  const options = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };
  const formattedDateTime = date.toLocaleString("en-GB", options);
  return (
    <>
      <Grid container spacing={1} justifyContent="space-between">
        <Grid item>
          <Grid container alignItems="center">
            <Grid item>
              <Typography variant="h6">{sitestatusBar.site}</Typography>
            </Grid>

            <Grid item style={{ margin: "0 1rem" }}></Grid>

            <Typography variant="h6">{sitestatusBar.capacity || 0} MW</Typography>
          </Grid>
        </Grid>
        <Grid item style={{ paddingRight: "5rem" }}>
          <Grid container>
            <Grid item>
              {status == "Offline" ? (
                <Typography variant="h6" style={{ color: "#f44336" }}>
                  Offline
                </Typography>
              ) : (
                <Typography variant="h6" style={{ color: "#4caf50" }}>
                  Online
                </Typography>
              )}
            </Grid>
            <Grid item style={{ margin: "0 1rem" }}></Grid>
            <Grid item>
              {timestamp === undefined ? (
                <CircularProgress size={30} />
              ) : (
                <Typography variant="h6">
                  {getFormattedDateAndTimeString(timestamp * 1000) || "No Date"}
                  {/* {new Date(timestamp)} */}
                </Typography>
              )}
            </Grid>
          </Grid>
        </Grid>

        <Grid item>
          <Grid container>
            {/* <Space direction="vertical" size={12}> */}
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              {/* <IconButton color="primary" onClick={handleOpen}>
              <EventIcon />
            </IconButton> */}
              <StyledDatePicker
                // label="Date mobile"
                // inputFormat="MM/dd/yyyy"
                // value={value}
                // onChange={handleDateChange}
                // renderInput={(params) => <TextField {...params} />}
                // open={isOpen}
                // open={openDateTimePicker}
                // onOpen={handleOpen}
                // onClose={handleClose}
                // onClose={() => setOpenDateTimePicker(false)}
                value={selectedDate}
                onChange={handleDateChange}
                format="dd/MM/yyyy"

                // TextFieldComponent={() => null} // Hide the text field
              />
            </LocalizationProvider>
            {/* <SiteCalendar
              setOpenDateTimePicker={setOpenDateTimePicker}
              setIsNextCount={setIsNextCount}
            /> */}
            {/* <DatePicker
              showTime={{
                format: "HH:mm",
                minuteStep: 5,
              }}
              onChange={(date, dateString) =>
                handleDateChange({
                  target: { name: "select_date", value: dateString },
                })
              }
              placeholder="Select Date and Time"
              needConfirm={false}
            /> */}

            {/* </Space> */}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default SitestatusBar;
