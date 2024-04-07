import React, { useState, useEffect } from "react";
import "./Appointments.css";
import { DayPicker } from "react-day-picker";
import "../../Components/Calender/DayPickerStyles.css";

import { addYears, setDay } from "date-fns";

const Appointments = () => {
  const [selectedDay, setSelectedDay] = useState(undefined);
  const [selectedDayRef, setSelectedDayRef] = useState(undefined);
  const [selectedTime, setSelectedTime] = useState(undefined);
  const [purpose, setPurpose] = useState("");
  const [email, setEmail] = useState("");
  const [disabledDays, setDisabledDays] = useState(undefined);
  const [purposeValid, setPurposeValid] = useState(true);
  const [emailValid, setEmailValid] = useState(true);
  // Function to generate an array of dates that are Tuesday, Thursday, or Saturday within a specified range

  const tempHours = [
    "10:00am - 11:00am",
    "11:30am - 12:30pm",
    "1:00pm - 2:00pm",
    "2:30pm - 3:30pm",
    "4:00pm - 5:00pm",
  ];
  const generateTargetDaysArray = () => {
    const startDate = new Date(); // Start date (today)
    const endDate = addYears(startDate, 5); // End date 5 years later

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

  const resetSelections = () => {
    setSelectedTime(undefined);
  };

  useEffect(() => {
    // Generate targetDaysArray and disabledDays
    const targetDaysArray = generateTargetDaysArray();
    setDisabledDays([{ before: new Date() }, ...targetDaysArray]);
  }, []);

  useEffect(() => {
    selectedDay !== undefined && selectedDayRef !== undefined
      ? (() => {
          selectedDay.toDateString() !== selectedDayRef.toDateString()
            ? setSelectedDayRef(selectedDay)
            : (() => {})();
        })()
      : (() => {
          selectedDay !== undefined
            ? setSelectedDayRef(selectedDay)
            : (() => {})();
        })();
  }, [selectedDay]);

  useEffect(() => {
    resetSelections();
  }, [selectedDayRef]);

  const timeTable = (
    <div className="time_table">
      <div className="hours_column">
        {tempHours.map((item, index) => {
          if (index % 2 === 0) {
            return (
              <p
                key={item}
                className={
                  selectedTime === item ? "time_text_selected" : "time_text"
                }
                onClick={() => {
                  selectedTime !== item
                    ? setSelectedTime(item)
                    : setSelectedTime(undefined);
                }}
              >
                {item}
              </p>
            );
          }
          return null;
        })}
      </div>
      <div className="hours_column">
        {tempHours.map((item, index) => {
          if (index % 2 === 1) {
            return (
              <p
                key={item}
                className={
                  selectedTime === item ? "time_text_selected" : "time_text"
                }
                onClick={() => {
                  selectedTime !== item
                    ? setSelectedTime(item)
                    : setSelectedTime(undefined);
                }}
              >
                {item}
              </p>
            );
          }
          return null;
        })}
      </div>
    </div>
  );

  function isValidEmailFormat(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var passFormat =  regex.test(email) === true ? true : false;

    //TODO: add Varification steps tusing jsEmail and firebase 

    return passFormat
  }

  

  const SubmitAction = () => {
    var passPurpose = false;
    var passEmail = false;

    if (purpose !== "") {
      passPurpose = true;
    }
    if (email !== "") {
      passEmail = isValidEmailFormat(email);
    }

    setPurposeValid(passPurpose); // Update state based on validation
    setEmailValid(passEmail);

    if (!passEmail || !passPurpose) {
      // If validation fails, trigger flashing for 0.5 seconds
      if (!passPurpose) {
        setTimeout(() => setPurposeValid(true), 1000); // Reset after 0.5s
      }
      if (!passEmail) {
        setTimeout(() => setEmailValid(true), 1000); // Reset after 0.5s
      }
      return; // Exit if validation fails
    }
    if (passEmail === true && passPurpose === true) {
      console.log(selectedDay, selectedTime, purpose, email);
    }
  };

  return (
    <div className="appointmentContainer">
      <div className="appointment">
        <DayPicker
          mode="single"
          selected={selectedDay}
          onSelect={setSelectedDay}
          disabled={disabledDays}
          showOutsideDays
          footer={selectedDay !== undefined ? timeTable : <></>}
        />

        {selectedTime !== undefined && selectedDay !== undefined ? (
          <div className="purpose_notes_box">
            <div className="purpose_notes">
              <p className="purpose_notes_text">Purpose of Appointment:</p>
              <textarea
                value={purpose}
                className={`purpose_notes_input ${
                  !purposeValid ? "input-invalid" : ""
                }`}
                placeholder="Please provide a brief description of what you are looking to discuss."
                onChange={(e) => setPurpose(e.target.value)}
              />
              <input
                value={email}
                className={`appointment_email_input ${
                  !emailValid ? "input-invalid" : ""
                }`}
                type="email"
                placeholder="you@email.com"
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="submit_button_box">
                <button
                  onClick={() => SubmitAction()}
                  className="submit_button"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Appointments;
