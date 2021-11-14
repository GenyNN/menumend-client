import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Text } from 'react-native'

import { sans } from 'fonts'


const desktopStyle = {
  container: {
    width: 136,
  },
  type: {
    ...sans({
      fontSize: 20,
      fontWeight: '300',
      lineHeight: 25,
      color: 'white',
    }),
    textAlign: 'center',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
}
const styles = StyleSheet.create(desktopStyle)


class CuisineType extends React.PureComponent {
  static propTypes = {
    id: PropTypes.string,
    values: PropTypes.array,
  }

  render() {
    const { id, values } = this.props
    const lines = values.map((item, index) => (
      <Text key={`cuisine-type-${id}-${index}`} style={styles.type}>{item}</Text>
    ))
    return values.length > 0 ? (
      <View style={styles.container}>
        {lines}
      </View>
    ) : null
  }
}

export default CuisineType
