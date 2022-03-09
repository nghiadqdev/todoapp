import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { navigationGoBack } from '../navigation/navigationService'

const {width, height} = Dimensions.get('window')
const headerApp = (props) => {

  const {isBack = true, title = ''} = props

  return (
    <View style={styles.containtStyle}>
      {isBack ? <TouchableOpacity onPress={navigationGoBack}>
          <Text style={styles.txtBack}>{'<'}</Text>
      </TouchableOpacity> : <View style={styles.txtBack} />}
      <View style={styles.viewTitle}>
        <Text style={styles.txtTitle}>{title}</Text>
      </View>
    </View>
  )
}

export default headerApp

const styles = StyleSheet.create({
    containtStyle: {
        height: 54,
        width,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 15,
        backgroundColor: 'white',
        display: 'flex',
    },
    txtBack: {
        color: '#262626',
        fontWeight: '500',
        fontSize: 18,
        width: 30,
    },
    txtTitle: {
        textAlign: 'center',
        color: '#EF4638',
        fontWeight: '800',
        fontSize: 14,
    },
    viewTitle: {
        flex: 1,
        paddingRight: 30,
    },
})