import React from 'react'
import {IInput} from './model'

const Input:React.FC<IInput> = ({type="text",placeholder="",name="",value,onChange,onBlur,classNames}) => {
  return (
    <input type={type} className={classNames} name={name} value={value} placeholder={placeholder} onChange={onChange} onBlur={onBlur}/>
  )
}

export default Input;