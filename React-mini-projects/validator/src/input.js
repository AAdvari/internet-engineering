import React, {useState} from 'react';
import {validate} from './validators';

const INPUT_STATES = {
  UNTOUCHED: 'UNTOUCHED',
  VALID: 'VALID',
  INVALID: 'INVALID'
};

const Input = props => {
    const {
        initialValue,
        label,
        errorText,
        validators
    } = props;

    const [value, setValue] = useState('');
    const [inputState, setInputState] = useState(INPUT_STATES.UNTOUCHED);

    const validateInput = (event) => {
        const newValue = event.target.value;
        setValue(newValue);
        if(validate(newValue, validators))
            setInputState(INPUT_STATES.VALID);
        else
            setInputState(INPUT_STATES.INVALID);
    }
    const getErrorMsgClass = () => {
       return inputState === INPUT_STATES.INVALID ? '' : 'hide';
    }
    const getDivClass = () => {
        return inputState === INPUT_STATES.INVALID ? 'form-input--invalid' : '';
    }
   return (
     <div className={'form-input ' + getDivClass()} data-testid="form-input">
       <label>{label}</label>
       <input value={initialValue} onChange={event => validateInput(event)}/>
       <p className={getErrorMsgClass()}>{errorText} </p>
     </div>
   )
};

export default Input;
