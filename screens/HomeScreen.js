import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  Platform,
} from "react-native";
import React, { useLayoutEffect, useEffect, useState } from "react";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { faListCheck } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faCompass } from "@fortawesome/free-regular-svg-icons";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const [started, setStarted] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  const checkUser = async () => {
    var value;
    try {
      const values = await AsyncStorage.getItem("@UserInterest");
      value = JSON.parse(values);
    } catch (e) {
      console.log(e);
      // error reading value
    }

    if (value != null && value != "null") {
      setStarted(true);
    } else {
      setStarted(false);
    }
  };

  const checkUserProfile = async () => {
    var value;
    try {
      const values = await AsyncStorage.getItem("@User");
      value = JSON.parse(values);
    } catch (e) {
      console.log(e);
      // error reading value
    }
    if (value != null && value != "null") {
      setUserInfo(true);
    } else {
      setUserInfo(false);
    }
  };

  useEffect(() => {
    if (started == null) {
      checkUser();
      checkUserProfile();
    }

    if (started == false) {
      setStarted(true);
      navigation.navigate("Getting Started");
    }
  });

  return (
    <SafeAreaView style={styles.background}>
      <TouchableOpacity
        style={styles.containerOne}
        onPress={() => navigation.navigate("About me")}
      >
        <Text style={styles.TextStyle}>About Me</Text>
        <FontAwesomeIcon icon={faUser} style={styles.Icons} size={80} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.containerTwo}
        onPress={() => navigation.navigate("Contacts")}
      >
        <Text style={styles.TextStyle}>Contacts</Text>
        <FontAwesomeIcon icon={faUsers} style={styles.Icons} size={80} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.containerThree}
        onPress={() => navigation.navigate("Goals")}
      >
        <Text style={styles.TextStyle}>Goals</Text>
        <FontAwesomeIcon icon={faListCheck} style={styles.Icons} size={80} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.containerFour}
        onPress={() => navigation.navigate("Journal")}
      >
        <Text style={styles.TextStyle}>Journal</Text>
        <FontAwesomeIcon icon={faPenToSquare} style={styles.Icons} size={80} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.containerFive}
        onPress={() => navigation.navigate("Navigation")}
      >
        <Text style={styles.TextStyle}>Navigation</Text>
        <FontAwesomeIcon icon={faCompass} style={styles.Icons} size={80} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.containerSix}
        onPress={() => navigation.navigate("Help")}
      >
        <Text style={styles.TextStyle}>Help</Text>
        <FontAwesomeIcon icon={faQuestion} style={styles.Icons} size={80} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#001C23",
    height: "100%",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    position: "relative",
    flexWrap: "wrap",
    paddingTop: Platform.OS && Platform.OS && Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  containerOne: {
    height: "30%",
    width: "42%",
    backgroundColor: "#E1A501",
    borderWidth: 3,
    borderColor: "#FEBD08",
    borderRadius: 25,
    marginTop: "3%",
    marginLeft: "5%",
    justifyContent: "center",
  },
  containerTwo: {
    height: "30%",
    width: "42%",
    backgroundColor: "#FE4747",
    borderWidth: 3,
    borderColor: "#FE0808",
    borderRadius: 25,
    marginTop: "3%",
    marginRight: "5%",
    justifyContent: "center",
  },
  containerThree: {
    height: "30%",
    width: "42%",
    backgroundColor: "#CC1EEF",
    borderWidth: 3,
    borderColor: "#F608FE",
    borderRadius: 25,
    marginTop: "3%",
    marginLeft: "5%",
    justifyContent: "center",
  },
  containerFour: {
    height: "30%",
    width: "42%",
    backgroundColor: "#009D97",
    borderWidth: 3,
    borderColor: "#08FEDD",
    borderRadius: 25,
    marginTop: "3%",
    marginRight: "5%",
    justifyContent: "center",
  },
  containerFive: {
    height: "30%",
    width: "42%",
    backgroundColor: "#1E86EF",
    borderWidth: 3,
    borderColor: "#01AAFE",
    borderRadius: 25,
    marginTop: "3%",
    marginLeft: "5%",
    justifyContent: "center",
  },
  containerSix: {
    height: "30%",
    width: "42%",
    backgroundColor: "#42C401",
    borderWidth: 3,
    borderColor: "#55FE01",
    borderRadius: 25,
    marginTop: "3%",
    marginRight: "5%",
    justifyContent: "center",
  },
  TextStyle: {
    position: "absolute",
    bottom: "20%",
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 30,
    color: "white",
  },
  Icons: {
    alignSelf: "center",
    bottom: "10%",
    color: "white",
  },
});

export default HomeScreen;
