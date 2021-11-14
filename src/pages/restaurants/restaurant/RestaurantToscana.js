import React from 'react'
import { StyleSheet, View, Image } from 'react-native'

import { pickStyle } from 'scale'
import ToscanaImage from '../img/toscana.png'


const commonStyle = {
  background: {
    position: 'absolute',
    zIndex: -100,
    left: 0,
    top: 20,
    height: 392,
    width: '100%',
    overflow: 'hidden',
    /* backgroundColor: 'red', */
  },
  container: {
    height: 412,
    width: 884,
  },
  image: {
    width: '746px',
    height: '418px',
    opacity: 0.2,
  },
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
}

const mobileStyle = {
  ...commonStyle,
  container: {
    ...commonStyle.container,
  },
}

const desktopStyle = {
  ...commonStyle,
  container: {
    ...commonStyle.container,
  },
}
const styles = StyleSheet.create(pickStyle(mobileStyle, desktopStyle))


class RestaurantToscana extends React.PureComponent {

  render() {
    return (
      <View style={styles.container}>
        <View>
          {this.props.children}
        </View>
        <View style={styles.background}>
          <View style={styles.wrapper}>
            <Image style={styles.image} resizeMode="contain" source={ToscanaImage} />
          </View>
        </View>
      </View>
    )
  }
}

export default RestaurantToscana
