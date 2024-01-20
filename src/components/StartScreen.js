import React, { useState } from 'react';

function StartScreen(props) {
    const [maxNumber, setMaxNumber] = useState(10);
    const [numEquations, setNumEquations] = useState(60);
    const [operations, setOperations] = useState({
        addition: true,
        subtraction: false,
        multiplication: false,
        division: false
    });
    const [printMode, setPrintMode] = useState(true);

    const handleNumberChange = (e) => {
        setMaxNumber(e.target.value);
    };

    const handleNumEquationsChange = (e) => {
        setNumEquations(e.target.value);
    };

    const handleOperationChange = (e) => {
        setOperations({ ...operations, [e.target.name]: e.target.checked });
    };

    const handlePrintModeChange = (e) => {
        setPrintMode(e.target.checked);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        props.onStart({
            maxNumber,
            numEquations,
            operations,
            printMode
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Maximum Number:
                <input type="number" value={maxNumber} onChange={handleNumberChange} />
            </label>
            <br />
            <label>
                Number of Equations:
                <input type="number" value={numEquations} onChange={handleNumEquationsChange} />
            </label>
            <br />
            <fieldset>
                <legend>Operations</legend>
                <label>
                    <input type="checkbox" name="addition" checked={operations.addition} onChange={handleOperationChange} />
                    Addition
                </label>
                <label>
                    <input type="checkbox" name="subtraction" checked={operations.subtraction} onChange={handleOperationChange} />
                    Subtraction
                </label>
                <label>
                    <input type="checkbox" name="multiplication" checked={operations.multiplication} onChange={handleOperationChange} />
                    Multiplication
                </label>
                <label>
                    <input type="checkbox" name="division" checked={operations.division} onChange={handleOperationChange} />
                    Division
                </label>
            </fieldset>
            <br />
            <label>
                Print Mode:
                <input type="checkbox" checked={printMode} onChange={handlePrintModeChange} />
            </label>
            <br />
            <button type="submit">Start</button>
        </form>
    );
}

export default StartScreen;
