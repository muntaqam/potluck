import React, { useState, useRef } from 'react';

const FourLetterInput = ({ onCodeChange }) => {
    const [inputs, setInputs] = useState(['', '', '', '']); // State to manage the values of the 4 inputs
    const inputRefs = useRef([]); // Refs for each input field

    // Handle input change (typing)
    const handleChange = (e, index) => {
        const value = e.target.value;

        // Check if the value is a valid letter or number
        const validInput = /^[A-Za-z0-9]$/; // RegEx to allow only letters (A-Z, a-z) and numbers (0-9)

        if (value.length === 1 && validInput.test(value)) {
            // Update the value of the current input
            const newInputs = [...inputs];
            newInputs[index] = value;
            setInputs(newInputs);
            onCodeChange(newInputs); // Notify parent component about the code change

            // Move focus to the next input if there's one
            if (index < 3) {
                setTimeout(() => inputRefs.current[index + 1]?.focus(), 0); // Focus on next input
            }
        }
    };

    // Handle backspace (immediately delete and move focus to the previous input)
    const handleBackspace = (e, index) => {
        if (e.key === 'Backspace') {
            const newInputs = [...inputs];
            if (newInputs[index] !== '') {
                // If there is a letter, delete it immediately
                newInputs[index] = ''; // Clear the current input
                setInputs(newInputs);
                onCodeChange(newInputs); // Notify parent component about the code change
            } else if (index > 0) {
                // If the current input is empty, move focus to the previous input
                newInputs[index - 1] = ''; // Clear the previous input
                setInputs(newInputs);
                onCodeChange(newInputs); // Notify parent component about the code change
                setTimeout(() => inputRefs.current[index - 1]?.focus(), 0); // Focus the previous input
            }
        }
    };

    return (
        <div className="space-y-4 flex justify-center items-center">
            {inputs.map((value, index) => (
                <input
                    key={index}
                    type="text"
                    value={value}
                    maxLength={1}
                    onChange={(e) => handleChange(e, index)}
                    onKeyDown={(e) => handleBackspace(e, index)}
                    ref={(el) => inputRefs.current[index] = el} // Focus management with refs
                    className="w-12 h-12 text-center bg-white text-black rounded border border-gray-300"
                    placeholder="A"
                />
            ))}
        </div>
    );
};

export default FourLetterInput;
