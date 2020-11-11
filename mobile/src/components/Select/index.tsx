import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { Text, View, PickerProps } from 'react-native';
import { Picker } from '@react-native-community/picker';

import styles from './styles';

interface SelectProps extends PickerProps {
  label?: string;
  items: Array<{ value: string; label: string }>;
}

const Select: React.FC<SelectProps> = ({ label, items, ...rest }) => {
  return (
    <View>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.container}>
        <Picker style={{ color: '#6A6180' }} {...rest}>
          {items.map((item) => (
            <Picker.Item
              color="#6A6180"
              key={item.value}
              label={item.label}
              value={item.value}
            />
          ))}
        </Picker>
      </View>
    </View>
  );
};

export default Select;
