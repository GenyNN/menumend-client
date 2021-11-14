import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Text } from 'react-native'

import Touchable from 'Touchable'
import { moderateScale } from 'scale'
import CloseButton from '../CloseButton'
import ShareButton from '../ShareButton'
import MenuUnfoldedCategoryList from '../MenuUnfoldedCategoryList'


const styles = StyleSheet.create({
  container: {
    borderColor: '#E5EBEF',
    borderBottomWidth: 1,
    backgroundColor: '#FFFFFF',

    paddingLeft: 24,
    paddingRight: 24,
    height: 'auto',
  },
  wrapper: {
    position: 'absolute',
    minHeight: 30,
    top: 20,
    right: 24,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  spacer: {
    width: 24,
  },
})


class MenuHeader extends React.Component {

  static propTypes = {
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    handleClose: PropTypes.func,
    handleShare: PropTypes.func,
  }

  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <MenuUnfoldedCategoryList />
        <View style={styles.wrapper}>
          <ShareButton onPress={this.props.handleShare} />
          <View style={styles.spacer} />
          <CloseButton onPress={this.props.handleClose} />
        </View>
      </View>
    )
  }

}

export default MenuHeader
