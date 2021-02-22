import {Platform, StatusBar, Dimensions} from 'react-native';

const isAndroid = Platform.OS === 'android',
  deviceHeight = Dimensions.get('window').height,
  deviceWidth = Dimensions.get('window').width,
  Utility = {
    getStatusBarHeight() {
      if (isAndroid) {
        return 0;
      }

      if (deviceHeight === Utility.getiPhoneXDimensions().height) {
        return 44;
      }
      return 20;
    },

    getiPhoneXDimensions() {
      return {height: 812, width: 375};
    },

    getiPhone5sDimensions() {
      return {height: 568, width: 320};
    },

    getiPhone6sDimensions() {
      return {height: 667, width: 375};
    },
  };

export default Utility;
