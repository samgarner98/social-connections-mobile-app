import React, { useEffect, useState, useLayoutEffect } from 'react';
import { View, StyleSheet, TextInput, Touchable, TouchableOpacity, Text, SafeAreaView, Alert, StatusBar} from 'react-native';
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faWalking } from '@fortawesome/free-solid-svg-icons';
import { faCar } from '@fortawesome/free-solid-svg-icons';
import { faTrainSubway } from '@fortawesome/free-solid-svg-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Navigation = ({route}) => {


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
 

const GOOGLE_MAPS_APIKEY = 'AIzaSyD85mtgaRF3QYxdniTj-6NrIjOeLQIR_rE';
const [coords, setCoords] = useState(null)
const [location, setLocation] = useState(null);
const [originAddress, setOriginAddress] = useState('')
const [DestinationAddress, setDestinationAddress] = useState('')
const [directionsData, setDirectionsData] = useState(null);
const [useLocation, setUseLocation] = useState(null)
const [transport, setTransport] = useState(null)
const [thisWeeksGoals, setThisWeeksGoals] = useState(null)
const [confirm, setConfirm] = useState(null)


const fetchUrl = async () => {
  setConfirm(true)
  const url = `https://maps.googleapis.com/maps/api/directions/json?destination=${DestinationAddress.replace(/\s/g, '%20')}&mode=${transport}&origin=${originAddress.replace(/\s/g, '%20')}&key=AIzaSyD85mtgaRF3QYxdniTj-6NrIjOeLQIR_rE`;

  try {
    const response = await fetch(url);
    const jsonData = await response.json();
    setDirectionsData(jsonData);
    
  } catch (e) {
    setError(e);
  }
  
}




const getStructuredStepsFromData = (data) => {
  
  if (data.status != "NOT_FOUND"){
  const steps = data.routes[0].legs[0].steps;
  const startLocation = data.routes[0].legs[0].start_location;
  const endLocation = data.routes[0].legs[0].end_location


  let structuredSteps = [];
  // For each parent step
  for (let i = 0; i < steps.length; i++) {
    // initialise a structuredStep object with an id
    const structuredStep = { id: i, parentHtmlStep: "" };
    let childHtmlSteps = [];
    const parentStep = steps[i];

    // Check if html_instructions exist on parent step
    if (parentStep.html_instructions) {
      // Set parentHtmlStep in our structuredStep object
      structuredStep.parentHtmlStep = parentStep.html_instructions;

      const childSteps = parentStep.steps;
      // Check if child steps exist within current parentStep
      if (childSteps) {
        // For each child step, push its html_instructions to the array of childHtmlSteps (held within our structuredStep object)
        for (let i = 0; i < childSteps.length; i++) {
          const childStep = childSteps[i];
          if (childStep.html_instructions) {
            childHtmlSteps.push(childStep.html_instructions);
          }
        }
      }
      // Add newly formed structuredStep object into array
      structuredSteps.push(structuredStep);
      // If childHtmlSteps exist, then add them to our structured step object
      if (childHtmlSteps.length) {
        structuredSteps[i].childHtmlSteps = childHtmlSteps;
      }
    }
  }

  structuredSteps.push({start: startLocation})
  
  structuredSteps.push({end: endLocation})
 console.log("HHEEERREEE",structuredSteps[structuredSteps.length - 1].end)
 navigation.navigate("Navigation Steps Screen", {steps: structuredSteps, mode: transport});
}else{
  Alert.alert('Unable to find Directions. Make sure you include street name or city for more accurate results','', [
    {text: 'OK', onPress: () => console.log('OK Pressed')},
  ]);
  setLocation(null)
  setUseLocation(null)
  setDestinationAddress(null)
  setConfirm(false)
  setOriginAddress(null)
  setTransport(null)

}
};





useEffect(() => {
  
  if (location == null){
  (async () => {

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location)
      console.log(location)
     
      
    })();}
    if (useLocation == true && location != null){
    setOriginAddress(`${location.coords.latitude},${location.coords.longitude}`)
  }



});



// Steps is an array of steps - each element has html_instructions
// Each step contains an array of steps - each element has html instructions

// pull out html for parent and child steps in order

// display that html text formatted in the Text component


  return (
    
    <SafeAreaView style={styles.background}>
      <View style={styles.header}>
            <TouchableOpacity style = {styles.headerOne} onPress = {() => navigation.navigate('Home')}>
          <Text style = {styles.headerTextStyle}>Go Back</Text >
          </TouchableOpacity>
      </View>
      {location == null  && transport != null && useLocation == true? <Text style = {styles.useLocation}>Loading... {'\n'}
      This may take a few seconds</Text>: <Text></Text>}
      {useLocation == null && transport != null ? 
      <View style = {styles.locationView}>
        <Text style = {styles.useLocation}>Use Current Location?</Text>
      <TouchableOpacity style = {styles.headerThree} onPress={() => setUseLocation(true)}>
        <Text style = {styles.headerTextStyleTwo}>Yes</Text>
      </TouchableOpacity> 
      <TouchableOpacity style = {styles.headerThree} onPress={() => setUseLocation(false)} >
        <Text style = {styles.headerTextStyleTwo}>No</Text>
      </TouchableOpacity> 
      <Text style = {styles.nav}>Use your current location for the starting point for navigation</Text>
      </View>
      : <Text></Text>}
      {transport == null    ? 
      <View style = {styles.locationView}>
        <Text style = {styles.useLocation}>Which mode of transport would you like to use?</Text>
      <TouchableOpacity style = {styles.headerFour} onPress={() => setTransport("transit")}>
        <Text style = {styles.headerTextStyleTwo}>Public Transport</Text>
        <FontAwesomeIcon icon={faTrainSubway} style = {styles.Icons} size={ 60 }/>

      </TouchableOpacity> 
      <TouchableOpacity style = {styles.headerFour} onPress={() => setTransport("walking")} >
        <Text style = {styles.headerTextStyleTwo}>Walk</Text>
        <FontAwesomeIcon icon={faWalking} style = {styles.Icons} size={ 60 }/>

      </TouchableOpacity> 
      
      </View>
      : <Text></Text>}

{useLocation == false && transport != null && confirm != true  && location != null ?  <TextInput
       placeholder = 'Enter your Start Address'
       textAlign='center'
       placeholderTextColor={'white'}
       style={styles.input}
       onChangeText={setOriginAddress}
       value={originAddress} />: <Text></Text>}
     
     {useLocation != null && transport != null && confirm != true  && location != null ?  <TextInput
      placeholder = 'Enter the Destination Address'
      textAlign='center'
      placeholderTextColor={'white'}
      style={styles.input}
      onChangeText={setDestinationAddress}
      value={DestinationAddress} />: <Text></Text>}
     
     {useLocation != null && transport != null && confirm != true  && location != null ?   <TouchableOpacity style = {styles.headerTwo} onPress = {() => fetchUrl()}>
        <Text style = {styles.headerTextStyleTwo}>Confirm</Text>
      </TouchableOpacity>: <Text></Text>}
     
      {confirm == true  && location != null ? 
      <View style = {styles.confirm}>
        {useLocation == true  && location != null ? <View><Text style = {styles.detailsTwo}>Start Location: </Text><Text style = {styles.details}>Your Location</Text></View>: 
        <View><Text style = {styles.detailsTwo}>Start Location: </Text><Text style = {styles.details}>{originAddress}</Text></View>}
        <Text style = {styles.detailsTwo}>Destination: </Text>
        <Text style = {styles.details}>{DestinationAddress}</Text>

        <Text style = {styles.detailsTwo}>Mode of Transport:</Text>
        <Text style = {styles.details}>{transport}</Text>
        <TouchableOpacity style = {styles.headerFive} onPress = {() => getStructuredStepsFromData(directionsData)}>
        <Text style = {styles.headerTextStyleTwo}>Start Navigation</Text>
      </TouchableOpacity>

      </View>: <Text></Text>}
      
    </SafeAreaView>
  );
};
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
  headerTwo: {
   height: '10%',
   width: '95%',
   padding: '2%',
   backgroundColor: '#E1A501',
   borderWidth: 3,
   borderColor: '#FEBD08',
   borderRadius: 25,
   justifyContent: 'center',
   alignItems: 'center',
   margin: 10
   
  

 },
 headerThree: {
  width: '60%',
  height: '30%',

  backgroundColor: '#002731',
  borderWidth: 3,
  borderColor: '#FEBD08',
  borderRadius: 25,
  justifyContent: 'center',
  alignItems: 'center',

  
 

},
headerFour: {
 width: '80%',
 height: '30%',

 backgroundColor: '#002731',
 borderWidth: 3,
 borderColor: '#FEBD08',
 borderRadius: 25,
 justifyContent: 'center',
 alignItems: 'center',

 


},
  headerTextStyleTwo: {
   fontSize: 25,
   fontWeight: 'bold',
   color: 'white',
  },
  safeArea: {
   backgroundColor: '#002731',
   
   width: '100%',
   position: 'relative',
   padding: 0,
   flex: 1
  },
  header: {
    width: '100%',
    height: '13%',
    flexDirection: 'row',
    justifyContent: 'space-between',
   
    backgroundColor: '#002731',
   
   
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
  headerTextStyle: {
  fontSize: 25,
  fontWeight: 'bold',
  color: '#FEFEFE'
  },
  useLocation: {
    color: 'white',
    fontSize: 30,
    textAlign: 'center'
  },
  locationView: {
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    
  },
  nav: {
    color: 'white',
    fontSize: 25,
    textAlign: 'center'
  },
  Icons: {
    color: 'white'
  },
  details: {
    color: 'white',
    fontSize: 30,
   
  },
  detailsTwo: {
    color: '#FEBD08',
    fontSize: 30,
    marginTop: 30
  },
  confirm: {
    width: '100%',
    height: '100%'

  },
  headerFive: {
    height: '10%',
    width: '95%',
    padding: '2%',
    borderWidth: 3,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 50,
    alignSelf: 'center',
    backgroundColor: '#42C401',
   borderColor: '#55FE01',
 
   
  
 
 }
});

export default Navigation;