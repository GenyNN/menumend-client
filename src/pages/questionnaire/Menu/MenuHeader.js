import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Text } from 'react-native'

import Touchable from 'Touchable'
import { moderateScale } from 'scale'
import CloseButton from '../CloseButton'
import ShareButton from '../ShareButton'


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 32,
    paddingRight: 24,
  },
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  spacer: {
    width: 24,
  },
  text: {
    fontFamily: '"Source Serif Pro", serif',
    fontWeight: '600',
    fontSize: moderateScale(18),
    lineHeight: moderateScale(25),
  },
})


class MenuHeader extends React.Component {

  static propTypes = {
    handleClose: PropTypes.func,
    handleShare: PropTypes.func,
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          Menu
        </Text>
        <View>
          <View style={styles.wrapper}>
            <ShareButton onPress={this.props.handleShare} />
            <View style={styles.spacer} />
            <CloseButton onPress={this.props.handleClose} />
          </View>
        </View>
      </View>
    )
  }

}

export default MenuHeader
