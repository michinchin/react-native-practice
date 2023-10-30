import { ApolloProvider } from '@apollo/client';

import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import client from './graphql/client';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BookEditScreen from './screens/BookEditScreen';
import { HomeProps, RootStackParamList } from './navigation/navigationTypes';
import HomeScreen from './screens/HomeScreen';


const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  // in each screen can specify initial params too
  return (
    <ApolloProvider client={client}>
      <NavigationContainer >
        <Stack.Navigator initialRouteName='Home'>
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="BookEdit" component={BookEditScreen} options={{ headerTransparent: true, headerBackTitleVisible: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
