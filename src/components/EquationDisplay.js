import React, { useState } from 'react';

function EquationDisplay({ equations,onFinish }) {
    const [currentEquationIndex, setCurrentEquationIndex] = useState(0);
    const [answers, setAnswers] = useState(equations.map(() => ''));
    const areAllAnswersFilled = answers.every(answer => answer !== '');
    const handleFinish = () => {
        onFinish(answers);
    };

    const handleAnswerChange = (e) => {
        const updatedAnswers = [...answers];
        updatedAnswers[currentEquationIndex] = e.target.value;
        setAnswers(updatedAnswers);
    };

    const goToNextEquation = () => {
        setCurrentEquationIndex(currentEquationIndex + 1);
    };

    const goToPreviousEquation = () => {
        if (currentEquationIndex > 0) {
            setCurrentEquationIndex(currentEquationIndex - 1);
        }
    };

    return (
        <div>
            <div>
                {equations[currentEquationIndex]}
                <input
                    type="number"
                    value={answers[currentEquationIndex]}
                    onChange={handleAnswerChange}
                />
            </div>
            <button onClick={goToPreviousEquation} disabled={currentEquationIndex === 0}>
                Previous
            </button>
            <button onClick={goToNextEquation} disabled={currentEquationIndex === equations.length - 1}>
                Next
            </button>

            {areAllAnswersFilled && (
                <button onClick={handleFinish}>Finish</button>
            )}
        </div>
    );
}

export default EquationDisplay;
