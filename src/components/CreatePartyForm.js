// src/components/CreatePartyForm.tsx
import React, { useState } from "react";
import axios from "axios";

const CreatePartyForm = () => {
    const [creatorName, setCreatorName] = useState("");
    const [partyCode, setPartyCode] = useState("");
    const [message, setMessage] = useState("");

    const handleCreateParty = async () => {
        try {
            const response = await axios.post("http://localhost:3000/api/create-party", {
                creatorName,
            });

            setPartyCode(response.data.partyCode);
            setMessage("Party created successfully!");
        } catch (error) {
            console.error("Error creating party:", error);
            setMessage("Failed to create party. Please try again.");
        }
    };

    return (
        <div className="create-party-form">
            <h2>Create a New Party</h2>
            <input
                type="text"
                placeholder="Enter your name"
                value={creatorName}
                onChange={(e) => setCreatorName(e.target.value)}
            />
            <button onClick={handleCreateParty}>Create Party</button>
            {message && <p>{message}</p>}
            {partyCode && <p>Your Party Code: <strong>{partyCode}</strong></p>}
        </div>
    );
};

export default CreatePartyForm;
