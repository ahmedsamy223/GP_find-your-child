import { View, TextInput, Text } from "react-native";
const CustomInput2 = ({
  value
}) => {
  return (
    <View className="flex-1">
      <TextInput style={{ textAlign: 'center'}}
        className="bg-blue-50 rounded-full px-4 py-3 border-2 border-indigo-100 "
        value={value}
        
      />
    </View>
  );
};
export default CustomInput2;