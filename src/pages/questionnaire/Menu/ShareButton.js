import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Image } from 'react-native'

import Touchable from 'Touchable'
import { pickStyle } from 'scale'
import ShareImage from 'pages/restaurants/img/share.png'


const desktopStyle = StyleSheet.create({
  container: {
    height: 20,
  },
  image: {
    display: 'none',
    width: 22,
    height: 20,
  },
})
const mobileStyle = StyleSheet.create({
  container: {
    height: 15,
  },
  image: {
    display: 'none',
    width: 16,
    height: 15,
  },
})
const styles = StyleSheet.create(pickStyle(mobileStyle, desktopStyle))


class MenuShareButton extends React.Component {

  static propTypes = {
    onPress: PropTypes.func,
  }

  render() {
    return (
      <Touchable onPress={this.props.onPress}>
        <View style={styles.container} >
          <Image style={styles.image} resizeMode="contain" source={ShareImage} />
        </View>
      </Touchable>
    )
  }

}

export default MenuShareButton
