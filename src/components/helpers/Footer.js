import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, View, Image } from 'react-native'

import { moderateScale, pickStyle } from 'scale'
import Touchable from 'Touchable'

import facebookPic from '../../../static/img/landing/facebook.png'
import twitterPic from '../../../static/img/landing/twitter.png'
import linkedinPic from '../../../static/img/landing/linkedin.png'
import instagramPic from '../../../static/img/landing/instagram.png'
import { sans, serif } from 'fonts'

const commonStyle = {
  footer: {
    width: '100%',
    height: 433,
    position: 'relative',
    backgroundColor: 'white',
  },

  footerLogined: {
    width: '100%',
    height: 200,
    position: 'relative',
    backgroundColor: 'white',
  },

  footerSocialBox: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#DCBF76',
    height: 433,
    zIndex: 3,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },

  footerLoginedSocialBox: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#DCBF76',
    height: 200,
    zIndex: 3,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },

  socialProviderWrapper: {
    width: '235px',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '21px',
    zIndex: 5,
    position: 'absolute',
    bottom: 98,
  },

  socialProvider: {
    height: '22px',
    width: '23px',
    resizeMode: 'contain',
    zIndex: 10,
  },
  tcAndPpContainer: {
    position: 'absolute',
    bottom: '40px',
    display: 'flex',
    flexDirection: 'row',
    width: '235px',
    justifyContent: 'space-between',
  },

  text: {
    color: '#FFFFFF',
    fontFamily: '"Source Sans Pro", sans-serif',
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 14,
  },
}

const desktopStyle = {
  ...commonStyle,
}

const mobileStyle = {
  ...commonStyle,
}

const styles = StyleSheet.create(pickStyle(mobileStyle, desktopStyle))


class Footer extends React.PureComponent {
    static propTypes = {
      isUserLogined: PropTypes.bool,
      children: PropTypes.node,
    }

    render() {
      const { isUserLogined } = this.props
      return (
        <View style={this.props.isUserLogined ? styles.footerLogined : styles.footer}>
          {this.props.children}

          <View style={this.props.isUserLogined ? styles.footerLoginedSocialBox : styles.footerSocialBox}>
            <View style={styles.socialProviderWrapper}>
              <Touchable onPress={() => window.open('https://twitter.com/menumend')}><Image style={styles.socialProvider} source={twitterPic} /></Touchable>
              <Touchable onPress={() => window.open('https://facebook.com/menumend')}><Image style={styles.socialProvider} source={facebookPic} /></Touchable>
              <Touchable onPress={() => window.open('https://linkedin.com/company/menumend-corporation')}><Image style={styles.socialProvider} source={linkedinPic} /></Touchable>
              <Touchable onPress={() => window.open('https://instagram.com/menumend')}><Image style={styles.socialProvider} source={instagramPic} /></Touchable>

            </View>

            <View style={styles.tcAndPpContainer}>
              <View>
                <Text style={styles.text} href="/pp.html" accessibilityRole="link">
                  Privacy policy
                </Text>
              </View>
              <View>
                <Text style={styles.text} href="/tc.html" accessibilityRole="link">
                  Term & Conditions
                </Text>
              </View>
            </View>
          </View>
        </View>
      )
    }

}

export default Footer
