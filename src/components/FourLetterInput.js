import React, { useState, useRef, useEffect } from 'react';

const FourLetterInput = ({ onCodeChange }) => {
    const [inputs, setInputs] = useState(['', '', '', '']);
    const inputRefs = useRef([]);

    // Handle input change (typing)
    const handleChange = (e, index) => {
        const value = e.target.value;
        const validInput = /^[A-Za-z0-9]$/; // RegEx to allow only letters (A-Z, a-z) and numbers (0-9)

        if (value.length === 1 && validInput.test(value)) {
            const newInputs = [...inputs];
            newInputs[index] = value;
            setInputs(newInputs);
            onCodeChange(newInputs);

            // Move focus to the next input if there's one
            if (index < 3) {
                setTimeout(() => inputRefs.current[index + 1]?.focus(), 0);
            }
        }
    };

    // Handle backspace (immediately delete and move focus to the previous input)
    const handleBackspace = (e, index) => {
        if (e.key === 'Backspace') {
            const newInputs = [...inputs];
            if (newInputs[index] !== '') {
                newInputs[index] = '';
                setInputs(newInputs);
                onCodeChange(newInputs);
            } else if (index > 0) {
                newInputs[index - 1] = '';
                setInputs(newInputs);
                onCodeChange(newInputs);
                setTimeout(() => inputRefs.current[index - 1]?.focus(), 0);
            }
        }
    };

    // Auto-focus the first input when the component is mounted
    useEffect(() => {
        inputRefs.current[0]?.focus(); // Focus the first input field
    }, []);

    // Handle global keypress events to automatically type in the fields
    useEffect(() => {
        const handleGlobalKeydown = (e) => {
            if (/^[A-Za-z0-9]$/.test(e.key)) { // Only allow valid keys (letters and numbers)
                for (let i = 0; i < 4; i++) {
                    if (inputs[i] === '') {
                        const newInputs = [...inputs];
                        newInputs[i] = e.key;
                        setInputs(newInputs);
                        onCodeChange(newInputs);
                        setTimeout(() => inputRefs.current[i + 1]?.focus(), 0); // Move focus to next input
                        break;
                    }
                }
            }
        };

        window.addEventListener('keydown', handleGlobalKeydown);

        // Clean up the event listener when component unmounts
        return () => {
            window.removeEventListener('keydown', handleGlobalKeydown);
        };
    }, [inputs, onCodeChange]);

    return (
        <div className="space-x-2 flex justify-center items-center">
            {inputs.map((value, index) => (
                <input
                    key={index}
                    type="text"
                    value={value}
                    maxLength={1}
                    onChange={(e) => handleChange(e, index)}
                    onKeyDown={(e) => handleBackspace(e, index)}
                    ref={(el) => inputRefs.current[index] = el}
                    className="w-12 h-12 text-center bg-white text-black rounded border border-gray-300 caret-transparent"
                    placeholder="A"
                />
            ))}
        </div>
    );
};

export default FourLetterInput;
