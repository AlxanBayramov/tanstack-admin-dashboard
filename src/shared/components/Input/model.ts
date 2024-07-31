export  interface IInput{
    name : string
    type? : string
    value : string | number
    placeholder? : string
    classNames? : string
    onChange :  React.ChangeEventHandler<HTMLInputElement> | undefined
    onBlur :  React.FocusEventHandler<HTMLInputElement> | undefined
}