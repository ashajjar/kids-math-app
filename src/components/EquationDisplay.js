import React, {useState, useEffect, useRef} from 'react';

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
        <div>
            {equations.slice(currentGroupIndex * groupSize, (currentGroupIndex + 1) * groupSize).map((equation, index) => (
                <div key={index}>
                    {equation}
                    <input
                        type="number"
                        value={answers[currentGroupIndex * groupSize + index]}
                        onChange={(e) => handleAnswerChange(e, currentGroupIndex * groupSize + index)}
                        ref={index === 0 ? firstInputRef : null}
                    />
                </div>
            ))}
            <button onClick={goToPreviousGroup} disabled={currentGroupIndex === 0}>Previous</button>
            <button onClick={goToNextGroup}
                    disabled={currentGroupIndex === Math.ceil(equations.length / groupSize) - 1}>Next
            </button>
            <button onClick={() => onFinish(answers)}>Finish</button>
        </div>
    );
}

export default EquationDisplay;
