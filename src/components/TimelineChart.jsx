import React, { useState, useEffect } from "react";
import Timeline from "react-calendar-timeline";
import "react-calendar-timeline/lib/Timeline.css";
import { Box, Button, Tooltip, TextField, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import dayjs from "dayjs";
import data from "../data.json";
import { blue, blueGrey } from "@mui/material/colors";
// Helper function to convert data
const parseTimelineData = (data) => {
  const groups = [
    ...data.layers.map((layer) => {
      let title;
  
      if (layer.number === 3) {
        title = "OverrideLayer";
      } else if (layer.number === 4) {
        title = "finalSchedule";
      } else {
        title = `Layer ${layer.number}`; // Default case for other numbers, if needed
      }
  
      return {
        id: layer.number,
        title,
      };
    }),
  ];
  

  const items = [
    ...data.layers.flatMap((layer) =>
      layer.layers.map((entry, index) => ({
        id: `${layer.number}-${index}`,
        group: layer.number,
        title: `User ${entry.userId}`,
        start_time: dayjs(entry.startDate).toDate(),
        end_time: dayjs(entry.endDate).toDate(),
        userId: entry.userId,
      }))
    ),
    // Example items for overrideLayer and finalSchedule
    
  ];

  return { groups, items };
};

// Generate unique color for each user
const TimelineChart = () => {
  const { groups, items } = parseTimelineData(data);
  const [currentView, setCurrentView] = useState("month");
  const [visibleTimeStart, setVisibleTimeStart] = useState(dayjs().startOf("month").valueOf());
  const [visibleTimeEnd, setVisibleTimeEnd] = useState(dayjs().endOf("month").valueOf());
  const [selectedYear, setSelectedYear] = useState(dayjs().year());
  const [selectedMonth, setSelectedMonth] = useState(dayjs().month() + 1); // month is 0-based

  const getUserColor = (userId) => {
    const hue = (userId * 137) % 360; // Fixed color logic based on userId
    return `hsl(${hue}, 70%, 70%)`;
  };

  // Function to update view range based on selected year, month, and view type
  const updateViewRange = (view) => {
    const startOfMonth = dayjs().year(selectedYear).month(selectedMonth - 1).startOf("month");
    const endOfMonth = startOfMonth.endOf("month");

    switch (view) {
      case "month":
        setVisibleTimeStart(startOfMonth.valueOf());
        setVisibleTimeEnd(endOfMonth.valueOf());
        break;
      case "2-weeks":
        const twoWeekStart = startOfMonth.add(1, "week").startOf("week");
        const twoWeekEnd = twoWeekStart.add(2, "weeks").endOf("week");
        setVisibleTimeStart(twoWeekStart.valueOf());
        setVisibleTimeEnd(twoWeekEnd.valueOf());
        break;
      case "week":
        const weekStart = startOfMonth.startOf("week");
        const weekEnd = weekStart.add(1, "week").endOf("week");
        setVisibleTimeStart(weekStart.valueOf());
        setVisibleTimeEnd(weekEnd.valueOf());
        break;
      case "2-days":
        const twoDayStart = startOfMonth.startOf("day");
        const twoDayEnd = twoDayStart.add(2, "days").endOf("day");
        setVisibleTimeStart(twoDayStart.valueOf());
        setVisibleTimeEnd(twoDayEnd.valueOf());
        break;
      case "day":
        const dayStart = startOfMonth.startOf("day");
        const dayEnd = dayStart.endOf("day");
        setVisibleTimeStart(dayStart.valueOf());
        setVisibleTimeEnd(dayEnd.valueOf());
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    updateViewRange(currentView); // Ensure the time range updates when the view is changed
  }, [currentView, selectedYear, selectedMonth]);

  const handleYearChange = (event) => {
    const year = event.target.value;
    setSelectedYear(year);
  };

  const handleMonthChange = (event) => {
    const month = event.target.value - 1; // month is 0-based in dayjs
    setSelectedMonth(month + 1);
  };

  const handleTodayButton = () => {
    const today = dayjs();
    setSelectedYear(today.year());
    setSelectedMonth(today.month() + 1); // month is 0-based in dayjs

    // Set the visible time range for the current day
    const dayStart = today.startOf("day");
    const dayEnd = today.endOf("day");

    setVisibleTimeStart(dayStart.valueOf());
    setVisibleTimeEnd(dayEnd.valueOf());

    // Update the view to "day" if it's not already
    setCurrentView("day");
  };

  const handlePreviousButton = () => {
    const newStart = dayjs(visibleTimeStart).subtract(1, currentView === "month" ? "month" : "week").startOf(currentView === "month" ? "month" : "week");
    const newEnd = newStart.add(currentView === "month" ? 1 : 4, currentView === "month" ? "month" : "week");

    setVisibleTimeStart(newStart.valueOf());
    setVisibleTimeEnd(newEnd.valueOf());
  };

  const handleNextButton = () => {
    const newStart = dayjs(visibleTimeStart).add(1, currentView === "month" ? "month" : "week").startOf(currentView === "month" ? "month" : "week");
    const newEnd = newStart.add(currentView === "month" ? 1 : 4, currentView === "month" ? "month" : "week");

    setVisibleTimeStart(newStart.valueOf());
    setVisibleTimeEnd(newEnd.valueOf());
  };

  return (
    <Box>
      {/* View Toggle */}
      <Box sx={{ mb: 2, display: "flex", justifyContent: "space-between" }}>
  <Button
    onClick={() => setCurrentView("month")}
    sx={{
      backgroundColor: "blue",  // Dark green background
      color: "#fff",  // White text
      '&:hover': {
        backgroundColor: "#66bb6a",  // Lighter green on hover
      },
      padding: "8px 16px",  // Padding for the button
      borderRadius: "4px",  // Rounded corners for the button
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",  // Subtle shadow for depth
    }}
  >
    Month
  </Button>

  <Button
    onClick={() => setCurrentView("2-weeks")}
    sx={{
      backgroundColor:"blue",  // Dark green background
      color: "#fff",  // White text
      '&:hover': {
        backgroundColor: "#66bb6a",  // Lighter green on hover
      },
      padding: "8px 16px",  // Padding for the button
      borderRadius: "4px",  // Rounded corners for the button
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",  // Subtle shadow for depth
    }}
  >
    2-Weeks
  </Button>

  <Button
    onClick={() => setCurrentView("week")}
    sx={{
      backgroundColor: "blue",  // Dark green background
      color: "#fff",  // White text
      '&:hover': {
        backgroundColor: "#66bb6a",  // Lighter green on hover
      },
      padding: "8px 16px",  // Padding for the button
      borderRadius: "4px",  // Rounded corners for the button
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",  // Subtle shadow for depth
    }}
  >
    Week
  </Button>

  <Button
    onClick={() => setCurrentView("2-days")}
    sx={{
      backgroundColor: "blue",  // Dark green background
      color: "#fff",  // White text
      '&:hover': {
        backgroundColor: "#66bb6a",  // Lighter green on hover
      },
      padding: "8px 16px",  // Padding for the button
      borderRadius: "4px",  // Rounded corners for the button
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",  // Subtle shadow for depth
    }}
  >
    2-Days
  </Button>
  <Button
    onClick={() => setCurrentView("day")}
    sx={{
      backgroundColor: "blue",  // Dark green background
      color: "#fff",  // White text
      '&:hover': {
        backgroundColor: "#66bb6a",  // Lighter green on hover
      },
      padding: "8px 16px",  // Padding for the button
      borderRadius: "4px",  // Rounded corners for the button
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",  // Subtle shadow for depth
    }}
  >
    Day
  </Button>
</Box>


      {/* Year and Month Selectors */}
      <Box sx={{
  mb: 2, 
  display: "flex", 
  justifyContent: "space-between", 
  padding: 2,  // Add padding for better spacing
  backgroundColor: "#f4f4f4",  // Optional: light background for the container
  borderRadius: "8px",  // Optional: rounded corners for the container
  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)"  // Optional: subtle shadow effect
}}>
  <FormControl sx={{
    width: "48%", 
    backgroundColor: "#fff",  // Optional: background color for the form control
    borderRadius: "4px",  // Optional: rounded corners for form controls
    padding: "4px",  // Optional: padding inside the form control
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",  // Optional: shadow effect for better contrast
  }}>
    <InputLabel sx={{
      color: "#333",  // Label text color
      fontWeight: "bold",  // Optional: bolder label text
    }}>Year</InputLabel>
    <Select value={selectedYear} onChange={handleYearChange} label="Year" sx={{
      backgroundColor: "#f5f5f5",  // Background color of the select dropdown
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: "#ccc",  // Optional: border color for the input field
      },
      '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: "#000",  // Border color on hover
      },
    }}>
      {[...Array(10)].map((_, i) => (
        <MenuItem key={i} value={dayjs().year() - 2 + i}>
          {dayjs().year() - 2 + i}
        </MenuItem>
      ))}
    </Select>
  </FormControl>

  <FormControl sx={{
    width: "48%", 
    backgroundColor: "#fff",  // Optional: background color for the form control
    borderRadius: "4px",  // Optional: rounded corners for form controls
    padding: "4px",  // Optional: padding inside the form control
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",  // Optional: shadow effect for better contrast
  }}>
    <InputLabel sx={{
      color: "#333",  // Label text color
      fontWeight: "bold",  // Optional: bolder label text
    }}>Month</InputLabel>
    <Select value={selectedMonth} onChange={handleMonthChange} label="Month" sx={{
      backgroundColor: "#f5f5f5",  // Background color of the select dropdown
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: "#ccc",  // Optional: border color for the input field
      },
      '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: "#000",  // Border color on hover
      },
    }}>
      {[...Array(12)].map((_, i) => (
        <MenuItem key={i} value={i + 1}>
          {dayjs().month(i).format("MMMM")}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
</Box>


      <Box sx={{ overflowX: "auto", maxWidth: "100%" }}>
        <Timeline
          groups={groups}
          items={items.map((item) => ({
            ...item,
            itemProps: {
              style: {
                backgroundColor: getUserColor(item.userId),
                borderRadius: "5px",
                textAlign: "center",
                color: "white",
                fontWeight: "bold",
                height: 50,
                width: 120,
              },
              children: (
                <Tooltip title={`User ID: ${item.userId}`} arrow>
                  <div>{item.title}</div>
                </Tooltip>
              ),
            },
          }))}
          visibleTimeStart={visibleTimeStart}
          visibleTimeEnd={visibleTimeEnd}
          onTimeChange={(start, end) => {
            setVisibleTimeStart(start);
            setVisibleTimeEnd(end);
          }}
        />
      </Box>

      {/* Navigation Buttons */}
      <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
      <Button
  variant="contained"
  onClick={handlePreviousButton}
  style={{ backgroundColor: "blue", color: "white", marginRight: "10px" }}
>
  Previous
</Button>

        <Button variant="contained" onClick={handleTodayButton} style={{ backgroundColor: "blue", color: "white", marginRight: "10px" }}>
          Today
        </Button>
        <Button variant="contained" onClick={handleNextButton} style={{ backgroundColor: "blue", color: "white", marginRight: "10px" }}> 
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default TimelineChart;
