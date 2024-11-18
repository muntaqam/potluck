// src/components/JoinPartyForm.tsx
import React, { useState } from "react";
import axios from "axios";

const JoinPartyForm = () => {
    const [partyCode, setPartyCode] = useState("");
    const [participantName, setParticipantName] = useState("");
    const [message, setMessage] = useState("");

    const handleJoinParty = async () => {
        try {
            await axios.post("http://localhost:3000/api/join-party", {
                partyCode,
                participantName,
            });

            setMessage("Joined party successfully!");
        } catch (error) {
            console.error("Error joining party:", error);
            setMessage("Failed to join party. Please check the party code.");
        }
    };

    return (
        <div className="join-party-form">
            <h2>Join an Existing Party</h2>
            <input
                type="text"
                placeholder="Enter Party Code"
                value={partyCode}
                onChange={(e) => setPartyCode(e.target.value)}
            />
            <input
                type="text"
                placeholder="Enter your name"
                value={participantName}
                onChange={(e) => setParticipantName(e.target.value)}
            />
            <button onClick={handleJoinParty}>Join Party</button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default JoinPartyForm;
