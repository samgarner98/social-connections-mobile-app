import { View, Text, TextInput, Button, StyleSheet, SafeAreaView, Alert, Platform, StatusBar, Image, TouchableOpacity, ScrollView, FlatList} from 'react-native'
import React, {useState, useLayoutEffect, useEffect} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

const JournalScreen = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  useLayoutEffect(() => {
    navigation.setOptions({
      header: () =>
        (
          <SafeAreaView style = {{backgroundColor: '#fef1e5'}}>
          <View style={styles.header}>
            <TouchableOpacity style = {styles.headerOne} onPress = {() => navigation.navigate('Home')}>
          <Text style = {styles.headerTextStyle}>Go Back</Text >
          </TouchableOpacity>
          <TouchableOpacity style = {styles.headerTwo} onPress = {() => navigation.navigate('Edit Journal')}>
          <Text style = {styles.headerTextStyleTwo}>+ Add Entry</Text >
          </TouchableOpacity>
          </View>
          <View style = {styles.line}></View>
          </SafeAreaView>
        ),
      headerShown: true,
      
    });
  });

  const [Journal, setJournal] = useState('')

  const getData = async () => {
    try {
      const values = await AsyncStorage.getItem('@Journal')
      
      const newValues = JSON.parse(values)
      console.log(newValues)
      setJournal(newValues)
    } catch(e) {
      console.log(e)
      // error reading value
    }
    
  }



useEffect(() => {
  if(isFocused){ 
    getData();
}
}, [isFocused]);

const Item = ({title, entry, image, id, date}) => (
  <View>
  <TouchableOpacity style={styles.item} onPress = {() => navigation.navigate('View Journal', {title: title,
  entry: entry,
  image: image,
  id: id,
  date: date})}>
    {image ? <Image style = {styles.image} source={{ uri: image }} /> : <Text>None :(</Text>}
    <Text style={styles.title} adjustsFontSizeToFit={true} numberOfLines={3}>{title}  </Text>
    <Text style = {styles.date}>{date}</Text>
  </TouchableOpacity>
  
  </View>
  
  
);

  return (
    
    <SafeAreaView style = {styles.background}>
    <FlatList
        data={Journal}
        renderItem={({item}) => <Item title={item.title} entry={item.entry} image={item.image} id = {item.id} date = {item.date}/>}
        keyExtractor={(item, index) => index.toString()}
      />
    </SafeAreaView>

  )
}

const styles = StyleSheet.create({
  divider: {
    padding: 8
  },
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
item: {
  backgroundColor: '#FEFEFE',
  height: 180,
  borderRadius: 5,
  borderColor: '#10182f',
  borderWidth: 1,
  padding: 4,
  marginVertical: 16,
  marginHorizontal: 16,
  justifyContent: 'center',
  shadowColor: 'rgba(0,0,0, .4)', // IOS
  shadowOffset: { height: 2, width: 2 }, // IOS
  shadowOpacity: 1, // IOS
  shadowRadius: 1, //IOS
  elevation: 2, // Android


},
title: {
  width: '50%',
  fontSize: 25,
  position: 'absolute',
  top: 2,
  left: '42%',
  
  
  
},
image:{
  height: '100%',
  width: '40%',
  borderRadius: 25,
  borderWidth: 0,
  borderColor: '#10182f',
},
date: {
  
  fontSize: 25,
  position: 'absolute',
  bottom: 2,
  right: '2%',
  

}

});

export default JournalScreen