import React, {useState, useEffect, useRef} from 'react';
import '../styles/EquationDisplay.css';

function EquationDisplay({equations, onFinish, groupSize}) {
    const [currentGroupIndex, setCurrentGroupIndex] = useState(0);
    const [answers, setAnswers] = useState(equations.map(() => ''));
    const firstInputRef = useRef(null);

    useEffect(() => {
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

    return (
        <div className="equation-display">
            <div className="equation-container">
                {equations.slice(currentGroupIndex * groupSize, (currentGroupIndex + 1) * groupSize).map((equation, index) => (
                    <div key={index} className="equation">
                        <label>
                            {equation}

                            <input
                                type="number"
                                value={answers[currentGroupIndex * groupSize + index]}
                                onChange={(e) => handleAnswerChange(e, currentGroupIndex * groupSize + index)}
                                ref={index === 0 ? firstInputRef : null}
                            />

                        </label>
                    </div>
                ))}
            </div>
            <div className="button-container">

                <button onClick={goToPreviousGroup} disabled={currentGroupIndex === 0}
                        className="primary-button">Previous
                </button>
                <button onClick={goToNextGroup}
                        disabled={currentGroupIndex === Math.ceil(equations.length / groupSize) - 1}
                        className="primary-button">Next
                </button>
                <button onClick={() => onFinish(answers)} className="primary-button">Finish</button>
            </div>
        </div>
    );
}

export default EquationDisplay;
