import React, { useState, useEffect } from "react";
import "./Switch.css";
const apiUrl = process.env.backend_url;

function Switch({ switchName }) {
  const [isChecked, setIsChecked] = useState(false);

  // Function to fetch and update the switch state based on sensorValues
  const fetchSensorValues = async () => {
    try {
      const response = await fetch(`${apiUrl}/sensorValues`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      // Set the switch state based on the received data
      setIsChecked(data[switchName.toLowerCase()] === "on");
    } catch (error) {
      console.error("Error fetching sensor values:", error);
    }
  };

  // Fetch sensor values initially and set up periodic polling
  useEffect(() => {
    // Fetch sensor values when the component mounts
    fetchSensorValues();

    // Set up polling interval (e.g., every 5 seconds)
    const pollInterval = setInterval(() => {
      fetchSensorValues();
    }, 100); // Adjust the interval as needed

    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(pollInterval);
    };
  }, [switchName]);

  const handleToggle = () => {
    // Toggle the switch state
    setIsChecked(!isChecked);

    // Prepare the data to send
    const dataToSend = {
      [switchName.toLowerCase()]: isChecked ? "off" : "on",
    };

    // Send a POST request to the specified URL
    fetch(`${apiUrl}/publish`, {
      method: "POST",
      body: JSON.stringify(dataToSend),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
      })
      .catch((error) => {
        console.error("Error sending data:", error);
      });
  };

  return (
    <div id="Switch">
      <div className="card">
        <div className="switch">
          <h3>{switchName}</h3>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={handleToggle}
            />
            <div className="toggle-switch-background">
              <div className="toggle-switch-handle"></div>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
}

export default Switch;
