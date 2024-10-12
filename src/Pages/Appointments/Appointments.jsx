import React, { useState, useEffect } from "react";
import "./Appointments.css";

import "../../Components/Calender/DayPickerStyles.css";
import emailjs from "emailjs-com";

import { addYears } from "date-fns";
import { addAppointment } from "../../FireBaseAPIs/firestoreAPI";
import AppointmentSetter from "../../Components/AppointmentSetter/AppointmentSetter";
import MessageGen from "../../Components/MessageGen/MessageGen";
import { useNavigate } from "react-router-dom";
//TODO: Add prompt for birth Day and push to database

const Appointments = () => {
  //#region States  & Variables
  const [selectedDay, setSelectedDay] = useState(undefined);
  const [selectedDayRef, setSelectedDayRef] = useState(undefined);
  const [selectedTime, setSelectedTime] = useState(undefined);
  const [purpose, setPurpose] = useState("");
  const [email, setEmail] = useState("");
  const [disabledDays, setDisabledDays] = useState(undefined);
  const [purposeValid, setPurposeValid] = useState(true);
  const [emailValid, setEmailValid] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstNameValid, setFirstNameValid] = useState(true);
  const [lastNameValid, setLastNameValid] = useState(true);

  const [submited, setSubmited] = useState(false);
  const [countdown, setCountdown] = useState(5);

  const navigate = useNavigate();

  const tempHours = [
    "10:00am - 11:00am",
    "11:30am - 12:30pm",
    "1:00pm - 2:00pm",
    "2:30pm - 3:30pm",
    "4:00pm - 5:00pm",
  ];
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

  //#endregion

  //#region TempHours Generator

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
  //#endregion

  //#region UseEffects
  useEffect(() => {
    // Generate targetDaysArray and disabledDays
    const targetDaysArray = generateTargetDaysArray();
    setDisabledDays([{ before: new Date() }, ...targetDaysArray]);
  }, []);

  useEffect(() => {
    // Start countdown when confirmed is true
    if (submited) {
      const countdownInterval = setInterval(() => {
        // Decrement countdown every second
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);

      // Clear interval when countdown reaches 0
      if (countdown === 0) {
        clearInterval(countdownInterval);
        // Redirect to home page
        navigate("/");
      }

      // Cleanup function to clear interval
      return () => clearInterval(countdownInterval);
    }
  }, [submited, countdown]);

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
  //#endregion

  //#region Functions
  function isValidEmailFormat(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var passFormat = regex.test(email) === true ? true : false;

    //TODO: add Varification steps tusing jsEmail and firebase

    return passFormat;
  }

  const SubmitAction = async () => {
    var passEmail = false;
    var passFName = false;
    var passLName = false;


    if (email !== "") {
      passEmail = isValidEmailFormat(email);
    }
    if (firstName !== "") {
      passFName = true;
    }
    if (lastName !== "") {
      passLName = true;
    }
    // Update state based on validation
    setEmailValid(passEmail);
    setFirstNameValid(passFName);
    setLastNameValid(passLName);

    if (!passEmail || !passFName || !passLName) {
      // If validation fails, trigger flashing for 0.5 seconds
      if (!passEmail) {
        setTimeout(() => setEmailValid(true), 1000);
      }

      if (!passFName) {
        setTimeout(() => setFirstNameValid(true), 1000);
      }
      if (!passLName) {
        setTimeout(() => setLastNameValid(true), 1000);
      }


      return; // Exit if validation fails
    }

    if (passEmail === true) {
      await generateAppointment();
    }
    setSubmited(true);
  };

  const generateAppointment = async () => {
    const sendCodeToUser = (docID) => {
      const emailData = {
        to_email: email,
        doc_id: docID,
      };

      sendUserEmail(emailData);
    };
    const sendUserEmail = (emailData) => {
      emailjs
        .send(
          "service_n3f8s79",
          "template_75sjxx1",
          emailData,
          process.env.REACT_APP_EMAILJS_PUBLIC_ID
        )
        .then(
          (response) => {
            console.log("Email successfully sent!", response.text);
            // Handle success scenario (e.g., showing a success message)
          },
          (error) => {
            console.log("Failed to send email:", error.text);

            // Handle error scenario (e.g., showing an error message)
          }
        );
    };

    const appointmentDocument = {
      name: `${firstName} ${lastName}`.trimEnd(),
      email: email, // Assuming 'email' is already defined
      purpose: purpose !== "" ? purpose : "not given", // Assuming 'purpose' is already defined
      date: selectedDay.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
      }), // Current date-time in ISO format
      time: selectedTime,
      confirmed: false, // Initial status
    };

    let docID = generateUserCode();

    await addAppointment(docID, appointmentDocument);

    sendCodeToUser(docID);
  };

  const generateUserCode = () => {
    const FLChars = firstName[0] + lastName[0];

    const day = selectedDay.getDate(); // Day of the month
    const month = selectedDay.getMonth() + 1; // Month (0-11, so add 1 to get 1-12)

    const birthYear = "2024";

    // Format day and month with leading zeros if necessary
    const formattedDay = day < 10 ? "0" + day : day;
    const formattedMonth = month < 10 ? "0" + month : month;

    // Generate a 6-digit random number
    const numberCode = formattedDay + formattedMonth + birthYear;

    // Concatenate and return the code
    return FLChars + numberCode;
  };
  //#endregion

  return (
    <div className="appointmentContainer">
      <div className="appointment">
        {!submited ? (
          <AppointmentSetter
            selectedDay={selectedDay}
            setSelectedDay={setSelectedDay}
            disabledDays={disabledDays}
            timeTable={timeTable}
            selectedTime={selectedTime}
            firstName={firstName}
            setFirstName={setFirstName}
            firstNameValid={firstNameValid}
            lastName={lastName}
            setLastName={setLastName}
            lastNameValid={lastNameValid}
            purpose={purpose}
            setPurpose={setPurpose}
            purposeValid={purposeValid}
            email={email}
            setEmail={setEmail}
            emailValid={emailValid}
            SubmitAction={SubmitAction}
          />
        ) : (
          <div className="m-gen">
            <MessageGen
              line1={`Appointment Submitted.`}
              line2={`Please check your email to confrim appointment and calander invitation.`}
              line3={`Thank you! Redirecting to home page in ${countdown} seconds...`}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Appointments;
