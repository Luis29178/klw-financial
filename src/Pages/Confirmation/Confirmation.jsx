import React, { useState, useEffect } from "react";
import "./Confirmation.css";
import {
  checkDocumentExistence,
  updateDocument,
  getAppointmentDoc,

} from "../../FireBaseAPIs/firestoreAPI";
import { useNavigate } from "react-router-dom";
import emailjs from "emailjs-com";
import MessageGen from "../../Components/MessageGen/MessageGen";



const Confirmation = () => {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [updatedPass, setUpdatedPass] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    // Start countdown when confirmed is true
    if (confirmed) {
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
  }, [confirmed, countdown]);

  const SendConfirmation = (emailData) => {
    emailjs
      .send(
        "service_n3f8s79",
        "template_eeh0ux4",
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
  const sendConfirmationEmail = (email, docID) => {
    const emailData = {
      to_email: email,
      subject: "Appointment Confirmation",
      paragraph_1: `Your appointment with document ID ${docID} has been confirmed.`,
      title: "Appointment Confirmation",
      // You can customize the HTML content as needed
    };

    SendConfirmation(emailData);
  };
  const sendAdminAlertEmail = (adminEmail, docID) => {
    const emailData = {
      to_email: adminEmail,
      subject: "New Confirmed Appointment Alert",
      title: "New Confirmed Appointment Alert",
      paragraph_1: `Your appointment with document ID ${docID} has been confirmed.`,
      // You can customize the HTML content as needed
    };
    SendConfirmation(emailData);
  };

  const formatDate = (dateString, timeString) => {
    const [startTime, endTime] = timeString.split(" - ");
    const currentYear = new Date().getFullYear();
    const startDateTime = new Date(`${dateString} ${currentYear} ${startTime}`);
    const endDateTime = new Date(`${dateString} ${currentYear} ${endTime}`);

    return {
      start: startDateTime.toISOString(),
      end: endDateTime.toISOString(),
    };
  };
  const handleCreateEvent = async (appointment) => {
    if (appointment) {
      const { start, end } = formatDate(appointment.date, appointment.time);
      const exampleEventDetails = {
        summary: `Meeting with ${appointment.name}`,
        description: appointment.purpose,
        startDateTime: start,
        endDateTime: end,
      };
      

    }
  };

  const ConfirmAppointment = async (docID) => {
    const email = "luis29178@gmail.com";
    const adminEmail = "luis29178@gmail.com";


    const appointment = await getAppointmentDoc(docID);

   
    handleCreateEvent(appointment)
    sendConfirmationEmail(email, docID);
    sendAdminAlertEmail(adminEmail, docID);



  };

  const handleConfirm = async () => {
    if (code.length > 0) {
      setLoading(true);
      let passCheck = await checkDocumentExistence(code);
      setLoading(false);

      if (passCheck === true && code.length > 9) {
        await updateDocument("Appointments", code, {
          confirmed: true,
        });
      } else {
        setUpdatedPass(false);
        setTimeout(() => setUpdatedPass(true), 1000);
        return;
      }
      ConfirmAppointment(code);
      setConfirmed(true);
    }
  };

  return (
    <div className="confirmContainer">
      <div className="confirm">
        <div className="confirm_code_wrapper">
          {loading && (
            <div className="loading-screen">
              <div className="loading-circle"></div>
            </div>
          )}

          {!confirmed ? (
            <div>
              <div className="message">Please Confirm Your Appointment</div>

              <div className="confirm_code">
                <input
                  className={`input ${!updatedPass ? "input-invalid" : ""}`}
                  placeholder="Enter code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
              </div>
              <div className="submit_button_box">
                <button className="submit_button" onClick={handleConfirm}>
                  Confirm
                </button>
              </div>
            </div>
          ) : (
            <MessageGen
              line1={`Appointment Confirmed.`}
              line2={`Thank you! Redirecting to home page in ${countdown} seconds...`}
              line3={``}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
