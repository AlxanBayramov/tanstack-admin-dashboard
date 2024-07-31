import React from 'react'
import { IButton } from './model'

const Button:React.FC<IButton> = ({disabled=false,children,type,classNames}) => {
  return (
    <button type={type} className={classNames} disabled={disabled} >
        {children}
    </button>  )
}

export default Button