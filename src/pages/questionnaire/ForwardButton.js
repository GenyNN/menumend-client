import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import PropTypes from 'prop-types'

import Touchable from 'Touchable'

const styles = StyleSheet.create({
  container: {
    height: '56px',
    width: '115px',
    borderRadius: '33px',
    backgroundColor: '#DCBF76',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: '15px',
    paddingBottom: '15px',
    // marginTop: '70px',
  },
  text: {
    color: '#FFFFFF',
    fontFamily: '"Source Sans Pro", sans-serif',
    fontSize: '20px',
    fontWeight: '600',
    lineHeight: '30px',
  },
})

class ForwardButton extends React.Component {

  static propTypes = {
    onPress: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)

    this.handlePress = this.handlePress.bind(this)
  }

  handlePress() {
    this.props.onPress()
  }

  render() {
    return (
      <Touchable onPress={this.handlePress}>
        <View style={styles.container}>
          <Text style={styles.text}>Next</Text>
        </View>
      </Touchable>
    )
  }

}

export default ForwardButton
