import { useEffect, useState, useContext } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
// import { supabase } from "../../../lib/supabase";
import CustomButton from "../../component/CustomButtom";
import Dropdown from "../../component/Dropdown";
import CustomInput from "../../component/customInput/CustomInput";
import { useAuth, AuthContext } from "../../context/auth-context";
const SignUpScreen = () => {
  const [name, setName] = useState("");
  const [email, setUserEmail] = useState("");
  const [username, setUsername] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfrimPassWord] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const { setUser } = useAuth();
  // async function signUpWithEmail() {
  //   setLoading(true);
  //   const {
  //     data: { session },
  //     error,
  //   } = await supabase.auth.signUp(
  //     {
  //     email,
  //     password,
  //     options: {
  //       data: {
  //         username,
  //         phone_num: PhoneNumber,
  //         type: selectedValue,
  //         name
  //       },
  //     },
  //   });
  //   if (error) console.log(error);
  //   // if (!session)
  //   //Alert.alert("Please check your inbox for email verification!");
  //   setLoading(false);
  //   console.log("Form submitted successfully!");
  // }
  const { setUserData, getUser, token } = useContext(AuthContext);

  const signUpWithEmail = async () => {
    const payload = {
      email,
      password,
      userName: username,
      phoneNumber: PhoneNumber,
      role: selectedValue,
      confirmPassword,
      name,
    };
    // console.log("payload",payload)
    try {
      const response = await fetch("http://192.168.1.13:3000/users/signup", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error:", errorData);
      }
      const data = await response.json();
      console.log(data);
      setUserData(data.newUser, data.token);
    } catch (error) {
      //   console.error(
      //     "There has been a problem with your fetch operation:",
      //     error
      //   );
    }
  };
  useEffect(() => {
    console.log("token", token);
    console.log("getUser()", getUser());
  }, [token, getUser]);

  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  useEffect(() => {
    validateForm();
  }, [
    email,
    username,
    PhoneNumber,
    password,
    confirmPassword,
    selectedValue,
    name,
  ]);

  const validateForm = () => {
    let errors = {};
    // Validate email field
    const mail =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if (!name) {
      errors.name = "Name is required.";
    }
    if (!email) {
      errors.email = "Email is required.";
    } else if (!email.match(mail)) {
      errors.email = "Please enter a valid email.";
    }
    // Validate name field
    if (!username) {
      errors.username = "Username is required.";
    }
    // Validate PhoneNumber field
    const num = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;
    if (!PhoneNumber) {
      errors.PhoneNumber = "PhoneNumber is required.";
    } else if (!PhoneNumber.match(num)) {
      errors.PhoneNumber = "Please enter a valid number.";
    }
    // Validate password field
    const passw = /(?=.*[A-Z])/;
    if (!password) {
      errors.password = "Password is required.";
    } else if (password.length < 7 || !password.match(passw)) {
      errors.password =
        "Password must be at least 7 characters and a capital letter.";
    }

    // Validate password field
    if (!confirmPassword) {
      errors.confirmPassword = "confirmPassword is required.";
    } else if (password !== confirmPassword) {
      errors.confirmPassword = " Password and confirmPassword do not match.";
    }
    if (!selectedValue) {
      errors.selectedValue = "role is required.";
    }

    // Set the errors and update form validity
    setErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  };

  const handleSubmit = async () => {
    if (isFormValid) {
      await signUpWithEmail();
      // setName("");
      // setUserEmail("");
      // setUsername("");
      // setPhoneNumber("");
      // setPassword("");
      // setConfrimPassWord("");
      // setSelectedValue(null);
    } else {
      // Form is invalid, display error messages
      console.log("Form has errors. Please correct them.");
    }
  };

  // The dropdown
  const placeholder = {
    label: "Select your role...",
    value: null,
  };

  const options = [
    { label: "Parent", value: "parent" },
    { label: "Guest", value: "guest" },
  ];

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 30 }}
      style={{ rowGap: 50, backgroundColor: "white" }}
    >
      <View style={{ rowGap: 30 }} className="flex-1 pt-5 px-6">
        <CustomInput
          placeholder={"Name"}
          value={name}
          setValue={setName}
          error={errors.name}
        />
        <CustomInput
          placeholder={"Email"}
          value={email}
          setValue={setUserEmail}
          error={errors.email}
        />
        <CustomInput
          placeholder={"Username"}
          value={username}
          setValue={setUsername}
          error={errors.username}
        />
        <CustomInput
          placeholder={"Phone number"}
          value={PhoneNumber}
          setValue={setPhoneNumber}
          error={errors.PhoneNumber}
        />
        <CustomInput
          placeholder={"Password"}
          value={password}
          setValue={setPassword}
          secureTextEntry={true}
          error={errors.password}
        />
        <CustomInput
          placeholder={"Confirm Password"}
          value={confirmPassword}
          setValue={setConfrimPassWord}
          secureTextEntry={true}
          error={errors.confirmPassword}
        />
        <Dropdown
          title={"User Role"}
          options={options}
          placeholder={placeholder}
          value={selectedValue}
          onValueChange={(e) => setSelectedValue(e)}
          error={errors.selectedValue}
        />
        <CustomButton text={"Sign Up"} onPress={handleSubmit} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  error: {
    color: "red",
    fontSize: 20,
    marginBottom: 12,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default SignUpScreen;
