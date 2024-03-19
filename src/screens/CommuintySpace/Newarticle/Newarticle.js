import { React, useState, useEffect } from "react";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TextInput,
} from "react-native";
import moment from "moment";
import { View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useAuth } from "../../../context/auth-context";
import { useNavigation } from "@react-navigation/native";
import NewScreen from "../Add/NewScreen";
const NewsArticle = ({ article }) => {
  const navigation = useNavigation();
  const [likes, setLikes] = useState(article.likes || 0);
  const { setUserData, user, token } = useAuth();
  // console.log(article);
  const [hasLiked, setHasLiked] = useState(
    article.likedBy.find((userName) => userName === user.userName)
  ); // State to track if the user has liked the article
  const likeArticle = async () => {
    try {
      const response = await fetch(
        `http://192.168.1.13:3000/articles/like/${article._id}`,
        {
          credentials: "include",
          method: "POST",
          headers: {
            authorization: token,
          },
        }
      );
      if (!response.ok) {
        console.log(response);
        throw new Error("Network response was not ok" + response);
      }
      const data = await response.json();
    } catch (error) {
      console.error(error);
    }
  };
  const handleLike = () => {
    try {
      likeArticle();
      setHasLiked(!hasLiked); // Toggle the like state
      setLikes(hasLiked ? likes - 1 : likes + 1); // Increase or decrease likes based on the current state
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.userName}>By {article.userName}</Text>
      <Text style={styles.title}>{article.title}</Text>
      <Text style={styles.description}>{article.description}</Text>
      <Text style={styles.publishDate}>
        {moment(article.publishDate).format("MMMM Do YYYY, h:mm:ss a")}
      </Text>
      <TouchableOpacity onPress={handleLike} style={[styles.likeButton]}>
        <>
          {hasLiked ? (
            <AntDesign name="like1" size={24} color="#007bff" />
          ) : (
            <AntDesign name="like2" size={24} color="black" />
          )}
          <Text style={styles.likeCountText}>{likes}</Text>
        </>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25, // Ensure no horizontal padding
    borderRadius: 10,
    backgroundColor: "#f8f8f8",
    gap: 15,
  },
  userName: {
    fontSize: 16,
    color: "#666",
  },
  title: {
    fontSize: 20, // Adjust font size
    fontWeight: "500", // Adjust font weight
    color: "#000",
  },
  description: {
    fontSize: 16, // Adjust font size
    color: "#333",
  },
  publishDate: {
    fontSize: 14,
    color: "#666",
  },
  likeActionsContainer: {
    flexDirection: "row", // Keep this for horizontal layout
    justifyContent: "space-between", // Adjust this based on your preference
    alignItems: "center", // This keeps them vertically centered
  },
  likeButton: {
    flex: 1,
    flexDirection: "row",
    padding: 8,
    borderRadius: 8,
    alignItems: "center",
    width: "20%",
    justifyContent: "center",
    borderColor: "black",
    borderWidth: 1,
    gap: 5,
  },
  likeText: {
    fontSize: 16,
    color: "#fff",
  },
  likeCountButton: {
    alignItems: "center",
    width: 100, // Set a specific width or use flex properties
  },
  likeCountText: {
    fontSize: 16,
    color: "#000",
  },
});
export default NewsArticle;
