// import the screens
import Start from './components/Start';
import Chat from './components/Chat';

// import react Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Create the navigator
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Screen1"
      >
        <Stack.Screen
          name="Chat Room"
          component={Start}
        />
        <Stack.Screen
          name="Screen2"
          component={Chat}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
