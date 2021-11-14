import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, View } from 'react-native'
import SignUpButton from './SignUpButton'
import SignInButton from './SignInButton'
import { pickStyle } from 'scale'

const commonStyle = {
  container: {
    display: 'flex',
    flexDirection: 'row',
  },
}

const desktopStyle = StyleSheet.create({
  ...commonStyle,
})

const mobileStyle = StyleSheet.create({
  ...commonStyle,
})
const styles = StyleSheet.create(pickStyle(mobileStyle, desktopStyle))

class CheckIn extends React.PureComponent {

    static propTypes = {
      authenticated: PropTypes.string,
    }

    render() {
      const auth = this.props.authenticated
      if (auth) { return null }
      return (
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <View>
            <SignInButton />
          </View>
          <View>
            <SignUpButton />
          </View>
        </View>
      )
    }

}

import { connect } from 'react-redux'

const mapStateToProps = (state) => ({
  authenticated: state.auth.token,
})
const mapDispatchToProps = {
}

export const CheckInContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CheckIn)
export default CheckInContainer
