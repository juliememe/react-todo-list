import React, {useCallback, useState} from "react";
import {InputFieldProps} from "./Input-field.interface";
import {Button} from "../buttons";
import styles from './input-field.scss';
import ClassName from "classnames/bind";
const cx = ClassName.bind(styles);

export const InputFieldTemplate = ({placeholderValue, className, handleOnSubmit, disabled, tooltipText, inputName, ariaLabelText}: InputFieldProps) => {
    const [value, setValue] = useState('');
    const handleOnChange = useCallback((e) =>
        setValue(e.target.value), []);

    const setDataOnSubmit = useCallback((e) => {
        e.preventDefault();
        setValue('');
        return handleOnSubmit(value);
    }, [value, handleOnSubmit]);

    return (
        <form className="form__add">
            <input type="text" value={value} name={inputName} placeholder={placeholderValue} className={className}
                   onChange={handleOnChange} disabled={disabled}/>
            <Button handler={setDataOnSubmit} btnClass={cx("btn", "btn-light", "btn-add")} disabled={false}
                    btnType={"submit"} tooltipText={tooltipText} ariaLabelText={ariaLabelText}><span>Add</span></Button>
        </form>
    )

}

export const InputField = React.memo(InputFieldTemplate);