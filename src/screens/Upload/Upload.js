import React, { useState, useEffect } from "react";
import {
 View,
 Text,
 Image,
 StyleSheet,
 ActivityIndicator,
 TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import axios from "axios";
import * as Font from 'expo-font';

const UploadPage = ({ navigation }) => {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
     requestMediaLibraryPermissions();
  }, []);
 
  const requestMediaLibraryPermissions = async () => {
     const { status } = await MediaLibrary.requestPermissionsAsync();
     if (status !== "granted") {
       alert("Sorry, we need media library permissions to make this work!");
     }
  };

  const handleSelectImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      // Access the first asset's URI from the assets array
      const imageUri = result.assets[0].uri;
      setImage(imageUri);
    }
 };
 const handleUploadImage = async () => {
    if (!image) {
      alert("Please select an image first.");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("image", {
      uri: image,
      name: "image.jpg",
      type: "image/jpeg",
    });

    try {
      const response = await axios.post(
        "https://example.com/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const uploadPercentage = Math.round(
              (progressEvent.loaded / progressEvent.total) * 100
            );
            setProgress(uploadPercentage);
          },
        }
      );
      console.log("Image uploaded successfully", response.data);
    } catch (error) {
      console.error("Error uploading image", error);
    } finally {
      setUploading(false);
      setProgress(0);
    }
 };

 return (
    <View style={styles.container}>
      <Text style={styles.header}>Upload your Child Image</Text>
      {image && <Image source={{ uri: image }} style={styles.image} />}
      {uploading ? (
        <View>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Upload Progress: {progress}%</Text>
        </View>
      ) : (
        <>
          <TouchableOpacity
            style={[styles.button, styles.selectButton]}
            onPress={handleSelectImage}
          >
            <Text style={styles.buttonText}>Select an Image</Text>
          </TouchableOpacity>
          {image ? (
            <View>
              <TouchableOpacity
                style={[styles.button, styles.uploadButton]}
                onPress={handleUploadImage}
              >
                <Text style={styles.buttonText}>Upload an Image</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.findButton]}
                onPress={() =>
                 navigation.navigate("FindMyChildPage", {
                    selectedImage: image,
                 })
                }
              >
                <Text style={styles.buttonText}>Find My Child</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <Text style={styles.message}>Please select an image first.</Text>
          )}
        </>
      )}
    </View>
 );
};

const styles = StyleSheet.create({
  container: {
     flex: 1,
     justifyContent: "center",
     alignItems: "center",
     backgroundColor: '#F5F5F5', // Light grey background
     width: "100%", // Ensure the container takes the full width
     padding: 0, // Remove any padding
     margin: 0, // Remove any margin
  },
  header: {
     fontSize: 25,
     marginBottom: 20,
     width: "100%", // Ensure the header takes the full width
     textAlign: "center", // Center the text
  },
  image: {
     width: "100%", // Make the image take the full width
     height: 300,
     marginBottom: 20,
     borderRadius: 10, // Rounded corners for the image
  },
  button: {
     paddingHorizontal: 30,
     paddingVertical: 10,
     borderRadius: 40,
     marginBottom: 10,
     width: "100%", // Ensure the button takes the full width
  },
  buttonText: {
     color: "navy",
     fontFamily: "#7F5DF0",
     textAlign: "center",
  },
  selectButton: {
     backgroundColor: "white",
     marginBottom: 15,
  },
  uploadButton: {
     backgroundColor: "white",
     marginBottom: 15,
  },
  findButton: {
     backgroundColor: "white",
     marginBottom: 15,
  },
  message: {
     fontSize: 20,
     color: "maroon",
     marginBottom: 10,
     width: "100%", // Ensure the message takes the full width
     textAlign: "center", // Center the text
  },
 });

export default UploadPage;