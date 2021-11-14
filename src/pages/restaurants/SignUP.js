import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, View, Image } from 'react-native'

import Touchable from 'Touchable'
import { sans, serif } from 'fonts'
import { pickStyle } from 'scale'

const commonStyle = {
  container: {
    marginTop: -224,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    zIndex: 10,
  },
  wrapper: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '620px',
    height: '457px',
    shadowColor: '#608FAB',
    shadowRadius: 30,
    shadowOpacity: 0.4,
    backgroundColor: '#fff',
    borderRadius: 10,
    zIndex: 10,
  },
  header: {
    ...serif({
      fontSize: 36,
    }),
    marginTop: 80,
    textAlign: 'center',
    width: '100%',
  },
  text: {
    ...sans({
      fontSize: 24,
      fontWeight: '300',
    }),
    marginTop: 32,
    width: 470,
    textAlign: 'center',
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 50,
    width: 212,
    height: 66,
    borderRadius: 30,
    backgroundColor: '#DCBF76',
    zIndex: 5,
  },

  footerButtonText: {
    ...sans({
      fontSize: 24,
      fontWeight: '600',
      color: 'white',
    }),
    marginTop: 15,
    textAlign: 'center',
  },

}

const desktopStyle = {
  ...commonStyle,
}

const mobileStyle = {
  ...commonStyle,
}

const styles = StyleSheet.create(pickStyle(mobileStyle, desktopStyle))


class SignUP extends React.PureComponent {
  static propTypes = {
    auth: PropTypes.string,
    onSignUp: PropTypes.func,
  }

  render() {
    const isAuthenticated = this.props.auth.length !== 0
    if (isAuthenticated) {
      return null
    }
    return (
      <View style={styles.container} >
        <View style={styles.wrapper}>
          <Text style={styles.header}>Sign Up</Text>
          <Text style={styles.text}>
            Sign up to save recommended dishes and restaurants to access them later.
            Once we launch the app,  you will be able to log in to your account with the app too.
          </Text>
          <Touchable onPress={this.props.onSignUp}>
            <View style={styles.buttonWrapper}>
              <Text style={styles.footerButtonText}>
                Sign up
              </Text>
            </View>
          </Touchable>
        </View>
      </View>
    )
  }

}

import { connect } from 'react-redux'
import { selectSignUp } from './auth/actions/popup'

const mapStateToProps = (state) => ({
  auth: state.auth.firstName,
})
const mapDispatchToProps = {
  onSignUp: selectSignUp,
}

export const SignUPContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignUP)
export default SignUPContainer
