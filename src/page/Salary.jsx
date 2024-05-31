import React, { useState, useEffect } from 'react';
import './salary.css';

const Salary = () => {
    const [salary, setSalary] = useState(0);
    const [additionalValues, setAdditionalValues] = useState([]);
    const [subtractValues, setSubtractValues] = useState([]);
    const [result, setResult] = useState(0);
    const [fullResult, setFullResult] = useState(0);
    const [apit, setApit] = useState(0);
    const [totalWithEpfEtf, setTotalWithEpfEtf] = useState(0);
    const [totalEarnings, setTotalEarnings] = useState(0);
    const [totalDeductions, setTotalDeductions] = useState(0);

    useEffect(() => {
        let total = salary;
        let earningsSum = 0;
        additionalValues.forEach(val => {
            if (val.enabled) {
                total += val.value;
            }
            earningsSum += val.value;
        });
        let deductionsSum = 0;
        subtractValues.forEach(val => {
            total -= val.value;
            deductionsSum += val.value;
        });
        setResult(total);
        setTotalEarnings(earningsSum);
        setTotalDeductions(deductionsSum);

        let fullTotal = salary;
        additionalValues.forEach(val => {
            fullTotal += val.value;
        });
        subtractValues.forEach(val => {
            fullTotal -= val.value;
        });
        setFullResult(fullTotal);

        // Calculate APIT
        if (fullTotal < 100000) {
            setApit(0); 
        } else if (fullTotal >= 100000 && fullTotal < 141667) {
            setApit((fullTotal * 0.06) - 6000);
        } else if (fullTotal >= 141667 && fullTotal < 183333) {
            setApit((fullTotal * 0.12) - 14500);
        } else if (fullTotal >= 183333 && fullTotal < 225000) {
            setApit((fullTotal * 0.18) - 25500);
        } else if (fullTotal >= 225000 && fullTotal < 266667) {
            setApit((fullTotal * 0.24) - 39000);
        } else if (fullTotal >= 266667 && fullTotal < 308333) {
            setApit((fullTotal * 0.30) - 55000);
        } else {
            setApit((fullTotal * 0.36) - 73500);
        }

        // Calculate the total with EPF 12% and ETF 3%
        const epf12 = result * 0.12;
        const etf3 = result * 0.03;
        setTotalWithEpfEtf(totalEarnings+salary-totalDeductions + epf12 + etf3);
    }, [salary, additionalValues, subtractValues,totalEarnings,totalDeductions,result]);

    const handleAdditionalValueChange = (index, newValue) => {
        const updatedValues = [...additionalValues];
        updatedValues[index].value = parseFloat(newValue) || 0;
        setAdditionalValues(updatedValues);
    };

    const handleAdditionalLabelChange = (index, newLabel) => {
        const updatedValues = [...additionalValues];
        updatedValues[index].label = newLabel;
        setAdditionalValues(updatedValues);
    };

    const handleSubtractValueChange = (index, newValue) => {
        const updatedValues = [...subtractValues];
        updatedValues[index].value = parseFloat(newValue) || 0;
        setSubtractValues(updatedValues);
    };

    const handleSubtractLabelChange = (index, newLabel) => {
        const updatedValues = [...subtractValues];
        updatedValues[index].label = newLabel;
        setSubtractValues(updatedValues);
    };

    const handleAdditionalEnabledChange = (index, isEnabled) => {
        const updatedValues = [...additionalValues];
        updatedValues[index].enabled = isEnabled;
        setAdditionalValues(updatedValues);
    };

    const addNewValueField = () => {
        setAdditionalValues([...additionalValues, { label: '', value: 0, enabled: true }]);
    };

    const removeValueField = (index) => {
        const updatedValues = [...additionalValues];
        updatedValues.splice(index, 1);
        setAdditionalValues(updatedValues);
    };

    const addNewSubtractField = () => {
        setSubtractValues([...subtractValues, { label: '', value: 0 }]);
    };

    const removeSubtractField = (index) => {
        const updatedValues = [...subtractValues];
        updatedValues.splice(index, 1);
        setSubtractValues(updatedValues);
    };

    const handleReset = () => {
        setSalary(0);
        setAdditionalValues([]);
        setSubtractValues([]);
        setResult(0);
        setFullResult(0);
        setApit(0);
        setTotalWithEpfEtf(0);
        setTotalEarnings(0);
        setTotalDeductions(0);
    };

    return (
        <div>
            <table align='center'>
                <tr>
                <td>
                    <div className='left'>
                    <h1 className='heading'>Calculate Your Salary</h1>        
                    <a className='reset' onClick={handleReset}></a>
                    <label>
                    <h2 className='basic-salary'>Basic Salary</h2>
                    <input
                        type="number"
                        className='salary-input'
                        value={salary}
                        onChange={(e) => setSalary(parseFloat(e.target.value) || 0)}
                        placeholder="Enter salary"
                        />
                    </label>
                    <h2 className='earnings'>Earnings</h2>
                    <p1 className='caption'>Allowance, Fixed Allowance, Bonus and etc.</p1>
                    {
                    additionalValues.map((item, index) => (
                   
                    <div key={index}>
                        <input
                            type="text"
                            className='allowance-title'
                            value={item.label}
                            onChange={(e) => handleAdditionalLabelChange(index, e.target.value)}
                            placeholder={`Pay Details (Title)`}
                        />
                        <input
                            type="number"
                            className='allowance-amount'
                            value={item.value}
                            onChange={(e) => handleAdditionalValueChange(index, e.target.value)}
                            placeholder={`Amount`}
                        />
                    <a className='delete-value1' onClick={() => removeValueField(index)}>
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="16" cy="16" r="16" fill="#EFEFEF"/>
                        <path d="M21.85 20.44C21.9446 20.5339 21.9979 20.6617 21.9979 20.795C21.9979 20.9283 21.9446 21.0561 21.85 21.15L21.15 21.85C21.0561 21.9446 20.9283 21.9979 20.795 21.9979C20.6617 21.9979 20.5339 21.9446 20.44 21.85L16 17.41L11.56 21.85C11.4661 21.9446 11.3383 21.9979 11.205 21.9979C11.0717 21.9979 10.9439 21.9446 10.85 21.85L10.15 21.15C10.0553 21.0561 10.0021 20.9283 10.0021 20.795C10.0021 20.6617 10.0553 20.5339 10.15 20.44L14.59 16L10.15 11.56C10.0553 11.4661 10.0021 11.3383 10.0021 11.205C10.0021 11.0717 10.0553 10.9439 10.15 10.85L10.85 10.15C10.9439 10.0553 11.0717 10.0021 11.205 10.0021C11.3383 10.0021 11.4661 10.0553 11.56 10.15L16 14.59L20.44 10.15C20.5339 10.0553 20.6617 10.0021 20.795 10.0021C20.9283 10.0021 21.0561 10.0553 21.15 10.15L21.85 10.85C21.9446 10.9439 21.9979 11.0717 21.9979 11.205C21.9979 11.3383 21.9446 11.4661 21.85 11.56L17.41 16L21.85 20.44Z" fill="#212121"/>
                        </svg>
                    </a>
                    <label>
                        <input
                            type="checkbox"
                            checked={item.enabled}
                            onChange={(e) => handleAdditionalEnabledChange(index, e.target.checked)}
                        />EPF/ETF
                    </label>
                    </div>
                    ))}
                    <div>
                    <a className='allowance-button' onClick={addNewValueField}>+ Add New Allowance</a>
                    </div>
                    <hr/>
                        <h2 className='deduction'>Deductions</h2>
                        <p1 className='caption'>Salary Advances, Loan Deductions and all</p1>
                    {
                    subtractValues.map((item, index) => (
                    <div key={index}>
                        <input
                            type="text"
                            className='allowance-title'
                            value={item.label}
                            onChange={(e) => handleSubtractLabelChange(index, e.target.value)}
                            placeholder={`Deduction Details`}
                        />
                        <input
                            type="number"
                            className='allowance-amount'
                            value={item.value}
                            onChange={(e) => handleSubtractValueChange(index, e.target.value)}
                            placeholder={`Amount`}
                        />
                    <a className='delete-value2' onClick={() => removeSubtractField(index)}>
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="16" cy="16" r="16" fill="#EFEFEF"/>
                        <path d="M21.85 20.44C21.9446 20.5339 21.9979 20.6617 21.9979 20.795C21.9979 20.9283 21.9446 21.0561 21.85 21.15L21.15 21.85C21.0561 21.9446 20.9283 21.9979 20.795 21.9979C20.6617 21.9979 20.5339 21.9446 20.44 21.85L16 17.41L11.56 21.85C11.4661 21.9446 11.3383 21.9979 11.205 21.9979C11.0717 21.9979 10.9439 21.9446 10.85 21.85L10.15 21.15C10.0553 21.0561 10.0021 20.9283 10.0021 20.795C10.0021 20.6617 10.0553 20.5339 10.15 20.44L14.59 16L10.15 11.56C10.0553 11.4661 10.0021 11.3383 10.0021 11.205C10.0021 11.0717 10.0553 10.9439 10.15 10.85L10.85 10.15C10.9439 10.0553 11.0717 10.0021 11.205 10.0021C11.3383 10.0021 11.4661 10.0553 11.56 10.15L16 14.59L20.44 10.15C20.5339 10.0553 20.6617 10.0021 20.795 10.0021C20.9283 10.0021 21.0561 10.0553 21.15 10.15L21.85 10.85C21.9446 10.9439 21.9979 11.0717 21.9979 11.205C21.9979 11.3383 21.9446 11.4661 21.85 11.56L17.41 16L21.85 20.44Z" fill="#212121"/>
                        </svg>
                    </a>
                    </div>
                    ))}
                        <div>
                            <a className='allowance-button' onClick={addNewSubtractField}>+ Add New Deduction</a>
                        </div>
                    </div>
                </td>
                <td>
                    <div className='right'>
                        <h2 className='salary-heading'>Your Salary</h2>
                        <table className='salary-table1' align='center'>
                            <tr className='item-heading'>
                                <th align='left' >Item</th>
                                <th align='right'>Amount</th>
                            </tr>
                            <tr className='item'>
                                <td>Basic Salary</td>
                                <td align='right'>{salary}</td>
                            </tr>
                            <tr className='item'>
                                <td>Gross Earnings </td>
                                <td align='right'>{totalEarnings+salary-totalDeductions}</td>
                            </tr>
                            <tr className='item'>
                                <td>Gross Deductions</td>
                                <td align='right'>{totalDeductions}</td>
                            </tr>
                            {/* <tr className='item'>
                                <td>Result </td>
                                <td align='right'>{result}</td>
                            </tr> */}
                            <tr className='item'>
                                <td>Employee EPF (8%) </td>
                                <td align='right'>- {result * 0.08}</td>
                            </tr>
                                {/* <tr className='item'>
                                    <td>Full Result: </td>
                                    <td align='right'>{fullResult}</td>
                                </tr> */}
                            <tr className='item'>
                                <td>APIT </td>
                                <td align='right'>- {apit}</td>
                            </tr>
                        </table>
                    <div className='net-sal'>
                        <table className='salary-table2' align='center'>
                            <tr className='item'>
                                <td><b>Net Salary (Take Home) </b></td>
                                <td className='item-right' align='right'><b>{result - (result * 0.08) - apit}</b></td>
                            </tr>
                        </table>
                    </div>
                    <p className='sub-heading'>Contribution from the Employer</p>
                        <table className='salary-table3' align='center'>
                            <tr className='item'>
                                <td>Employer EPF (12%) </td>
                                <td align='right'>{result * 0.12}</td>
                            </tr>
                            <tr className='item'>
                                <td>Employer ETF (3%) </td>
                                <td align='right'>{result * 0.03}</td>
                            </tr>
                            <tr className='item'>
                                <td className='item-ctc'>CTC (Cost To Company)</td>
                                <td className='item-ctc' align='right'>{totalWithEpfEtf}</td>
                            </tr>
                        </table>
                    </div>
                </td>
                </tr>
            </table>
        </div>
    );
};

export default Salary;




