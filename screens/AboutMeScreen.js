import { View, Text, TextInput, Button, StyleSheet, SafeAreaView, Alert, Platform, StatusBar, Image, TouchableOpacity, ScrollView} from 'react-native'
import React, {useState, useLayoutEffect, useEffect} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { CalendarFormats } from 'expo-contacts';


const AboutMeScreen = () => {
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
    const [image, setImage] = useState(null);
    const [hobbies, setHobbies] = useState(null);
    const [userProfile, setUserData] = useState({
      name: name,
      age: age,
      hobbies: hobbies,
      
    });
    const [EmergencyContact, setEmergencyContact] = useState({});

    const getData = async () => {
        try {
          const values = await AsyncStorage.getItem('@User')
          if (values != null){
            setUserData(JSON.parse(values));
          }else {
            navigation.navigate("Edit About me")
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
        try {
          const values = await AsyncStorage.getItem('@EmergencyContact')
          if (values != null){
            setEmergencyContact(JSON.parse(values));
            
          }else {
            setEmergencyContact('No Emergency Contact has been set')
          }
          
          
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
    
    return (
        <SafeAreaView style = {styles.background}>

          <View style={styles.header}>
            <TouchableOpacity style = {styles.headerOne} onPress = {() => navigation.navigate('Home')}>
          <Text style = {styles.headerTextStyle}>Go Back</Text >
          </TouchableOpacity>
          

          <TouchableOpacity style = {styles.headerTwo} onPress = {() => navigation.navigate('Edit About me')}>
          <Text style = {styles.headerTextStyleTwo}>Edit Details</Text >
          </TouchableOpacity>
          </View>

            
          
            {image ? <Image style = {styles.image} source={{ uri: image }} /> : <Text style = {styles.image}></Text>}
            {userProfile.name ? <Text style = {styles.nameDisplay}>{userProfile.name} {'\n'}Age: {userProfile.age}</Text> : <Text></Text>}
            <ScrollView style = {styles.scroll}>
            {userProfile.hobbies ? <Text style = {styles.infoDisplay}>{userProfile.hobbies}</Text> : <Text>Loading... </Text>}
            </ScrollView>
            {EmergencyContact.name ? 
            <View style = {styles.emergencyView}>
              
              <Text style={styles.emergencyTitle}>Emergency Contact:</Text>
            <TouchableOpacity style = {styles.EmergencyContact} onPress = {() => navigation.navigate("View Contact", {contact: EmergencyContact })}>
            <Text style = {styles.infoDisplaytwo}>{EmergencyContact.name}</Text> 
            </TouchableOpacity>
            </View> : 
            <View style = {styles.emergencyView}>
            <TouchableOpacity style = {styles.EmergencyContact} onPress = {() => navigation.navigate("Contacts")}>
            <Text style = {styles.infoDisplaytwo}>Choose Emergency Contact</Text> 
            </TouchableOpacity>
            </View> }
            
            


        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: '#001C23',
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
        height: '13%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#002731',
       
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
      borderRadius: 400,
      margin: 10
    
      
    },
    nameDisplay: {
        width: '50%',
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white',
        alignSelf: 'center',
        position: 'relative',

        

    
    },
    infoDisplay: {
      position: 'relative',
      alignSelf: 'center',
      marginHorizontal: '3%',
      fontSize: 25,  
      color: 'white'
    },
    line: {
        width: '100%',
        height: 1,
        backgroundColor: '#383200',
       
        
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
  EmergencyContact: {
   
    height: '50%',
    backgroundColor: '#002731',
    borderWidth: 3,
    borderColor: '#FEBD08',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
 
  },
  emergencyView: {
    height: '20%',
    flex: 1,
    bottom: 0,
    position: 'absolute',
    width: '100%',
    alignItems: 'center'
    
    
    
  },
  emergencyTitle: {
    fontSize: 25,
    margin: 5,
    fontWeight: 'bold',
    color: 'white'
  },
  GoalDivider: {
    width: '90%',
    height: 1,
    backgroundColor: '#002967', 
    margin: '2%'
    
   
  },
  infoDisplaytwo: {
    position: 'relative',
    alignSelf: 'center',
    marginHorizontal: '3%',
    fontSize: 25,  
    color: 'white'
    
  },
  Icons: {
    color: 'white',
    alignSelf: 'center'
  },
  scroll: {
    width: '100%',
    height: '37%',
    position: 'absolute',
    top: '40%'

  }
});

export default AboutMeScreen