import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Text } from 'react-native'

import Touchable from 'Touchable'
import { moderateScale } from 'scale'

const styles = {
  container: {
    height: 54,
    width: '100%',

    borderTopLeftRadius: '4px',
    borderTopRightRadius: '4px',
    backgroundColor: '#FFFFFF',
    boxShadow: '0 0 30px 0 rgba(96,143,171,0.2)',

    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 24,
    paddingRight: 24,
  },
  arrow: {
    height: '6px',
    width: '6px',
    borderBottomWidth: '2px',
    borderLeftWidth: '2px',
    borderColor: '#53A36A',
    transform: [{ rotate: '135deg' }],
  },
  text: {
    textAlign: 'center',
    fontFamily: '"Source Serif Pro", serif',
    fontWeight: '600',
    fontSize: moderateScale(14),
    lineHeight: moderateScale(20),
  },
}


class MenuHeader extends React.Component {

  static propTypes = {
    arrowStyle: PropTypes.any,
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={this.props.arrowStyle} />
        <Text style={styles.text}>
          See Full Menu
        </Text>
        <View style={this.props.arrowStyle} />
      </View>
    )
  }

}

export default MenuHeader
