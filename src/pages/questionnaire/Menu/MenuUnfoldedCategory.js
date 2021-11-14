import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Image, View, Text } from 'react-native'

import Touchable from 'Touchable'
import { moderateScale, pickStyle } from 'scale'


const commonStyle = {
  active: {
    color: 'black',
  },
  inactive: {
    color: '#A8AEB1',
  },
}
const desktopStyle = ({
  ...commonStyle,
  text: {
    fontFamily: '"Source Serif Pro", serif',
    fontSize: '24px',
    fontWeight: '600',
    lineHeight: '33px',
    height: 30,
  },
})
const mobileStyle = ({
  ...commonStyle,
  text: {
    fontFamily: '"Source Serif Pro", serif',
    fontWeight: '600',
    fontSize: moderateScale(20),
    lineHeight: moderateScale(25),
  },
})
const styles = StyleSheet.create(pickStyle(mobileStyle, desktopStyle))


class MenuUnfoldedCategory extends React.Component {

  static propTypes = {
    index: PropTypes.number.isRequired,
    onPress: PropTypes.func.isRequired,
    children: PropTypes.node,
    disabled: PropTypes.bool,
    style: PropTypes.any,
  }

  constructor(props) {
    super(props)
    this.handlePress = () => {
      if (this.props.onPress) {
        this.props.onPress(this.props.index)
      }
    }
  }

  render() {
    const stateStyle = this.props.disabled ? styles.inactive : styles.active
    return (
      <Touchable onPress={this.handlePress}>
        <View style={this.props.style}>
          <Text style={[styles.text, stateStyle]}>
            {this.props.children}
          </Text>
        </View>
      </Touchable>
    )
  }
}

export default MenuUnfoldedCategory
