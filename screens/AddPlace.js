import { Alert, StyleSheet, Text, View } from "react-native";
import PlaceForm from "../components/Places/PlaceForm";
import { insertPlace } from "../util/database";

function AddPlace({ navigation }) {
  async function createPlaceHandler(place) {
    const { address, id, imageUri, title, location } = place;

    const resp = await insertPlace({
      address: address._j,
      id,
      imageUri,
      title,
      location: {
        lat: location.lat,
        lng: location.lng,
      },
    });

    navigation.navigate("AllPlaces", { place: place });
  }

  return <PlaceForm createPlace={createPlaceHandler} />;
}

export default AddPlace;

const styles = StyleSheet.create({});
