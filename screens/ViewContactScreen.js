import { View, Text, TextInput, Button, StyleSheet, SafeAreaView, Alert, Platform, StatusBar, Image, TouchableOpacity} from 'react-native'
import React, {useState, useLayoutEffect, useEffect} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

const ViewContactScreen = ({route}) => {
    
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      header: () =>
        (
          <SafeAreaView style = {{backgroundColor: '#fef1e5'}}>
          <View style={styles.header}>
            <TouchableOpacity style = {styles.headerOne} onPress = {() => navigation.navigate('Contacts')}>
          <Text style = {styles.headerTextStyle}>Go Back</Text >
          </TouchableOpacity>
          <TouchableOpacity style = {styles.headerTwo} onPress = {() => setEmergencyContact(contact)}>
          <Text style = {styles.headerTextStyleTwo}>Make Emergency Contact</Text >
          </TouchableOpacity>
          </View>
          <View style = {styles.line}></View>
          </SafeAreaView>
        ),
      headerShown: true,
      
    });
  });

  const getContactData = (data, property) => {
    if (data) {
      return data.map((data, index) => {
        return (
          <View key={index}>
            <Text style = {styles.numbers}>{data.label}: {data[property]} </Text>
          </View>
        )
      });
    }
  }


  const contact = route.params.contact;
  
  const setEmergencyContact = async (contact) => {
    try {
      await AsyncStorage.setItem('@EmergencyContact', JSON.stringify(contact))
    } catch (e) {
      console.log(e)
      // saving error
    }
    Alert.alert('Emergency Contact Updated','', [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);
    
  }
  
    
    

    
    
    return (
        <SafeAreaView style = {styles.background}>

            <View style = {styles.info}>
            {contact.imageAvailable ? <Image style = {styles.image} source={{ uri: contact.image.uri }} /> : <View style = {styles.image}><Text style = {styles.photoText}>No Photo</Text></View>}
            </View>
            <Text style = {styles.name}>{contact.name}</Text>
            <View style = {styles.lineTwo}></View>
            <View style = {styles.numberBox}>
            <Text style = {styles.numbers}>{getContactData(contact.phoneNumbers, "number")}</Text>
            </View>


        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: '#fef1e5',
        height: '100%' , 
        width: '100%' ,
        flexDirection: 'row',
        justifyContent: 'center',
        position: 'relative',
        flexWrap: 'wrap', 
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        
        
      },
      header: {
        width: '100%',
        height: 120,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        backgroundColor: '#fef1e5'
      },
      containerOne: {
        height: '80%',
        width: '30%',
        backgroundColor: '#FEFEFE',
        borderWidth: 3,
        borderColor: '#F34E6F',
        borderRadius: 25,
        position: 'absolute',
        top: '0%',
        justifyContent: 'center',
        left: '5%'
        
        
    },
    containerTwo: {
      height: '5%',
      width: '30%',
      backgroundColor: '#FEFEFE',
      borderWidth: 3,
      borderColor: '#10182f',
      borderRadius: 25,
      position: 'absolute',
      top: '23%',
      justifyContent: 'center',
      right: '0%',
      margin: '5%'
  
    },
    TextStyle: {
      position: 'absolute',
      alignSelf: 'center',
      fontWeight: 'bold',
      fontSize: 25,
      color: '#10182f',
    },
    image: {
      width: '50%',
      height: '100%',
      alignSelf: 'center',
      borderRadius: 100,
      margin: 10,
      backgroundColor: '#EEA764',
      overflow: 'hidden',
      justifyContent: 'center',
      alignItems: 'center'
    
      
    },
    nameDisplay: {
        width: '50%',
        height: '23%',
        fontSize: 30,
        fontWeight: 'bold',
        color: '#10182f',
        alignSelf: 'center',
        paddingTop: 60,
        position: 'relative',
        

    
    },
    infoDisplay: {
      position: 'relative',
      alignSelf: 'center',
      marginLeft: '4%',
      fontSize: 25,
      width: '96%',
      marginTop: '6%'
        
    },
    line: {
        width: '100%',
        height: 1,
        backgroundColor: '#271700',
       
        
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
   headerTwo: {
    height: '80%',
    width: '32%',
    backgroundColor: '#FEFEFE',
    borderWidth: 3,
    borderColor: '#10182f',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    right: '10%' 
  },
   headerTextStyle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#FEFEFE'
   },
     headerTextStyleTwo: {
       fontSize: 20,
       fontWeight: 'bold',
       
     },
     name: {
       fontSize: 30,
       flexWrap: 'wrap',
       alignSelf: 'stretch'
      },
      numbers: {
        fontSize:30,
        width: '100%',
        marginVertical: 10,
        marginLeft: 4
        


      },
     imageButtonOne: {
      height: '25%',
      width: '90%',
      backgroundColor: "rgba(255,255,255,1)",
      borderWidth: 3,
      borderColor: "#10172f",
      borderRadius: 25,
      marginTop: 2,
      marginBottom: 20,
      marginHorizontal: '2%',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      alignSelf: 'center',
      top: '55%',
     },
     imageText: {
      fontSize: 25,
      fontWeight: 'bold'
     },
     numberBox: {
       width: '100%',
       height: '40%',
       flexDirection: 'column',
       marginTop: 20,
       position: 'relative',
     
     },
     lineTwo: {
      width: '90%',
      height: 2,
      backgroundColor: 'rgba(52, 52, 52, 0.5)',
      position: 'relative',
      bottom: '0%',
      marginTop: 10
     },
     info: {
       width: '100%',
       height: '30%',
       justifyContent: 'center',
       alignItems: 'center',
       marginVertical: 10

     },
     photoText: {
       fontSize: 25
     }
});

export default ViewContactScreen;