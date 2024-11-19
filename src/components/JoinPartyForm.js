import React, { useState } from "react";
import axios from "axios";

const JoinPartyForm = ({ participantId }) => {
    const [participantName, setParticipantName] = useState("");
    const [message, setMessage] = useState("");

    const handleUpdateName = async () => {
        try {
            await axios.post("http://localhost:3000/api/update-participant-name", {
                participantId,
                newName: participantName,
            });

            setMessage("Name updated successfully!");
        } catch (error) {
            console.error("Error updating name:", error);
            setMessage("Failed to update name. Please try again.");
        }
    };

    return (
        <div className="join-party-form mt-4">
            <h2>Enter Your Name</h2>
            <input
                type="text"
                placeholder="Enter your name"
                value={participantName}
                onChange={(e) => setParticipantName(e.target.value)}
                className="border p-2 rounded"
            />
            <button
                onClick={handleUpdateName}
                className="ml-2 px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                Submit Name
            </button>
            {message && <p className="mt-2 text-green-500">{message}</p>}
        </div>
    );
};

export default JoinPartyForm;
