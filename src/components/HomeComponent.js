import React, { useState } from 'react';
import FourLetterInput from './FourLetterInput'; // Assuming FourLetterInput.js is in the same folder

const HomeComponent = () => {
    const [code, setCode] = useState(['', '', '', '']); // State to track the input values (4 letters)
    const [isButtonEnabled, setIsButtonEnabled] = useState(false); // State to enable/disable the "Join Party" button

    // Handle the code change from the FourLetterInput component
    const handleCodeChange = (newCode) => {
        setCode(newCode);
        // Check if all inputs are filled (i.e., each input has a letter)
        setIsButtonEnabled(newCode.every(letter => letter !== ''));
    };

    // Handle when the "Join Party" button is clicked
    const handleJoinParty = () => {
        const codeString = code.join('');
        console.log("Joining the potluck with code:", codeString);
    };

    return (
        <div className="flex flex-col justify-center items-center min-h-screen space-y-6 p-6">
            <h2 className="text-xl font-semibold">POTLUCK</h2>
            <h2 className="text-xl font-semibold">Join with 4 letters</h2>

            {/* Render the FourLetterInput component */}
            <FourLetterInput onCodeChange={handleCodeChange} />

            {/* Join Party Button - Disabled until all inputs are filled */}
            <button
                onClick={handleJoinParty}
                disabled={!isButtonEnabled}
                className={`w-48 px-3 py-3 mt-6 ${isButtonEnabled ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-500'} text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-300 transition`}
            >
                {isButtonEnabled ? "Join Party" : "Enter 4 Letters"}
            </button>

            {/* Link for creating a potluck */}
            <p
                onClick={() => console.log('Create potluck clicked')}
                className="text-sm text-blue-500 cursor-pointer hover:underline"
            >
                Don't have a code? Create a Potluck
            </p>
        </div>
    );
};

export default HomeComponent;
