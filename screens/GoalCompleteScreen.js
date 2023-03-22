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

const GoalCompleteScreen = ({route}) => {

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



  const goalOne = route.params.set_goals.goalOne
  const goalTwo = route.params.set_goals.goalTwo
  const goalThree = route.params.set_goals.goalThree
  const goal = route.params.goal
  const goalComplete = route.params.goalComplete
  const [goalCompletion, setGoalCompletion] = useState(0)
  const goalName = route.params.goalName
  const goalRatings = route.params.goalRatings
 
  const [sound, setSound] = useState();





  const setGoalProgress = () => {
    var i = 0;
    if (goalOne == true){
        i = i + 0.3333
    }
    if (goalTwo == true){
        i = i + 0.3333
    }if (goalThree == true){
        i = i + 0.3333
    }

    
    setGoalCompletion(i)

  }

  const setAudio = async () => {
    await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });}

    const playAudio = async () => {
      const { sound: playbackObject } = await Audio.Sound.createAsync(
       require('/Users/samgarner/Documents/project/brainhealth/assets/zapsplat_multimedia_game_sound_bright_sparkle_twinkle_tone_positive_award_achievement_001_40543.mp3') ,
        { shouldPlay: true }
      );
      
      if (sound != null){
      await sound.playAsync();}
    }
  
  

  useEffect(() => {
    
    setGoalProgress();
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
            <Text style = {styles.wellDone}>Well Done!</Text>
            <Lottie source={require('/Users/samgarner/Documents/project/brainhealth/assets/14595-thumbs-up.json')} autoPlay loop style = {styles.trophy} />
            <View style={styles.progress}>
            <Progress.Bar progress={goalCompletion} width={300}  height={15} borderWidth={2} unfilledColor={'white'} position={'absolute'} top={4}  animationType={'timing'} />
            <FontAwesomeIcon icon={faTrophy} style = {styles.Icons} size={ 30 } position={'absolute'}/>
            </View>
            <Text style = {styles.progressTitle}>This week's progress</Text>
            
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
        marginTop: '10%'
      
        
     
      },
      Icons: {
        alignSelf: 'flex-end',
        color: '#F6F621',
        
      },
      progressTitle: {
        fontSize: 25,
        color: 'white',
        alignSelf: 'center'
      }

})

export default GoalCompleteScreen