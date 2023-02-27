import { View, Text, TextInput, Button, StyleSheet, SafeAreaView, Alert, Platform, StatusBar, Image, TouchableOpacity, ScrollView} from 'react-native'
import React, {useState, useLayoutEffect, useEffect} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

const EditAboutMeScreen = () => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      header: () =>
        (
          <SafeAreaView style = {{backgroundColor: '#fef1e5'}}>
          <View style={styles.header}>
            <TouchableOpacity style = {styles.headerOne} onPress = {() => navigation.navigate('About me')}>
          <Text style = {styles.headerTextStyle}>Go Back</Text >
          </TouchableOpacity>
          <TouchableOpacity style = {styles.headerTwo} onPress = {saveUser}>
          <Text style = {styles.headerTextStyleTwo}>Save Info</Text >
          </TouchableOpacity>
          </View>
          <View style = {styles.line}></View>
          </SafeAreaView>
        ),
      headerShown: true,
      
    });
  });

  const [name, setName] = useState(null);
  const [age, setAge] = useState(0);
  const [emergencyContact, setEmergencyContact] = useState(null);
  const [image, setImage] = useState(null);
  const [userProfile, setUserData] = useState({
    name: name,
    age: age,
    emergencyContact: emergencyContact,
    
  });
  const [initialUser, setInitialData] = useState({
    name: name,
    age: age,
    emergencyContact: emergencyContact,
    
  });
  

  const getData = async () => {
    try {
      const values = await AsyncStorage.getItem('@User')
      setUserData(JSON.parse(values));
      
    } catch(e) {
      console.log(e)
      // error reading value
    }

    try{
    const values = await AsyncStorage.getItem('@Image')
    setImage(JSON.parse(values));
    
    }
    catch(e) {
      console.log(e)
      // error reading value
    }
    

  }

  useEffect(() => {
    getData();
});
useEffect(()=>{
  if (name == null){
    getInitialData();
  }
})

  const saveUser = async () => {
    const userToSave = {
      name: name,
      age: age,
      emergencyContact: emergencyContact,
      
    };
  
   try {
      await AsyncStorage.setItem('@User', JSON.stringify(userToSave))
      setUserData(userToSave)
    } catch (e) {
      console.log(e)
      // saving error
    }
    navigation.navigate('About me')
  }

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
            await AsyncStorage.setItem('@Image', JSON.stringify(imageToSave))
            setImage(imageToSave)
          } catch (e) {
            console.log(e)
            console.log("this")
            // saving error
          }
      console.log(image)
    }
  };

  const getInitialData = async () => {
    try {
      const values = await AsyncStorage.getItem('@User')
      setInitialData(JSON.parse(values));
      setName(initialUser.name);
      setAge(initialUser.age);
      setEmergencyContact(initialUser.emergencyContact);
    } catch(e) {
      console.log(e)
      // error reading value
    }
  }

 

  return (
    <ScrollView 
      style={styles.scrollView} 
      contentContainerStyle={styles.contentContainer}>

    <SafeAreaView style = {styles.background}>

    
      
      
      {image ? <Image style = {styles.image} source={{ uri: image }} /> : <Text style = {styles.image}>None :(</Text>}
      <TouchableOpacity title="Pick an image from camera roll" onPress={pickImage} style = {styles.imageButtonOne}>
        <Text style = {styles.imageText}>Change Photo</Text>
      </TouchableOpacity>
     
      
      <Text style = {styles.titleDetails}>Fill in your details to complete your profile. When you are finsihed, press 'Save Info'</Text>
      <Text style = {styles.infoText}>Name</Text>
      <TextInput
        placeholder = 'Enter your Name'
        style={styles.input}
        onChangeText={setName}
        value={name}
        

      />
      <Text style = {styles.infoText}>Age</Text>
      <TextInput
        placeholder = 'Enter your age'
        style={styles.input}
        onChangeText={setAge}
        value={age} 
      
      />
      
      <Text style = {styles.infoText}>Emergency Contacts</Text>
      <TextInput
        placeholder = 'Enter your Emergency Contacts'
        style={styles.input}
        onChangeText={setEmergencyContact}
        value={emergencyContact} 
      
      />
      

     
  
    </SafeAreaView>
    </ScrollView>
  );
};
    

const styles = StyleSheet.create({
  divider: {
    padding: 8
  },
  header: {
    width: '100%',
    height: 120,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: '#fef1e5'
  },
  background: {
    backgroundColor: "#fef1e5",
    height: '100%',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'relative',
    flexWrap: 'wrap', 
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    
   
  },
  containerOne: {
    height: '80%',
    width: '30%',
    backgroundColor: "rgba(255,255,255,1)",
    borderWidth: 3,
    borderColor: "#F34E6F",
    borderRadius: 25,
    position: 'absolute',
    top: '0%',
    justifyContent: 'center',
    left: '5%',
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,

  },
  containerTwo: {
    height: '5%',
    width: '30%',
    backgroundColor: "rgba(255,255,255,1)",
    borderWidth: 3,
    borderColor: "#10182f",
    borderRadius: 25,
    position: 'absolute',
    top: '6%',
    justifyContent: 'center',
    right: '0%',
    margin: '2%',
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,

  },
  TextStyle: {
    position: 'absolute',
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 30,
    color: '#10182f'
  },
  input: {
    height: "5%",
    width: '96%',
    margin: 8,
    borderWidth: 1,
    borderColor: "#10172f",
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,1)",
    borderBottomColor: '#10172f',
    borderBottomWidth: 2,
    
  },
  image: {
    width: '40%',
      height: '23%',
      alignSelf: 'center',
      borderRadius: 100,
      margin: 10
    
  },
  imageButtonOne: {
    height: '7%',
    width: '40%',
    backgroundColor: "rgba(255,255,255,1)",
    borderWidth: 3,
    borderColor: "#10172f",
    borderRadius: 25,
    marginTop: 2,
    marginBottom: 20,
    marginHorizontal: '2%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    alignSelf: 'center',
    top: '15%'
    
   
   },
   imageText: {
     position: 'absolute',
     fontWeight: 'bold',
     color: '#10172f',
     fontSize: 20,
   },
   titleDetails: {
      position: 'relative',
      alignSelf: 'center',
      marginHorizontal: '2%',
      fontSize: 20,
      width: '98%',
      marginTop: '4%'
    },
    infoText: {
      margin: '1%',
      fontWeight: 'bold',
      fontSize: 20,
      width: '100%'

    },
    container: {
      backgroundColor: '#9BC53D',
      flex: 1,
      justifyContent: 'space-around',
      alignItems: 'center'
  },
  scrollView: {
    height: '140%',
    width: '100%',
    alignSelf: 'center',
    
  },
  contentContainer: {
    justifyContent: 'center',
    height: '120%',
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#fef1e5',
    paddingBottom: 200,
  
  },
  line: {
      width: '100%',
      height: 2,
      backgroundColor: 'rgba(52, 52, 52, 0.5)',
      position: 'absolute',
      bottom: '0%'
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
      height: 2,
      backgroundColor: 'rgba(52, 52, 52, 0.5)',
     
      
  }

});

export default EditAboutMeScreen