import React from 'react'
import { View, Text, TextInput, Button, StyleSheet, SafeAreaView, Alert, Platform, StatusBar, Image, TouchableOpacity, KeyboardAvoidingView} from 'react-native'
import {useState, useLayoutEffect, useEffect} from 'react'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';



const ViewGoalScreen = ({route}) => {
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

      const name = route.params.name;
      const [location, setLocation] = useState(route.params.location);
      const person = route.params.person;
      const difficulty = route.params.difficulty;
      const journal = route.params.journal;
      const goalNo = route.params.goalNo
      const goalRatings = route.params.goalRatings
      const [locationHolder, setLocationHolder] = useState(route.params.location);

      const goBack = async () => {
        
       
        goalRatings[goalNo].location = locationHolder
    
        console.log(goalRatings[goalNo].location)
        try {
            
          await AsyncStorage.setItem('@GoalRatings', JSON.stringify(goalRatings))
        } catch (e) {
          console.log(e)
          console.log("this")
          // saving error
        }

        navigation.navigate("Goals")
      }

      
console.log("location: ",location)

  return (
    <SafeAreaView style = {styles.background}>
      <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <View style={styles.header}>
            <TouchableOpacity style = {styles.headerOne} onPress = {() => goBack()}>
          <Text style = {styles.headerTextStyle}>Go Back</Text >
          </TouchableOpacity>
          <View style = {styles.goalName}>
          <Text style = {styles.title}>{name}</Text>
          </View>
          </View>
          

          <View style = {styles.content}>
            
            {person == true ? <Text style = {styles.person}>Person</Text> : <Text></Text>}
            {person == true ? <TouchableOpacity style = {styles.addPerson} onPress = {() => navigation.navigate('Select Person Screen', {goalNo: goalNo,
            goalRatings: goalRatings})}>
                <Text style = {styles.addPersonText}>Add Someone</Text>
            </TouchableOpacity>: <Text></Text>}
           
            {person.imageAvailable ? <Image style = {styles.image} source={{ uri: person.image.uri }} /> : <View></View>}
            {person != true && person != false ? 
            <View>
            <TouchableOpacity style = {styles.addPerson} onPress = {() => navigation.navigate('Select Person Screen', {goalNo: goalNo,
            goalRatings: goalRatings})}>
                <Text style = {styles.addPersonText}>{person.firstName} {person.lastName}</Text>
            </TouchableOpacity> 
           
            
            <TouchableOpacity style = {styles.sendMessage} onPress = {() => navigation.navigate('Message Screen', {goalNo: goalNo,
              goalRatings: goalRatings,
              person: person})}>
                  <Text style = {styles.sendMessageText}>Send Message</Text>
              </TouchableOpacity> 
              </View>
             : <Text></Text>}
            {person == false ? <Text></Text> : <Text></Text>}
            
            <View style = {styles.GoalDivider}></View>

            {location == true  ?  <TextInput
          placeholder = 'Enter a Location'
          style={styles.input}
          onChangeText={setLocationHolder}
          value={locationHolder}
          placeholderTextColor={'white'}/> : <Text></Text>}


            {location == false ? <Text></Text> : <Text></Text>}
            {location != true && location != false ? 
        <View style = {styles.locationOptions}>
        <TextInput
        placeholder = 'Enter a Location'
        placeholderTextColor={'white'}
        style={styles.inputLocation}
        onChangeText={setLocationHolder}
        value={locationHolder}
         /> 
      <TouchableOpacity style = {styles.beginNavigation} onPress = {() => navigation.navigate('Navigation')}>
                  <Text style = {styles.addPersonText}>Begin Navigation</Text>
              </TouchableOpacity>
      </View>: <Text></Text>}
            {journal != false ? <Text style = {styles.person}>Journal</Text> : <Text></Text>}
            {journal == true ? <TouchableOpacity style = {styles.addPerson} onPress = {() => navigation.navigate("Edit Journal")}>
                <Text style = {styles.addPersonText}>Add Journal</Text>
            </TouchableOpacity>: <Text></Text>}
            {journal == false ? <Text></Text> : <Text></Text>}


            
     
     
            
          


          </View>
          </KeyboardAvoidingView>
    </SafeAreaView>
  )
}



const styles = StyleSheet.create({
    background: {
        backgroundColor: '#001C23',
        height: '100%' , 
        width: '100%' ,
        flexDirection: 'row',
       
        position: 'relative',
        flexWrap: 'wrap',
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        
    
        
        
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
        fontSize: 20,
        fontWeight: 'bold',
        marginRight: '5%',
        color: 'white',
        textAlign: 'center'
    
       },
       safeArea: {
           backgroundColor: '#002731',
           width: '100%',
           position: 'relative',
           padding: 0,
           flex: 1
       },
       line: {
        width: '100%',
        height: 1,
        backgroundColor: '#290031', 
       
      },
      goal: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        margin: '5%',
        color: 'white'
      },
      GoalDivider: {
        width: '80%',
        height: 1,
        backgroundColor: 'white', 
        margin: '5%',
        alignSelf: 'center'
        
       
      },
      content: {
        width: '100%',
        height: '100%',
        position: 'relative',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
      

      
      },
      person: {
        fontSize: 30,
        textAlign: 'center',
        margin: '3%',
        color: 'white',
        marginHorizontal: 100
        
      
        
      
        
        
        

      },
      addPerson: {
        padding: '5%',
        backgroundColor: '#002731',
        borderWidth: 3,
        borderColor: '#E1A501',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginVertical: 10

      },
      addPersonText: {
        fontSize: 30,
        color: 'white'

      },
      image: {
        width: '40%',
        height: '22%',
        borderRadius: 100,
        backgroundColor: '#EEA764',
        overflow: 'hidden',
        margin: '2%'
     
      
        
      },
      input: {
        height: "10%",
        width: '90%',
        margin: 8,
        borderWidth: 3,
        borderColor: "#01AAFE",
        borderRadius: 10,
        backgroundColor: "#002731",
        fontSize: 30,
        textAlign: 'center',
        color: 'white'
        
      },
      container: {
        flex: 1,
      },
      messagePerson: {
        height: '20%',
        width: '40%',
        backgroundColor: '#FEFEFE',
        borderWidth: 3,
        borderColor: '#10182f',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-end',
        bottom: '15%',
        left: '5%',
      
        position: 'absolute'
        

      },
      goalName: {
        flex: 1,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 15
      },
      inputLocation: {
        height: "10%",
        width: '90%',
        margin: 8,
        borderWidth: 3,
        borderColor: "#01AAFE",
        borderRadius: 10,
        backgroundColor: "#002731",
        fontSize: 30,
        textAlign: 'center',
        color: 'white'
        
      },
      locationOptions: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
      },
      beginNavigation: {
        padding: '5%',
        backgroundColor: '#1E86EF',
        borderWidth: 3,
        borderColor: '#01AAFE',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginVertical: 10

      },
      sendMessage: {
        padding: '5%',
        backgroundColor: '#E1A501',
        borderWidth: 3,
        borderColor: '#FEBD08',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginVertical: 10

      },
      sendMessageText: {
        fontSize: 30,
        color: '#002731'

      }


})

export default ViewGoalScreen