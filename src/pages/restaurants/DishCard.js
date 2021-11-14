import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { StyleSheet, View, Text, Image } from 'react-native'
import Touchable from 'Touchable'
import _ from 'lodash'
import Shiitake from 'shiitake'

import LeafSmallImage from './img/leaf_small.png'
import SpoonsImage from './img/spoons.png'
import UpTickImage from './img/tick_up.png'
import LikeEmptyImage from './img/likedish_empty.png'
import ShareInactiveImage from './img/share_inactive.png'
import PhoneImage from './img/phone.png'
import LocationSmallImage from './img/location_small.png'
import LikeFullImage from './img/likedish.png'
import ArrowMenuImage from './img/arrow_menu.png'
import DishCardInfo from './DishCardInfo'
import { sans, serif } from 'fonts'

const styles = StyleSheet.create({
  container: {
    height: 230 + 175, // card height + info
  },
  card: {
    width: '327px',
    height: 230,
    paddingTop: '25px',
    paddingLeft: '25px',
    paddingRight: '25px',
    paddingBottom: '23px',
    backgroundColor: '#FFFFFF',
    boxShadow: '0 4px 26px 0 rgba(139,158,170,0.20)',
    borderRadius: '10px',
    marginRight: 8,
    marginLeft: 8,
  },
  bottomLine: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '25px',
  },
  cardPrice: {
    ...sans({
      fontSize: '16px',
      fontStyle: 'italic',
      color: '#000',
    }),
  },

  cardIcons: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },

  leafIcon: {
    display: 'inline-block',
    width: '20px',
    height: '19px'
  },
  leafIconLast: {
    display: 'inline-block',
    width: '20px',
    height: '19px',
    marginLeft: '10px'
  },
  restaurantContainer: {
    paddingTop: 19,
    paddingHorizontal: 25,
  },

  restaurant: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  restaurantNameContainer: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
  },
  restaurantName: {
    display: 'inline-block',
    ...serif({
      fontSize: '14px',
      color: '#000000',
      letterSpacing: '0',
    }),
  },
  spoonsIcon: {
    flex: 1,
    width: '19px',
    marginRight: '10px'
  },
  downTickIcon: {
    display: 'inline-block',
    width: '10px',
    height: '20px',
    transform: [{ 'scaleY': '-1' }],
  },
  upTickIcon: {
    display: 'inline-block',
    width: '10px',
    height: '20px',
  },
})


class DishCard extends React.Component {

  static propTypes = {
    data: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string,
      price: PropTypes.number,
      favourite: PropTypes.bool,
      restaurant: PropTypes.shape({
        string_id: PropTypes.string,
        name: PropTypes.string,
        phone: PropTypes.string,
        address: PropTypes.string,
        distance: PropTypes.number,
        location: PropTypes.shape({
          address1: PropTypes.string,
        }),
      }),
    }).isRequired,
    token: PropTypes.string,
    onShare: PropTypes.func.isRequired,
    toggleFavourite: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      isInfoVisible: false,
      favourite: props.data.favourite,
    }
    this.toggleInfo = this.toggleInfo.bind(this)
    this.onFavourite = this.onFavourite.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ favourite: nextProps.data.favourite })
  }

  onFavourite() {
    this.setState({ favourite: !this.state.favourite })
    this.props.toggleFavourite(this.state.favourite ? 'DELETE' : 'POST', this.props.token, 'HC', 'MenuItem', this.props.data.id)
  }

  toggleInfo() {
    this.setState({ ...this.state, isInfoVisible: !this.state.isInfoVisible })
  }

  render() {
    const { name, price, description } = this.props.data
    const priceElement = price ? (
      <Text style={styles.cardPrice}>
        {`$${price}`}
      </Text>
    ) : null
    const dishInfo = this.state.isInfoVisible ? (
      <DishCardInfo restaurant={this.props.data.restaurant} />
    ) : null
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <Shiitake lines={2} throttleRate={200} tagName="p" className="cardHeader">
            {name}
          </Shiitake>
          <Shiitake lines={4} throttleRate={200} tagName="p" className="infoText">
            {description}
          </Shiitake>
          <View style={styles.bottomLine}>
            <View>{priceElement}</View>

            <View style={styles.cardIcons}>
              <Touchable onPress={this.onFavourite}>
                <Image style={styles.leafIcon} resizeMode="contain" source={this.state.favourite ? LikeFullImage : LikeEmptyImage } />
              </Touchable>
              <Touchable onPress={() => this.props.onShare(`${window.location.href}r/${this.props.data.restaurant.string_id}`)}>
                <Image style={styles.leafIconLast} resizeMode="contain" source={ShareInactiveImage} />
              </Touchable>
            </View>
          </View>
        </View>

        <View style={styles.restaurantContainer}>
          <Touchable onPress={this.toggleInfo}>
            <View style={styles.restaurant}>
              <View style={styles.restaurantNameContainer}>
                <Image style={styles.spoonsIcon} resizeMode="contain" source={SpoonsImage} />
                <Text style={styles.restaurantName}>{this.props.data.restaurant.name}</Text>
              </View>
              <Image
                style={this.state.isInfoVisible ? styles.upTickIcon : styles.downTickIcon}
                resizeMode="contain"
                source={UpTickImage}
              />
            </View>
          </Touchable>
          {dishInfo}
        </View>
    </View>
    )
  }
}

export default DishCard
