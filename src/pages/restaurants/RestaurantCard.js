import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Text, Image } from 'react-native'
import Touchable from 'Touchable'

import ItalianRestaurantImage from './img/italian_restaurant.png'
import LeafSmallImage from './img/leaf_small.png'
import LikeFullImage from './img/like_full_middle.png'
import LikeEmptyImage from './img/like_empty.png'
import LocationImage from './img/location.png'
import RestaurantDish from './RestaurantDish'
import ShareInactiveImage from './img/share_inactive.png'
import { sans, serif } from 'fonts'

const commonStyle = {
  sansText: {
    ...sans({
      color: '#000',
      letterSpacing: 0,
    }),
  },
  serifText: {
    ...serif({
      color: '#000',
      letterSpacing: 0,
    }),
  },
}

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
    top: '-15px',
    left: '25px',
    width: '374px',
    height: '264px',
    zIndex: 1
  },
  infoCard: {
    alignItems: 'center',
    width: '409px',
    marginTop: '150px',
    minHeight: '276px',
    padding: '25px',
    backgroundColor: '#FFFFFF',
    boxShadow: '0 4px 26px 0 rgba(139,158,170,0.20)',
    borderRadius: '8.64px',
    zIndex: 10
  },
  restaurantType: {
    ...sans({
      fontSize: '18px',
      color: '#000',
      letterSpacing: 0,
      fontWeight: '200',
    }),
    position: 'absolute',
    left: '35px',
    bottom: '40px',
  },
  restaurantName: {
    marginTop: '30px',
    ...sans({
      fontSize: '20px',
      color: '#000',
      letterSpacing: 0,
    }),
  },
  restaurantLocation: {
    marginTop: '60px',
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
    color: '#fff'
  },
  infoLocationIcon: {
    width: '27px',
    height: '27px',
    marginRight: '15px'
  },
  shareIcon: {
    width: '22px',
    height: '20px',
    resizeMode: 'contain',
    position: 'absolute',
    bottom: '43px',
    right: '85px',
    zIndex: 30,
  },
  restaurantLocationText: {
    ...sans({
      fontSize: '16px',
      color: '#000',
      letterSpacing: 0,
      fontWeight: '200',
    }),
    width: '230px',
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
    right: '10px',
    bottom: '10px',
  },
  dishes: {
    width: '330px',
    marginTop: '150px',
    marginLeft: '40px',
  },
  dishesHeader: {
    ...commonStyle.serifText,
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
    color: '#53A36A'
  }
})


class RestaurantCard extends React.Component {

  static propTypes = {

  }

  constructor() {
    super()
    this.state = {
    }
    this.onFavourite = this.onFavourite.bind(this)
  }

  componentDidMount() {
    if (this.props.data.favourite) {
      this.setState({ favourite: true })
    } else {
      this.setState({ favourite: false })
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data.favourite) {
      this.setState({ favourite: true })
    } else {
      this.setState({ favourite: false })
    }
  }

  onFavourite() {
    this.setState({ favourite: !this.props.data.favourite })
    this.props.toggleFavourite(this.props.data.favourite ? 'DELETE' : 'POST', this.props.token, 'HC', 'Restaurant', this.props.data.id)
  }

  render() {
    const self = this
    const dishesToShow = this.props.data.healthyItems.map((item, index) => (
      <RestaurantDish
        key={`restauran-dish-${item.id}`}
        data={item}
        onShare={self.props.onShare}
        toggleFavourite={self.props.toggleFavourite}
        token={self.props.token} />
    ))
    return (
      <View style={styles.container}>
        <View style={styles.info}>
          <Image style={styles.illustration} resizeMode="contain" source={ItalianRestaurantImage} />

          <View style={styles.infoCard}>
            <Image style={styles.infoLeafIcon} resizeMode="contain" source={LeafSmallImage} />
            <Text style={styles.restaurantName}>{this.props.data.name}</Text>

            <View style={styles.restaurantLocation}>
              <Image style={styles.infoLocationIcon} resizeMode="contain" source={LocationImage} />
              <Text style={styles.restaurantLocationText}>
                {this.props.data.location.address1}
              </Text>
            </View>
            <Text style={styles.restaurantType}>{this.props.data.type}</Text>
            <Touchable onPress={() => this.props.onShare()}>
              <Image style={styles.shareIcon} resizeMode="contain" source={ShareInactiveImage} />
            </Touchable>
            <Touchable onPress={() => this.onFavourite()}>
              <Image style={styles.infoLikeIcon} source={this.state.favourite ? LikeFullImage : LikeEmptyImage} />
            </Touchable>
            <View style={styles.restaurantDistance}>
              <Text style={styles.restaurantDistanceText}>{this.props.data.distance.toString().slice(0, 4) + ' mi'}</Text>
            </View>
          </View>
        </View>

        <View style={styles.dishes}>
          <Text style={styles.dishesHeader}>Healthy Dishes For You</Text>
          {dishesToShow}
        </View>
      </View>
    )
  }
}

export default RestaurantCard
