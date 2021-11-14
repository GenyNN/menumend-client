import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Text, Linking } from 'react-native'
import { moderateScale, pickStyle } from 'scale'
import Touchable from 'Touchable'

import Svg, {
  G,
  Path,
} from 'svgs'

const commonStyle = {
  container: {
    display: 'flex',
    flexDirection: 'row',
  },
  contentCheckBoxContainer: {
    height: '40px',
    width: '40px',
    borderRadius: '10px',
    backgroundColor: 'rgba(168,174,177,0.1)',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#FF6F45',
    borderStyle: 'solid',
  },

  contentTextBoxContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: '24px',
    outline: 'none',
  },

  contentTextAgree: {
    fontFamily: 'Source Sans Pro',
    fontSize: 18,
    outline: 'none',
  },

  contentTextTCandPP: {
    fontSize: 18,
    marginLeft: '5px',
<<<<<<< HEAD
    textDecorationLine: 'underline',
=======
    fontFamily: 'Source Sans Pro',
    outline: 'none',
>>>>>>> feature/398/email_sign_up
  },
  contentTextAnd: {
    fontSize: 18,
    fontFamily: 'Source Sans Pro',
    marginLeft: '5px',
    outline: 'none',
  },
  text: {

  },
  checkBox: {
  },
  checkBoxLine1: {

    boxSizing: 'border-box',
    height: '8px',
    width: '8px',
    borderStyle: 'solid',
    borderWidth: '3px',
    borderColor: '#000000',
  },
  checkBoxLine2: {

    boxSizing: 'border-box',
    height: '5.09px',
    width: '5.09px',
    // border: '3px solid #000000',
    borderStyle: 'solid',
    borderWidth: '3px',
    borderColor: '#000000',
  },
  image: {
  },
}
const desktopStyle = {
  ...commonStyle,
  container: {
    ...commonStyle.container,
  },
  text: {
    ...commonStyle.text,
  },
}
const mobileStyle = {
  ...commonStyle,
  container: {
  },
  text: {
    ...commonStyle.text,
  },
  image: {
    ...commonStyle.image,
  },
}
const styles = StyleSheet.create(pickStyle(mobileStyle, desktopStyle))

class TermsAndConditionsAgree extends React.Component {

    static propTypes = {
      agree: PropTypes.bool,
      selectToggleAgree: PropTypes.func,
      onEnter: PropTypes.func,
      agreeError: PropTypes.string,
    }

    render() {

      return (
        <View style={styles.container}>
          <Touchable onPress={(e) => { this.props.onEnter(e) }}>
            <View style={[styles.contentCheckBoxContainer, this.props.agreeError === true ? { borderWidth: 2 } : { borderWidth: 0 }]}>
              <View style={[styles.checkBox, this.props.agree === true ? { display: 'block' } : { display: 'none' }]}>
                <Svg width="17px" height="12px" viewBox="0 0 17 12">
                  <G id="Main" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" strokeLinecap="round">
                    <G id="Sign-up" transform="translate(-492.000000, -499.000000)" stroke="#000000" strokeWidth="3">
                      <G id="pop-up" transform="translate(440.000000, 100.000000)">
                        <G id="terms-of-service" transform="translate(40.000000, 384.000000)">
                          <G id="checkmark" transform="translate(20.500000, 21.000000) rotate(-270.000000) translate(-20.500000, -21.000000) translate(16.500000, 14.500000)">
                            <Path d="M7.78314725,7.77320194 L2.69752295,12.8588262" id="Line-2-Copy" />
                            <Path d="M0,0 L7.5,7.5" id="Line-2-Copy-2" />
                          </G>
                        </G>
                      </G>
                    </G>
                  </G>
                </Svg>
              </View>

            </View>
          </Touchable>

          <View style={styles.contentTextBoxContainer} >
            <Text style={styles.contentTextAgree} >
                      I agree to the
            </Text>
            <Text style={styles.contentTextTCandPP} href="/tc.html" accessibilityRole="link">
                      terms of service
            </Text>
            <Text style={styles.contentTextAnd}>
                  and
            </Text>
            <Text style={styles.contentTextTCandPP} href="/pp.html" accessibilityRole="link">
                  privacy policy
            </Text>
          </View>
        </View>
      )
    }
}


import { connect } from 'react-redux'

const mapStateToProps = (state) => ({
  agree: state.auth.agree,
  agreeError: state.auth.agreeError,
})
const mapDispatchToProps = {
}

export const TermsAndConditionsAgreeContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(TermsAndConditionsAgree)
export default TermsAndConditionsAgreeContainer
