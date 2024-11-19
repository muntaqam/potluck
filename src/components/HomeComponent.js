import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';
import FourLetterInput from './FourLetterInput'; // Assuming FourLetterInput.js is in the same folder

const HomeComponent = () => {
    const [code, setCode] = useState(['', '', '', '']); // State to track the input values (4 letters)
    const [isButtonEnabled, setIsButtonEnabled] = useState(false); // State to enable/disable the "Check Party" button
    const [message, setMessage] = useState(''); // Display messages
    const [isNameInputVisible, setIsNameInputVisible] = useState(false); // State to show/hide name input
    const [participantName, setParticipantName] = useState(''); // State for the participant's new name
    const [participantId, setParticipantId] = useState(null); // Store participant ID after joining
    const navigate = useNavigate(); // Hook must be used at the top level

    // Handle the code change from the FourLetterInput component
    const handleCodeChange = (newCode) => {
        setCode(newCode);
        // Check if all inputs are filled (i.e., each input has a letter)
        setIsButtonEnabled(newCode.every(letter => letter !== ''));
    };

    // Handle Check Party
    const handleCheckParty = async () => {
        const codeString = code.join('');
        console.log("Party Code:", codeString); // Debug to ensure the code is correct

        try {
            const response = await axios.get(`http://localhost:3000/api/check-party/${codeString}`);

            if (response.status === 200) {
                // If the party exists, show the name input field
                setMessage("Party found! Please enter your name to join.");
                setIsNameInputVisible(true); // Show the name input field
            }
        } catch (error) {
            console.error('Failed to check the party:', error);
            setMessage('Party code does not exist. Please try again.');
            setIsNameInputVisible(false);
        }
    };

    // Handle Submit Name
    const handleSubmitName = async () => {
        const codeString = code.join('');

        if (!participantName) {
            setMessage("Please enter a name to join the party.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:3000/api/create-participant", {
                partyCode: codeString,
                participantName,
            });

            if (response.status === 201) {
                setParticipantId(response.data.participantId);
                setMessage("Successfully joined the party! You are now part of the potluck.");
                navigate(`/party/${codeString}`);
            }
        } catch (error) {
            console.error("Failed to join the party:", error);
            setMessage("Failed to join the party. Please try again.");
        }
    };

    // Handle navigation to the Create Party page
    const handleCreatePotluck = () => {
        navigate('/create-potluck'); // Use navigate here at the top level, not in an inline callback
    };

    return (
        <div className="flex flex-col justify-center items-center min-h-screen space-y-6 p-6">
            <h2 className="text-xl font-semibold">POTLUCK</h2>
            <h2 className="text-xl font-semibold">Join with 4 letters</h2>

            <FourLetterInput onCodeChange={handleCodeChange} />

            <button
                onClick={handleCheckParty}
                disabled={!isButtonEnabled}
                className={`w-48 px-3 py-3 mt-6 ${isButtonEnabled ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-500'} text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-300 transition`}
            >
                {isButtonEnabled ? "Join Party" : "Enter 4 Letters"}
            </button>

            {message && <p className="text-blue-500 mt-4">{message}</p>}

            {/* Name input field visible only if the party exists */}
            {isNameInputVisible && (
                <div className="mt-4">
                    <input
                        type="text"
                        placeholder="Enter your name"
                        value={participantName}
                        onChange={(e) => setParticipantName(e.target.value)}
                        className="border p-2 rounded"
                    />
                    <button
                        onClick={handleSubmitName}
                        className="ml-2 px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Submit Name
                    </button>
                </div>
            )}

            {/* Link for creating a potluck */}
            <p
                onClick={handleCreatePotluck} // Use a function that already has the navigate action
                className="text-sm text-blue-500 cursor-pointer hover:underline"
            >
                Don't have a code? Create a Potluck
            </p>
        </div>
    );
};

export default HomeComponent;
