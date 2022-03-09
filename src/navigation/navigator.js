import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TodoListScreen from '../screens/TodoList';
import CountryListScreen from '../screens/CountryList';
import HeaderApp from '../component/headerApp';
import { navigate, navigationRef } from './navigationService';
import screenStyles from '../config/screenStyles';
import {deviceWidth} from '../config'

const listScreen = [
    {id: 1, title: 'Todo list'}, {id: 2, title: 'Country list'}, {id: 3, title: 'Image gallery'},
]

function HomeScreen({navigation}) {
  const gotoScreen = (id) => {
      switch (id) {
          case 1:
            return navigation.navigate('TodoList')
          case 2:
            return navigation.navigate('CountryList')
          case 3:
            return navigation.navigate('ImageGallety')
          default:
            return navigation.navigate('TodoList')
      }
  }

  return (
    <SafeAreaView style={screenStyles.flexCenter}>
      <HeaderApp isBack={false} title={'Eastplayers Test'} />
      <View style={styles.listStyle}>
        <FlatList
            data={listScreen}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({item, index}) => (
                <TouchableOpacity onPress={() => gotoScreen(item.id)} style={styles.viewItem}>
                    <View style={styles.viewIndex}>
                        <Text style={styles.txtIndex}>{item.id}</Text>
                    </View>
                    <Text style={styles.txtTitle}>{item.title}</Text>
                    <Text style={styles.txtRight}>{'>'}</Text>
                </TouchableOpacity>
            )}
        />
      </View>
    </SafeAreaView>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer ref={navigationRef} >
      <Stack.Navigator initialRouteName='Home' >
        <Stack.Screen options={{headerShown: false}} name="Home" component={HomeScreen} />
        <Stack.Screen options={{headerShown: false}} name="TodoList" component={TodoListScreen} />
        <Stack.Screen options={{headerShown: false}} name="CountryList" component={CountryListScreen} />
        <Stack.Screen options={{headerShown: false}} name="ImageGallety" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  listStyle: {
     flex: 1,
     marginTop: 12,
  },
  viewItem: {
    width: deviceWidth - 30,
    marginHorizontal: 15,
    marginBottom: 20,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {height: 4, width: 0},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
    height: 62,
  },
  viewIndex: {
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FDE8E7',
    marginRight: 12,
  },
  txtTitle: {
    fontSize: 14,
    fontWeight: '700',
    flex: 1,
  },
  txtIndex: {
    fontSize: 14,
    fontWeight: '700',
    color: '#EF4638',
  },
  txtRight: {
    color: '#EF4638',
    fontWeight: '500',
    fontSize: 18,
  },
})

export default App;