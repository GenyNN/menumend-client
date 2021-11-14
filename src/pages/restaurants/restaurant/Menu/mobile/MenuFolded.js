import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Text } from 'react-native'

import MenuHeader from './MenuHeader'
import Touchable from 'Touchable'
import { moderateScale } from 'scale'

const styles = StyleSheet.create({
  container: {
    position: 'fixed',
    bottom: 0,
    width: '100%',
    minHeight: moderateScale(60),
  },
  arrow: {
    height: '6px',
    width: '6px',
    borderBottomWidth: '2px',
    borderLeftWidth: '2px',
    borderColor: '#53A36A',
    transform: [{ rotate: '135deg' }],
  },
})


class MenuFolded extends React.Component {

  static propTypes = {
    handleOpen: PropTypes.func,
  }

  render() {
    return (
      <Touchable className="mobileMenuBar" onPress={this.props.handleOpen}>
        <View style={styles.container}>
          <MenuHeader arrowStyle={styles.arrow} />
        </View>
      </Touchable>
    )
  }

}

export default MenuFolded
