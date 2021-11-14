import React from 'react'
import { StyleSheet, View, Image } from 'react-native'

import { moderateScale, pickStyle } from 'scale'
import ToscanaImage from '../img/toscana.png'


const commonStyle = {
  background: {
    position: 'absolute',
    zIndex: -100,
    left: 0,
    top: 54,
    width: '100%',
  },
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  image: {
    width: '746px',
    height: '418px',
  },
}

const mobileStyle = ({
  ...commonStyle,
})

const desktopStyle = ({
  ...commonStyle,
})

const styles = StyleSheet.create(pickStyle(mobileStyle, desktopStyle))


class SearchToscana extends React.PureComponent {

  render() {
    return (
      <View style={styles.background}>
        <View style={styles.wrapper}>
          <Image style={styles.image} resizeMode="contain" source={ToscanaImage} />
        </View>
      </View>
    )
  }
}

export default SearchToscana
