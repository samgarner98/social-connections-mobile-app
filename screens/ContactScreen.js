import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Image} from 'react-native'
import React from 'react'
import * as Contacts from 'expo-contacts'
import { useEffect, useState, useLayoutEffect } from 'react'
import { StatusBar } from 'expo-status-bar';
import { useNavigation, useIsFocused } from '@react-navigation/native';

const ContactScreen = () => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      header: () =>
        (
          <SafeAreaView style = {{backgroundColor: '#fef1e5'}}>
          <View style={styles.header}>
            <TouchableOpacity style = {styles.headerOne} onPress = {() => navigation.navigate('Home')}>
          <Text style = {styles.headerTextStyle}>Go Back</Text >
          </TouchableOpacity>
          </View>
          <View style = {styles.line}></View>
          </SafeAreaView>
        ),
      headerShown: true,
      
    });
  });
  const [error, setError] = useState(undefined);
  const [contacts, setContacts] = useState(undefined);

  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === "granted") {
        const { data } = await Contacts.getContactsAsync({
          fields: [ Contacts.Fields.Birthday, Contacts.Fields.Emails, Contacts.Fields.FirstName, Contacts.Fields.LastName, Contacts.Fields.PhoneNumbers, Contacts.Fields.Image]
        });

        if (data.length > 0) {
          setContacts(data);
          console.log(data)
        } else {
          setError("No contacts found");
        }
      } else {
        setError("Permission to access contacts denied.");
      }
    })();
  }, []);

  let getContactData = (data, property) => {
    if (data) {
      return data.map((data, index) => {
        return (
          <View key={index}>
            <Text style = {styles.contactInfo}>{data.label}: {data[property]}</Text>
          </View>
        )
      });
    }
  }

  let getContactRows = () => {
    if (contacts !== undefined) {
      
      return contacts.map((contact, index) => {
        return (
          
          <TouchableOpacity key={index} style={styles.contact} onPress = {() => navigation.navigate("View Contact", {contact: contact })}>
            {contact.imageAvailable ? <Image style = {styles.image} source={{ uri: contact.image.uri }} /> : <Text></Text>}
            <Text style = {styles.contactInfo}>{contact.firstName} {contact.lastName} </Text>
          </TouchableOpacity>
        );
      });
    } else {
      return <Text>Awaiting contacts...</Text>
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style = {styles.scroll}>
        {getContactRows()}
      </ScrollView>
      
    
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    flex: 1,
    
    backgroundColor: '#fef1e5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contact: {
    marginVertical: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    width: '100%',
    borderRadius: 25,
    flexDirection: 'row',
    flex: 1,
    flexWrap: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 50,
    
   
  },
  background: {
    
    width: '100%',
    backgroundColor: '#fef1e5'
  },
  header: {
    width: '100%',
    height: 120,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: '#fef1e5'
  },
  headerOne: {
   height: '80%',
   width: '32%',
   borderColor: '#D42951',
   borderWidth: 3,
   backgroundColor: '#F34E6F',
   borderRadius: 25,
   justifyContent: 'center',
   alignItems: 'center',
   left: '10%',
   
 },
 headerTextStyle: {
  fontSize: 25,
  fontWeight: 'bold',
  color: '#FEFEFE'
},
line: {
  width: '100%',
  height: 1,
  backgroundColor: '#271700', 
 
},
contactInfo: {
  flex: 1,
  fontSize: 25,
  position: 'relative',
  
  
  
 
},
scroll: {
  width: '90%',
  
  flex: 1,

 
 

},
image: {
  height: '400%',
  width: '45%',
  borderRadius: 30,
  right: 0,
  position: 'absolute',
  margin: 10
}
});

export default ContactScreen