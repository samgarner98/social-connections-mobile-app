import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useState, useLayoutEffect, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import Checkbox from "expo-checkbox";
import AsyncStorage from "@react-native-async-storage/async-storage";

const GoalScreen = () => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => <SafeAreaView style={styles.safeArea}></SafeAreaView>,
      headerShown: true,
    });
  });

  const [goalCompletion, setGoalCompletion] = useState(null);
  const [goalOne, setGoalOne] = useState(false);
  const [goalTwo, setGoalTwo] = useState(false);
  const [goalThree, setGoalThree] = useState(false);
  const [goalRatings, setGoalRatings] = useState(null);
  const [thisWeeksGoals, setThisWeeksGoals] = useState(" ");
  const [time, setTime] = useState(null);
  const [gone, setGone] = useState(false);

  const setGoals = async () => {
    try {
      const value = await AsyncStorage.getItem("@ThisWeeksGoals");
      setThisWeeksGoals(JSON.parse(value));
    } catch (e) {
      console.log(e);
      // error reading value
    }
  };

  const findRatings = async () => {
    try {
      const values = await AsyncStorage.getItem("@GoalRatings");

      if (values != null) {
        setGoalRatings(JSON.parse(values));
      } else {
        navigation.navigate("Rate Goals Screen");
      }
    } catch (e) {
      console.log(e);
      // error reading value
    }
  };

  const newGoals = async () => {
    try {
      await AsyncStorage.removeItem("@goalCompletion");
    } catch (e) {
      console.log(e);
      console.log("this");
      // saving error
    }

    const date = new Date();

    if (goalRatings != null) {
      let currentGoals = [];
      const keys = Object.keys(goalRatings);
      const loopTime = 3;
      for (let i = 0; i < loopTime; i++) {
        const position = Math.floor(Math.random() * keys.length);
        const goal = keys[position];
        if (goalRatings[goal].difficulty != 5) {
          currentGoals.push(goal);
          keys.splice(position, 1);
        } else {
          i = i - 1;
          keys.splice(position, 1);
        }
      }
      setThisWeeksGoals(currentGoals);

      try {
        await AsyncStorage.setItem(
          "@ThisWeeksGoals",
          JSON.stringify(currentGoals)
        );
      } catch (e) {
        console.log(e);
        console.log("this");
        // saving error
      }
      try {
        await AsyncStorage.setItem("@startDate", JSON.stringify(date));
      } catch (e) {
        console.log(e);
        console.log("this");
        // saving error
      }
    }
  };
  const dayCount = async () => {
    var time;
    var endDate;
    try {
      const values = await AsyncStorage.getItem("@startDate");
      endDate = new Date(JSON.parse(values));
    } catch (e) {
      console.log(e);
      // error reading value
    }

    var today = new Date();
    var oneDay = 24 * 60 * 60 * 1000;
    setTime(
      Math.round(Math.abs((today.getTime() - endDate.getTime()) / oneDay))
    );

    if (7 - time == 0) {
      navigation.navigate("Week Finished Screen", {
        goalRatings: goalRatings,
        thisWeeksGoals: thisWeeksGoals,
        goalCompletion: goalCompletion,
      });
    }
  };

  const saveGoal = async (goal, value) => {
    var goal_one = goalOne;
    var goal_two = goalTwo;
    var goal_three = goalThree;
    var complete = false;
    var goalComplete;
    console.log(value);
    var goalName;

    if (goal == "goalOne") {
      if (value == true) {
        setGoalOne(false);
        goal_one = false;
        complete = false;
      } else {
        setGoalOne(true);
        goal_one = true;
        complete = true;
        goalComplete = goalRatings[thisWeeksGoals[0]];
        goalName = thisWeeksGoals[0];
      }
    }
    if (goal == "goalTwo") {
      if (value == true) {
        setGoalTwo(false);
        goal_two = false;
        complete = false;
      } else {
        setGoalTwo(true);
        goal_two = true;
        complete = true;
        goalComplete = goalRatings[thisWeeksGoals[1]];
        goalName = thisWeeksGoals[1];
      }
    }
    if (goal == "goalThree") {
      if (value == true) {
        setGoalThree(false);
        goal_three = false;
        complete = false;
      } else {
        setGoalThree(true);
        goal_three = true;
        complete = true;
        goalComplete = goalRatings[thisWeeksGoals[2]];
        goalName = thisWeeksGoals[2];
      }
    }

    setGoalCompletion({
      goalOne: goalOne,
      goalTwo: goalTwo,
      goalThree: goalThree,
    });
    const set_goals = {
      goalOne: goal_one,
      goalTwo: goal_two,
      goalThree: goal_three,
    };

    try {
      await AsyncStorage.setItem("@goalCompletion", JSON.stringify(set_goals));
    } catch (e) {
      console.log(e);
      console.log("this");
      // saving error
    }
    if (complete == true) {
      if (goal_one == true && goal_two == true && goal_three == true) {
        setGone(true);
        navigation.navigate("Trophy Complete", {
          set_goals: set_goals,
          goal: goal,
          goalComplete: goalComplete,
          goalName: goalName,
          goalRatings: goalRatings,
        });
      } else {
        setGone(true);
        navigation.navigate("Goal Complete Screen", {
          set_goals: set_goals,
          goal: goal,
          goalComplete: goalComplete,
          goalName: goalName,
          goalRatings: goalRatings,
        });
      }
    }
  };

  const findCompletion = async () => {
    try {
      const values = await AsyncStorage.getItem("@goalCompletion");

      setGoalCompletion(JSON.parse(values));
    } catch (e) {
      console.log(e);
      console.log("this");
      // saving error
    }
  };

  useEffect(() => {
    if (thisWeeksGoals == null || thisWeeksGoals == "null") {
      newGoals();
    }

    if (goalRatings == null) {
      findRatings();
    }
    if (gone == false) {
      setGoals();
    }

    if (goalCompletion == null || goalCompletion == "null") {
      findCompletion();
    }

    if (goalCompletion != null && goalCompletion != "null") {
      setGoalOne(goalCompletion.goalOne);
      setGoalTwo(goalCompletion.goalTwo);
      setGoalThree(goalCompletion.goalThree);
    }

    if (goalRatings != null && thisWeeksGoals != null) {
      if (7 - time == 0) {
        navigation.navigate("Week Finished Screen", {
          goalRatings: goalRatings,
          thisWeeksGoals: thisWeeksGoals,
        });
        navigation.navigate("All Goals Complete Screen");
      }
    }
    dayCount();
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
        {goalOne == true && goalTwo == true && goalThree == true ? (
          <TouchableOpacity
            style={styles.progress}
            onPress={() =>
              navigation.navigate("Week Finished Screen", {
                goalRatings: goalRatings,
                thisWeeksGoals: thisWeeksGoals,
                goalCompletion: goalCompletion,
              })
            }
          >
            <Text style={styles.headerTextStyleTwo}>Progress</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.headerTwo}
            onPress={() => {
              navigation.navigate("Achievement Screen");
              setGone(true);
            }}
          >
            <Text style={styles.headerTextStyleTwo}>Achievements</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.goal}>
        <Text style={styles.title}>Days Left: {7 - time}</Text>

        <TouchableOpacity
          style={styles.goalList}
          onPress={() => {
            navigation.navigate("View Goal Screen", {
              name: goalRatings[thisWeeksGoals[0]].name,
              difficulty: goalRatings[thisWeeksGoals[0]].difficulty,
              location: goalRatings[thisWeeksGoals[0]].location,
              person: goalRatings[thisWeeksGoals[0]].person,
              journal: goalRatings[thisWeeksGoals[0]].journal,
              goalNo: thisWeeksGoals[0],
              goalRatings: goalRatings,
            }),
              setGone(true);
          }}
        >
          {thisWeeksGoals != "null" &&
          thisWeeksGoals != null &&
          goalRatings != null &&
          thisWeeksGoals != " " ? (
            <Text style={styles.text}>
              {goalRatings[thisWeeksGoals[0]].name}
            </Text>
          ) : (
            <Text>LOADING...</Text>
          )}
        </TouchableOpacity>
      </View>
      <Checkbox
        style={styles.checkbox}
        value={goalOne}
        onValueChange={() => saveGoal("goalOne", goalOne)}
        color={goalOne ? "#4630EB" : undefined}
      />

      <View style={styles.goal}>
        <TouchableOpacity
          style={styles.goalList}
          onPress={() => {
            navigation.navigate("View Goal Screen", {
              name: goalRatings[thisWeeksGoals[1]].name,
              difficulty: goalRatings[thisWeeksGoals[1]].difficulty,
              location: goalRatings[thisWeeksGoals[1]].location,
              person: goalRatings[thisWeeksGoals[1]].person,
              journal: goalRatings[thisWeeksGoals[1]].journal,
              goalNo: thisWeeksGoals[1],
              goalRatings: goalRatings,
            });
            setGone(true);
          }}
        >
          {thisWeeksGoals != "null" &&
          thisWeeksGoals != null &&
          thisWeeksGoals.length > 1 &&
          goalRatings != null &&
          thisWeeksGoals != " " ? (
            <Text style={styles.text}>
              {goalRatings[thisWeeksGoals[1]].name}
            </Text>
          ) : (
            <Text>LOADING...</Text>
          )}
        </TouchableOpacity>
      </View>
      <Checkbox
        style={styles.checkbox}
        value={goalTwo}
        onValueChange={() => saveGoal("goalTwo", goalTwo)}
        color={goalOne ? "#4630EB" : undefined}
      />

      <View style={styles.goal}>
        <TouchableOpacity
          style={styles.goalList}
          onPress={() => {
            navigation.navigate("View Goal Screen", {
              name: goalRatings[thisWeeksGoals[2]].name,
              difficulty: goalRatings[thisWeeksGoals[2]].difficulty,
              location: goalRatings[thisWeeksGoals[2]].location,
              person: goalRatings[thisWeeksGoals[2]].person,
              journal: goalRatings[thisWeeksGoals[2]].journal,
              goalNo: thisWeeksGoals[2],
              goalRatings: goalRatings,
            });
            setGone(true);
          }}
        >
          {thisWeeksGoals != "null" &&
          thisWeeksGoals != null &&
          thisWeeksGoals.length > 2 &&
          goalRatings != null &&
          thisWeeksGoals != " " ? (
            <Text style={styles.text}>
              {goalRatings[thisWeeksGoals[2]].name}
            </Text>
          ) : (
            <Text>LOADING...</Text>
          )}
        </TouchableOpacity>
      </View>
      <Checkbox
        style={styles.checkbox}
        value={goalThree}
        onValueChange={() => saveGoal("goalThree", goalThree)}
        color={goalOne ? "#4630EB" : undefined}
      />

      <Text style={styles.textTwo}>
        Check the box to complete the goal.{"\n"} Touch the goal to view/add
        details.
      </Text>
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
  goal: {
    width: "70%",
    alignItems: "center",
    fontSize: 25,
    marginLeft: 10,
  },
  line: {
    width: "100%",
    height: 1,
    backgroundColor: "#290031",
  },
  GoalDivider: {
    width: "90%",
    height: 1,
    backgroundColor: "#CC1EEF",
    margin: "2%",
  },
  checkbox: {
    backgroundColor: "#FEFEFE",
    marginBottom: 15,
    marginLeft: 15,
    width: "15%",
    height: "9%",
    alignSelf: "flex-end",
    marginRight: 15,
    borderColor: "#E1A501",
  },
  text: {
    width: "90%",
    fontSize: 25,
    alignSelf: "center",
    color: "white",
    textAlign: "center",
  },
  textTwo: {
    fontSize: 23,
    textAlign: "center",
    color: "white",
    margin: "2%",
  },
  goalList: {
    backgroundColor: "#002731",
    width: "100%",
    height: "20%",
    borderRadius: 10,
    borderColor: "#E1A501",
    borderWidth: 3,
    textAlign: "center",
    margin: "5%",
    alignItems: "center",
    justifyContent: "center",
  },
  safeArea: {
    backgroundColor: "#002731",

    width: "100%",
    position: "relative",
    padding: 0,
    flex: 1,
  },
  headerTwo: {
    height: "90%",
    backgroundColor: "#E1A501",
    borderWidth: 3,
    borderColor: "#FEBD08",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    right: "10%",
  },
  headerTextStyleTwo: {
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
  },
  progress: {
    height: "90%",
    paddingHorizontal: "2%",
    backgroundColor: "#1DD24D",
    borderWidth: 3,
    borderColor: "#14FB52",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    right: "10%",
  },
});

export default GoalScreen;
