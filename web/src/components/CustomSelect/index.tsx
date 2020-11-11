import React, {
  SelectHTMLAttributes,
  useState,
  useCallback,
  useMemo,
} from 'react';
import chevromDown from '../../assets/images/chevrom-down.png';
import chevromUp from '../../assets/images/chevrom-up.png';

import './styles.css';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  name: string;
  placeholder?: string;
  options: Array<{ value: string; label: string; hidden?: boolean }>;
  onValueChange?: (value: string) => void;
}

interface Option {
  value: string;
  label: string;
}

const Select: React.FC<SelectProps> = ({
  name,
  label,
  placeholder,
  options,
  onValueChange,
  ...rest
}) => {
  const [selectedValue, setSelectedValue] = useState('');
  const [selectedLabel, setSelectedLabel] = useState(placeholder || '');
  const [visibleOptions, setVisibleOptions] = useState(false);

  const availableOptions = useMemo(() => {
    const availables: Option[] = [];

    options.forEach((option) => {
      if (option.value !== selectedValue) {
        availables.push(option);
      }
    });

    return availables;
  }, [options, selectedValue]);

  const handleVisualizeOptions = useCallback(() => {
    setVisibleOptions((visible) => !visible);
  }, []);

  const handleChooseOption = useCallback(
    (option: Option) => {
      setSelectedValue(option.value);
      setSelectedLabel(option.label);

      onValueChange && onValueChange(option.value);
    },
    [onValueChange]
  );

  return (
    <div className="custom-select-block">
      <select id={name} value={selectedValue} {...rest}>
        <option value="" disabled hidden>
          {placeholder}
        </option>
        {options.map((option) => {
          return (
            <option
              key={option.value}
              value={option.value}
              hidden={option.hidden}
            >
              {option.label}
            </option>
          );
        })}
      </select>

      <label htmlFor={name}>{label}</label>

      <div className="select-container" onClick={handleVisualizeOptions}>
        <span>{selectedLabel}</span>
        {visibleOptions ? (
          <img src={chevromUp} alt="Esconder opções" />
        ) : (
          <img src={chevromDown} alt="Mostrar opções" />
        )}
        {visibleOptions && (
          <ul className="options-container">
            {availableOptions.map((option) => (
              <li
                key={option.value}
                className="option"
                onClick={() => handleChooseOption(option)}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Select;
