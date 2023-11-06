import React, { useState } from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import StickyHeadTable from "./StickyHeadTable";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField } from "@mui/x-date-pickers/DateField";
import dayjs from "dayjs";

const LowerSection = (props) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [mobileNumber, setMobileNumber] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const isButtonDisbaled =
    selectedOption !== null ||
    mobileNumber !== null ||
    startDate !== null ||
    endDate !== null;

  const handleApplyClick = () => {
    let startingDate = dayjs(startDate).format("YYYY-MM-DD") || "";
    let endingDate = dayjs(endDate).format("YYYY-MM-DD");
    if (endingDate == "Invalid Date") {
      endingDate = "";
    }
    if (startingDate == "Invalid Date") {
      startingDate = "";
    }
    let optionSelected = selectedOption || "";
    let phone = mobileNumber || "";
    props.apply(optionSelected, phone, startingDate, endingDate);
  };
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12}></Grid>
        <Grid item xs={2.5}>
          <FormControl fullWidth>
            <InputLabel>Zero Fill Id</InputLabel>
            <Select
              style={{ backgroundColor: "white", borderRadius: "15" }}
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
            >
              <MenuItem key={"ZF000"} value={"ZF000"}>
                {"ZF000"}
              </MenuItem>
              <MenuItem key={"ZF001"} value={"ZF001"}>
                {"ZF001"}
              </MenuItem>
              <MenuItem key={"ZF002"} value={"ZF002"}>
                {"ZF002"}
              </MenuItem>
              <MenuItem key={"ZF003"} value={"ZF003"}>
                {"ZF003"}
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item fullWidth xs={2.5}>
          <TextField
            label="Mobile Number"
            fullWidth
            style={{ backgroundColor: "white", borderRadius: "15" }}
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
          />
        </Grid>
        <Grid item xs={2.5}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateField
              label="start date"
              value={startDate}
              onChange={(e) => setStartDate(e)}
              style={{ backgroundColor: "white", borderRadius: "15" }}
              fullWidth
              format="YYYY-MM-DD"
              disabled={false}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={2.5}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateField
              label="end date"
              value={endDate}
              onChange={(e) => setEndDate(e)}
              style={{ backgroundColor: "white", borderRadius: "15" }}
              fullWidth
              format="YYYY-MM-DD"
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={2} container justify="center" alignItems="center">
          <Button
            variant="contained"
            fullWidth
            size="large"
            color="primary"
            onClick={handleApplyClick}
            disabled={!isButtonDisbaled}
          >
            Apply
          </Button>
        </Grid>
      </Grid>
      <div style={{ marginTop: 5 }}>
        <StickyHeadTable {...props} />
      </div>
    </div>
  );
};

export default LowerSection;
