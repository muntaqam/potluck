import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const PartyDetails = () => {
    const { partyCode } = useParams(); // Extract partyCode from URL params
    const [partyDetails, setPartyDetails] = useState(null); // Store the party details
    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {
        console.log("Party Code from URL:", partyCode); // Debugging to check the extracted partyCode

        // Function to fetch the party details from the backend
        const fetchPartyDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/party/${partyCode}`);
                setPartyDetails(response.data); // Store fetched data
            } catch (error) {
                console.error("Failed to fetch party details:", error);
            } finally {
                setLoading(false);
            }
        };

        if (partyCode) {
            fetchPartyDetails(); // Only call if partyCode is not undefined
        }
    }, [partyCode]);


    // If loading, show a loading message
    if (loading) {
        return <p>Loading...</p>;
    }

    // If partyDetails is null or undefined, show an error message
    if (!partyDetails) {
        return <p>Failed to load party details. Please try again later.</p>;
    }

    return (
        <div className="party-details">
            <h2 className="text-xl font-semibold mb-4">Party Details</h2>

            {partyDetails.eventName && <p><strong>Event Name:</strong> {partyDetails.eventName}</p>}
            <p><strong>Created by:</strong> {partyDetails.creatorName}</p>
            {partyDetails.eventDate && <p><strong>Date:</strong> {new Date(partyDetails.eventDate).toLocaleDateString()}</p>}
            {partyDetails.eventTime && <p><strong>Time:</strong> {partyDetails.eventTime}</p>}
            {partyDetails.location && <p><strong>Location:</strong> {partyDetails.location}</p>}



            <h3 className="text-lg font-semibold mt-4">Participants</h3>
            {partyDetails.participants?.length > 0 ? (
                <ul>
                    {partyDetails.participants.map((participant, index) => (
                        <li key={index}>{participant.name || "Guest"}</li>
                    ))}
                </ul>
            ) : (
                <p>No participants have joined yet.</p>
            )}

            <h3 className="text-lg font-semibold mt-4">Item Categories</h3>
            {partyDetails.categories?.length > 0 ? (
                <ul>
                    {partyDetails.categories.map((category, index) => (
                        <li key={index}>
                            <strong>{category.categoryName}</strong> - Required: {category.requiredCount}, Signed Up: {category.signedUpCount}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No items have been added yet.</p>
            )}
        </div>
    );
};

export default PartyDetails;
