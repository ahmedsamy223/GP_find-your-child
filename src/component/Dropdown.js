import React, { useState } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { View, Text } from 'react-native';

const Dropdown = ({options,placeholder,value,onValueChange,title}) => {
    
  
    return (
      <View>
        <Text className="to-blue-500 text-l">{title}</Text>
        <RNPickerSelect
          style={{ inputAndroid: { color: 'black' } }}
          placeholder={placeholder}
          items={options}
          onValueChange={onValueChange}
          value={value}
        />
        {value && <Text className="pl-3 text-zinc-400">Selected: {value}</Text>}
      </View>
    );
  };

  export default Dropdown;