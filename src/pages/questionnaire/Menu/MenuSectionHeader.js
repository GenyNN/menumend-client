import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Text } from 'react-native'

import { moderateScale, pickStyle } from 'scale'


const commonStyle = {
  container: {
  },
  header: {
  },
}
const desktopStyle = {
  ...commonStyle,
  container: {
  },
  header: {
    fontFamily: '"Source Sans Pro", sans-serif',
    marginTop: 43,
    marginBottom: 32,
    fontSize: 16,
    lineHeight: 20,
  },
}
const mobileStyle = {
  ...commonStyle,
  container: {
  },
  header: {
    fontFamily: '"Source Sans Pro", sans-serif',
    fontSize: moderateScale(16),
    lineHeight: moderateScale(20),
    marginTop: moderateScale(32),
    marginBottom: moderateScale(4),
  },
}
const styles = StyleSheet.create(pickStyle(mobileStyle, desktopStyle))


class MenuSectionHeader extends React.Component {

  static propTypes = {
    children: PropTypes.node,
    name: PropTypes.string,
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>
          {this.props.name}
        </Text>
        {this.props.children}
      </View>
    )
  }

}

export default MenuSectionHeader
