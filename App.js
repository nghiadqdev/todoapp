import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TodoListScreen from './src/screens/TodoList';
import HeaderApp from './src/component/headerApp';

function HomeScreen({navigation}) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <HeaderApp isBack={false} title={'Eastplayers Test'} />
      <TouchableOpacity onPress={() => navigation.navigate('TodoList')}>
        <Text>goto 1</Text>
      </TouchableOpacity>
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer ref={navigationRef} >
      <Stack.Navigator initialRouteName='Home' >
        <Stack.Screen options={{headerShown: false}} name="Home" component={HomeScreen} />
        <Stack.Screen options={{headerShown: false}} name="TodoList" component={TodoListScreen} />
        <Stack.Screen options={{headerShown: false}} name="CountryList" component={HomeScreen} />
        <Stack.Screen options={{headerShown: false}} name="ImageGallety" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  
})

export default App;