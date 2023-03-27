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
import React, { useLayoutEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const RateGoalsScreen = () => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => <SafeAreaView style={styles.safeArea}></SafeAreaView>,
      headerShown: true,
    });
  });

  const info = {
    goalOne: {
      name: "Meet with a friend for lunch",
      physical: true,
      difficulty: 3,
      location: true,
      person: true,
      journal: false,
    },
    goalTwo: {
      name: "Go for a walk at a local park",
      physical: true,
      difficulty: 3,
      location: true,
      person: false,
      journal: false,
    },
    goalThree: {
      name: "Have a phone call with a loved one",
      physical: false,
      difficulty: 3,
      location: false,
      person: true,
      journal: false,
    },
    goalFour: {
      name: "Invite a friend over for dinner",
      physical: false,
      difficulty: 3,
      location: false,
      person: true,
      journal: false,
    },
    goalFive: {
      name: "Write a Journal Entry about something you did this week",
      physical: false,
      difficulty: 3,
      location: false,
      person: false,
      journal: true,
    },
    goalSix: {
      name: "Go for a walk",
      physical: true,
      difficulty: 3,
      location: true,
      person: false,
      journal: false,
    },
    goalSeven: {
      name: "Text a friend to arrange a meet up",
      physical: false,
      difficulty: 3,
      location: true,
      person: true,
      journal: false,
    },
  };

  const setRating = async (rating) => {
    const ratingsToSave = info;
    ratingsToSave.goalSix.difficulty = rating;
    ratingsToSave.goalTwo.difficulty = rating;

    try {
      await AsyncStorage.setItem("@GoalRatings", JSON.stringify(ratingsToSave));
    } catch (e) {
      console.log(e);
      // saving error
    }
    navigation.navigate("Rate Goals Screen Two");
  };

  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.line}></View>
      <Text style={styles.subtitle}>
        Rate how difficult the following task is
      </Text>
      <View style={styles.GoalDivider}></View>
      <Text style={styles.goalOne}>Go out for a walk</Text>
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

export default RateGoalsScreen;
