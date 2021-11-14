import React from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types';

const mark = {
  width: '32px',
  height: '2px',
  marginLeft: '2px',
  marginRight: '2px',
}

const styles = StyleSheet.create({
  active: {
    ...mark,
    backgroundColor: '#DCBF76'
  },
  default: {
    ...mark,
    backgroundColor: '#E5EBEF'
  }
})

class Mark extends React.Component {
  static propTypes = {
    isActive: PropTypes.bool
  }

  render() {
    return (
      <View style={styles.mark}>
        {this.props.isActive && <View style={styles.active}/>}
        {!this.props.isActive && <View style={styles.default}/>}
      </View>
    )
  }

}

export default Mark
