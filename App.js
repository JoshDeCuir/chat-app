import React, { useEffect } from 'react';
import { Alert, LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { initializeApp } from 'firebase/app';
import { disableNetwork, enableNetwork, getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';
import { useNetInfo } from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Import the screens
import Start from './components/Start';
import Chat from './components/Chat';

LogBox.ignoreLogs(['AsyncStorage has been extracted from']);

const App = () => {
  const connectionStatus = useNetInfo();

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
  const db = getFirestore(app); // Initialize Firestore
  const analytics = getAnalytics(app);

  // Create the navigator
  const Stack = createNativeStackNavigator();

  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert('Connection lost!');
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Start'>
        <Stack.Screen name='Start' component={Start} />
        <Stack.Screen name='Chat'>
          {props => <Chat {...props} db={db} isConnected={connectionStatus.isConnected} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
