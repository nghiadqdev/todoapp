import { FlatList, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableOpacityBase, View } from 'react-native'
import React from 'react'
import HeaderApp from '../../component/headerApp'
import screenStyles from '../../config/screenStyles'
import { deviceWidth } from '../../config'

const TodoListScreen = ({navigation, route}) => {
  return (
    <SafeAreaView style={screenStyles.flexCenter}>
      <HeaderApp title={'Todo list'} />
      <View style={styles.containtStyle}>
        {/* <TextInput
         placeholder={'Search'}
         
        /> */}
      </View>
    </SafeAreaView>
  )
}

export default TodoListScreen

const styles = StyleSheet.create({
    containtStyle: {
        flex: 1,
        width: deviceWidth,
        marginTop: 16,
    }
})