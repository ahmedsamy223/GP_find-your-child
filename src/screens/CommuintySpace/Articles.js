import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import moment from "moment";
import uuid from "react-native-uuid";
import Feed from "./Feed/Feed";
const Articles = () => {
  const [articles, setArticles] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://192.168.1.13:3000/articles", {
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        //console.log("data", data);
        setArticles(data);
        console.log("data", data);
      } catch (error) {
        console.error(
         
          error
        );
      }
    };

    fetchData();
  }, []);
  return(
    <Feed articles={articles}/>
  )
};

export default Articles;
