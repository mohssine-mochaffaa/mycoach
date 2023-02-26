import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './pages/home';
import Coach from './pages/coach';
import Client from './pages/client';
import CoachDetail from './pages/coachDetail';
import Admin from './pages/admin';
import Reclamation from './pages/reclamtion';
import Facture from './pages/facture';

const Stack = createNativeStackNavigator();

export default function App() {
    
  return ( 
    <NavigationContainer>
    <Stack.Navigator>
     <Stack.Screen options={{
          title: 'My home',
          headerStyle: {
            backgroundColor: '#f13a11',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} name="Home" component={Home} /> 

     <Stack.Screen options={{
          title: 'Administration',
          headerStyle: {
            backgroundColor: '#f13a11',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} name="Admin" component={Admin} /> 
     <Stack.Screen options={{
          title: 'Coach infos',
          headerStyle: {
            backgroundColor: '#f13a11',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}  name="Reclamation" component={Reclamation} />    
     <Stack.Screen options={{
          title: 'Coach',
          headerStyle: {
            backgroundColor: '#f13a11',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} name="Coach" component={Coach} /> 
     <Stack.Screen options={{
          title: 'Mon compte',
          headerStyle: {
            backgroundColor: '#f13a11',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}  name="Client" component={Client} />
        <Stack.Screen options={{
          title: 'Facture',
          headerStyle: {
            backgroundColor: '#f13a11',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}  name="Facture" component={Facture} />
     <Stack.Screen options={{
          title: 'Details',
          headerStyle: {
            backgroundColor: '#f13a11',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}  name="Details" component={CoachDetail} /> 
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
