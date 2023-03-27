import React, { useEffect, useState, useLayoutEffect } from "react";
import {
  Dimensions,
  View,
  StyleSheet,
  TextInput,
  Touchable,
  TouchableOpacity,
  Text,
  SafeAreaView,
  ScrollView,
  Checkbox,
} from "react-native";
import MapViewDirections from "react-native-maps-directions";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
const MapDisplayScreen = ({ route }) => {
  const GOOGLE_API_KEY = "AIzaSyD85mtgaRF3QYxdniTj-6NrIjOeLQIR_rE";

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const destination = { latitude: 55.8724, longitude: 4.29 };
  const destinationTwo = {
    latitude: 55.86947634821373,
    longitude: -4.3003211729268545,
  };
  const { width, height } = Dimensions.get("window");
  const ASPECT_RATIO = width / height;
  const LATITUDE = 55.86947634821373;
  const LONGITUDE = -4.3003211729268545;
  const LATITUDE_DELTA = 0.0022;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
  const startLocation = route.params.start;
  const endLocation = route.params.end;
  const transport = route.params.mode;

  const [coordinates] = useState([
    {
      latitude: startLocation.lat,
      longitude: startLocation.lng,
    },
    {
      latitude: endLocation.lat,
      longitude: endLocation.lng,
    },
  ]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      console.log("WEEEE", location.coords.latitude);
      setLocation(location);
    })();
    console.log(startLocation);
  }, []);
  return (
    <View style={styles.container}>
      {/*Render our MapView*/}
      <MapView
        style={styles.map}
        //specify our coordinates.
        initialRegion={{
          latitude: startLocation.lat,
          longitude: startLocation.lng,
          latitudeDelta: 0.00522,
          longitudeDelta: 0.00121,
        }}
        showsUserLocation={true}
      >
        <MapViewDirections
          origin={coordinates[0]}
          destination={coordinates[1]}
          apikey={GOOGLE_API_KEY} // insert your API Key here
          strokeWidth={4}
          strokeColor="#111111"
          mode={transport.toUpperCase()}
        />
        <Marker coordinate={coordinates[0]} />
        <Marker coordinate={coordinates[1]} />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1, //the container will fill the whole screen.
    justifyContent: "flex-end",
    alignItems: "center",
  },
});

export default MapDisplayScreen;
