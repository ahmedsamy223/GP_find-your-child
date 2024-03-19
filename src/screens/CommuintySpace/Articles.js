import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import moment from "moment";
import uuid from "react-native-uuid";
import Feed from "./Feed/Feed";
import { useAuth } from "../../context/auth-context";
const Articles = () => {
  const [articles, setArticles] = useState([]);
  const { token } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://192.168.1.13:3000/articles", {
          credentials: "include",
          headers: {
            authorization: token,
          },
        });
        if (!response.ok) {
          throw new Error("Network response was not ok" + response);
        }
        const data = await response.json();
        //console.log("data", data);
        setArticles(data);
        // console.log("data", data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  const handleSetArticles = (art) => {
    setArticles(art);
  };
  return <Feed articles={articles} handleSetArticles={handleSetArticles} />;
};

export default Articles;
