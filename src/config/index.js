import { Dimensions } from "react-native";

const {width, height} = Dimensions.get('window');

export const deviceWidth = width;
export const deviceHeight = height;
export const showToast = (toastEl, message, duration = 1000) => {
  if (toastEl.current) {
    toastEl.current.show(message, duration);
  }
};
