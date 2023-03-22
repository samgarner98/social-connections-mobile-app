import { View, Text, TextInput, Button, StyleSheet, SafeAreaView, Alert, Platform, StatusBar, Image, TouchableOpacity} from 'react-native'
import React, {useState, useLayoutEffect, useEffect} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import * as Contacts from 'expo-contacts';

const ViewContactScreen = ({route}) => {
  const isFocused = useIsFocused(); 
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      header: () =>
        (
          <SafeAreaView style = {styles.safeAreaView}>
          
          </SafeAreaView>
        ),
      headerShown: true,
      
    });
  });

  const getContactData = (data, property) => {
    if (data) {
      return data.map((data, index) => {
        return (
          <View key={index}>
            <Text style = {styles.numbers}>{data.label}: {data[property]} </Text>
          </View>
        )
      });
    }
  }


  const contact = route.params.contact;
  console.log(contact)
  const [image, setImage] = useState(null)
  const [imageAdded, setImageAdded] = useState(false)
  
  const setEmergencyContact = async (contact) => {
    const contacttoSave = contact
    
    try {
      await AsyncStorage.setItem('@EmergencyContact', JSON.stringify(contacttoSave))
      console.log(contacttoSave)
    } catch (e) {
      console.log(e)
      // saving error
    }
    Alert.alert('Emergency Contact Updated','', [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);
    
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
      const imageToSave = {"height": result.assets[0].height,
      "uri": result.assets[0].uri,
      "width": result.assets[0].width,}
     
      contact.image=imageToSave
      contact.imageAvailable = true
      await Contacts.updateContactAsync(contact);
      setImage(result.assets[0].uri)
      setImageAdded(true)

    }

  }

  const openContact = async () => {
    await Contacts.presentFormAsync(contact.id);


  }

    

  useEffect(() => {
   if (imageAdded == true || contact.imageAvailable == true){
    setImage(contact.image.uri)
   }
  }, [isFocused]);

    
    
    return (
        <SafeAreaView style = {styles.background}>

          <View style={styles.header}>
            <TouchableOpacity style = {styles.headerOne} onPress = {() => navigation.navigate('Contacts')}>
          <Text style = {styles.headerTextStyle}>Go Back</Text >
          </TouchableOpacity>
          <TouchableOpacity onPress={() => openContact()} style = {styles.OptionsButton}>
        <Text style = {styles.OptionsText}>Options</Text>
      </TouchableOpacity>
          
          
          </View>

           
            {contact.imageAvailable ? <Image style = {styles.image} source={{ uri: image }} /> : <View style = {styles.image}><Text style = {styles.photoText}>No Photo</Text></View>}
            <TouchableOpacity title="Pick an image from camera roll" onPress={pickImage} style = {styles.imageButtonOne}>
        <Text style = {styles.imageText}>Change Photo</Text>
      </TouchableOpacity>
            <Text style = {styles.name}>{contact.name}</Text>
           
            <View style = {styles.numberBox}>
            <Text style = {styles.numbers}>{getContactData(contact.phoneNumbers, "number")}</Text>
            </View>
            <TouchableOpacity style = {styles.headerTwo} onPress = {() => setEmergencyContact(contact)}>
          <Text style = {styles.headerTextStyleTwo}>Make Emergency Contact</Text >
          </TouchableOpacity>
          


        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: '#001C23',
        height: '100%' , 
        width: '100%' ,
        flexDirection: 'row',
        justifyContent: 'center',
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
    TextStyle: {
      position: 'absolute',
      alignSelf: 'center',
      fontWeight: 'bold',
      fontSize: 25,
      color: '#10182f',
    },
    image: {
      width: '50%',
      height: '28%',
      borderRadius: 100,
      margin: 10,
      backgroundColor: '#EEA764',
      overflow: 'hidden',
      justifyContent: 'center',
      alignItems: 'center'
    
      
    },
    
    infoDisplay: {
      position: 'relative',
      alignSelf: 'center',
      marginLeft: '4%',
      fontSize: 25,
      width: '96%',
      marginTop: '6%',
      
        
    },
    line: {
        width: '100%',
        height: 1,
        backgroundColor: '#271700',
       
        
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
    height: '10%',
    padding: '2%',
    backgroundColor: '#E1A501',
    borderWidth: 3,
    borderColor: '#FEBD08',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    
   

  },
  headerThree: {
   height: '90%',
   padding: '2%',
   backgroundColor: '#E1A501',
   borderWidth: 3,
   borderColor: '#FEBD08',
   borderRadius: 25,
   justifyContent: 'center',
   alignItems: 'center',
   
  

 },
   headerTextStyle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white'
   },
     headerTextStyleTwo: {
       fontSize: 25,
       fontWeight: 'bold',
       color: '#002731'
     },
     name: {
       marginTop: 40,
       fontSize: 35,
       flexWrap: 'wrap',
       alignSelf: 'stretch',
       textAlign: 'center',
       color: 'white',
       width: '100%',
       fontWeight: 'bold'
      },
      numbers: {
        fontSize:30,
       marginVertical: '5%',
        color: 'white'
        


      },
     imageText: {
      fontSize: 25,
      fontWeight: 'bold'
     },
     numberBox: {
       flexDirection: 'column',
       position: 'relative',
       margin: '5%'
     
     },
     lineTwo: {
      width: '90%',
      height: 2,
      backgroundColor: '#271700',
      position: 'relative',
      bottom: '0%',
      marginTop: 10
     },
     info: {
      
       justifyContent: 'center',
       alignItems: 'center',
       marginVertical: 10

     },
     photoText: {
       fontSize: 25
     },
     safeAreaView: {
      backgroundColor: '#002731',
      
      width: '100%',
      position: 'relative',
      padding: 0,
      flex: 1
   },
   imageButtonOne: {
     
    padding: '2%',
     backgroundColor: "rgba(255,255,255,1)",
     borderWidth: 3,
     borderColor: "#FEBD08",
     borderRadius: 25,
     marginHorizontal: '2%',
     justifyContent: 'center',
     alignItems: 'center',
     position: 'relative',
     alignSelf: 'center',
     marginTop: -50
   
    
     
    
    },
    birthday: {
      color: 'white',
      fontSize: 30,
      marginTop: 10
    },
    OptionsButton: {
      
     padding: '2%',
      backgroundColor: "#002731",
      borderWidth: 3,
      borderColor: "#FEBD08",
      borderRadius: 25,
      marginHorizontal: '2%',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      alignSelf: 'center',
    
     
      
     
     },
     OptionsText: {
      fontSize: 25,
      fontWeight: 'bold',
      color: 'white'
     }

});

export default ViewContactScreen;