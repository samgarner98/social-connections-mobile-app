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
          <SafeAreaView style = {{backgroundColor: '#fef1e5'}}>
          <View style={styles.header}>
            <TouchableOpacity style = {styles.headerOne} onPress = {() => navigation.navigate('Journal')}>
          <Text style = {styles.headerTextStyle}>Go Back</Text >
          </TouchableOpacity>
          <TouchableOpacity style = {styles.headerTwo} onPress = {deleteEntry}>
          <Text style = {styles.headerTextStyleTwo}>Delete Entry</Text >
          </TouchableOpacity>
          </View>
          <View style = {styles.line}></View>
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
        <View>
            {image ? <Image style = {styles.image} source={{ uri: image }} /> : <Text>None :(</Text>}
            <Text style = {styles.title}> {title}</Text>
            <Text style = {styles.date}>{date}</Text>
            <Text style = {styles.entry}> {entry}</Text>

            
        </View>
        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    background: {
        height: '100%',
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
     line: {
       width: '100%',
       height: 1,
       backgroundColor: '#271700', 
      
    },
    image: {
      width: '100%',
      height: '45%',
      alignSelf: 'stretch',
      position: 'abolute',
    },
    title: {
        alignSelf: 'center',
        fontSize: 40,
        fontWeight: 'bold',
        padding: 5
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
        padding: 5
    }


});


export default ViewJournalScreen;