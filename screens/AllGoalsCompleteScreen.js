import React from 'react'
import { useNavigation } from '@react-navigation/native'
import {useState, useLayoutEffect, useEffect} from 'react'
import { View, Text, TextInput, Button, StyleSheet, SafeAreaView, Alert, Platform, StatusBar, Image, TouchableOpacity} from 'react-native'
import Checkbox from 'expo-checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Lottie from 'lottie-react-native';


const AllGoalsCompleteScreen = () => {
  

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

  const [time, setTime] = useState("null")

  

  const findTime = async () => {

    var endDate;
    try {
        const values = await AsyncStorage.getItem('@startDate');
        endDate = new Date(JSON.parse(values));
       
      } catch(e) {
        console.log(e)
        // error reading value
      }

      var today = new Date();
        var oneDay = 24 * 60 * 60 * 1000;
        setTime(Math.round(Math.abs((today.getTime() - endDate.getTime())/ oneDay)));
        console.log(time)

  } 


  


 
  useEffect(() => {

    findTime();
   
  });


  
    
  




  
  
  
  
  return (
    <SafeAreaView style = {styles.background}>
      <View style={styles.header}>
            <TouchableOpacity style = {styles.headerOne} onPress = {() => {navigation.navigate('Home')}}>
          <Text style = {styles.headerTextStyle}>Go Back</Text >
          </TouchableOpacity>
          <Text style = {styles.title}>This Week's Goals</Text>
          </View>
          <View style = {styles.line}></View>
          <Text style = {styles.subtitle}>Well Done!</Text>
          <Text style = {styles.text}>You have completed all of this week's goals and earned a trophy!</Text>
     
          <Lottie source={require('/Users/samgarner/Documents/project/brainhealth/assets/lf20_touohxv0.json')} autoPlay loop={false} style = {styles.trophy} />

          <Text style = {styles.time}>New goals will be available in:</Text>
          <Text style = {styles.timeTwo}>{7 - time} day(s) </Text>


          
          
      
    
     
     
     
      </SafeAreaView>
  )


  
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#001C23',
    height: '100%' , 
    width: '100%' ,
    flexDirection: 'row',
    justifyContent: 'space-around',
    position: 'absolute',
    flexWrap: 'wrap', 
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    alignItems: 'center',

    
    
  },
  header: {
    
    height: '13%',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    
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
     fontWeight: 'bold'
   },
   title: {
    alignSelf: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    marginRight: '5%',
    color: 'white'

   },
   goal: {
    width: '70%',
    alignItems: 'center',
    fontSize: 25,
    marginLeft: 10
    

   },
   line: {
    width: '100%',
    height: 1,
    backgroundColor: '#290031', 
   
  },
  GoalDivider: {
    width: '90%',
    height: 1,
    backgroundColor: '#271700', 
    margin: '2%'
    
   
  },
  checkbox: {
    backgroundColor: '#FEFEFE',
    marginBottom: 15,
    marginLeft: 15,
    width: '15%',
    height: '9%',
    alignSelf: 'flex-end',
    marginRight: 15
    
    
    
  },
  text: {
    width: '90%',
    fontSize: 30,
    alignSelf: 'center',
    textAlign: 'center',
    marginTop: '5%',
    color: 'white'
    
  },
  textTwo: {
    fontSize: 19,
    textAlign: 'center'


    
    
   
  },
  goalList: {
    backgroundColor: '#FEFEFE',
    width: '100%',
    height: '15%',
    borderRadius: 5,
    borderColor: '#10182f',
    borderWidth: 1,
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: { height: 2, width: 2 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    elevation: 2, // Android,
    margin: '5%',
  },
  safeArea: {
      backgroundColor: '#002731',
      
      width: '100%',
      position: 'relative',
      padding: 0,
      flex: 1
  },
  subtitle: {
    fontSize: 30,
    color: 'white',
    margin: '5%'
  },
  trophy: {
    width: 250,
    margin: 0
   

  },
  time: {
    width: '100%',
    fontSize: 25,
    color: 'white',
    textAlign: 'center'
  },
  timeTwo: {
    width: '100%',
    fontSize: 30,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold'
  }
  
  
  

})



export default AllGoalsCompleteScreen