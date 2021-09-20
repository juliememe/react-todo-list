import React from "react";
import {CheckboxInterface} from "./Checkbox.interface";
import styles from './checkbox.scss';
import ClassName from "classnames/bind";

const cx = ClassName.bind(styles);

const CheckboxTemplate = ({check, handleCheckBox, labelName, labelElement, labelId}: CheckboxInterface) => {

    return (
        <div className="form-check">
            <input className={cx("form-check-input")} type="checkbox" id={labelId} checked={check}
                   onChange={handleCheckBox}/>
            <label className={cx("form-check-label")} htmlFor={labelElement}>
                {labelName}
            </label>
        </div>
    )
}
export const Checkbox = React.memo(CheckboxTemplate);