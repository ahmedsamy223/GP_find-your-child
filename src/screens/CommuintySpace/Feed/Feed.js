import React from 'react';
import { View, FlatList,StyleSheet} from 'react-native';
import uuid from 'react-native-uuid';
import NewsArticle from '../Newarticle/Newarticle';

const Feed = ({ articles }) => {
  return (
    <View style={styles.container} className="bg-blue-500">
      <FlatList
        contentContainerStyle={{
          gap:20
        }}
        data={articles}
        keyExtractor={() => uuid.v4()}
        renderItem={({ item }) => <NewsArticle article={item} />}
      />
    </View>
  );
  
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 0, // Ensure no horizontal padding
    backgroundColor: '#fff',
    width: '100%',
 },})
export default Feed;