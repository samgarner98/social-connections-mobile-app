import React from "react";
import { useNavigation, useIsFocused } from "@react-navigation/native";
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
import Lottie from "lottie-react-native";

const AchievementScreen = () => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => <SafeAreaView style={styles.safeArea}></SafeAreaView>,
      headerShown: true,
    });
  });

  const [trophies, setTrophies] = useState(null);
  const [userInterest, setUserInterest] = useState(null);

  const getTrophies = async () => {
    try {
      const value = await AsyncStorage.getItem("@Trophies");
      if (value != null && value != "null") {
        setTrophies(JSON.parse(value));
      }
    } catch (e) {
      console.log(e);
      // error reading value
    }
    try {
      const value = await AsyncStorage.getItem("@UserInterest");
      if (value != null && value != "null") {
        setUserInterest(JSON.parse(value));
      }
    } catch (e) {
      console.log(e);
      // error reading value
    }
  };

  useEffect(() => {
    if (trophies == null) {
      getTrophies();
    }
  });

  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerOne}
          onPress={() => {
            navigation.navigate("Goals");
          }}
        >
          <Text style={styles.headerTextStyle}>Go Back</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.earned}>You have earned</Text>

      {userInterest == "flower" ? (
        <Lottie
          source={require("../assets/24970-rose-flower-sparks.json")}
          autoPlay
          loop
          style={styles.flower}
        />
      ) : (
        <Text></Text>
      )}
      {userInterest == "trophy" ? (
        <Lottie
          source={require("../assets/lf20_touohxv0.json")}
          autoPlay
          loop={false}
          style={styles.flower}
        />
      ) : (
        <Text></Text>
      )}
      {userInterest == "book" ? (
        <Lottie
          source={require("../assets/72170-books.json")}
          autoPlay
          loop
          style={styles.book}
        />
      ) : (
        <Text></Text>
      )}

      <Text style={styles.earnedTwo}>{trophies}x </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#001C23",
    height: "100%",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
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
    textAlign: "center",
    alignSelf: "center",
    width: "100%",
  },
  earnedTwo: {
    fontSize: 40,
    color: "white",
    margin: 20,
    textAlign: "center",
    alignSelf: "center",
    width: "100%",
  },
  flower: {
    margin: -100,
    width: 200,
    alignSelf: "center",
    position: "absolute",
    top: "50%",
    left: "50%",
  },
  book: {
    margin: -150,
    width: 300,
    alignSelf: "center",
    position: "absolute",
    top: "50%",
    left: "50%",
  },
});

export default AchievementScreen;
