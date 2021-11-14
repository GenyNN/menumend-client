import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Text } from 'react-native'

import { sans } from 'fonts'


const desktopStyle = {
  distance: {
    ...sans({
      fontSize: 18,
      fontWeight: '600',
      lineHeight: 23,
      color: 'white',
    }),
    textAlign: 'center',
    width: 53,
    height: 23,
  },
}
const styles = StyleSheet.create(desktopStyle)


class CuisineDistance extends React.PureComponent {
  static propTypes = {
    value: PropTypes.number,
    style: PropTypes.any,
  }

  render() {
    let { value } = this.props
    if (!value) {
      return null
    }
    if (!Number.isInteger(value)) {
      value = value.toFixed(1)
    }
    return (
      <Text style={[styles.distance, this.props.style]}>{`${value} mi`}</Text>
    )
  }
}

export default CuisineDistance
