import { Dimensions } from "react-native";
import {check, PERMISSIONS} from 'react-native-permissions';

const {width, height} = Dimensions.get('window');

export const deviceWidth = width;
export const deviceHeight = height;
export const showToast = (toastEl, message, duration = 1000) => {
  if (toastEl.current) {
    toastEl.current.show(message, duration);
  }
};
export const checkPermissionPhoto = async () => {
  return check(
    Platform.OS === 'ios'
      ? PERMISSIONS.IOS.PHOTO_LIBRARY
      : PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
  )
    .then(result => {
      return result;
    })
    .catch(error => {
      return error;
    });
};
