import { View, Text, TextInput, Button, StyleSheet, SafeAreaView, Alert, Platform, StatusBar, Image, TouchableOpacity, ScrollView, Keyboard} from 'react-native'
import React, {useState, useLayoutEffect, useEffect} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import KeyboardAvoidingView from 'react-native/Libraries/Components/Keyboard/KeyboardAvoidingView';

const EditJournalScreen = () => {
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
  Keyboard.dismiss()
  

  return (
    <SafeAreaView style = {styles.background}>
      <KeyboardAvoidingView
       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
       style={styles.keyboard}>
       <View style={styles.header}>
            <TouchableOpacity style = {styles.headerOne} onPress = {() => navigation.navigate('Journal')}>
          <Text style = {styles.headerTextStyle}>Go Back</Text >
          </TouchableOpacity>
          <TouchableOpacity style = {styles.headerTwo} onPress = {saveJournal}>
          <Text style = {styles.headerTextStyle}>Publish</Text >
          </TouchableOpacity>
          </View>
      {image ? <Image style = {styles.image} source={{ uri: image }}  /> : <Text style = {styles.image}>No Photo</Text>}
      <TouchableOpacity title="Pick an image from camera roll" onPress={pickImage} style = {styles.imageButtonOne}>
        <Text style = {styles.imageText}>Add Photo</Text>
        
      </TouchableOpacity>
      
      <TextInput
        placeholder = 'Enter Title'
        placeholderTextColor="white"
        style={styles.input}
        onChangeText={setTitle}
        value={title}
      />

     
      <TextInput
        placeholder = 'Enter Details'
        placeholderTextColor="white"
        style={styles.entryInput}
        multiline = {true}
        onChangeText={setEntry}
        value={entry}
      />
      </KeyboardAvoidingView>
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
imageButtonOne: {
  height: '10%',
  width: '35%',
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
  top: '30%',
  right: 2
 },
 imageText: {
   position: 'absolute',
   fontWeight: 'bold',
   color: 'white',
   fontSize: 20,
 },
 image: {
   width: '97%',
   height: '30%',
   textAlign: 'center',
   backgroundColor: '#EEA764',
   alignSelf: 'center',
   borderRadius: 15,
   borderWidth: 2,
   overflow: 'hidden',

   
  },
  infoText: {
    margin: '1%',
    fontWeight: 'bold',
    fontSize: 25,
    position: 'relative',
    marginTop: 10,
    color: 'white'
    
  },
  input: {
    height: "7%",
    width: '90%',
    margin: 15,
    borderWidth: 2,
    borderColor: '#E1A501',
    borderRadius: 10,
    backgroundColor: "#002731",
    borderBottomWidth: 2,
    fontSize: 25,
    textAlign: 'center',
    alignSelf: 'center',
    color: 'white'
    
    
  },
  entryInput: {
    height: "42%",
    width: '90%',
    margin: 0,
    borderWidth: 2,
    borderColor: "#E1A501",
    borderRadius: 5,
    backgroundColor: "#002731",
    borderTopWidth: 1,
    paddingTop: 0,
    paddingBottom: 0,
    fontSize: 25,
    alignSelf: 'center',
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

export default EditJournalScreen