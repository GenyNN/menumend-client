import {
  Platform, TouchableOpacity, TouchableWithoutFeedback,
} from 'react-native'


const Touchable = Platform.OS === 'web'
  ? TouchableWithoutFeedback
  : TouchableOpacity

export default Touchable
