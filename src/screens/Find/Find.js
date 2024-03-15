import React, { useState } from 'react';
import { View, Button, Image, StyleSheet } from 'react-native';
import * as ImagePicker from 'react-native-image-picker';

const ImageSelectionScreen = () => {
 const [imageSource, setImageSource] = useState(null);

 const selectImage = () => {
    const options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = { uri: response.uri };
        setImageSource(source);
      }
    });
 };

 return (
    <View style={styles.container}>
      {!imageSource && (
        <Button title="Select an image" onPress={selectImage} />
      )}
      {imageSource && (
        <>
          <Image source={imageSource} style={styles.image} />
          <Button title="Find your child" onPress={() => console.log('Find your child')} />
        </>
      )}
    </View>
 );
};

const styles = StyleSheet.create({
 container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
 },
 image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
 },
});

export default ImageSelectionScreen;