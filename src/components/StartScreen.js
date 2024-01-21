import React, {useState} from 'react';

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
    const [groupSize, setGroupSize] = useState(5); // Default group size

    const handleGroupSizeChange = (e) => {
        setGroupSize(e.target.value);
    };

    const handleNumberChange = (e) => {
        setMaxNumber(e.target.value);
    };

    const handleNumEquationsChange = (e) => {
        setNumEquations(e.target.value);
    };

    const handleOperationChange = (e) => {
        setOperations({...operations, [e.target.name]: e.target.checked});
    };

    const handlePrintModeChange = (e) => {
        setPrintMode(e.target.checked);
    };


    const [error, setError] = useState(''); // State to handle error message

    const handleSubmit = (e) => {
        e.preventDefault();
        // Check if at least one operation is selected
        if (!operations.addition && !operations.subtraction && !operations.multiplication && !operations.division) {
            setError('Please select at least one operation.');
            return;
        }
        setError(''); // Clear any existing error
        props.onStart({
            maxNumber,
            numEquations,
            operations,
            printMode,
            groupSize
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Maximum Number:
                <input type="number" value={maxNumber} onChange={handleNumberChange}/>
            </label>
            <br/>
            <label>
                Number of Equations:
                <input type="number" value={numEquations} onChange={handleNumEquationsChange}/>
            </label>
            <br/>
            <label>
                Group Size:
                <input type="number" value={groupSize} onChange={handleGroupSizeChange}/>
            </label>
            <br/>
            <fieldset>
                <legend>Operations</legend>
                <label>
                    <input type="checkbox" name="addition" checked={operations.addition}
                           onChange={handleOperationChange}/>
                    Addition
                </label>
                <label>
                    <input type="checkbox" name="subtraction" checked={operations.subtraction}
                           onChange={handleOperationChange}/>
                    Subtraction
                </label>
                <label>
                    <input type="checkbox" name="multiplication" checked={operations.multiplication}
                           onChange={handleOperationChange}/>
                    Multiplication
                </label>
                <label>
                    <input type="checkbox" name="division" checked={operations.division}
                           onChange={handleOperationChange}/>
                    Division
                </label>
            </fieldset>
            <br/>
            <label>
                Print Mode:
                <input type="checkbox" checked={printMode} onChange={handlePrintModeChange}/>
            </label>
            <br/>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <button type="submit">Start</button>
        </form>
    );
}

export default StartScreen;
