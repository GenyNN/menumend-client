import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Text, Image } from 'react-native'
import Touchable from 'Touchable'

import ItalianRestaurantImage from './img/italian_restaurant.png'
import LeafSmallImage from './img/leaf_small.png'
import LikeEmptyImage from './img/like_empty.png'
import LocationImage from './img/location.png'
import RestaurantDish from './RestaurantDish'

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
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  info: {
    width: '380px',
    marginRight: '30px',
  },
  illustration: {
    position: 'absolute',
    top: '-20px',
    left: '-44px',
    width: '429px',
    height: '264px',
    zIndex: 1
  },
  infoCard: {
    alignItems: 'center',
    width: '346px',
    marginTop: '150px',
    minHeight: '276px',
    padding: '25px',
    backgroundColor: '#FFFFFF',
    boxShadow: '0 4px 26px 0 rgba(139,158,170,0.20)',
    borderRadius: '10px',
    zIndex: 10
  },
  restaurantType: {
    fontFamily: '"Source Sans Pro", serif',
    fontSize: '18px',
    color: '#000',
  },
  restaurantName: {
    marginTop: '30px',
    fontFamily: '"Source Serif Pro", serif',
    fontSize: '24px',
    color: '#000',
    fontWeight: '300',
    textAlign: 'center',
  },
  restaurantLocation: {
    marginTop: '30px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  restaurantDistance: {
    position: 'absolute',
    bottom: '-16px',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '80px',
    height: '33px',
    backgroundColor: '#DCBF76',
    borderRadius: '120px',
    alignItems: 'center',
    justifyContent: 'center'
  },
  restaurantDistanceText: {
    ...commonStyle.sansText,
    fontSize: '16px',
    color: '#fff',
    fontWeight: '200',
  },
  infoLocationIcon: {
    width: '27px',
    height: '27px',
    marginRight: '15px'
  },
  restaurantLocationText: {
    fontFamily: '"Source Sans Pro", serif',
    fontSize: '16px',
    color: '#000',
    letterSpacing: 0,
    width: '200px',
    fontWeight: '200',
  },
  infoLeafIcon: {
    position: 'absolute',
    width: '29px',
    height: '42px',
    top: '-16px',
    left: '-10px'
  },
  infoLikeIcon: {
    position: 'absolute',
    right: '-10px',
    top: '-10px'
  },
  dishes: {
    width: '330px',
    marginTop: '150px',
  },
  dishesHeader: {
    fontFamily: '"Source Serif Pro", serif',
    color: '#000',
    fontSize: '20px',
    marginBottom: '40px'
  },
  dishesList: {
    display: 'flex',
    flexDirection: 'column',
  },

  moreLinkContainer: {
    alignItems: 'center'
  },
  moreLink: {
    marginTop: '15px',
    ...commonStyle.sansText,
    fontSize: '27px',
    color: '#53A36A',
    fontWeight: '200',
  }
})

class RestaurantCard extends React.Component {
  static propTypes = {
    restaurant: PropTypes.object,
    handleShowMenu: PropTypes.func,
  }

  constructor(props) {
    super(props)

    this.handleMorePress = this.handleMorePress.bind(this)
  }

  handleMorePress() {
    this.props.requestRestaurant(this.props.restaurant.location_id)
    this.props.handleShowMenu()
  }

  render() {
    const restaurant = this.props.restaurant

    return (
      <View style={styles.container}>
        <View style={styles.info}>
          <Image style={styles.illustration} resizeMode="contain" source={ItalianRestaurantImage} />

          <View style={styles.infoCard}>
            {/*<Image style={styles.infoLeafIcon} resizeMode="contain" source={LeafSmallImage} />*/}
            {/*<Touchable>*/}
              {/*<Image style={styles.infoLikeIcon} resizeMode="contain" source={LikeEmptyImage} />*/}
            {/*</Touchable>*/}

            <Text style={styles.restaurantType}>{restaurant.type}</Text>
            <Text style={styles.restaurantName}>{restaurant.name}</Text>

            <View style={styles.restaurantLocation}>
              <Image style={styles.infoLocationIcon} resizeMode="contain" source={LocationImage} />
              <Text style={styles.restaurantLocationText}>
                {restaurant.location.address1}
              </Text>
            </View>

            {/*<View style={styles.restaurantDistance}>
              <Text style={styles.restaurantDistanceText}>1.2 Mi</Text>
            </View>*/}
          </View>
        </View>

        <View style={styles.dishes}>
          <Text style={styles.dishesHeader}>Dishes For You</Text>

          {restaurant.selected_items.map(dish =>
            <RestaurantDish key={`restaurant-dish-${dish.id}`} dish={dish} />
          )}

          <Touchable onPress={this.handleMorePress}>
            <View style={styles.moreLinkContainer}>
              <Text style={styles.moreLink}>More</Text>
            </View>
          </Touchable>
        </View>
      </View>
    )
  }
}


import { connect } from 'react-redux'
import { requestRestaurant } from './sagas/data'

const mapStateToProps = (state) => ({
})
const mapDispatchToProps = {
  requestRestaurant
}

export const RestaurantCardContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RestaurantCard)
export default RestaurantCardContainer
