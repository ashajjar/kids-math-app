import React, {useEffect, useRef, useState} from 'react';
import '../styles/EquationDisplay.css';
import {useTranslation} from "react-i18next";
import {trackEvent} from '../analytics';

function EquationDisplay({equations, onFinish, groupSize}) {
    const [currentGroupIndex, setCurrentGroupIndex] = useState(0);
    const [answers, setAnswers] = useState(equations.map(() => ''));
    const inputRefs = useRef(equations.map(() => React.createRef()));

    // track session start time
    const startTimeRef = useRef(Date.now());

    useEffect(() => {
        // Focus the first input field of the current group
        const firstInputIndex = currentGroupIndex * groupSize;
        if (inputRefs.current[firstInputIndex]) {
            inputRefs.current[firstInputIndex].current.focus();
        }
    }, [currentGroupIndex, groupSize]);

    const handleAnswerChange = (e, index) => {
        const updatedAnswers = [...answers];
        updatedAnswers[index] = parseInt(e.target.value);
        setAnswers(updatedAnswers);
    };

    const handleAnswerKeyUp = (e, index) => {
        if (e.key === 'Enter') {
            if ((index + 1) >= equations.length) {
                handleFinish();
                return;
            }
            if ((index + 1) % groupSize === 0) {
                goToNextGroup();
                return;
            }
            inputRefs.current[index + 1].current.focus()
        }
        if (e.key === 'Escape') {
            handleFinish();
        }
    };

    const goToNextGroup = () => {
        setCurrentGroupIndex(currentGroupIndex + 1);
    };

    const goToPreviousGroup = () => {
        if (currentGroupIndex > 0) {
            setCurrentGroupIndex(currentGroupIndex - 1);
        }
    };

    const {t} = useTranslation();

    const handleFinish = () => {
        const durationMs = Date.now() - startTimeRef.current;
        const answeredCount = answers.filter(a => a !== '' && !Number.isNaN(a)).length;
        trackEvent('session_finished', {
            totalEquations: equations.length,
            answeredCount,
            groupsVisited: currentGroupIndex + 1,
            groupSize,
            durationSec: Math.round(durationMs / 1000)
        });
        onFinish(answers);
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
                                ref={inputRefs.current[currentGroupIndex * groupSize + index]}
                                onKeyUp={(e) => handleAnswerKeyUp(e, currentGroupIndex * groupSize + index)}
                            />
                        </label>
                    </div>
                ))}
            </div>
            <div className="button-container">
                <button onClick={goToPreviousGroup} disabled={currentGroupIndex === 0}
                        className="primary-button">{t('equations.previous')}</button>
                <button onClick={goToNextGroup}
                        disabled={currentGroupIndex === Math.ceil(equations.length / groupSize) - 1}
                        className="primary-button">{t('equations.next')}</button>
                <button onClick={handleFinish} className="primary-button">{t('equations.finish')}</button>
            </div>
        </div>
    );
}

export default EquationDisplay;
