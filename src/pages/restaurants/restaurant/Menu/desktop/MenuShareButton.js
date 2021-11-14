import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Image } from 'react-native'

import Touchable from 'Touchable'
import ShareImage from 'pages/restaurants/img/share.png'


const styles = StyleSheet.create({
  container: {
  },
  shareButton: {
    height: '20px',
    width: '22px',
    resizeMode: 'contain'
  },
})


class MenuShareButton extends React.PureComponent {


  render() {
    return (
      <Touchable onPress={() => this.props.onShare()}>
        <View style={styles.container} >
          <Image style={styles.shareButton} source={ShareImage} />
        </View>
      </Touchable>
    )
  }

}

export default MenuShareButton
