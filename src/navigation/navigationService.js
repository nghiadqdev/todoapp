import {StackActions} from '@react-navigation/native'
import * as React from 'react'

export const navigationRef = React.createRef()

export function navigate(name, params) {
  navigationRef.current?.navigate(name, params)
}

export function navigationGoBack() {
  navigationRef.current?.goBack()
}
