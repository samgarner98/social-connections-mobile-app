import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import EditAboutMeScreen from './screens/EditAboutMeScreen';
import ContactScreen from './screens/ContactScreen';
import GoalScreen from './screens/GoalScreen';
import JournalScreen from './screens/JournalScreen';
import NavigationScreen from './screens/NavigationScreen';
import HelpScreen from './screens/HelpScreen';
import AboutMeScreen from './screens/AboutMeScreen';
import EditJournalScreen from './screens/EditJournalScreen';
import ViewJournalScreen from './screens/ViewJournalScreen';
import ViewContactScreen from './screens/ViewContactScreen';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="About me" component={AboutMeScreen}/>
        <Stack.Screen name="Edit About me" component={EditAboutMeScreen} />
        <Stack.Screen name="Contacts" component={ContactScreen} />
        <Stack.Screen name="Goals" component={GoalScreen} />
        <Stack.Screen name="Journal" component={JournalScreen} />
        <Stack.Screen name="Navigation" component={NavigationScreen} />
        <Stack.Screen name="Help" component={HelpScreen} />
        <Stack.Screen name="Edit Journal" component={EditJournalScreen} />
        <Stack.Screen name="View Journal" component={ViewJournalScreen} />
        <Stack.Screen name="View Contact" component={ViewContactScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
