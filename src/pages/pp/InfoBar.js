import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { StyleSheet, Text, View, Image } from 'react-native'
import dateFormat from 'dateformat';

import { moderateScale, pickStyle } from 'scale'
import Touchable from 'Touchable'
import CutleryImage from './img/cutlery.png'

const commonStyle = {
  container: {
    width: '100%',
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCBF76',
  },
  contentWrapper: {
    width: '500px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  image: {
    height: 272,
    width: 272,
  },
  textContainer: {
    position: 'absolute',
    top: 90,
  },
  textHeader: {
    color: '#FFFFFF',
    fontFamily: '"Source Sans Pro", sans-serif',
    fontWeight: '600',
    textAlign: 'center',
  },
  textEffective: {
    color: '#FFFFFF',
    fontFamily: '"Source Sans Pro", sans-serif',
    textAlign: 'center',
    fontSize: 24,
  },
}

const desktopStyle = {
  ...commonStyle,
  container: {
    ...commonStyle.container,
    height: 272,
    paddingTop: 30,
    paddingBottom: 28,
    paddingHorizontal: 60,
  },
  textHeader: {
    ...commonStyle.textHeader,
    fontSize: 48,
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
}

const styles = StyleSheet.create(pickStyle(mobileStyle, desktopStyle))

class InfoBar extends React.PureComponent {

    static propTypes = {
    }

    constructor() {
      super()
      this.state = {
        currentDate: new Date(),
        options: 'mmmm dS, yyyy',
      }
    }

    render() {
      const resizeMode = 'center'
      return (
        <View style={styles.container}>
          <View style={styles.contentWrapper}>
            <View>
              <Image style={styles.image} resizeMode="center" source={CutleryImage} />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.textHeader}>
                    Privacy Policy
              </Text>
              <Text style={styles.textEffective}>
                    Effective Date: {dateFormat(this.state.currentDate, this.state.options)}
              </Text>
            </View>
          </View>
        </View>

      )
    }

}

export default InfoBar
