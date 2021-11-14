import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, TextInput, Text, Image } from 'react-native'
import _ from 'lodash'

import subscribeSpoon from '../../img/spoon.png'
import post from '../../post'
import Touchable from 'Touchable'
import { moderateScale, pickStyle } from 'scale'
import { sans, serif } from 'fonts'
import SubscribeInput from './SubscribeInput'


const commonStyle = {
}

const desktopStyle = {
  background: {
    width: '100%',
    position: 'absolute',
    zIndex: -100,
    left: 0,
    top: 0,
  },
  centerColumn: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: 1357,
    width: 256,
  },
  wrapper: {
    minHeight: '924px',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    overflow: 'hidden',
  },
  header: {
    ...serif({
      color: 'black',
      fontSize: 48,
      fontWeight: '700',
    }),
    textAlign: 'center',
    marginTop: '112px',
  },
  text: {
    ...sans({
      color: 'black',
      fontSize: 24,
      lineHeight: 31,
      fontWeight: '300',
    }),
    marginTop: '32px',
    textAlign: 'center',
    width: '604px',
    height: '90px',
    marginBottom: '80px',
  },
  inputWrapper: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
    width: '620px',
    height: '80px',
    borderRadius: 10,
    shadowColor: '#608FAB',
    shadowRadius: 30,
    shadowOpacity: 0.4,
  },
  input: {
    width: '100%',
    height: '80px',
    backgroundColor: 'white',
    borderRadius: 10,
    ...sans({
      fontSize: 24,
      fontWeight: '300',
      lineHeight: '80px',
    }),
    textAlign: 'left',
  },
}

const mobileStyle = {
}
const styles = StyleSheet.create(pickStyle(mobileStyle, desktopStyle))


class SearchSubscribe extends React.PureComponent {

  static propTypes = {
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <Text style={styles.header}>Subscribe</Text>
        <Text style={styles.text}>
          Get curated restaurant and menu recommendations via email.
          Enter your email, and we will keep you posted when we launch the app.
        </Text>
        <SubscribeInput />
        <View style={styles.background}>
          <View style={styles.centerColumn}>
            <Image style={styles.image} source={subscribeSpoon} resizeMode="contain" />
          </View>
        </View>
      </View>
    )
  }

}

export default SearchSubscribe
