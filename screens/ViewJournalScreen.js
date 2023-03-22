import { View, Text, TextInput, Button, StyleSheet, SafeAreaView, Alert, Platform, StatusBar, Image, TouchableOpacity, ScrollView, FlatList} from 'react-native'
import React, {useState, useLayoutEffect, useEffect} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const ViewJournalScreen = ({route}) => {
    const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      header: () =>
        (
          <SafeAreaView style = {styles.SafeAreaView}>
          
          </SafeAreaView>
        ),
      headerShown: true,
      
    });
  });

  const image = route.params.image;
  const title = route.params.title;
  const entry = route.params.entry;
  const id = route.params.id;
  const date = route.params.date;

  const deleteEntry = async () => {
    var empty = [];
    var number = 0
    try {
        const tasks = await AsyncStorage.getItem('@Journal');
        const updatedTasks = JSON.parse(tasks)
        for (const i in updatedTasks){
          if (updatedTasks[i].id != id){
            updatedTasks[i].id = number;
            number = number + 1;
            empty.push(updatedTasks[i])
          }
       
        
      }
      await AsyncStorage.setItem('@Journal', JSON.stringify(empty))
      
        
      
      } catch (e) {
        console.log(e)
        // saving error
      }
      navigation.navigate('Journal')
    }
  

    
    return(
        <SafeAreaView style = {styles.background}>
          <View style={styles.header}>
            <TouchableOpacity style = {styles.headerOne} onPress = {() => navigation.navigate('Journal')}>
          <Text style = {styles.headerTextStyle}>Go Back</Text >
          </TouchableOpacity>
          <TouchableOpacity style = {styles.headerTwo} onPress = {deleteEntry}>
          <Text style = {styles.headerTextStyleTwo}>Delete Entry</Text >
          </TouchableOpacity>
          </View>
          <View style = {styles.line}></View>
        <View>
            {image ? <Image style = {styles.image} source={{ uri: image }} /> : <Text>None :(</Text>}
            <Text style = {styles.title}> {title}</Text>
            <Text style = {styles.date}>{date}</Text>
            <ScrollView>
            <Text style = {styles.entry}> {entry}</Text>
            </ScrollView>

            
        </View>
        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
  background: {
    height: '100%',
    width: '100%',
    backgroundColor: '#001C23',
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  header: {
    width: '100%',
    height: '13%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    
    backgroundColor: '#002731'
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
   height: '90%',
   width: '32%',
   backgroundColor: '#009D97',
   borderWidth: 3,
   borderColor: '#08FEDD',
   borderRadius: 25,
   justifyContent: 'center',
   alignItems: 'center',
   right: '10%' 
 },
 headerTextStyle: {
   fontSize: 25,
   fontWeight: 'bold',
   color: 'white'
 },
 headerTextStyleTwo: {
   fontSize: 20,
   fontWeight: 'bold',
   color: 'white'
 },
 line: {
   width: '100%',
   height: 1,
   backgroundColor: '#009D97', 
  
},
    image: {
      width: '100%',
      height: '40%',
      alignSelf: 'stretch',
      position: 'abolute',
    },
    title: {
        alignSelf: 'center',
        fontSize: 40,
        fontWeight: 'bold',
        padding: 5,
        color: 'white',
        textAlign: 'center'
    },
    date: {
        alignSelf: 'center',
        fontSize: 25,
        position: 'absolute',
        backgroundColor: '#FFFFFF',
        left: 0
    },
    entry: {
        fontSize: 30,
        padding: 5,
        color: 'white'
    },
    SafeAreaView: {
     backgroundColor: '#002731',
     
     width: '100%',
     position: 'relative',
     padding: 0,
     flex: 1
    }


});


export default ViewJournalScreen;