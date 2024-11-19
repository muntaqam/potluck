// src/components/CreatePotluckForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
    Stepper,
    Step,
    StepLabel,
    Box,
    Typography,
    TextField,
    Button,
} from '@mui/material';

const CreatePotluckForm = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [formValues, setFormValues] = useState({
        creatorName: '',
        eventName: '',
        eventDate: '',
        eventTime: '',
        location: '',
        categories: [''],
    });
    const [partyCode, setPartyCode] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const steps = [
        'Creator Name',
        'Event Name',
        'Event Date & Time',
        'Location',
        'Item Categories',
    ];

    // Function to handle form input changes
    const handleInputChange = (field, value) => {
        setFormValues({ ...formValues, [field]: value });
    };

    // Function to handle adding a new category input
    const handleAddCategory = () => {
        setFormValues((prevValues) => ({
            ...prevValues,
            categories: [...prevValues.categories, ""],
        }));
    };

    // Function to handle changing category inputs
    const handleCategoryChange = (index, value) => {
        const updatedCategories = [...formValues.categories];
        updatedCategories[index] = value;
        setFormValues({ ...formValues, categories: updatedCategories });
    };

    // Function to handle form submission
    const handleCreateParty = async () => {
        try {
            const response = await axios.post("http://localhost:3000/api/create-party", formValues);
            if (response.data && response.data.partyCode) {
                setPartyCode(response.data.partyCode);
                setMessage("Party created successfully!");
                // Redirect to the party details page using the correct partyCode
                navigate(`/party/${response.data.partyCode}`);
            } else {
                setMessage("Failed to create party. Please try again.");
            }
        } catch (error) {
            console.error("Error creating party:", error);
            setMessage("Failed to create party. Please try again.");
        }
    };

    // Handle moving to the next step
    const handleNext = () => {
        if (currentStep === steps.length - 1) {
            handleCreateParty();
        } else {
            setCurrentStep((prev) => prev + 1);
        }
    };

    // Handle moving to the previous step
    const handleBack = () => {
        setCurrentStep((prev) => prev - 1);
    };

    // Render content for each step
    const renderStepContent = (step) => {
        switch (step) {
            case 0:
                return (
                    <TextField
                        label="Creator Name"
                        value={formValues.creatorName}
                        onChange={(e) => handleInputChange('creatorName', e.target.value)}
                        variant="outlined"
                        fullWidth
                    />
                );
            case 1:
                return (
                    <TextField
                        label="Event Name"
                        value={formValues.eventName}
                        onChange={(e) => handleInputChange('eventName', e.target.value)}
                        variant="outlined"
                        fullWidth
                    />
                );
            case 2:
                return (
                    <Box>
                        <TextField
                            label="Event Date"
                            type="date"
                            value={formValues.eventDate}
                            onChange={(e) => handleInputChange('eventDate', e.target.value)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            label="Event Time"
                            type="time"
                            value={formValues.eventTime}
                            onChange={(e) => handleInputChange('eventTime', e.target.value)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                            fullWidth
                        />
                    </Box>
                );
            case 3:
                return (
                    <TextField
                        label="Location"
                        value={formValues.location}
                        onChange={(e) => handleInputChange('location', e.target.value)}
                        variant="outlined"
                        fullWidth
                    />
                );
            case 4:
                return (
                    <Box>
                        {formValues.categories.map((category, index) => (
                            <TextField
                                key={index}
                                label={`Category ${index + 1}`}
                                value={category}
                                onChange={(e) => handleCategoryChange(index, e.target.value)}
                                variant="outlined"
                                fullWidth
                                sx={{ mb: 2 }}
                            />
                        ))}
                        <Button
                            onClick={handleAddCategory}
                            variant="outlined"
                            color="primary"
                            sx={{ mt: 2 }}
                        >
                            Add Category
                        </Button>
                    </Box>
                );
            default:
                return 'Unknown step';
        }
    };

    return (
        <Box sx={{ width: '80%', margin: '0 auto', paddingTop: 4 }}>
            <Typography variant="h4" align="center" gutterBottom>
                Create a New Potluck
            </Typography>
            <Stepper activeStep={currentStep} alternativeLabel>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>

            <Box sx={{ marginTop: 4 }}>
                {renderStepContent(currentStep)}
                <Box sx={{ marginTop: 4, display: 'flex', justifyContent: 'space-between' }}>
                    <Button
                        onClick={handleBack}
                        disabled={currentStep === 0}
                        variant="contained"
                        color="secondary"
                    >
                        Back
                    </Button>
                    <Button
                        onClick={handleNext}
                        variant="contained"
                        color="primary"
                    >
                        {currentStep === steps.length - 1 ? 'Create Potluck' : 'Next'}
                    </Button>
                </Box>
            </Box>

            {message && (
                <Typography color="error" align="center" sx={{ marginTop: 2 }}>
                    {message}
                </Typography>
            )}
            {partyCode && (
                <Typography color="primary" align="center" sx={{ marginTop: 2 }}>
                    Your Party Code: <strong>{partyCode}</strong>
                </Typography>
            )}
        </Box>
    );
};

export default CreatePotluckForm;
