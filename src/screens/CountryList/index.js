import { ActivityIndicator, FlatList, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity,
    TouchableOpacityBase, View } from 'react-native'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import HeaderApp from '../../component/headerApp'
import screenStyles from '../../config/screenStyles'
import { deviceWidth, showToast } from '../../config'
import { Input } from 'react-native-elements'
import Toast from '../../component/Toast'
import axios from 'axios'

const CountryListScreen = ({navigation, route}) => {

  // state
  const toastRef = useRef(null)
  const [searchValue, setSearchValue] = useState('')
  const [listData, setListData] = useState()
  const [statusLoad, setstatusLoad] = useState(1)

  useEffect(() => {
    teset
  }, [searchValue]);

  //action
  const teset = setTimeout(() => {
    if (statusLoad === 0)
    getData()
  }, 700);
  const getData = () => {
    let searchkey = searchValue
    if (searchkey !== '') {
        axios.get(`https://restcountries.com/v3.1/name/${searchkey}`)
          .then(res => {
          const persons = res.data;
          setListData(persons[0]?.altSpellings || [])
          })
          .catch(error => {
              showToast(toastRef, 'error')
              setListData([])
          });
    } else {
      setListData([])
    }
    setstatusLoad(1)
    clearTimeout(teset)
  }
  const handleChangeText = (text) => {
    setstatusLoad(0)
    clearTimeout(teset)
    setSearchValue(text)
  }
  
  //render
  const renderInput = useMemo(() => {
      return(
        <Input
            value={searchValue}
            onChangeText={handleChangeText}
            placeholder={'Search'}
            rightIcon={() => statusLoad === 1 ? <Text style={styles.txtAdd}>{'>'}</Text> : <ActivityIndicator />}
            renderErrorMessage={false}
            containerStyle={styles.containtInput}
            inputContainerStyle={styles.inputContainStyle}
        />
      )
  }, [searchValue, statusLoad])

  const renderListTodo = () => {
        return(
            <View style={screenStyles.flex1}>
                <FlatList
                    data={listData}
                    extraData={listData}
                    keyExtractor={(_, index) => index.toString()}
                    renderItem={({item, index}) => (
                        <View style={styles.containtItem}>
                          <Text style={styles.txtTast}>{item}</Text>
                        </View>
                    )}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={() => (
                        <View style={screenStyles.flexCenter}>
                            <Text>{`Search something`}</Text>
                        </View>
                    )}
                />
            </View>
        )
  }

  return (
    <SafeAreaView style={screenStyles.flexCenter}>
      <HeaderApp title={'Country list'} />
      <View style={styles.containtStyle}>
        {renderInput}
        {renderListTodo()}
      </View>
      <Toast ref={toastRef} position={'center'} />
    </SafeAreaView>
  )
}

export default CountryListScreen

const styles = StyleSheet.create({
    containtStyle: {
        flex: 1,
        width: deviceWidth,
        marginTop: 16,
    },
    containtInput: {
        width: deviceWidth - 30,
        alignSelf: 'center',
        marginVertical: 10,
        borderWidth: 1,
        borderRadius: 8,
    },
    inputContainStyle: {
        padding: 0, borderBottomWidth: 0
    },
    containList: {
      paddingHorizontal: 15,
      marginTop: 5,
      flex: 1,
    },
    txtAdd: {
        fontSize: 18,
        color: '#000000',
        fontWeight: 'bold',
    },
    viewItem: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        height: 30,
    },
    containtItem: {
        height: 50,
        width: deviceWidth,
        borderBottomWidth: 1,
        justifyContent: 'center',
        paddingLeft: 15,
    },
    txtTast: {
        fontSize: 14,
        color: '#000000',
    },
})