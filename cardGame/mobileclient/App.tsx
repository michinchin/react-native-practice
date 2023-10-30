import { ApolloProvider } from '@apollo/client';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PlayerViewProps, RootStackParamList } from './navigation/types';
import client from "./apolloGqlClient";
import Home from './components/Home';
import PlayerView from './components/PlayerView';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <ApolloProvider client={client}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName='Home'>
            <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
            <Stack.Screen name="PlayerView" options={{ headerTransparent: true, title: 'Player'}} >
              {(props) => <PlayerView {...props} />}
            </Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
    </ApolloProvider>
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
