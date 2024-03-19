import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Text,
  Modal,
  TextInput,
  ScrollView,
} from "react-native";
import uuid from "react-native-uuid";
import NewsArticle from "../Newarticle/Newarticle";
import { useAuth } from "../../../context/auth-context";

const Feed = ({ articles, handleSetArticles }) => {
  const { token } = useAuth();
  const [modalVisible, setModalVisible] = useState(false);
  const [textInput1, setTextInput1] = useState("");
  const [textInput2, setTextInput2] = useState("");
  const addNewArticle = async () => {
    const payload = { title: textInput1, description: textInput2 };
    // const payload = { title: "textIndput1", description: "textInput2" };
    try {
      const response = await fetch("http://192.168.1.13:3000/articles", {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) {
        // console.log("response new addedd aricle", response);
        // throw new Error("response was not ok" + response);
        console.log("this Article is added already");
      } else {
        handleSetArticles([...articles, data]);
      }

      // console.log("new addedd aricle", data);
    } catch (error) {
      console.error(error);
    }
  };

  const popup = () => {
    setModalVisible(true);
    // addNewArticle();
  };
  const toggleModal = () => {
    setModalVisible(!modalVisible);
    addNewArticle();
  };
  return (
    <View style={styles.container} className="bg-blue-500">
      <TouchableOpacity style={styles.plusButton} onPress={() => popup()}>
        <Text style={styles.plusButtonText}>+</Text>
      </TouchableOpacity>
      <FlatList
        contentContainerStyle={{
          gap: 20,
          flexGrow: 1,
        }}
        scrollEnabled
        data={articles}
        keyExtractor={() => uuid.v4()}
        renderItem={({ item }) => <NewsArticle article={item} />}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput
              style={styles.textInput}
              placeholder="Text Input 1"
              onChangeText={(text) => setTextInput1(text)}
              value={textInput1}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Text Input 2"
              onChangeText={(text) => setTextInput2(text)}
              value={textInput2}
            />
            <TouchableOpacity style={styles.button} onPress={toggleModal}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "flex-start",
    // alignItems: "flex-start",
    // flexDirection: "column",
    paddingHorizontal: 0, // Ensure no horizontal padding
    backgroundColor: "#fff",
    width: "100%",
  },
  plusButton: {
    // position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#007bff", // Light blue color
    borderRadius: 30,
    padding: 10,
  },
  plusButtonText: {
    color: "#fff",
    fontSize: 24,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
});
export default Feed;
