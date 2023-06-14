import { Image, StyleSheet, View, Text, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from "expo-image-picker";
import { useState } from "react";
import { Colors } from "../../constants/Colors";
import OutlinedButton from "../UI/OutlinedButton";
import ButtonCopy from "../UI/Button";

function ImagePicker({ onTakeImage }) {
  const [pickedImage, setPieckedImage] = useState();
  const [cameraPermissionInformation, requestPermission] =
    useCameraPermissions();

  async function verifyPermissions() {
    if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
      const permissionResp = requestPermission();

      return permissionResp.granted;
    }
    if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficiente Permissions",
        "You need to grant camera persmissions to use this app."
      );
      return false;
    }
    return true;
  }

  async function takeImageHandler() {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    setPieckedImage(image.assets[0].uri);
    onTakeImage(image.assets[0].uri);
  }
  let imagePreview = <Text>No image taken yet.</Text>;
  if (pickedImage) {
    imagePreview = <Image style={styles.image} source={{ uri: pickedImage }} />;
  }
  return (
    <View>
      {pickedImage ? (
        <Pressable onPress={takeImageHandler} style={styles.imagePreview}>
          {imagePreview}
        </Pressable>
      ) : (
        ""
      )}
      {!pickedImage ? (
        <ButtonCopy onPress={takeImageHandler} style={styles.button}>
          <MaterialIcons
            name="add-a-photo"
            size={24}
            color={Colors.primary800}
          />
        </ButtonCopy>
      ) : (
        ""
      )}
    </View>
  );
}

export default ImagePicker;

const styles = StyleSheet.create({
  imagePreview: {
    width: "100%",
    height: 200,
    maerginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 8,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: Colors.primary800,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  button: {
    marginVertical: 20,
  },
});
