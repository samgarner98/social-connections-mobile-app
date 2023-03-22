import React from 'react'
import { useNavigation, useIsFocused } from '@react-navigation/native'
import {useState, useLayoutEffect, useEffect} from 'react'
import { View, Text, TextInput, Button, StyleSheet, SafeAreaView, Alert, Platform, StatusBar, Image, TouchableOpacity} from 'react-native'
import Checkbox from 'expo-checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Lottie from 'lottie-react-native';


const WeekFinishedScreen = ({route}) => {
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

  const [progress, setProgress] = useState(null)
  const [newRatings, setNewRatings] = useState(null)
  const [goalRatingChangeOne, setGoalOne] = useState(null)
  const [goalRatingChangeTwo, setGoalTwo] = useState(null)
  const [goalRatingChangeThree, setGoalThree] = useState(null)




  const thisWeeksGoals = route.params.thisWeeksGoals
  const goalRatings = route.params.goalRatings
  const goalCompletion = route.params.goalCompletion
  const [completion, setCompletion] = useState(null)
  const [userInterest, setUserInterest] = useState(null)


  const getNewGoals = async () => {
    try {
        const value = await AsyncStorage.getItem('@NewGoalRatings')
        if (value != null && value != 'null'){
            setNewRatings(JSON.parse(value))
        }
      }catch(e) {
        console.log(e)
        // error reading value
      }
      
  }

  const getProgress = () => {
    var one;
    var two;
    var three;
    var thisWeek;
    var old;
    var count = 0; 

    if (newRatings != null){

    if (goalCompletion.goalOne == true){
      thisWeek = newRatings[thisWeeksGoals[0]].difficulty
      old = goalRatings[thisWeeksGoals[0]].difficulty
      one = old - thisWeek;
      count = count + 1
    }
    if (goalCompletion.goalTwo == true){
      thisWeek = newRatings[thisWeeksGoals[1]].difficulty
      old = goalRatings[thisWeeksGoals[1]].difficulty
      two = old - thisWeek;
      count = count + 1

    }
    if (goalCompletion.goalThree == true){
      thisWeek = newRatings[thisWeeksGoals[2]].difficulty
      old = goalRatings[thisWeeksGoals[2]].difficulty
      three = old - thisWeek;
      count = count + 1

    }

    thisWeek = one + two + three
    
    setCompletion(count)
    setProgress(thisWeek)
    console.log(progress, count)
    
  }

  }

  const resetGoals = async () => {
    try {    
      await AsyncStorage.removeItem('@goalCompletion')
    } catch (e) {
      console.log(e)
      console.log("this")
      // saving error
    }
    try {    
      await AsyncStorage.removeItem('@ThisWeeksGoals')
    } catch (e) {
      console.log(e)
      console.log("this")
      // saving error
    }
    try {
            
      await AsyncStorage.setItem('@goalRatings', JSON.stringify(newRatings))
    } catch (e) {
      console.log(e)
      console.log("this")
      // saving error
    }

    navigation.navigate("Home")
    
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
    
    if (newRatings == null){
        getNewGoals()
    }

 
      getProgress()
      console.log(progress)

  });

  return (
    <SafeAreaView style = {styles.background}>
        <Text style = {styles.title}>How you did this week...</Text>
        {goalCompletion.goalOne == true && goalCompletion.goalTwo == true && goalCompletion.goalThree == true ? 
         <View>
            <Text style = {styles.trophyText}>Well Done! You earned a {userInterest} by completing all the goals</Text>
            {userInterest == 'flower' ? <Lottie source={require('../assets/24970-rose-flower-sparks.json')} autoPlay loop style = {styles.trophy} />
 : <Text></Text>}
        {userInterest == 'trophy' ? <Lottie source={require('../assets/lf20_touohxv0.json')} autoPlay loop = {false} style = {styles.trophy} />
        : <Text></Text>}
        {userInterest == 'book' ? <Lottie source={require('../assets/72170-books.json')} autoPlay loop  style = {styles.trophy} />
        : <Text></Text>}            
         {progress > 0 ? <Text style = {styles.trophyText}>You also performed better than expected. You have made great progress!</Text>: <Text></Text>}
            {progress == 0 ? <Text style = {styles.trophyText}>You performed very well and completed the goals as expected. Keep up the great work!</Text>: <Text></Text>}
            {progress < 0 ? <Text style = {styles.trophyText}>You found the goals challenging but still managed to complete them all. Brilliant work, keep it up!</Text>: <Text></Text>}


         </View>: <Text></Text>}
         <Lottie source={require('../assets/33645-happy-dog.json')} autoPlay loop style = {styles.dog} />

         {completion == 2 ? 
         <View>
            <Text style = {styles.trophyText}>Well Done! You came close to earning a trophy as you completed two of the goals. You can do it next week!</Text>
            {progress > 0 ? <Text style = {styles.trophyText}>You also performed better than expected with the goals you achieved. You have made great progress!</Text>: <Text></Text>}
            {progress == 0 ? <Text style = {styles.trophyText}>You performed very well and completed the goals as expected. Keep up the great work!</Text>: <Text></Text>}
            {progress < 0 ? <Text style = {styles.trophyText}>You found the goals challenging but still managed to complete most of them. Brilliat work, keep it up!</Text>: <Text></Text>}


         </View>: <Text></Text>}
         {completion == 1 ? 
         <View>
            <Text style = {styles.trophyText}>One step at a time! You did well and managed to complete one of the goals. Lets aim for more next week</Text>
            {progress > 0 ? <Text style = {styles.trophyText}>You also performed better than expected with the goal you achieved. You have made progress!</Text>: <Text></Text>}
            {progress == 0 ? <Text style = {styles.trophyText}>You completed the goal as expected. Keep up the great work!</Text>: <Text></Text>}
            {progress < 0 ? <Text style = {styles.trophyText}>You found the goal challenging but still managed to complete it. Good job!</Text>: <Text></Text>}


         </View>: <Text></Text>}
         {completion == 0 ? 
         <View>
            <Text style = {styles.trophyText}> No worries. You didnt manage to complete any of the goals but we can try again next week!</Text>


         </View>: <Text></Text>}

         <Text style = {styles.trophyText}> Press Continue to get new goals</Text>


         <TouchableOpacity style = {styles.addPerson} onPress = {() => resetGoals()}>
                <Text style = {styles.addPersonText}>Continue</Text>
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
        justifyContent: 'space-around',
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
         fontWeight: 'bold',
         color: 'white'
       },
       safeArea: {
           backgroundColor: '#002731',
           
           width: '100%',
           position: 'relative',
           padding: 0,
           flex: 1
       },
       title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginRight: '5%',
        color: 'white',
        textAlign: 'center',
        alignSelf: 'center',
        margin: 20
    
       },
       trophy: {
         width: 225,
         alignSelf: 'center',
    
       },
       trophyText: {
        color: 'white',
        fontSize: 25,
        textAlign: 'center'

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
        
         
         
 
       },
       addPersonText: {
         fontSize: 30,
         color: 'white'
 
       },
       dog: {
        left: '5%',  
        top: '5%',    
         width: 450,
         alignSelf: 'center',
         position: 'absolute'
    
       }

})

export default WeekFinishedScreen