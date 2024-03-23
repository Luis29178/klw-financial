import React, { useState, useEffect } from "react";
import "./Appointments.css";
import { DayPicker } from "react-day-picker";
import "../../Components/Calender/DayPickerStyles.css";

import { addYears } from "date-fns";

const Appointments = () => {
  const [selected, setSelected] = useState(undefined);
  const [disabledDays, setDisabledDays] = useState(undefined);
  // Function to generate an array of dates that are Tuesday, Thursday, or Saturday within a specified range
  const generateTargetDaysArray = () => {
    const startDate = new Date(); // Start date (today)
    const endDate = addYears(startDate, 5); // End date (December 31, 2099)

    const isTargetDay = (date) => {
      const dayOfWeek = date.getDay();
      return dayOfWeek === 0 || dayOfWeek === 4 || dayOfWeek === 6; // 0 for Sunday, 4 for Thursday, 6 for Saturday
    };
    const targetDaysArray = [];

    for (
      let date = new Date(startDate);
      date <= endDate;
      date.setDate(date.getDate() + 1)
    ) {
      if (isTargetDay(date)) {
        targetDaysArray.push(new Date(date)); // Push a new instance of the date to avoid reference issues
      }
    }

    return targetDaysArray;
  };

  useEffect(() => {
    // Generate targetDaysArray and disabledDays
    const targetDaysArray = generateTargetDaysArray();
    setDisabledDays([{ before: new Date() }, ...targetDaysArray]);
  }, []);


  useEffect(() => {
    
    console.log(selected)
  }, [selected]);


  

  return (
    <div className="appointmentContainer">
      <div className="appointment">
        <DayPicker
          mode="single"
          selected={selected}
          onSelect={setSelected}
          disabled={disabledDays}
          showOutsideDays
        />
      </div>
    </div>
  );
};

export default Appointments;
