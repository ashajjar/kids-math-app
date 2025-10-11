import React, {useState} from 'react';
import '../styles/StartScreen.css';
import {useTranslation} from 'react-i18next';
import {trackEvent} from '../analytics';


function StartScreen(props) {
    const {t} = useTranslation();
    const [maxNumber, setMaxNumber] = useState(10);
    const [maxResult, setMaxResult] = useState(10);
    const [numEquations, setNumEquations] = useState(60);
    const [operations, setOperations] = useState({
        addition: true,
        subtraction: false,
        multiplication: false,
        division: false
    });
    const [groupSize, setGroupSize] = useState(5); // Default group size
    const [allowNegativeResults, setAllowNegativeResults] = useState(false);
    const [isGeneratingCombinations, setIsGeneratingCombinations] = useState(false);

    const handleAllowNegativeResultsChange = (e) => {
        setAllowNegativeResults(e.target.checked);
    };

    const handleIsGeneratingCombinationsChange = (e) => {
        setIsGeneratingCombinations(e.target.checked)
        setGroupSize(3);
    };

    const handleGroupSizeChange = (e) => {
        if (isGeneratingCombinations) {
            setGroupSize(3);
            return;
        }
        setGroupSize(parseInt(e.target.value));
    };

    const handleNumberChange = (e) => {
        setMaxNumber(parseInt(e.target.value));
    };

    const handleMaxResultChange = (e) => {
        setMaxResult(parseInt(e.target.value));
    };

    const handleNumEquationsChange = (e) => {
        setNumEquations(parseInt(e.target.value));
    };

    const handleOperationChange = (e) => {
        setOperations({...operations, [e.target.name]: e.target.checked});
    };

    const handlePrint = (e) => {
        e.preventDefault();
        // Check if at least one operation is selected
        if (!operations.addition && !operations.subtraction && !operations.multiplication && !operations.division) {
            setError('Please select at least one operation.');
            return;
        }
        setError(''); // Clear any existing error
        // analytics: printing worksheet
        trackEvent('print_sheet', {
            ops: Object.keys(operations).filter(k => operations[k]).join(','),
            maxNumber,
            numEquations,
            groupSize,
            maxResult,
            allowNegativeResults,
            isGeneratingCombinations,
        });
        props.onPrint({
            maxNumber,
            numEquations,
            operations,
            groupSize,
            allowNegativeResults,
            maxResult,
            isGeneratingCombinations
        });
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
        // analytics: start solving session
        trackEvent('start_session', {
            ops: Object.keys(operations).filter(k => operations[k]).join(','),
            maxNumber,
            numEquations,
            groupSize,
            maxResult,
            allowNegativeResults,
            isGeneratingCombinations,
        });
        props.onStart({
            maxNumber,
            numEquations,
            operations,
            groupSize,
            allowNegativeResults,
            maxResult,
            isGeneratingCombinations,
        });
    };

    return (
        <div className="start-screen">
            <h1>{t('startScreen.title')}</h1>
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <label>
                        {t('startScreen.maxNumber')}
                        <input type="number" value={maxNumber} onChange={handleNumberChange}/>
                    </label>
                    <br/>
                    <label>
                        {t('startScreen.equationsCount')}
                        <input type="number" value={numEquations} onChange={handleNumEquationsChange}/>
                    </label>
                    <br/>
                    <label>
                        {t('startScreen.groupSize')}
                        <input type="number" value={groupSize} onChange={handleGroupSizeChange} disabled={isGeneratingCombinations}/>
                    </label>
                    <br/>
                    <label>
                        {t('startScreen.maxResult')}
                        <input type="number" value={maxResult} onChange={handleMaxResultChange}/>
                    </label>
                    <br/>
                    <label>
                        {t('startScreen.isNegativeAllowed')}
                        <input
                            type="checkbox"
                            checked={allowNegativeResults}
                            onChange={handleAllowNegativeResultsChange}
                        />
                    </label>
                    <label>
                        {t('startScreen.isGeneratingCombinations')}
                        <input
                            type="checkbox"
                            checked={isGeneratingCombinations}
                            onChange={handleIsGeneratingCombinationsChange}
                        />
                    </label>
                    <br/>
                    <fieldset className="operations-group">
                        <legend>{t('startScreen.ops')}</legend>
                        <label>
                            <input type="checkbox" name="addition" checked={operations.addition}
                                   onChange={handleOperationChange}/>
                            {t('startScreen.op.add')}
                        </label>
                        <label>
                            <input type="checkbox" name="subtraction" checked={operations.subtraction}
                                   onChange={handleOperationChange}/>
                            {t('startScreen.op.sub')}
                        </label>
                        <label>
                            <input type="checkbox" name="multiplication" checked={operations.multiplication}
                                   onChange={handleOperationChange}/>
                            {t('startScreen.op.mul')}
                        </label>
                        <label>
                            <input type="checkbox" name="division" checked={operations.division}
                                   onChange={handleOperationChange}/>
                            {t('startScreen.op.div')}
                        </label>
                    </fieldset>
                    <br/>
                    {error && <div style={{color: 'red'}}>{error}</div>}
                    <div className="button-container">
                        <button type="submit">{t('startScreen.solve')}</button>
                        <button type="button" onClick={handlePrint}>{t('startScreen.print')}</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default StartScreen;
