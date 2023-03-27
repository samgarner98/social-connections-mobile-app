import React from "react";
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
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import { useState, useLayoutEffect, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SMS from "expo-sms";

const MessageScreen = ({ route }) => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => <SafeAreaView style={styles.safeArea}></SafeAreaView>,
      headerShown: true,
    });
  });

  const goalNo = route.params.goalNo;
  const person = route.params.person;
  const goalRatings = route.params.goalRatings;
  const [message, setMessage] = useState(null);

  const greeting = `Hey ${person.name},`;

  const chooseMessage = () => {
    console.log(goalNo);
    setMessage("HI");

    const body = {
      goalOne: "are you available to meet for lunch sometime this week?",
      goalThree:
        "would you like to have a catch-up over the phone this week? Let me know what time suits you",
      goalFour: "are you available to come over for dinner this week?",
      goalSeven: "would you like to meet up this week?",
    };

    setMessage(`${greeting} ${body[goalNo]}`);
    console.log(person.phoneNumbers[0].number);
  };

  useEffect(() => {
    if (message == null) {
      chooseMessage();
    }
  });

  const sendMessage = async () => {
    const isAvailable = await SMS.isAvailableAsync();
    if (isAvailable) {
      // do your SMS stuff here
      const { result } = await SMS.sendSMSAsync(
        person.phoneNumbers[0].number,
        message
      );
      if (result == "sent") {
        Alert.alert("Message Sent", "", [
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]);
      } else {
        Alert.alert("Message was not sent", "", [
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]);
      }
    } else {
      console.log("error");
      // misfortune... there's no SMS available on this device
    }
  };
  Keyboard.dismiss();

  return (
    <SafeAreaView style={styles.background}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.background}
      >
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.headerOne}
            onPress={() => navigation.navigate("Home")}
          >
            <Text style={styles.headerTextStyle}>Go Back</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.person}>To {person.name}:</Text>
        <TextInput
          placeholder="Enter Message"
          style={styles.input}
          onChangeText={setMessage}
          value={message}
          placeholderTextColor={"white"}
          multiline
        />
        <TouchableOpacity
          style={styles.sendMessage}
          onPress={() => sendMessage()}
        >
          <Text style={styles.sendMessageText}>Send Message</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#001C23",
    height: "100%",
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    position: "relative",
    flexWrap: "wrap",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  header: {
    height: "13%",
    width: "100%",
    flexDirection: "column",
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
    left: "2%",
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
  },
  safeArea: {
    backgroundColor: "#002731",
    width: "100%",
    position: "relative",
    padding: 0,
    flex: 1,
  },
  person: {
    color: "white",
    fontSize: 35,
  },
  input: {
    height: "50%",
    width: "90%",
    margin: 8,
    borderWidth: 3,
    borderColor: "#E1A501",
    borderRadius: 10,
    backgroundColor: "#002731",
    fontSize: 30,
    color: "white",
  },
  sendMessage: {
    padding: "5%",
    backgroundColor: "#E1A501",
    borderWidth: 3,
    borderColor: "#FEBD08",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginVertical: 10,
  },
  sendMessageText: {
    fontSize: 30,
    color: "#002731",
  },
});

export default MessageScreen;
