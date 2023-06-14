import { StyleSheet, Text, View, Button } from "react-native";
import { useEffect, useState } from "react";
import PlacesList from "../components/Places/PlacesList";
import { useIsFocused } from "@react-navigation/native";
import { cleanPlaces, fetchPlace } from "../util/database";

export default function AllPlaces({ navigation }) {
  const [loadedPlaces, setLoadedPlaces] = useState([]);
  const IsFocused = useIsFocused();

  useEffect(() => {
    async function loadPlaces() {
      const places = await fetchPlace();
      setLoadedPlaces(places);
    }
    if (IsFocused) {
      loadPlaces();
    }
  }, [IsFocused]);

  function cleanPlacesHandle() {
    cleanPlaces().then(() => setLoadedPlaces([]));
    navigation.navigate("AllPlaces");
  }

  navigation.setOptions({
    headerLeft: () => <Button onPress={cleanPlacesHandle} title="Clean all" />,
  });

  return <PlacesList places={loadedPlaces} />;
}

const styles = StyleSheet.create({});
