// import the screens
import Start from './components/Start';
import Chat from './components/Chat';

// import firebase
import { initializeApp } from 'firebase/app';
import { getFirestore, disableNetwork, enableNetwork } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

// import react Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//import ignore Logs
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['AsyncStorage has been extracted from']);

// Web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB1TK4LS1ys_ZmB7q6RUIEn_Y-OwwNJG5I",
  authDomain: "chatapp-d6708.firebaseapp.com",
  projectId: "chatapp-d6708",
  storageBucket: "chatapp-d6708.appspot.com",
  messagingSenderId: "791725493116",
  appId: "1:791725493116:web:b8e237bd0d3f6d41e532f9",
  measurementId: "G-GL7ZBBEE8Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Initialize Firestone
const analytics = getAnalytics(app);

// Create the navigator
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Start'
      >
      <Stack.Screen
        name='Start'
        component={Start}
        />
      <Stack.Screen
        name='Chat'
        component={Chat}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
