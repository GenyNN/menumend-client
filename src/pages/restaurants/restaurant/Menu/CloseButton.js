import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Image } from 'react-native'

import Touchable from 'Touchable'
import { pickStyle } from 'scale'
import CloseImage from 'pages/restaurants/img/close.png'


const desktopStyle = StyleSheet.create({
  container: {
    height: 19,
  },
  image: {
    width: 19,
    height: 19,
  },
})
const mobileStyle = StyleSheet.create({
  container: {
    height: 12,
  },
  image: {
    width: 12,
    height: 12,
  },
})
const styles = StyleSheet.create(pickStyle(mobileStyle, desktopStyle))


class MenuCloseButton extends React.Component {

  static propTypes = {
    onPress: PropTypes.func.isRequired,
  }

  render() {
    return (
      <Touchable onPress={this.props.onPress}>
        <View style={styles.container} >
          <Image style={styles.image} resizeMode="contain" source={CloseImage} />
        </View>
      </Touchable>
    )
  }

}

export default MenuCloseButton
