import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import EditAboutMeScreen from "./screens/EditAboutMeScreen";
import ContactScreen from "./screens/ContactScreen";
import GoalScreen from "./screens/GoalScreen";
import JournalScreen from "./screens/JournalScreen";
import NavigationScreen from "./screens/NavigationScreen";
import HelpScreen from "./screens/HelpScreen";
import AboutMeScreen from "./screens/AboutMeScreen";
import EditJournalScreen from "./screens/EditJournalScreen";
import ViewJournalScreen from "./screens/ViewJournalScreen";
import ViewContactScreen from "./screens/ViewContactScreen";
import RateGoalsScreen from "./screens/RateGoalsScreen";
import TwoRateGoalsScreen from "./screens/TwoRateGoalsScreen";
import ThreeRateGoalsScreen from "./screens/ThreeRateGoalsScreen";
import ViewGoalScreen from "./screens/ViewGoalScreen";
import GoalPerson from "./screens/GoalPerson";
import GoalCompleteScreen from "./screens/GoalCompleteScreen";
import GoalDifficulty from "./screens/GoalDifficulty";
import TrophyComplete from "./screens/TrophyComplete";
import AllGoalsCompleteScreen from "./screens/AllGoalsCompleteScreen";
import NavigationSteps from "./screens/NavigationSteps";
import ArrivedScreen from "./screens/ArrivedScreen";
import MapDisplayScreen from "./screens/MapDisplayScreen";
import MessageScreen from "./screens/MessageScreen";
import AchievementScreen from "./screens/AchievementScreen";
import WeekFinishedScreen from "./screens/WeekFinishedScreen";
import GettingStarted from "./screens/GettingStarted";
import UserInterest from "./screens/UserInterestScreen";
import InterestCompleteScreen from "./screens/InterestCompleteScreen";
import StartRatingsScreen from "./screens/StartRatingsScreen";
import BeginUserProfileScreen from "./screens/BeginUserProfileScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="About me" component={AboutMeScreen} />
        <Stack.Screen name="Edit About me" component={EditAboutMeScreen} />
        <Stack.Screen name="Contacts" component={ContactScreen} />
        <Stack.Screen name="Goals" component={GoalScreen} />
        <Stack.Screen name="Journal" component={JournalScreen} />
        <Stack.Screen name="Navigation" component={NavigationScreen} />
        <Stack.Screen name="Help" component={HelpScreen} />
        <Stack.Screen name="Edit Journal" component={EditJournalScreen} />
        <Stack.Screen name="View Journal" component={ViewJournalScreen} />
        <Stack.Screen name="View Contact" component={ViewContactScreen} />
        <Stack.Screen name="Rate Goals Screen" component={RateGoalsScreen} />
        <Stack.Screen
          name="Rate Goals Screen Two"
          component={TwoRateGoalsScreen}
        />
        <Stack.Screen
          name="Rate Goals Screen Three"
          component={ThreeRateGoalsScreen}
        />
        <Stack.Screen name="View Goal Screen" component={ViewGoalScreen} />
        <Stack.Screen name="Select Person Screen" component={GoalPerson} />
        <Stack.Screen
          name="Goal Complete Screen"
          component={GoalCompleteScreen}
        />
        <Stack.Screen name="Goal Difficulty" component={GoalDifficulty} />
        <Stack.Screen name="Trophy Complete" component={TrophyComplete} />
        <Stack.Screen
          name="All Goals Complete Screen"
          component={AllGoalsCompleteScreen}
        />
        <Stack.Screen
          name="Navigation Steps Screen"
          component={NavigationSteps}
        />
        <Stack.Screen name="Arrived Screen" component={ArrivedScreen} />
        <Stack.Screen name="Map Display Screen" component={MapDisplayScreen} />
        <Stack.Screen name="Message Screen" component={MessageScreen} />
        <Stack.Screen name="Achievement Screen" component={AchievementScreen} />
        <Stack.Screen
          name="Week Finished Screen"
          component={WeekFinishedScreen}
        />
        <Stack.Screen name="Getting Started" component={GettingStarted} />
        <Stack.Screen name="User Interest Screen" component={UserInterest} />
        <Stack.Screen
          name="Interest Complete Screen"
          component={InterestCompleteScreen}
        />
        <Stack.Screen
          name="Start Ratings Screen"
          component={StartRatingsScreen}
        />
        <Stack.Screen
          name="Begin User Profile Screen"
          component={BeginUserProfileScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
