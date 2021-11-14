import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { StyleSheet, View, Text, Image } from 'react-native'
import Touchable from 'Touchable'

import UpTickImage from './img/tick_up.png'
import PhoneImage from './img/phone.png'
import LocationSmallImage from './img/location_small.png'
import ArrowMenuImage from './img/arrow_menu.png'
import { sans, serif } from 'fonts'

const styles = StyleSheet.create({
  restaurantInfo: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 35,
    paddingHorizontal: 5,
  },
  restaurantInfoRow: {
    flexDirection: 'row',
    marginBottom: '15px',
    alignItems: 'center',
  },
  restaurantInfoMenuLink: {
    position: 'relative',
    right: '-10px',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: '15px',
    alignItems: 'center',
  },
  infoMenuLink: {
    ...sans({
      fontSize: '14px',
      color: '#DCBF76',
      letterSpacing: '0',
    }),
  },
  infoMenuImage: {
    marginLeft: '10px',
    position: 'relative',
    width: '11px',
    height: '10px',
    resizeMode: 'contain',
  },
  infoText: {
    flex: 3,
    ...sans({
      fontSize: '14px',
      color: '#000000',
      letterSpacing: '0',
    }),
  },
  infoTextDistance: {
    position: 'relative',
    top: '-10px',
    textAlign: 'right',
    ...sans({
      fontWeight: 'bold',
      fontSize: '14px',
      color: '#000000',
      letterSpacing: '0',
    }),
    marginTop: '15px',
  },
  phoneIcon: {
    width: '12px',
    height: '12px',
    resizeMode: 'contain',
    marginRight: '10px'
  },
  locationIcon: {
    width: '11px',
    height: '13px',
    resizeMode: 'contain',
    marginRight: '10px',
  },
  downTickIcon: {
    display: 'inline-block',
    width: '10px',
    height: '20px',
    transform: [{ scaleY: '-1' }],
  },
  upTickIcon: {
    display: 'inline-block',
    width: '10px',
    height: '20px',
  },
})


class DishCardInfo extends React.Component {

  static propTypes = {
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
    history: PropTypes.any,
    requestSelectRestaurant: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.openRestaurant = this.openRestaurant.bind(this)
  }

  openRestaurant() {
    const { restaurant } = this.props
    this.props.requestSelectRestaurant(restaurant)
    this.props.history.push(`/r/${restaurant.string_id}`)
  }

  render() {
    const { restaurant } = this.props
    let { distance } = restaurant
    if (!Number.isInteger(distance)) {
      distance = distance.toFixed(2)
    }
    distance = `${distance} mi`
    return (
      <View style={styles.restaurantInfo}>
        <View style={styles.restaurantInfoRow}>
          <Image style={styles.phoneIcon} source={PhoneImage} />
          <Text style={styles.infoText}>{restaurant.phone}</Text>
        </View>
        <View style={styles.restaurantInfoRow}>
          <Image style={styles.locationIcon} source={LocationSmallImage} />
          <Text style={styles.infoText}>{restaurant.location.address1}</Text>
          <Text style={styles.infoTextDistance}>{distance}</Text>
        </View>
        <Touchable onPress={this.openRestaurant}>
          <View style={styles.restaurantInfoMenuLink}>
            <Text style={styles.infoMenuLink}>See Menu</Text>
            <Image style={styles.infoMenuImage} source={ArrowMenuImage} />
          </View>
        </Touchable>
      </View>

    )
  }
}

import { connect } from 'react-redux'
import { requestSelectRestaurant } from './restaurant/sagas/select'

const mapStateToProps = null
const mapDispatchToProps = {
  requestSelectRestaurant,
}
export const DishCardInfoContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DishCardInfo)
export default withRouter(DishCardInfoContainer)
