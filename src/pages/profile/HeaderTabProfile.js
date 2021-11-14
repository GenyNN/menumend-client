import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { StyleSheet, Text, View, Image } from 'react-native'

import { moderateScale, pickStyle } from 'scale'
import Touchable from 'Touchable'
import Logged from './auth/Logged'

const commonStyle = {
  container: {
    width: '100%',
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  serifText: {
    color: '#000000',
    fontFamily: '"Source Serif Pro", serif',
    fontWeight: 'bold',
  },
  sansText: {
    color: '#000000',
    fontFamily: '"Source Sans Pro", serif',
    fontWeight: 'bold',
  },
  loginLink: {
    display: 'flex',
    justifyContent: 'flex-end',
    /* ,
        height: 46, */
  },
}

const desktopStyle = {
  ...commonStyle,
  container: {
    ...commonStyle.container,
    height: 88,
    paddingTop: 30,
    paddingBottom: 28,
    paddingHorizontal: 60,
  },
  rootLinkText: {
    ...commonStyle.serifText,
    fontSize: 24,
    lineHeight: 33,
  },
  loginLinkText: {
    ...commonStyle.sansText,
    fontSize: 20,
    lineHeight: 25,
  },
}

const mobileStyle = {
  ...commonStyle,
  container: {
    ...commonStyle.container,
    height: 88,
    paddingVertical: moderateScale(20),
    paddingHorizontal: moderateScale(20),
  },
  rootLinkText: {
    ...commonStyle.serifText,
    fontSize: moderateScale(20),
    lineHeight: moderateScale(28),
  },
  loginLinkText: {
    ...commonStyle.sansText,
    fontSize: moderateScale(16),
    lineHeight: moderateScale(20),
  },
}

const styles = StyleSheet.create(pickStyle(mobileStyle, desktopStyle))


class HeaderTabProfile extends React.PureComponent {

    static propTypes = {
      handleSignupPress: PropTypes.func,
    }

    render() {
      const resizeMode = 'center'
      return (
        <View style={styles.container}>
          <View>
            <Text accessibilityRole="link" href="/" style={styles.rootLinkText}>
                        Menumend
            </Text>
          </View>

          <View style={styles.loginLink}>
            <Logged />
          </View>

        </View>
      )
    }

}

export default HeaderTabProfile
