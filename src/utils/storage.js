import * as SecureStore from "expo-secure-store";

const user_data_key = "user_data_key";

const setUserData = async (user, token) => {
  try {
    await SecureStore.setItemAsync(
      user_data_key,
      JSON.stringify({ user, token })
    );
  } catch (error) {
    console.log(error);
  }
};

const getUserData = async () => {
  try {
    const data = await SecureStore.getItemAsync(user_data_key);

    const json = JSON.parse(data);
    return json;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const clearUserData = async () => {
    try {
      await SecureStore.deleteItemAsync(
        user_data_key,
              );
    } catch (error) {
      console.log(error);
    }
  };

export { getUserData, setUserData ,clearUserData};
