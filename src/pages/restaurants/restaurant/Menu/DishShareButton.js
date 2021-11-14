import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Image } from 'react-native'

import Touchable from 'Touchable'
import { pickStyle } from 'scale'
import ShareInactiveImage from '../../img/share_inactive.png'


const commonStyle = {
  container: {
    height: 14,
    width: 14,
  },
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 14,
    height: 14,
  },
}
const desktopStyle = {
  ...commonStyle,
}
const mobileStyle = {
  ...commonStyle,
}
const styles = StyleSheet.create(pickStyle(mobileStyle, desktopStyle))


class DishShareButton extends React.Component {

  static propTypes = {
  }


  render() {
    return (
      <Touchable onPress={this.props.onShare.toggleModal}>
        <View style={styles.container}>
          <View style={styles.wrapper}>
            <Image style={styles.image} resizeMode="contain" source={ShareInactiveImage} />
          </View>
        </View>
      </Touchable>
    )
  }
}

export default DishShareButton
