import React, { useState, useEffect } from "react";
import "./Confirmation.css";
import {
  checkDocumentExistence,
  updateDocument,
} from "../../FireBaseAPIs/firestoreAPI";

import { useNavigate } from "react-router-dom";

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

  const handleConfirm = async () => {
    if (code.length > 0) {
      setLoading(true);
      let passCheck = await checkDocumentExistence(code);
      setLoading(false);
    
    if (passCheck === true && code.length > 9) {
      await updateDocument("Appointments", code, {
        confirmed: true,
      });
      setConfirmed(true);
    } else {
      setUpdatedPass(false);
      setTimeout(() => setUpdatedPass(true), 1000);
    }
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
            <div className="confirmation-message-container">
              <div className="confirmation-message">Appointment Confirmed.</div>

              <div className="confirmation-message delayed">
                {" "}
                Thank you! Redirecting to home page in {countdown} seconds...
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
