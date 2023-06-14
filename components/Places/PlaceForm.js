import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useCallback, useState } from "react";
import { Colors } from "../../constants/Colors";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";
import ButtonCopy from "../UI/Button";
import { Place } from "../../models/places";

export default function PlaceForm({ createPlace }) {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [pickedLocation, setPickedLocation] = useState();

  function changeTitleHandler(title) {
    setEnteredTitle(title);
  }

  function takeImageHandler(imageUri) {
    setSelectedImage(imageUri);
  }

  const pickedLocationHandler = useCallback((location) => {
    console.log(location, "LOCALIZAÇAO AQUI");
    setPickedLocation(location);
  }, []);

  function savePlaceHandler() {
    // if (!pickedLocation) return;
    const placeData = new Place(enteredTitle, selectedImage, pickedLocation);
    console.log(placeData, "placeData");
    createPlace(placeData);
  }

  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          onChangeText={changeTitleHandler}
          value={enteredTitle}
          placeholder={"Title"}
        />
      </View>
      <ImagePicker onTakeImage={takeImageHandler} />
      <LocationPicker onPickedLocation={pickedLocationHandler} />
      <View style={styles.buttonContainer}>
        <ButtonCopy onPress={savePlaceHandler}>Add Place</ButtonCopy>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 4,
    color: Colors.primary500,
    fontSize: 20,
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 10,
    fontSize: 16,
    borderColor: Colors.primary700,
    borderWidth: 1,
    backgroundColor: Colors.primary100,
    borderRadius: 8,
    color: Colors.primary800,
    placeholderTextColor: Colors.primary700,
  },
  buttonContainer: {
    marginBottom: 30,
    marginTop: 10,
  },
});
