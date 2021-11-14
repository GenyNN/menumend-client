import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Image, Text } from 'react-native'

import CuisineType from './CuisineType'
import CuisineDistance from './CuisineDistance'
import restaurantImage from './img/restaurant.png'
import baseImage0 from './img/base0.png'
import baseImage1 from './img/base1.png'
import baseImage2 from './img/base2.png'
import baseImage3 from './img/base3.png'


const desktopStyle = {
  container: {
    width: 174,
    height: 156,
  },
  background: {
    position: 'absolute',
    zIndex: -100,
    left: 0,
    top: 0,
  },
  centeredText: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  imageWrapper: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 174,
    height: 156,
    resizeMode: 'contain',
    filter: 'drop-shadow(0 0 24px rgba(96, 143, 171, 0.2))',
  },
  restaurantImage: {
    width: 22,
    height: 24,
    resizeMode: 'contain',
    marginTop: 24,
    marginBottom: 24,
  },
}
const smallStyle = StyleSheet.create({
  ...desktopStyle,
  container: {
    ...desktopStyle.container,
    height: 156,
  },
  image: {
    ...desktopStyle.image,
    height: 156,
  },
  restaurantImage: {
    ...desktopStyle.restaurantImage,
    marginTop: 40,
    marginBottom: 24,
  },
  distance: {
    marginTop: 0,
  },
})
const mediumStyle = StyleSheet.create({
  ...desktopStyle,
  container: {
    ...desktopStyle.container,
    height: 176,
  },
  image: {
    ...desktopStyle.image,
    height: 176,
  },
  restaurantImage: {
    ...desktopStyle.restaurantImage,
    marginTop: 24,
    marginBottom: 20,
  },
  distance: {
    marginTop: 20,
  },
})
const largeStyle = StyleSheet.create({
  ...desktopStyle,
  container: {
    ...desktopStyle.container,
    height: 197,
  },
  image: {
    ...desktopStyle.image,
    height: 197,
  },
  restaurantImage: {
    ...desktopStyle.restaurantImage,
    marginTop: 24,
    marginBottom: 20,
  },
  distance: {
    marginTop: 16,
  },
})
const extraLargeStyle = StyleSheet.create({
  ...desktopStyle,
  container: {
    ...desktopStyle.container,
    height: 222,
  },
  image: {
    ...desktopStyle.image,
    height: 222,
  },
  restaurantImage: {
    ...desktopStyle.restaurantImage,
    marginTop: 24,
    marginBottom: 20,
  },
  distance: {
    marginTop: 16,
  },
})


function createCuisineBadge(styles, image) {
  return (
    class CuisineBadge extends React.PureComponent {

      static propTypes = {
        cuisines: PropTypes.array,
        distance: PropTypes.number,
      }

      render() {
        return (
          <View style={styles.container}>
            <View style={styles.imageWrapper}>
              <Image style={styles.restaurantImage} source={restaurantImage} />
            </View>
            <View style={styles.centeredText}>
              <CuisineType values={this.props.cuisines} />
              <CuisineDistance value={this.props.distance} style={styles.distance} />
            </View>
            <View style={styles.background}>
              <View style={styles.imageWrapper}>
                <Image style={styles.image} source={image} />
              </View>
            </View>
          </View>
        )
      }
    }
  )
}

export const SmallCuisineBadge = createCuisineBadge(smallStyle, baseImage0)
export const MediumCuisineBadge = createCuisineBadge(mediumStyle, baseImage1)
export const LargeCuisineBadge = createCuisineBadge(largeStyle, baseImage2)
export const ExtraLargeCuisineBadge = createCuisineBadge(extraLargeStyle, baseImage3)
