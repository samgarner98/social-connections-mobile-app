import { View, Text, TextInput, Button, StyleSheet, SafeAreaView, Alert, Platform, StatusBar, Image, TouchableOpacity} from 'react-native'
import React, {useState, useLayoutEffect, useEffect} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

const AboutMeScreen = () => {
    
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      header: () =>
        (
          <SafeAreaView style = {{backgroundColor: '#fef1e5'}}>
          <View style={styles.header}>
            <TouchableOpacity style = {styles.headerOne} onPress = {() => navigation.navigate('Home')}>
          <Text style = {styles.headerTextStyle}>Go Back</Text >
          </TouchableOpacity>
          <TouchableOpacity style = {styles.headerTwo} onPress = {() => navigation.navigate('Edit About me')}>
          <Text style = {styles.headerTextStyleTwo}>Edit Details</Text >
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
    const [image, setImage] = useState(null);
    const [emergencyContact, setEmergencyContact] = useState(null);
    const [userProfile, setUserData] = useState({
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
    }, []);
    
    return (
        <SafeAreaView style = {styles.background}>

            
          
            {image ? <Image style = {styles.image} source={{ uri: image }} /> : <Text>None :(</Text>}
            {userProfile ? <Text style = {styles.nameDisplay}>{userProfile.name}</Text> : <Text>None :(</Text>}
            {userProfile.age ? <Text style = {styles.infoDisplay}>Age:  {userProfile.age}</Text> : <Text>None :(</Text>}
            <View style = {styles.line}></View>
            {userProfile.emergencyContact ? <Text style = {styles.infoDisplay}>Emergency Contact: {userProfile.emergencyContact}</Text> : <Text>None :(</Text>}
            
            
            
            


        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: '#fef1e5',
        height: '100%' , 
        width: '100%' ,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        position: 'relative',
        flexWrap: 'wrap', 
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      },
      header: {
        width: '100%',
        height: 120,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        backgroundColor: '#fef1e5'
      },
      containerOne: {
        height: '80%',
        width: '30%',
        backgroundColor: '#FEFEFE',
        borderWidth: 3,
        borderColor: '#F34E6F',
        borderRadius: 25,
        position: 'absolute',
        top: '0%',
        justifyContent: 'center',
        left: '5%'
        
        
    },
    containerTwo: {
      height: '5%',
      width: '30%',
      backgroundColor: '#FEFEFE',
      borderWidth: 3,
      borderColor: '#10182f',
      borderRadius: 25,
      position: 'absolute',
      top: '23%',
      justifyContent: 'center',
      right: '0%',
      margin: '5%'
  
    },
    TextStyle: {
      position: 'absolute',
      alignSelf: 'center',
      fontWeight: 'bold',
      fontSize: 25,
      color: '#10182f',
    },
    image: {
      width: '40%',
      height: '23%',
      alignSelf: 'stretch',
      borderRadius: 100,
      margin: 10
    
      
    },
    nameDisplay: {
        width: '50%',
        height: '23%',
        fontSize: 30,
        fontWeight: 'bold',
        color: '#10182f',
        alignSelf: 'center',
        paddingTop: 60,
        position: 'relative',
        

    
    },
    infoDisplay: {
      position: 'relative',
      alignSelf: 'center',
      marginLeft: '4%',
      fontSize: 25,
      width: '96%',
      marginTop: '6%'
        
    },
    line: {
        width: '100%',
        height: 1,
        backgroundColor: '#271700',
       
        
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
     }
});

export default AboutMeScreen