import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity} from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { faListCheck } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { faCompass } from '@fortawesome/free-regular-svg-icons';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';

const HomeScreen = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  return (
    <SafeAreaView style = {styles.background}>
      
        <TouchableOpacity style = {styles.containerOne} onPress = {() => navigation.navigate('About me')}>
          <Text style = {styles.TextStyle}>About Me</Text>
          <FontAwesomeIcon icon={faUser} style = {styles.Icons} size={ 80 }/>
        </TouchableOpacity>
        <TouchableOpacity style = {styles.containerTwo} onPress = {() => navigation.navigate('Contacts')}>
          <Text style = {styles.TextStyle}>Contacts</Text>
          <FontAwesomeIcon icon={faUsers} style = {styles.Icons} size={ 80 }/>
        </TouchableOpacity>
        <TouchableOpacity style = {styles.containerOne} onPress = {() => navigation.navigate('Goals')}>
        <Text style = {styles.TextStyle}>Goals</Text>
        <FontAwesomeIcon icon={faListCheck} style = {styles.Icons} size={ 80 }/>
        </TouchableOpacity>
        <TouchableOpacity style = {styles.containerTwo} onPress = {() => navigation.navigate('Journal')}>
        <Text style = {styles.TextStyle}>Journal</Text>
        <FontAwesomeIcon icon={faPenToSquare} style = {styles.Icons} size={ 80 }/>
        </TouchableOpacity>
        <TouchableOpacity style = {styles.containerOne} onPress = {() => navigation.navigate('Navigation')}>
        <Text style = {styles.TextStyle}>Navigation</Text>
        <FontAwesomeIcon icon={faCompass} style = {styles.Icons} size={ 80 }/>
        </TouchableOpacity>
        <TouchableOpacity style = {styles.containerTwo} onPress = {() => navigation.navigate('Help')}>
        <Text style = {styles.TextStyle}>Help</Text>
        <FontAwesomeIcon icon={faQuestion} style = {styles.Icons} size={ 80 }/>
        </TouchableOpacity>
   
    </SafeAreaView>
    
  )
}

const styles = StyleSheet.create({
    background: {
      backgroundColor: "#fef1e5",
      height: '100%',
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      position: 'relative',
      flexWrap: 'wrap', 
    },
    containerOne: {
      height: '30%',
      width: '42%',
      backgroundColor: "rgba(255,255,255,1)",
      borderWidth: 3,
      borderColor: "#10172f",
      borderRadius: 25,
      marginTop: 20,
      marginLeft: '5%',
      justifyContent: 'center'
    
    },
    containerTwo: {
      height: '30%',
      width: '42%',
      backgroundColor: "rgba(255,255,255,1)",
      borderWidth: 3,
      borderColor: "#10172f",
      borderRadius: 25,
      marginTop: 25,
      marginRight: '5%',
      justifyContent: 'center'
    },
    TextStyle: {
      position: 'absolute',
      bottom: '20%',
      alignSelf: 'center',
      fontWeight: 'bold',
      fontSize: 30,
      color: '#10182f'
    },
    Icons: {
      alignSelf: 'center',
      bottom: '10%'
      
    }
});

export default HomeScreen