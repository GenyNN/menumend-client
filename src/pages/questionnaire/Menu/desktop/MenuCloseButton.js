import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Image } from 'react-native'

import Touchable from 'Touchable'
import CloseImage from '../../img/close.png'


const styles = StyleSheet.create({
  container: {
  },
  arrow: {
    height: '12px',
    width: '12px',
    borderBottomWidth: '4px',
    borderLeftWidth: '4px',
    borderColor: 'black',
    transform: [{ rotate: '315deg' }],
  },
  closeIcon: {
    width: '20px'
  },
})


class MenuCloseButton extends React.PureComponent {

  static propTypes = {
    onPress: PropTypes.func.isRequired,
  }

  render() {
    return (
      <Touchable onPress={this.props.onPress}>
        <View style={styles.container} >
          <Image style={styles.closeIcon} resizeMode="contain" source={CloseImage} />
        </View>
      </Touchable>
    )
  }

}

export default MenuCloseButton
