export interface InputFieldInterface {
    value: string;
    placeholderValue: string;
    className: string;
    disabled: boolean;
}

export interface InputFieldProps extends InputFieldInterface {
    handleOnSubmit: (arg: string) => void;
    ariaLabelText: string;
    tooltipText: string;
    inputName: string;
}