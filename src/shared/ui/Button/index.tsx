import React from 'react';
import './index.less'

interface CustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  handler?: () => void;
}

const CustomButton: React.FC<CustomButtonProps> = ({ text, handler, ...props }) => {
  return (
    <button
    className='button'
    onClick={handler}
    onMouseDown={handler}
      {...props}
    >
      <span>{text}</span>
    </button>
  );
};

export default CustomButton;
