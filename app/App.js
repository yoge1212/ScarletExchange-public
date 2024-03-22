import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'; 
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import {useFonts} from 'expo-font';
import ResetPassword from './screens/ResetPassword';
import PasswordResetConfirm from './screens/PasswordResetConfirm';


const Stack = createNativeStackNavigator();

export default function App() {
  const [loaded] = useFonts({
    ralewaybold: require('./assets/ralewaybold.ttf'),
    ralewaylight: require('./assets/ralewaylight.ttf'),
  });



  
  
  if(!loaded) {
    return null;
  }
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ResetPassword">
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }}/> 
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }}/>  
        <Stack.Screen name="ResetPassword" component={ResetPassword} options={{ headerShown: false }}/>  
        <Stack.Screen name="PasswordResetConfirm" component={PasswordResetConfirm} options={{ headerShown: false }}/>  
      </Stack.Navigator>
    </NavigationContainer>
  );
}


