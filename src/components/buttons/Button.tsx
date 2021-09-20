import React from "react";
import {ButtonProps} from "./Button.interface";

const ButtonTemplate = ({handler, btnClass, btnType, disabled, children, ariaLabelText, tooltipText}: ButtonProps) => {
    return (
        <button onClick={handler} className={btnClass} type={btnType} disabled={disabled} aria-label={ariaLabelText}
                title={tooltipText}>{children}</button>
    )
}

export const Button = React.memo(ButtonTemplate);