// src/components/PartyDetails.tsx
import React, { useState } from "react";
import axios from "axios";

const PartyDetails = () => {
    const [partyCode, setPartyCode] = useState < string > ("");
    const [partyDetails, setPartyDetails] = useState < any > (null);

    const handleGetPartyDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/api/party/${partyCode}`);
            setPartyDetails(response.data);
        } catch (error) {
            console.error("Error fetching party details:", error);
        }
    };

    return (
        <div className="party-details">
            <h2>View Party Details</h2>
            <input
                type="text"
                placeholder="Enter Party Code"
                value={partyCode}
                onChange={(e) => setPartyCode(e.target.value)}
            />
            <button onClick={handleGetPartyDetails}>Get Party Details</button>

            {partyDetails && (
                <div>
                    <h3>Party: {partyDetails.creatorName}'s Party</h3>
                    <p>Created at: {new Date(partyDetails.createdAt).toLocaleString()}</p>
                    <h4>Participants:</h4>
                    <ul>
                        {partyDetails.participants.map((participant) => (
                            <li key={participant.id}>{participant.name}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default PartyDetails;
