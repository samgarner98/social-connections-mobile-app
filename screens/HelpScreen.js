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

const HelpScreen = () => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => <SafeAreaView style={styles.safeArea}></SafeAreaView>,
      headerShown: true,
    });
  });

  const [emergencyContact, setEmergencyContact] = useState(" ");

  const goalCompletion = async () => {
    try {
      await AsyncStorage.removeItem("@goalCompletion");
    } catch (e) {
      console.log(e);
      console.log("this");
      // saving error
    }
    try {
      await AsyncStorage.removeItem("@ThisWeeksGoals");
    } catch (e) {
      console.log(e);
      console.log("this");
      // saving error
    }
    try {
      await AsyncStorage.removeItem("@GoalRatings");
    } catch (e) {
      console.log(e);
      console.log("this");
      // saving error
    }
    try {
      await AsyncStorage.removeItem("@NewGoalRatings");
    } catch (e) {
      console.log(e);
      console.log("this");
      // saving error
    }
    try {
      await AsyncStorage.removeItem("@User");
    } catch (e) {
      console.log(e);
      console.log("this");
      // saving error
    }
    try {
      await AsyncStorage.removeItem("@Image");
    } catch (e) {
      console.log(e);
      console.log("this");
      // saving error
    }
    try {
      await AsyncStorage.removeItem("@EmergencyContact");
    } catch (e) {
      console.log(e);
      console.log("this");
      // saving error
    }
    try {
      await AsyncStorage.removeItem("@UserInterest");
    } catch (e) {
      console.log(e);
      console.log("this");
      // saving error
    }
    try {
      await AsyncStorage.removeItem("@Trophies");
    } catch (e) {
      console.log(e);
      console.log("this");
      // saving error
    }
  };

  const getEmergencyContact = async () => {
    try {
      const values = await AsyncStorage.getItem("@EmergencyContact");
      if (values != null) {
        setEmergencyContact(JSON.parse(values));
      } else {
        setEmergencyContact(" ");
      }
    } catch (e) {
      console.log(e);
      // error reading value
    }
  };

  useEffect(() => {
    getEmergencyContact();

    console.log(emergencyContact);
  });

  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerOne}
          onPress={() => {
            navigation.navigate("Home");
          }}
        >
          <Text style={styles.headerTextStyle}>Go Back</Text>
        </TouchableOpacity>
        <Text style={styles.help}>Help</Text>
      </View>

      <Text style={styles.emergency}>Emergency Contacts:</Text>

      {emergencyContact != " " ? (
        <TouchableOpacity
          style={styles.EmergencyContact}
          onPress={() =>
            navigation.navigate("View Contact", { contact: emergencyContact })
          }
        >
          <Text style={styles.infoDisplaytwo}>
            {emergencyContact.firstName} {emergencyContact.lastName}
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.EmergencyContact}
          onPress={() => navigation.navigate("Contacts")}
        >
          <Text style={styles.infoDisplaytwo}>Choose Emergency Contact</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        style={styles.EmergencyContact}
        onPress={() => Linking.openURL("tel:+999")}
      >
        <Text style={styles.infoDisplaytwo}>Call Emergency Services (999)</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => goalCompletion()}>
        <Text style={styles.reset}>Reset Goal Difficulty Levels</Text>
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
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
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
    fontSize: 25,
    fontWeight: "bold",
    marginRight: "5%",
    color: "white",
  },
  safeArea: {
    backgroundColor: "#002731",

    width: "100%",
    position: "relative",
    padding: 0,
    flex: 1,
  },
  trophy: {
    width: 350,
    alignSelf: "center",
  },
  earned: {
    fontSize: 40,
    color: "white",
  },
  reset: {
    color: "white",
    fontSize: 30,
    marginTop: 60,
    color: "white",
    backgroundColor: "red",
  },
  emergency: {
    fontSize: 35,
    color: "white",
  },
  EmergencyContact: {
    padding: "5%",
    width: "90%",
    backgroundColor: "#002731",
    borderWidth: 3,
    borderColor: "#FEBD08",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    margin: "5%",
  },
  infoDisplaytwo: {
    position: "relative",
    alignSelf: "center",
    marginHorizontal: "3%",
    fontSize: 30,
    color: "white",
  },
  help: {
    color: "white",
    fontSize: 40,
    margin: "5%",
  },
});

export default HelpScreen;
