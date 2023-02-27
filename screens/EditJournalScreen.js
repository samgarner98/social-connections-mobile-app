import { View, Text, TextInput, Button, StyleSheet, SafeAreaView, Alert, Platform, StatusBar, Image, TouchableOpacity, ScrollView} from 'react-native'
import React, {useState, useLayoutEffect, useEffect} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

const EditJournalScreen = () => {
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
          <TouchableOpacity style = {styles.headerTwo} onPress = {saveJournal}>
          <Text style = {styles.headerTextStyle}>Publish</Text >
          </TouchableOpacity>
          </View>
          <View style = {styles.line}></View>
          </SafeAreaView>
        ),
      headerShown: true,
      
    });
  });

  const [image, setImage] = useState(null);
  const [title, setTitle] = useState(null);
  const [entry, setEntry] = useState(null);
  const [id, setID] = useState(null);
  const [date, setDate] = useState(null);
  const [journal, setJournal] = useState({
    image: image,
    title: title,
    entry: entry,
    id: id
  });

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const imageToSave = result.assets[0].uri
  
        try {
            await AsyncStorage.setItem('@JournalImage', JSON.stringify(imageToSave))
            setImage(imageToSave)
          } catch (e) {
            console.log(e)
            console.log("this")
            // saving error
          }
      console.log(image)
    }
  };

  const saveJournal = async () => {
    const journalToSave = {
      image: image,
      title: title,
      entry: entry,
      id: id,
      date: date
    };
    var empty = [];
    var day = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    const date = day + '/' + month + '/' + year;
    journalToSave.date = date;

    try {
      const tasks = await AsyncStorage.getItem('@Journal');
      if(tasks != null){
      const updatedTasks = JSON.parse(tasks)
      for (const i in updatedTasks){
        console.log('here')
        console.log(updatedTasks[i])
        empty.push(updatedTasks[i])
      }
      
      journalToSave.id = empty.length
      console.log(journalToSave)
      empty.unshift(journalToSave)
      for (const i in empty){
        console.log(empty[i])
      }
      console.log(empty)
      await AsyncStorage.setItem('@Journal', JSON.stringify(empty))
      
    }
    else{
      await AsyncStorage.setItem('@Journal', JSON.stringify([journalToSave]))
    }
    } catch (e) {
      console.log(e)
      // saving error
    }
    navigation.navigate('Journal')
  }

  

  return (
    <View style = {styles.background}>
      {image ? <Image style = {styles.image} source={{ uri: image }}  /> : <Text style = {styles.image}></Text>}
      <TouchableOpacity title="Pick an image from camera roll" onPress={pickImage} style = {styles.imageButtonOne}>
        <Text style = {styles.imageText}>Add Photo</Text>
        
      </TouchableOpacity>
      <View style = {styles.line}></View>
      
      <TextInput
        placeholder = 'Enter Title'
        placeholderTextColor="#000"
        style={styles.input}
        onChangeText={setTitle}
        value={title}
      />

     
      <TextInput
        placeholder = 'Enter Details'
        placeholderTextColor="#000"
        style={styles.entryInput}
        multiline = {true}
        onChangeText={setEntry}
        value={entry}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  divider: {
    padding: 8
  },
  background: {
    height: '100%',
    width: '100%',
    backgroundColor: '#fef1e5',
    alignItems: 'center',
    position: 'relative',
    
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
   backgroundColor: "rgba(255,255,255,1)",
   borderWidth: 3,
   borderColor: '#F34E6',
   borderRadius: 25,
   justifyContent: 'center',
   alignItems: 'center',
   left: '10%'
 },
  headerTwo: {
   height: '80%',
   width: '32%',
   backgroundColor: "rgba(255,255,255,1)",
   borderWidth: 3,
   borderColor: '#10182f',
   borderRadius: 25,
   justifyContent: 'center',
   alignItems: 'center',
   right: '10%' 
 },
 headerTextStyle: {
   fontSize: 25,
   fontWeight: 'bold'
 },
 headerTextStyleTwo: {
   fontSize: 20,
   fontWeight: 'bold'
 },
 line: {
   width: '100%',
   height: 2,
   backgroundColor: 'rgba(52, 52, 52, 0.5)', 
},
imageButtonOne: {
  height: '7%',
  width: '30%',
  backgroundColor: '#10172f',
  borderWidth: 3,
  borderColor: '#4529D4',
  borderRadius: 25,
  marginTop: 2,
  marginBottom: 20,
  marginHorizontal: '2%',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'absolute',
  top: '17%',
  right: 2
 },
 imageText: {
   position: 'absolute',
   fontWeight: 'bold',
   color: 'white',
   fontSize: 20,
 },
 image: {
   width: '100%',
   height: '25%',
   alignSelf: 'stretch',
   backgroundColor: '#F4C07B'
  },
  infoText: {
    margin: '1%',
    fontWeight: 'bold',
    fontSize: 25,
    position: 'relative',
    marginTop: 10,
    
  },
  input: {
    height: "7%",
    width: '96%',
    margin: 15,
    borderWidth: 1,
    borderColor: '#10172f',
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,1)",
    borderBottomColor: '#10172f',
    borderBottomWidth: 2,
    fontSize: 25,
    textAlign: 'center'
    
  },
  entryInput: {
    height: "57%",
    width: '98%',
    margin: 0,
    borderWidth: 1,
    borderColor: "#10172f",
    borderRadius: 5,
    backgroundColor: "rgba(255,255,255,1)",
    borderBottomColor: '#10172f',
    borderTopWidth: 1,
    paddingTop: 0,
    paddingBottom: 0,
    fontSize: 25
    
    
  }

});

export default EditJournalScreen