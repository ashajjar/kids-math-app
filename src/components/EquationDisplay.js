import React, { useState, useEffect, useRef } from 'react';

function EquationDisplay({ equations, onFinish }) {
    const [currentGroupIndex, setCurrentGroupIndex] = useState(0);
    const groupSize = 5;
    const [answers, setAnswers] = useState(equations.map(() => ''));
    const firstInputRef = useRef(null); // Create a ref for the first input

    useEffect(() => {
        // Set focus to the first input when the group changes
        if (firstInputRef.current) {
            firstInputRef.current.focus();
        }
    }, [currentGroupIndex]);

    const handleAnswerChange = (e, index) => {
        const updatedAnswers = [...answers];
        updatedAnswers[index] = e.target.value;
        setAnswers(updatedAnswers);
    };

    const goToNextGroup = () => {
        setCurrentGroupIndex(currentGroupIndex + 1);
    };

    const goToPreviousGroup = () => {
        if (currentGroupIndex > 0) {
            setCurrentGroupIndex(currentGroupIndex - 1);
        }
    };

    const isLastGroup = currentGroupIndex === Math.ceil(equations.length / groupSize) - 1;

    return (
        <div>
            {equations.slice(currentGroupIndex * groupSize, (currentGroupIndex + 1) * groupSize).map((equation, index) => (
                <div key={index}>
                    {equation}
                    <input
                        type="number"
                        value={answers[currentGroupIndex * groupSize + index]}
                        onChange={(e) => handleAnswerChange(e, currentGroupIndex * groupSize + index)}
                        ref={index === 0 ? firstInputRef : null} // Assign ref to the first input in each group
                    />
                </div>
            ))}
            <button onClick={goToPreviousGroup} disabled={currentGroupIndex === 0}>Previous</button>
            <button onClick={goToNextGroup} disabled={isLastGroup}>Next</button>
            {isLastGroup && <button onClick={() => onFinish(answers)}>Finish</button>}
        </div>
    );
}

export default EquationDisplay;
