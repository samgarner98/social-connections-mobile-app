import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import * as Contacts from "expo-contacts";
import { useEffect, useState, useLayoutEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { useNavigation, useIsFocused } from "@react-navigation/native";

const ContactScreen = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => <SafeAreaView style={styles.safeArea}></SafeAreaView>,
      headerShown: true,
    });
  });
  const [error, setError] = useState(undefined);
  const [contacts, setContacts] = useState(undefined);

  useEffect(() => {
    if (isFocused) {
      (async () => {
        const { status } = await Contacts.requestPermissionsAsync();
        if (status === "granted") {
          const { data } = await Contacts.getContactsAsync({
            fields: [
              Contacts.Fields.Birthday,
              Contacts.Fields.Emails,
              Contacts.Fields.FirstName,
              Contacts.Fields.LastName,
              Contacts.Fields.PhoneNumbers,
              Contacts.Fields.Image,
              Contacts.Fields.Relationships,
            ],
          });

          if (data.length > 0) {
            setContacts(data);
            console.log(data);
          } else {
            setError("No contacts found");
          }
        } else {
          setError("Permission to access contacts denied.");
        }
      })();
    }
  }, [isFocused]);

  let getContactData = (data, property) => {
    if (data) {
      return data.map((data, index) => {
        return (
          <View key={index}>
            <Text style={styles.contactInfo}>
              {data.label}: {data[property]}
            </Text>
          </View>
        );
      });
    }
  };

  let getContactRows = () => {
    if (contacts !== undefined) {
      return contacts.map((contact, index) => {
        return (
          <TouchableOpacity
            key={index}
            style={styles.contact}
            onPress={() =>
              navigation.navigate("View Contact", { contact: contact })
            }
          >
            {contact.imageAvailable ? (
              <Image style={styles.image} source={{ uri: contact.image.uri }} />
            ) : (
              <Text></Text>
            )}
            <Text style={styles.contactInfo}>
              {contact.firstName} {contact.lastName}{" "}
            </Text>
          </TouchableOpacity>
        );
      });
    } else {
      return <Text>Awaiting contacts...</Text>;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerOne}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.headerTextStyle}>Go Back</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.line}></View>
      <ScrollView style={styles.scroll}>{getContactRows()}</ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "#001C23",
    alignItems: "center",
    justifyContent: "center",
  },
  contact: {
    marginVertical: "4%",
    backgroundColor: "#002731",
    borderWidth: 3,
    width: "100%",
    borderRadius: 25,
    flexDirection: "row",
    flex: 1,
    flexWrap: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 50,
    borderColor: "#E1A501",
  },
  background: {
    width: "100%",
    backgroundColor: "#001C23",
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
  line: {
    width: "100%",
    height: 1,
    backgroundColor: "#271700",
  },
  contactInfo: {
    flex: 1,
    fontSize: 30,
    position: "relative",
    color: "white",
  },
  scroll: {
    width: "90%",

    flex: 1,
  },
  image: {
    height: "300%",
    width: "45%",
    borderRadius: 30,
    right: 0,
    position: "absolute",
    margin: 10,
  },
  safeArea: {
    backgroundColor: "#002731",

    width: "100%",
    position: "relative",
    padding: 0,
    flex: 1,
  },
});

export default ContactScreen;
