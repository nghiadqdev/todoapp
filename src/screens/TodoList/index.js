import { FlatList, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity,
    TouchableOpacityBase, View } from 'react-native'
import React, { useMemo, useRef, useState } from 'react'
import HeaderApp from '../../component/headerApp'
import screenStyles from '../../config/screenStyles'
import { deviceWidth, showToast } from '../../config'
import { Input } from 'react-native-elements'
import Toast from '../../component/Toast'

const TodoListScreen = ({navigation, route}) => {

  // state
  const toastRef = useRef(null)
  const [newTodo, setNewTodo] = useState('')
  const [listTodo, setListTodo] = useState({})

  //action
  const handleChangeText = (text) => {
      setNewTodo(text)
  }
  const handleAddNewTask = () => {
    let list = Object.keys(listTodo)
    if (newTodo !== '') {
        let params = {
            id: parseInt(list?.[list.length - 1] || 1) + 1,
            value: newTodo,
            isDone: false,
        }
        let temp = {...listTodo, [params.id]: params}
        setNewTodo('')
        setListTodo(temp)
    } else {
        showToast(toastRef, 'Value can not be null')
    }
  }
  const handleSelectTask = (item) => {
    if (item.id) {
        let status = item.isDone
        let temp = {...listTodo, [item.id]: {...item, isDone: !status}}
        setListTodo(temp)
    }
  }
  const handleDeleteTast = (item) => {
      let temp = {...listTodo}
      delete temp?.[item.id]
      setListTodo(temp)
  }

  //render
  const renderInput = useMemo(() => {
      return(
        <Input
            value={newTodo}
            onChangeText={handleChangeText}
            placeholder={'Search'}
            rightIcon={() => <Pressable onPress={handleAddNewTask}>
                <Text style={styles.txtAdd}>{'Add'}</Text>
            </Pressable>}
            renderErrorMessage={false}
            containerStyle={styles.containtInput}
            inputContainerStyle={styles.inputContainStyle}
        />
      )
  }, [newTodo])

  const renderListTodo = () => {
    let listTask = Object.values(listTodo)
    if (listTask.length > 0) {
        let numTask = listTask.filter((i) => !i.isDone).length
        let numList = listTask.length
        return(
            <View style={styles.containList}>
                <FlatList
                    data={listTask}
                    extraData={listTask}
                    keyExtractor={(_, index) => index.toString()}
                    renderItem={({item, index}) => renderItem(item, index)}
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={() => (
                        <View style={screenStyles.row}>
                            <Text style={styles.txtTitle}>{`There are `}</Text>
                            <Text style={[styles.txtTitle, {color: 'red'}]}>{numTask}</Text>
                            <Text style={styles.txtTitle}>{` tasks left out of ${numList} tasks`}</Text>
                        </View>
                    )}
                />
            </View>
        )
    } else {
        return (
            <View style={screenStyles.flexCenter}>
                <Text style={{color: 'black'}}>{`You don't have task now`}</Text>
            </View>
        )
    }
  }

  const renderRedNumber = (number) => <Text style={{color: 'red'}}>{number}</Text>

  const renderItem = (item, index) => {
    return (
        <TouchableOpacity onPress={() => handleSelectTask(item)} style={styles.containtItem}>
            <Text style={styles.txtDot}>{'.'}</Text>
            <Text style={[styles.txtTast, item.isDone && {textDecorationLine: 'line-through'}]}>{item?.value}</Text>
            <TouchableOpacity onPress={() => handleDeleteTast(item)}>
                <Text style={{color: 'black'}}>{'Delete'}</Text>
            </TouchableOpacity>
        </TouchableOpacity>
    )
  }

  return (
    <SafeAreaView style={screenStyles.flexCenter}>
      <HeaderApp title={'Todo list'} />
      <View style={styles.containtStyle}>
        {renderInput}
        {renderListTodo()}
      </View>
      <Toast ref={toastRef} position={'center'} />
    </SafeAreaView>
  )
}

export default TodoListScreen

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
        fontSize: 14,
        color: '#EF4638',
        fontWeight: 'bold',
    },
    viewItem: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        height: 30,
    },
    containtItem: {
        flexDirection: 'row',
        margin: 8,
        alignItems: 'center',
    },
    txtTast: {
        fontSize: 14,
        color: '#000000',
        flex: 1,
    },
    txtDot: {fontSize: 20, fontWeight: '800', marginRight:4},
    txtTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'black',
    },

})