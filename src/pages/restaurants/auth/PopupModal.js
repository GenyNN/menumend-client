import React from 'react'
import PropTypes from 'prop-types'
<<<<<<< HEAD
import { StyleSheet, View, Text, Linking } from 'react-native'

import { sans } from 'fonts'
=======
import { StyleSheet, View, Text, Linking, Animated, TextInput } from 'react-native'
>>>>>>> feature/398/email_sign_up
import CloseButton from '../restaurant/Menu/CloseButton'
import { moderateScale, pickStyle } from 'scale'
import FaceBookButton from './FaceBookButton'
import EmailField from './EmailField'
import PasswordField from './PasswordField'
import EmailButton from './EmailButton'
import TermsAndConditionsAgree from './TermsAndConditionsAgree'
import validate from './validate'

const commonStyle = {
  modal: {
    position: 'fixed',
    zIndex: 1000,
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    overflow: 'auto',
    backgroundColor: 'rgba(115,136,147,0.2)',
  },
  validationHeaderWrapper: {
    height: 80,
    width: 560,
    marginBottom: -24,
    flexDirection: 'column-reverse',
    /* height: 80,
    width: 560,
    marginBottom: -24,
    flexDirection: 'column-reverse', */
  },
  validationHeader: {
    borderRadius: '10px',
    backgroundColor: '#FF6F45',
    boxShadow: '0 0 30px 0 rgba(96,143,171,0.2)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  validationHeaderText: {
    fontFamily: 'Source Sans Pro',
    fontSize: 18,
    color: '#FFFFFF',
    marginTop: 16,
  },
  modalContentBoxWrapper: {
    marginTop: '5%',
    marginRight: 'auto',
    marginBottom: '5%',
    marginLeft: 'auto',
  },

  modalContentBox: {
    padding: 40,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    boxShadow: '0 0 30px 0 rgba(96,143,171,0.2)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  closeContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  singTextContainer: {
    marginTop: 35,
  },
  emailContainer: {
    marginTop: '60px',
  },
  passwordContainer: {
    marginTop: '24px',
  },
  termsAgreeContainer: {
    marginTop: '16px',
  },
  buttonsContainer: {
  },
  emailBtnContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
  },

  fbContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  text: {
<<<<<<< HEAD
    ...sans({
      color: '#000000',
      fontWeight: 'bold',
    }),
=======
    color: '#000000',
    fontFamily: '"Source Serif Pro"',
>>>>>>> feature/398/email_sign_up
    textAlign: 'center',
    fontSize: '40px',
  },
}
const desktopStyle = {
  ...commonStyle,
  modalContentBox: {
    ...commonStyle.modalContentBox,
    width: 560,
    height: 657,
  },
  text: {
    ...commonStyle.text,
    marginTop: -2.5,
    minWidth: 106,
    fontSize: 40,
    lineHeight: 31,
  },
}
const mobileStyle = {
  ...commonStyle,
  modalContentBox: {
    ...commonStyle.modalContentBox,
    width: '100%',
    bottom: 0,
    opacity: 1,
    position: 'absolute',
    height: '95%',
    marginBottom: 0,
    marginTop: 0,
    marginLeft: 0,
    marginRight: 0,
  },
  text: {
    ...commonStyle.text,
    fontSize: moderateScale(24),
    lineHeight: moderateScale(20),
  },
}
const styles = StyleSheet.create(pickStyle(mobileStyle, desktopStyle))

class PopupModal extends React.Component {

    static propTypes = {
      actionName: PropTypes.string,
      unSelect: PropTypes.func,
      authenticated: PropTypes.string,
      requestEmailSingIn: PropTypes.func,
      onErrorsClear: PropTypes.func,
      selectToggleAgree: PropTypes.func,
      agree: PropTypes.bool,
      onErrorEmail: PropTypes.func,
      onErrorPassword: PropTypes.func,
      onErrorAgree: PropTypes.func,
      emailError: PropTypes.bool,
      requestEmailSingUp: PropTypes.func,
      errorMessage: PropTypes.func,
    }

    constructor(props) {
      super(props)
      this.handleClosePress = this.handleClosePress.bind(this)
      this.state = {
        email: '',
        password: '',
        expanded: false,
        animationOpacity: new Animated.Value(0),
        animationHeight: new Animated.Value(0),
        maxHeight: 80,
        minHeight: 0,
      }
    }

    handleClosePress() {

      this.props.onErrorsClear()
      this.setState({
        email: '', password: '', expanded: false, animationOpacity: new Animated.Value(0), animationHeight: new Animated.Value(0),
      })
      this.props.unSelect()

    }

    setEmail(email) {
      this.setState({ email })
      this.props.onErrorsClear()
      const emailError = validate('email', email)
      if (!emailError) {
        if (this.state.expanded) {
          this.toggleErrorHeader()
        }
      }
    }

    onAgreeTogled(e) {
      if (e.key === 'Enter') {
        // this.props.onEnter()
        this.emailOnPress()
      } else {
        this.props.selectToggleAgree()
        this.props.onErrorsClear()
        if (this.state.expanded) {
          this.toggleErrorHeader()
        }
      }
    }


    setPassword(password) {
      this.setState({ password })
      this.props.onErrorsClear()
      const passwordError = validate('password', password)
      if (!passwordError) {
        if (this.state.expanded) {
          this.toggleErrorHeader()
        }
      }
    }

    onCheckErrors(authType) {
      const emailError = validate('email', this.state.email)
      const passwordError = validate('password', this.state.password)
      let checkMarkSelected = true
      if (this.props.actionName === 'SIGN_UP') {
        if (!this.props.agree) { checkMarkSelected = false }
      }


      if (emailError && authType === 'EMAIL') {
        this.props.onErrorEmail(emailError)
        if (!this.state.expanded) { this.toggleErrorHeader() }
        return true
      }
      if (authType === 'EMAIL_DUP' || authType === 'EMAIL_PASS_WRONG') {
        if (!this.state.expanded) { this.toggleErrorHeader() }
        return true
      }
      if (passwordError && authType === 'EMAIL') {
        this.props.onErrorPassword(passwordError)
        if (!this.state.expanded) { this.toggleErrorHeader() }
        return true
      }

      if (!checkMarkSelected) {
        this.props.onErrorAgree('Please agree in order to use Menumend')
        if (!this.state.expanded) { this.toggleErrorHeader() }
        return true
      }
      return false
    }

    toggleErrorHeader() {
      let initialValue = this.state.expanded ? this.state.maxHeight + this.state.minHeight : this.state.minHeight,
        finalValue = this.state.expanded ? this.state.minHeight : this.state.maxHeight + this.state.minHeight

      this.setState({
        expanded: !this.state.expanded,
      })

      this.state.animationHeight.setValue(initialValue)


      Animated.parallel([
        Animated.timing( // Animate over time
          this.state.animationOpacity,
          {
            toValue: 1, // Animate to opacity: 1 (opaque)
            duration: 500, // Make it take a while
          },
        ),
        Animated.timing(
          this.state.animationHeight,
          {
            toValue: finalValue,
            duration: 500,
          },
        ),
      ]).start()
    }

    checkErrorsHeader(authType) {
      const res = this.onCheckErrors(authType)
      if (res) { return true }
      if (this.state.expanded) { this.toggleErrorHeader() }
      this.props.onErrorsClear()
      return false
    }

    emailOnPress() {
      if (this.checkErrorsHeader('EMAIL')) { return }
      const selectedAction = this.props.actionName
      if (selectedAction === 'SIGN_IN') {
        this.props.requestEmailSingIn(this.state.email, this.state.password, () => { this.checkErrorsHeader('EMAIL_PASS_WRONG') })
        if (this.props.emailError) {
          this.checkErrorsHeader('EMAIL_PASS_WRONG')
        }
      }

      if (selectedAction === 'SIGN_UP') {
        this.props.requestEmailSingUp(this.state.email, this.state.password, () => { this.checkErrorsHeader('EMAIL_DUP') })
      }
    }

    render() {
      const selectedAction = this.props.actionName
      const auth = this.props.authenticated

      const isAuthenticated = !!(auth && auth.length > 0)

      let displayAction = ''
      if (selectedAction === 'SIGN_UP' || selectedAction === 'SIGN_IN') {

        if (selectedAction === 'SIGN_UP') displayAction = 'Sign Up'
        else displayAction = 'Sign in'
      }
      const isActionSelected = !!(selectedAction && selectedAction.length > 0)
      if (isActionSelected && !isAuthenticated) {
        return (
          <View style={styles.modal}>
            <View style={styles.modalContentBoxWrapper}>
              <View style={styles.validationHeaderWrapper}>
                <Animated.View style={[styles.validationHeader, { height: this.state.animationHeight, opacity: this.state.animationOpacity }]}>
                  <Text style={styles.validationHeaderText}>{this.props.errorMessage}</Text>
                </Animated.View>
              </View>
              <View style={styles.modalContentBox}>
                <View>
                  <View style={styles.closeContainer}>
                    <CloseButton onPress={this.handleClosePress} />
                  </View>
                  <View style={styles.singTextContainer}>
                    <Text style={styles.text}>
                      {displayAction}
                    </Text>
                  </View>
                  <View style={styles.emailContainer}>
                    <EmailField email={this.state.email} setEmail={(email) => this.setEmail(email)} onEnter={() => this.emailOnPress()} />
                  </View>

                  <View style={styles.passwordContainer}>
                    <PasswordField email={this.state.password} setPassword={(password) => this.setPassword(password)} onEnter={() => this.emailOnPress()} />
                  </View>

                  <View style={[styles.termsAgreeContainer, selectedAction === 'SIGN_UP' ? { display: 'block' } : { display: 'none' }]}>
                    <TermsAndConditionsAgree onEnter={(e) => { this.onAgreeTogled(e) }} />
                  </View>
                </View>
                <View style={styles.buttonsContainer}>
                  <View style={styles.emailBtnContainer}>
                    <EmailButton selectedAction={selectedAction} onPress={() => this.emailOnPress()} />
                  </View>
                  <View style={styles.fbContainer}>
                    <FaceBookButton selectedAction={selectedAction} onCheckErrorsHeader={() => this.checkErrorsHeader('FB')} />
                  </View>
                </View>
              </View>
            </View>
          </View>
        )
      }
      return null
    }

}

import { connect } from 'react-redux'
import { unSelect, onErrorEmail, onErrorPassword, onErrorAgree, onErrorsClear, selectToggleAgree } from '../auth/actions/popup'
import { requestEmailSingUp, requestEmailSingIn } from './sagas/auth'

const mapStateToProps = (state) => ({
  actionName: state.auth.actionName,
  authenticated: state.auth.token,
  agree: state.auth.agree,
  errorMessage: state.auth.errorMessage,
  emailError: state.auth.emailError,
  passwordError: state.auth.passwordError,
  agreeError: state.auth.agreeError,
})
const mapDispatchToProps = {
  unSelect,
  requestEmailSingUp,
  requestEmailSingIn,
  onErrorEmail,
  onErrorPassword,
  onErrorAgree,
  onErrorsClear,
  selectToggleAgree,
}


export const PopupModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PopupModal)
export default PopupModalContainer
