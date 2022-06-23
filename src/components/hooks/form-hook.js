import { useCallback, useReducer } from 'react';

const formReducer = (state, action) => {
    switch(action.type) {
        case 'INPUT_CHANGE':
            let formIsValid = true;
            for(const inputId in state.inputs) {
                if(inputId === action.inputId){
                    formIsValid = formIsValid && action.isValid;
                }
                else {
                    formIsValid = formIsValid && state.inputs[inputId].isValid;
                }
            }
            return {
                ...state,
                inputs: {
                    ...state.inputs,
                    [action.inputId]: {value: action.value, isValid: action.isValid}
                },
                isValid: formIsValid
            };
        default:
            return state;
    }
};

export const useForm = (initialInputs, initialFormValidity) => {
    const [formState, dispatch] = useReducer(formReducer, {
        inputs: initialInputs,
        isValid: initialFormValidity
    });

    //const inputHandler = useCallback((id, value, isValid) => {
    const inputHandler = useCallback((event) => {
        console.log("YAYA VALUES id " + event.target.id);
        console.log("YAYA VALUES value " + event.target.value);
        //console.log("YAYA VALUES value" + value);
        // console.log("YAYA VALUES isValid" + isValid);
        dispatch({
            type: 'INPUT_CHANGE',
            value: event.target.value, 
            isValid: false,
            inputId: event.target.id
        });
        console.log("YAYA " + JSON.stringify(formState));
    }, []);

    return [formState, inputHandler];
};