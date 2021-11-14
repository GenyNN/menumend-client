import React from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'

import Touchable from 'Touchable'

const styles = {
  container: {
    height: '56px',
    width: '115px',
    borderRadius: '33px',
    backgroundColor: '#FFFFFF',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: '15px',
    paddingBottom: '15px',
    marginRight: '8px',
  },
  text: {
    color: '#000000',
    fontFamily: '"Source Sans Pro", sans-serif',
    fontSize: '20px',
    fontWeight: '600',
    lineHeight: '30px',
  },
}


class SignInButton extends React.Component {

  static propTypes = {
    onPress: PropTypes.func,
  }

  render() {
    return (
      <Touchable onPress={this.props.onPress}>
        <View style={styles.container} >
          <Text style={styles.text}>
            Sign In
          </Text>
        </View>
      </Touchable>
    )
  }

}


import { connect } from 'react-redux'

const mapStateToProps = null
const mapDispatchToProps = null

export const StartOverButtonContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignInButton)
export default StartOverButtonContainer
