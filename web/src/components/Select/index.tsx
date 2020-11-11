import React, { useMemo, CSSProperties } from 'react';
import ReactSelect, { Props as SelectProps } from 'react-select';

import './styles.css';

export interface Option {
  value: string;
  label: string;
  isDisabled?: boolean;
}

interface State {
  value: Option;
}

interface Props extends SelectProps<Option> {
  label: string;
  name: string;
  placeholder?: string;
  options: Array<Option>;
}

const Select: React.FC<Props> = ({
  name,
  label,
  placeholder,
  options,
  ...rest
}) => {
  const customStyles = useMemo(
    () => ({
      menuList: (provided: CSSProperties) => ({
        ...provided,
        margin: 0,
        padding: 0,
      }),
      menu: (provided: CSSProperties) => ({
        ...provided,
        border: 0,
        margin: 0,
        padding: 0,
        borderRadius: '0 0 8px 8px',
      }),
      option: (
        provided: CSSProperties,
        { value, label, isDisabled }: Option
      ) => ({
        display: isDisabled ? 'none' : 'flex',
        alignItems: 'center',
        borderRadius: 0,
        height: 56,
        borderTop: '1px solid #e6e6f0',
        paddingLeft: 10,

        '&:hover': {
          fontWeight: 'bold',
          background: '#EBEBF5',
          borderLeft: '2px solid #916bea',
        },
      }),
      control: (provided: CSSProperties) => ({
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        border: '1px solid #e6e6f0',
        height: 56,
        background: '#f8f8fc',
        marginTop: 8,
        borderRadius: 8,

        '&:focus-within': {
          borderRadius: '8px 8px 0 0',
        },
      }),
      singleValue: (provided: CSSProperties) => ({
        ...provided,
        color: '#6A6180',
      }),
    }),
    []
  );

  return (
    <div className="select-block">
      <label htmlFor={name}>{label}</label>
      <ReactSelect
        id={name}
        options={options}
        styles={customStyles}
        placeholder={placeholder}
        {...rest}
      />
    </div>
  );
};

export default Select;
