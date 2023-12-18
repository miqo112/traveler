import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.sass';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  startIcon?: React.ReactElement,
  endIcon?: React.ReactElement,
}

const Input: React.FC<InputProps> = ({ value, className, startIcon, endIcon, ...rest }) => {
  return (
    <div className={clsx(styles.input, className)}>
      {startIcon}
      <input value={value || ''} {...rest} />
      {endIcon}
    </div>
  )
}

export default Input