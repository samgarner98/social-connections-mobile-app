import { View, Text, TextInput, Button, StyleSheet, SafeAreaView, Alert, Platform, StatusBar, Image, TouchableOpacity, ScrollView, KeyboardAvoidingView, Keyboard} from 'react-native'
import React, {useState, useLayoutEffect, useEffect} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { useIsFocused } from "@react-navigation/native";

const EditAboutMeScreen = () => {
  const isFocused = useIsFocused();
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

  const [name, setName] = useState(null);
  const [age, setAge] = useState(0);
  const [hobbies, setHobbies] = useState(null);
  const [image, setImage] = useState(null);
  const [userProfile, setUserData] = useState({
    name: name,
    age: age,
    hobbies: hobbies,
    
  });
  const [initialUser, setInitialData] = useState({
    name: name,
    age: age,
    hobbies: hobbies,
    
  });
  const [keyboard, setKeyboard] = useState(false)
  

  const getData = async () => {
    try {
      
      const values = await AsyncStorage.getItem('@User')
      if (values != null){
        setUserData(JSON.parse(values));
      }
      
      
      
      
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
  




  const saveUser = async () => {
    const userToSave = {
      name: name,
      age: age,
      hobbies: hobbies,
      
    };
    
    if (name == null || age == null || hobbies == null){
      Alert.alert('Please fill all the detials','', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    } else{
   try {
      await AsyncStorage.setItem('@User', JSON.stringify(userToSave))
      setUserData(userToSave)
    } catch (e) {
      console.log(e)
      // saving error
    }
    navigation.navigate('About me')
  }
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

  const getInitialData = () => {
    if (userProfile != null){
      setName(userProfile.name);
      setAge(userProfile.age);
      setHobbies(userProfile.hobbies);}
  }

 

  useEffect(() => {
    getData();
    if (name == null){
      
      getInitialData();
      
    }

    if (keyboard == false){
      Keyboard.dismiss()
      setKeyboard(true)
    }
    
  });
 





  return (
    

    <SafeAreaView style = {styles.background}>
      <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboard}>
       
      <View style={styles.header}>
            <TouchableOpacity style = {styles.headerOne} onPress = {() => navigation.navigate('About me')}>
          <Text style = {styles.headerTextStyle}>Go Back</Text >
          </TouchableOpacity>
          <TouchableOpacity style = {styles.headerTwo} onPress = {saveUser}>
          <Text style = {styles.headerTextStyleTwo}>Save Info</Text >
          </TouchableOpacity>
          </View>
    
      
      <View style={styles.imageContainer}>
      {image ? <Image style = {styles.image} source={{ uri: image }} /> : <Text style = {styles.image}></Text>}
      <TouchableOpacity title="Pick an image from camera roll" onPress={pickImage} style = {styles.imageButtonOne}>
        <Text style = {styles.imageText}>Change Photo</Text>
      </TouchableOpacity>
      </View>
      
      
      
      <TextInput
        placeholder = 'Enter your Name'
        placeholderTextColor={'white'}
        style={styles.input}
        onChangeText={setName}
        value={name}
        

      />
      
      <TextInput
        placeholder = 'Enter your age'
        placeholderTextColor={'white'}
        style={styles.input}
        onChangeText={setAge}
        value={age} 
        keyboardType={'number-pad'}
      
      />
      
      <TextInput
        placeholder = 'Write About Yourself (hobbies and interests). Example: My name is.... I enjoy...'
        placeholderTextColor={'white'}
        style={styles.inputTwo}
        onChangeText={setHobbies}
        value={hobbies} 
        multiline={true}
      
      />
      

    
      </KeyboardAvoidingView>
      
    </SafeAreaView>
  
  );
};
    

const styles = StyleSheet.create({
  divider: {
    padding: 8
  },
  header: {
    width: '100%',
    height: '13%',
    flexDirection: 'row',
    justifyContent: 'space-between',
   
    backgroundColor: '#002731',
   
  },
  background: {
    backgroundColor: "#001C23",
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
    height: "10%",
    width: '94%',
    margin: '3%',
    borderWidth: 3,
    borderColor: "#FEBD08",
    borderRadius: 10,
    backgroundColor: "#002731",
    borderBottomColor: '#FEBD08',
    fontSize: 25,
    color: 'white',
    
    
    
  },
  
  inputTwo: {
    height: "25%",
    width: '94%',
    margin: '3%',
    borderWidth: 3,
    borderColor: "#FEBD08",
    borderRadius: 10,
    backgroundColor: "#002731",
    fontSize: 22,
    textAlignVertical: 'top',
    color: 'white'

  },
  image: {
    width: '40%',
      height: '100%',
      alignSelf: 'center',
      borderRadius: 100,
      margin: '1%'
    
  },
  imageButtonOne: {
    height: '40%',
    width: '45%',
    backgroundColor: "rgba(255,255,255,1)",
    borderWidth: 3,
    borderColor: "#FEBD08",
    borderRadius: 25,
    margin: '2%',
    marginHorizontal: '2%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    alignSelf: 'center',
   
    
   
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
      width: '100%',
      color: 'white'

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
      backgroundColor: '#383200',
      position: 'absolute',
      bottom: '0%'
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
     backgroundColor: '#E1A501',
     borderWidth: 3,
     borderColor: '#FEBD08',
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
      height: 2,
      backgroundColor: '#383200',
     
      
  },
  safeArea: {
   backgroundColor: '#002731',
   
   width: '100%',
   position: 'relative',
   padding: 0,
   flex: 1
},
keyboard: {
  flex: 1,
},
imageContainer: {
  flexDirection: 'row',
  height: '23%',
  alignItems: 'center',
  justifyContent: 'space-around'
}

});

export default EditAboutMeScreen