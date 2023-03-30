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
import { useNavigation } from "@react-navigation/native";
import React, { useState, useLayoutEffect, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const GoalDifficulty = ({ route }) => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => <SafeAreaView style={styles.safeArea}></SafeAreaView>,
      headerShown: true,
    });
  });

  const [goalRatings, setGoalRatings] = useState("null");
  const goal = route.params.goal;
  const goalComplete = route.params.goalComplete;
  const goalName = route.params.goalName;
  console.log(goalName);
  const oldGoalRatings = route.params.goalRatings;

  const findRatings = async () => {
    try {
      const values = await AsyncStorage.getItem("@NewGoalRatings");
      if (values != null) {
        setGoalRatings(JSON.parse(values));
        console.log(goalRatings);
      } else {
        setGoalRatings(oldGoalRatings);
      }
    } catch (e) {
      console.log(e);
      // error reading value
    }
  };

  useEffect(() => {
    findRatings();
  }, []);

  const setRating = async (rating) => {
    const ratingsToSave = goalRatings;

    ratingsToSave[goalName].difficulty = rating;

    try {
      await AsyncStorage.setItem(
        "@NewGoalRatings",
        JSON.stringify(ratingsToSave)
      );
    } catch (e) {
      console.log(e);
      // saving error
    }
    console.log(ratingsToSave);
    navigation.navigate("Home");
  };

  return (
    <SafeAreaView style={styles.background}>
      <Text style={styles.subtitle}>
        Please rate how difficult it was to complete the goal{" "}
      </Text>
      <View style={styles.GoalDivider}></View>
      <Text style={styles.goalOne}>{goalComplete.name}</Text>

      <TouchableOpacity style={styles.ratingOne} onPress={() => setRating(1)}>
        <Text style={styles.ratingText}>Easy</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.ratingTwo} onPress={() => setRating(3)}>
        <Text style={styles.ratingText}>Challenging</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.ratingThree} onPress={() => setRating(5)}>
        <Text style={styles.ratingText}>Too Hard</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#002731",

    width: "100%",
    position: "relative",
    padding: 0,
    flex: 1,
  },
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
  headerTextStyle: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#FEFEFE",
  },
  line: {
    width: "100%",
    height: 1,
    backgroundColor: "#290031",
  },
  subtitle: {
    fontSize: 25,
    textAlign: "center",
    margin: "3%",
    width: "100%",
    color: "white",
  },
  GoalDivider: {
    width: "90%",
    height: 1,
    backgroundColor: "white",
    margin: "2%",
  },
  goalOne: {
    fontSize: 30,
    fontWeight: "bold",
    width: "100%",
    textAlign: "center",
    margin: "2%",
    color: "white",
  },
  ratingOne: {
    height: "15%",
    width: "90%",
    borderColor: "#55FE01",
    borderWidth: 5,
    backgroundColor: "#42C401",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    margin: "3%",
  },
  ratingTwo: {
    height: "15%",
    width: "90%",
    borderColor: "#FEBD08",
    borderWidth: 5,
    backgroundColor: "#E1A501",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    margin: "3%",
  },
  ratingThree: {
    height: "15%",
    width: "90%",
    borderColor: "#F71515",
    borderWidth: 5,
    backgroundColor: "#FE4747",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    margin: "3%",
  },
  ratingText: {
    fontSize: 30,
    color: "white",
    fontWeight: "bold",
  },
});

export default GoalDifficulty;
