import React from 'react'
import { useNavigation } from '@react-navigation/native'
import {useState, useLayoutEffect, useEffect} from 'react'
import { View, Text, TextInput, Button, StyleSheet, SafeAreaView, Alert, Platform, StatusBar, Image, TouchableOpacity} from 'react-native'
import Checkbox from 'expo-checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Linking from "expo-linking"
import Lottie from 'lottie-react-native';


const UserInterest = () => {

    const navigation = useNavigation();
    useLayoutEffect(() => {
      navigation.setOptions({
        header: () =>
          ( 
  
            <SafeAreaView style = {styles.safeArea}>
              
            
            </SafeAreaView>
          ),
        headerShown: true,
        
      });
    });


    const setInterest = async (choice) => {
        console.log(choice)
        try {    
            await AsyncStorage.setItem('@UserInterest', JSON.stringify(choice))
          } catch (e) {
            console.log(e)
            console.log("this")
            // saving error
          }

          navigation.navigate("Interest Complete Screen", {choice: choice})


    }
  return (
    <SafeAreaView style = {styles.background}>

        <Text style = {styles.titleTwo}>Which of the following activities do you prefer?</Text>


        <View style = {styles.dogView}>

        <Lottie source={require('/Users/samgarner/Documents/project/brainhealth/assets/33645-happy-dog.json')} autoPlay loop style = {styles.dog} />

        </View>
        <TouchableOpacity style = {styles.addPerson} onPress = {() => setInterest("trophy")}>
                <Text style = {styles.addPersonText}>Sport</Text>
            </TouchableOpacity>
            <TouchableOpacity style = {styles.gardening} onPress = {() => setInterest("flower")} >
                <Text style = {styles.addPersonText}>Gardening</Text>
            </TouchableOpacity>
            <TouchableOpacity style = {styles.reading} onPress = {() => setInterest("book")} >
                <Text style = {styles.addPersonText}>Reading</Text>
            </TouchableOpacity>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
    background: {
        backgroundColor: '#001C23',
        height: '100%' , 
        width: '100%' ,
        flexDirection: 'column',
        flexWrap: 'wrap', 
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        alignItems: 'center',
    
        
        
      },
      header: {
        
        height: '13%',
        width: '100%',
        flexDirection: 'row',
        
        backgroundColor: '#002731',
      
    
      },
      headerOne: {
        height: '90%',
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
         color: 'white'
       },
       title: {
        fontSize: 35,
        fontWeight: 'bold',
        marginRight: '5%',
        color: 'white',
        margin: 20
    
       },
       titleTwo: {
        fontSize: 30,
        marginRight: '5%',
        color: 'white',
        margin: 15,
        textAlign: 'center'
    
       },
       safeArea: {
           backgroundColor: '#002731',
           
           width: '100%',
           position: 'relative',
           padding: 0,
           flex: 1
       },
       dog: {
        marginTop: -50,
        marginLeft: 80,        
         width: 400,
         alignSelf: 'center',
    
       },
       dogView: {
        width: '100%',
        height: '50%',
       },
       addPerson: {
         height: '10%',
         width: '90%',
         backgroundColor: '#002731',
         borderWidth: 3,
         borderColor: '#22A86E',
         borderRadius: 25,
         justifyContent: 'center',
         alignItems: 'center',
         alignSelf: 'center',
         marginTop: -150

        
         
         
 
       },
       addPersonText: {
         fontSize: 30,
         color: 'white'
 
       },
       gardening: {
         height: '10%',
         width: '90%',
         backgroundColor: '#002731',
         borderWidth: 3,
         borderColor: '#D21D65',
         borderRadius: 25,
         justifyContent: 'center',
         alignItems: 'center',
         alignSelf: 'center',
         marginVertical: 30,
        
         
         
 
       },
       reading: {
         height: '10%',
         width: '90%',
         backgroundColor: '#002731',
         borderWidth: 3,
         borderColor: '#1DA8D2',
         borderRadius: 25,
         justifyContent: 'center',
         alignItems: 'center',
         alignSelf: 'center',
        
         
         
 
       }



})

export default UserInterest