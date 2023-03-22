import React from 'react'
import { useNavigation } from '@react-navigation/native'
import {useState, useLayoutEffect, useEffect} from 'react'
import { View, Text, TextInput, Button, StyleSheet, SafeAreaView, Alert, Platform, StatusBar, Image, TouchableOpacity} from 'react-native'
import Checkbox from 'expo-checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Lottie from 'lottie-react-native';
import * as Progress from 'react-native-progress';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTrophy } from '@fortawesome/free-solid-svg-icons';
import { Audio } from 'expo-av';


const TrophyComplete = ({route}) => {

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


  const goal = route.params.goal
  const goalComplete = route.params.goalComplete
  const [sound, setSound] = useState();
  const goalName = route.params.goalName
  const goalRatings = route.params.goalRatings
  const [userInterest, setUserInterest] = useState(null)



  const giveTrophy = async () => {
    var trophies; 

    try {
        const values = await AsyncStorage.getItem('@Trophies')
        if (values != null){
          trophies = (JSON.parse(values)) + 1
        }else {
            trophies = 1;
        }
      } catch(e) {
        console.log(e)
        // error reading value
      }


      console.log(trophies)

    try {    
        await AsyncStorage.setItem('@Trophies', JSON.stringify(trophies))
      } catch (e) {
        console.log(e)
        console.log("this")
        // saving error
      }
  }

  const setAudio = async () => {
    await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });}

    const playAudio = async () => {
      const { sound: playbackObject } = await Audio.Sound.createAsync(
       require('../assets/trophy-sound.mp3') ,
        { shouldPlay: true }
      );
      
      if (sound != null){
      await sound.playAsync();}
    }

    const checkUserInterest = async () => {
      
        try {
          const value = await AsyncStorage.getItem('@UserInterest')
          if (value != null && value != 'null'){
            setUserInterest(JSON.parse(value))
  
        }}catch(e) {
          console.log(e)
          // error reading value
        }
    }

  useEffect(() => {
    checkUserInterest();
    
    giveTrophy();
    setAudio();
    playAudio();
    sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync();
        }
      : undefined;
   
  });

  return (
    <SafeAreaView style = {styles.background}>
      <View style = {styles.View} >
            <Text style = {styles.wellDone}>Congratulations!</Text>
            {userInterest == 'flower' ? <Lottie source={require('../assets/24970-rose-flower-sparks.json')} autoPlay loop style = {styles.trophy} />
 : <Text></Text>}
        {userInterest == 'trophy' ? <Lottie source={require('../assets/lf20_touohxv0.json')} autoPlay loop = {false} style = {styles.trophy} />
        : <Text></Text>}
        {userInterest == 'book' ? <Lottie source={require('../assets/72170-books.json')} autoPlay loop  style = {styles.trophy} />
        : <Text></Text>}                
            
            <Text style = {styles.progressTitle}>You have completed all of this weeks goals and earned a {userInterest}!</Text>
            
            <TouchableOpacity style = {styles.addPerson} onPress = {() => navigation.navigate('Goal Difficulty', {goal: goal, goalComplete: goalComplete, goalName: goalName, goalRatings: goalRatings})}>
                <Text style = {styles.addPersonText}>Continue</Text>
            </TouchableOpacity>
          

            </View>
           
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: '#0A0E1E',
        height: '100%' , 
        width: '100%' ,
        flexDirection: 'row',
        justifyContent: 'space-around',
        position: 'relative',
        flexWrap: 'wrap', 
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        alignItems: 'center',
    
        
        
      },
      View: {
        width: '100%',
        height: '100%'
      },
       safeArea: {
           backgroundColor: '#0A0E1E',
           width: '100%',
           position: 'relative',
           padding: 0,
           flex: 1
       },
       line: {
        width: '100%',
        height: 1,
        backgroundColor: '#271700', 
       
      },
      trophy: {
        width: 350,
        alignSelf: 'center'
   
      },
      addPerson: {
        height: '10%',
        width: '90%',
        backgroundColor: '#2FED9B',
        borderWidth: 3,
        borderColor: '#22A86E',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        margin: '10%',
        
        

      },
      addPersonText: {
        fontSize: 30,
        color: 'white'

      },
      wellDone: {
        fontSize: 40,
        alignSelf: 'center',
        fontWeight: 'bold',
        color: 'white',
        marginTop: '5%'
        

      },
      progress: {
        width: '90%',
        justifyContent: 'space-between',
        margin: '2%',
        alignSelf: 'center',
        marginTop: '10%',
       
      
        
     
      },
      Icons: {
        alignSelf: 'flex-end',
        color: '#F6F621',
        
      },
      progressTitle: {
        fontSize: 25,
        color: 'white',
        alignSelf: 'center',
        textAlign: 'center'
      }

})

export default TrophyComplete