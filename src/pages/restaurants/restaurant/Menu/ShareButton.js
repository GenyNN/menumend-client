import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Image } from 'react-native'

import Touchable from 'Touchable'
import { pickStyle } from 'scale'
import ShareImage from '../../img/share.png'


const desktopStyle = StyleSheet.create({
  shareContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 20,
  },
  shareImage: {
    flex: 1,
    display: 'block',
    margin: 'auto',
    width: 22,
    height: 20,
  },
})
const mobileStyle = StyleSheet.create({
  shareContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 15,
  },
  shareImage: {
    flex: 1,
    display: 'block',
    margin: 'auto',
    marginTop: 20,
    width: 16,
    height: 15,
  },
})
const styles = StyleSheet.create(pickStyle(mobileStyle, desktopStyle))


class ShareButton extends React.Component {

  static propTypes = {
    onPress: PropTypes.func,
    copyLink: PropTypes.func,
    shareModalShown: PropTypes.bool,
    linkCopied: PropTypes.bool,
  }


  render() {
    return (
      <Touchable onPress={() => this.props.onPress()}>
        <View style={styles.shareContainer} >
          <Image style={styles.shareImage} resizeMode="contain" source={ShareImage} />
        </View>
      </Touchable>
    )
  }
}

export default ShareButton
