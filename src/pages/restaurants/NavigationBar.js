import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { StyleSheet, Text, View, Image } from 'react-native'

import { sans, serif } from 'fonts'
import { moderateScale, pickStyle } from 'scale'
import Touchable from 'Touchable'
import CheckIn from './auth/CheckIn'
import Logged from './auth/Logged'

const commonStyle = {
  container: {
    height: 88,
    width: 1440,
  },
  wrapper: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  serifText: {
    ...serif({
      color: '#000000',
      fontWeight: 'bold',
    }),
  },
  sansText: {
    ...sans({
      color: '#000000',
      fontWeight: 'bold',
    }),
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
    paddingLeft: 60,
    paddingRight: 38,
  },
  rootLinkText: {
    ...commonStyle.serifText,
    fontSize: 24,
    lineHeight: 30,
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


class NavigationBar extends React.PureComponent {

  render() {
    const resizeMode = 'center'
    return (
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <View>
            <Text accessibilityRole="link" href="/" style={styles.rootLinkText}>
              Menumend
            </Text>
          </View>

          <View style={styles.loginLink}>
            <CheckIn />
            <Logged />
          </View>

        </View>
      </View>
    )
  }

}

export default NavigationBar
