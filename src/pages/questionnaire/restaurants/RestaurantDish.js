import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Text, Image } from 'react-native'
import Touchable from 'Touchable'

import LeafSmallImage from './img/leaf_small.png'
import LikeEmptySmallImage from './img/like_empty_small.png'

const commonStyle = StyleSheet.create({
  sansText: {
    fontFamily: '"Source Sans Pro", serif',
    color: '#000',
  },
  serifText: {
    fontFamily: '"Source Serif Pro", serif',
    color: '#000',
  }
})

const styles = StyleSheet.create({
  container: {
  },
  dish: {
    borderBottomColor: '#E5EBEF',
    borderBottomWidth: '1px',
    minHeight: '115px',
    padding: '10px',
    paddingRight: '30px',
    marginBottom: '15px'
  },
  dishName: {
    fontFamily: '"Source Serif Pro", serif',
    color: '#000',
    fontSize: '16px',
    fontWeight: '200',
  },
  dishIngredients: {
    fontFamily: '"Source Sans Pro", serif',
    color: '#000',
    marginTop: '14px',
    fontSize: '14px',
    fontWeight: '200',
  },
  dishPrice: {
    marginTop: '18px',
    fontFamily: 'Helvetica',
    fontSize: '16px',
    color: '#A8AEB1',
    letterSpacing: 0
  },
  dishLeafIcon: {
    display: 'inline-block',
    width: '14px',
    height: '16px',
    marginLeft: '10px'
  },
  dishLikeIcon: {
    position: 'absolute',
    top: '14px',
    right: '10px'
  },
})


class RestaurantDish extends React.Component {

  static propTypes = {
    dish: PropTypes.object
  }

  render() {
    const dish = this.props.dish
    const isHealthy = !!dish.tags['healthy-choice']

    return (
      <View style={styles.container}>
        <View style={styles.dish}>
          {/*<Touchable>*/}
            {/*<Image style={styles.dishLikeIcon} resizeMode="contain" source={LikeEmptySmallImage} />*/}
          {/*</Touchable>*/}

          <Text style={styles.dishName}>
            {dish.name}

            {isHealthy &&
              <Image style={styles.dishLeafIcon} resizeMode="contain" source={LeafSmallImage} />
            }
          </Text>
          <Text style={styles.dishIngredients}>
            {dish.description.capitalize()}
          </Text>
          <Text style={styles.dishPrice}>
            {dish.price ? '$' + dish.price : ''}
          </Text>
        </View>
      </View>
    )
  }
}

export default RestaurantDish
