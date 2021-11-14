import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet, View, Text, TextInput,
} from 'react-native'

import Touchable from 'Touchable'
import MenuCloseButton from './MenuCloseButton'
import ShareButton from '../ShareButton'

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    right: 0,
    top: 20,
  },
  controlsWrapper: {
    height: 30,
  },
  controls: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  spacer: {
    width: 24,
  },
})


class MenuUnfoldedHeader extends React.Component {

  static propTypes = {
    handleShare: PropTypes.func,
    handleClose: PropTypes.func.isRequired,
  }

  render() {
    return (
      <View style={styles.header}>
        <View style={styles.controlsWrapper}>
          <View style={styles.controls}>
            <ShareButton onPress={this.props.handleShare} />
            <View style={styles.spacer} />
            <MenuCloseButton onPress={this.props.handleClose} />
          </View>
        </View>
      </View>
    )
  }
}
export default MenuUnfoldedHeader
