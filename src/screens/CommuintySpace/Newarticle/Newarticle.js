import { React, useState } from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import moment from "moment";
import { View } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const NewsArticle = ({ article }) => {
  const [likes, setLikes] = useState(article.likes || 0);
  const [hasLiked, setHasLiked] = useState(false); // State to track if the user has liked the article

  const handleLike = () => {
    setHasLiked(!hasLiked); // Toggle the like state
    setLikes(hasLiked ? likes - 1 : likes + 1); // Increase or decrease likes based on the current state
  };

  return (
    <TouchableOpacity style={styles.container} disabled={true}>
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
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25, // Ensure no horizontal padding
    borderRadius: 10,
    backgroundColor: "#f8f8f8",
    gap:15
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
