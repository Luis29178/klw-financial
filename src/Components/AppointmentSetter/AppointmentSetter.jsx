import React from "react";
import { DayPicker } from "react-day-picker";

import "./AppointmentSetter.css"

function AppointmentSetter({
  selectedDay,
  setSelectedDay,
  disabledDays,
  timeTable,
  selectedTime,
  firstName,
  setFirstName,
  firstNameValid,
  lastName,
  setLastName,
  lastNameValid,
  purpose,
  setPurpose,
  purposeValid,
  email,
  setEmail,
  emailValid,
  SubmitAction,
}) {
  return (
    <>
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
            <div className="name_container">
              <input
                value={firstName}
                className={`first_name ${
                  !firstNameValid ? "input-invalid" : ""
                }`}
                placeholder="First Name"
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                value={lastName}
                className={`last_name ${!lastNameValid ? "input-invalid" : ""}`}
                placeholder="Last Name"
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <input
              value={email}
              className={`appointment_email_input ${
                !emailValid ? "input-invalid" : ""
              }`}
              type="email"
              placeholder="you@email.com"
              onChange={(e) => setEmail(e.target.value)}
            />
            <textarea
              value={purpose}
              className={`purpose_notes_input ${
                !purposeValid ? "input-invalid" : ""
              }`}
              placeholder="Please provide a brief description of what you are looking to discuss.  (Optional)"
              onChange={(e) => setPurpose(e.target.value)}
            />
            
            <div className="submit_button_box">
              <button onClick={() => SubmitAction()} className="submit_button">
                Submit
              </button>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default AppointmentSetter;
