import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, View } from 'react-native'

import { commonStyle, desktopStyle, mobileStyle } from './LocationBarRequest'
import LocationButton from './LocationButton'
import { moderateScale, pickStyle } from 'scale'

const customDesktopStyle = {
  ...desktopStyle,
  header: {
    ...desktopStyle.header,
    textAlign: 'center',
  },
}
const customMobileStyle = {
  ...mobileStyle,
  header: {
    ...mobileStyle.header,
    width: '100%',
    textAlign: 'center',
  },
  /* nowrap: {
   *   whiteSpace: 'nowrap',
   * }, */
}
export const styles = StyleSheet.create(pickStyle(
  customMobileStyle, customDesktopStyle
))


class LocationBarUnavailable extends React.PureComponent {

  static propTypes = {
  }

  render() {
    return null // temporarily disable
    return (
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <Text style={styles.header}>
            It seems you{'\''}re accessing the website from outside of the U.S.{'\n'}
            For the best experience, we{'\''}ve placed you in
            <Text numberOfLines={1} style={styles.nowrap}>
              {' '}New York, NY.
            </Text>
          </Text>
        </View>
      </View>
    )
  }

}

export default LocationBarUnavailable
