import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useState, useLayoutEffect, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  SafeAreaView,
  Alert,
  Platform,
  StatusBar,
  Image,
  TouchableOpacity,
} from "react-native";
import Checkbox from "expo-checkbox";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Linking from "expo-linking";
import Lottie from "lottie-react-native";

const GettingStartedOne = () => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => <SafeAreaView style={styles.safeArea}></SafeAreaView>,
      headerShown: true,
    });
  });
  return (
    <SafeAreaView style={styles.background}>
      <Text style={styles.title}>Set up your Profile</Text>
      <Text style={styles.titleTwo}>
        To begin, go to the About me page, and fill in your name, age and
        hobbies
      </Text>

      <View style={styles.dogView}>
        <Lottie
          source={require("../assets/33645-happy-dog.json")}
          autoPlay
          loop
          style={styles.dog}
        />
      </View>
      <TouchableOpacity style={styles.addPerson}>
        <Text style={styles.addPersonText}>Continue</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#001C23",
    height: "100%",
    width: "100%",
    flexDirection: "column",
    position: "absolute",
    flexWrap: "wrap",
    paddingTop: Platform.OS && Platform.OS === "android" ? StatusBar.currentHeight : 0,
    alignItems: "center",
  },
  header: {
    height: "13%",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",

    backgroundColor: "#002731",
  },
  headerOne: {
    height: "90%",
    width: "32%",
    borderColor: "#D42951",
    borderWidth: 3,
    backgroundColor: "#F34E6F",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    left: "10%",
  },
  headerTwo: {
    height: "80%",
    width: "32%",
    backgroundColor: "#FEFEFE",
    borderWidth: 3,
    borderColor: "#10182f",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    right: "10%",
  },
  headerTextStyle: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#FEFEFE",
  },
  headerTextStyleTwo: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
    marginRight: "5%",
    color: "white",
    margin: 20,
  },
  titleTwo: {
    fontSize: 25,
    marginRight: "5%",
    color: "white",
    margin: 20,
    textAlign: "center",
  },
  safeArea: {
    backgroundColor: "#002731",

    width: "100%",
    position: "relative",
    padding: 0,
    flex: 1,
  },
  dog: {
    marginTop: -70,
    marginLeft: 50,
    width: 700,
    alignSelf: "center",
  },
  dogView: {
    width: "100%",
    height: "50%",
  },
  addPerson: {
    height: "10%",
    width: "90%",
    backgroundColor: "#2FED9B",
    borderWidth: 3,
    borderColor: "#22A86E",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  addPersonText: {
    fontSize: 30,
    color: "white",
  },
});

export default GettingStartedOne;
