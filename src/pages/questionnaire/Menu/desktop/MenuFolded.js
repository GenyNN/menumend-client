import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet, View, Text, TextInput,
} from 'react-native'

import Touchable from 'Touchable'


const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    height: '88px',
    width: '800px',

    borderRadius: '10px',
    backgroundColor: '#FFFFFF',
    boxShadow: '0 0 30px 0 rgba(96,143,171,0.2)',

    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: '42px',
    paddingRight: '42px',
  },
  text: {
    fontFamily: '"Source Serif Pro", serif',
    fontSize: '24px',
    fontWeight: '600',
    lineHeight: '30px',
    textAlign: 'center',
  },
  arrow: {
    height: '12px',
    width: '12px',
    borderBottomWidth: '4px',
    borderLeftWidth: '4px',
    borderColor: 'black',
    transform: [{ rotate: '315deg' }],
  },
})


class MenuFolded extends React.Component {

  static propTypes = {
    handleOpen: PropTypes.func,
  }

  render() {
    /* return null */
    return (
      <Touchable onPress={this.props.handleOpen}>
        <View style={styles.container}>
          <Text style={styles.text}>
            See Full Menu
          </Text>
          <View style={styles.arrow} />
        </View>
      </Touchable>
    )
  }

}

export default MenuFolded
