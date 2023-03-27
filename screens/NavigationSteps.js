import React, { useEffect, useState, useLayoutEffect } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Touchable,
  TouchableOpacity,
  Text,
  SafeAreaView,
  ScrollView,
  Checkbox,
  StatusBar,
} from "react-native";
import MapView from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { useNavigation, useIsFocused } from "@react-navigation/native";

const NavigationSteps = ({ route }) => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => <SafeAreaView style={styles.safeArea}></SafeAreaView>,
      headerShown: true,
    });
  });

  const steps = route.params.steps;
  const startLocation = route.params.steps[steps.length - 2].start;
  const endLocation = route.params.steps[steps.length - 1].end;
  const transport = route.params.mode;
  console.log("--------------------");
  console.log(steps);
  console.log("--------------------");
  console.log(steps[0]);
  console.log("HIIiiiiiiiiiIIIIII");
  console.log(steps[1]);

  const [parentStep, setParentStep] = useState(null);
  const [childSteps, setChildSteps] = useState(null);
  const [children, setChildren] = useState(null);
  const [index, setIndex] = useState(0);

  const stepsToDisplay = () => {
    const parent = steps[0].parentHtmlStep;
    setParentStep(parent);
    if (steps[0].childHtmlSteps != null) {
      setChildSteps(steps[0].childHtmlSteps);
    }
  };

  const nextStep = () => {
    var i = index;
    i = i + 1;
    setIndex(i);
    if (steps[i] != null) {
      if (steps[i].childHtmlSteps != null) {
        setChildSteps(steps[i].childHtmlSteps);
        console.log("hello");
      } else {
        setChildSteps(null);
      }
      if (steps[i].parentHtmlStep != null && steps[i].id != 0) {
        setParentStep(steps[i].parentHtmlStep);
      } else {
        setParentStep(null);
        navigation.navigate("Arrived Screen");
      }
    } else {
      navigation.navigate("Arrived Screen");
    }
  };

  useEffect(() => {
    if (parentStep == null) {
      stepsToDisplay();
    }
  });

  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerOne}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.headerTextStyle}>Go Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.headerFour}
          onPress={() =>
            navigation.navigate("Map Display Screen", {
              start: startLocation,
              end: endLocation,
              mode: transport,
            })
          }
        >
          <Text style={styles.headerTextStyleTwo}>Map View</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text style={styles.stepOne}>Step: {index + 1}</Text>
        {parentStep ? (
          <Text style={styles.parent}>
            {parentStep.replace(/<\/?[^>]+(>|$)/g, " ")}
          </Text>
        ) : (
          <Text></Text>
        )}
        {childSteps ? (
          <Text style={styles.instructions}>Directions:</Text>
        ) : (
          <Text></Text>
        )}
      </View>

      <ScrollView>
        {childSteps ? (
          <TouchableOpacity style={styles.contact}>
            <Text style={styles.steps}>
              {" "}
              {childSteps[0].replace(/<\/?[^>]+(>|$)/g, " ")}{" "}
            </Text>
          </TouchableOpacity>
        ) : (
          <Text></Text>
        )}

        {childSteps != null && childSteps[1] != null ? (
          <TouchableOpacity
            style={styles.headerTwo}
            onPress={() => {
              setChildSteps(childSteps.slice(1));
            }}
          >
            <Text style={styles.headerTextStyleTwo}>Next Direction</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.headerThree}
            onPress={() => nextStep()}
          >
            <Text style={styles.headerTextStyleTwo}>Next Step</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  steps: {
    fontSize: 25,
    color: "white",
    textAlign: "center",
  },
  headerTwo: {
    backgroundColor: "#1E86EF",
    borderColor: "#01AAFE",
    borderWidth: 3,
    marginVertical: 20,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    width: "95%",
    alignSelf: "center",
  },
  headerThree: {
    backgroundColor: "#42C401",
    borderColor: "#55FE01",
    borderWidth: 3,
    marginVertical: 20,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    width: "95%",
    alignSelf: "center",
  },
  background: {
    backgroundColor: "#001C23",
    height: "100%",
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    position: "relative",
    flexWrap: "wrap",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  line: {
    width: "100%",
    height: 1,
    backgroundColor: "#FEBD08",
    alignSelf: "center",
  },
  lineTwo: {
    width: "90%",
    height: 1,
    backgroundColor: "#FEBD08",
    alignSelf: "center",
  },
  parent: {
    fontSize: 30,
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    marginVertical: 10,
  },
  instructions: {
    fontSize: 25,
    color: "white",
    margin: 10,
    color: "#FEBD08",
  },
  header: {
    width: "100%",
    height: "13%",
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
  safeArea: {
    backgroundColor: "#002731",

    width: "100%",
    position: "relative",
    padding: 0,
    flex: 1,
  },
  stepOne: {
    fontSize: 30,
    color: "#FEBD08",
    textAlign: "center",
  },
  contact: {
    marginVertical: "4%",
    backgroundColor: "#002731",
    borderWidth: 3,
    width: "95%",
    borderRadius: 25,
    flexDirection: "row",
    flex: 1,
    flexWrap: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
    paddingHorizontal: 15,
    borderColor: "#E1A501",
    alignSelf: "center",
  },
  headerTextStyleTwo: {
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
  },
  headerFour: {
    height: "90%",
    width: "32%",
    backgroundColor: "#E1A501",
    borderWidth: 3,
    borderColor: "#FEBD08",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    right: "10%",
  },
});

export default NavigationSteps;
