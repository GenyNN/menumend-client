import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, View, Image } from 'react-native'
import { isEmpty } from 'lodash'

import { sans, serif } from 'fonts'
import { formatRestaurantAddress } from 'pages/restaurants/format'
import { moderateScale, pickStyle } from 'scale'
import Touchable from 'Touchable'
import BackArrowImage from '../img/back_arrow.png'
import PositionPinImage from '../img/position_pin.png'
import PhoneImage from '../img/phone.png'


const commonStyle = {
  header: {
    ...serif({
      color: '#000000',
      fontWeight: '300',
    }),
    textAlign: 'center',
  },
  wrapper: {
    height: 17,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backArrowImage: {
    width: 20,
    height: 17,
    marginLeft: -16 - 20,
  },
  subheader: {
    marginTop: 8,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
}
const desktopStyle = {
  ...commonStyle,
  container: {
    zIndex: 20,
    marginTop: 38,
    width: '100%',
  },
  restaurantHeader: {
    ...commonStyle.header,
    marginTop: 25,
    fontSize: 48,
    lineHeight: 60,
    fontWeight: '700',
  },
  addressIcon: {
    width: 16,
    height: 16,
    marginRight: 8,
  },
  addressText: {
    ...sans({
      color: '#000000',
      fontWeight: '300',
      fontSize: '20px',
      lineHeight: 25,
    }),
    marginRight: 24,
  },
  phoneText: {
    ...sans({
      color: '#000000',
      fontWeight: '300',
      fontSize: '20px',
      lineHeight: 25,
    }),
  },
}
const mobileStyle = {
  ...commonStyle,
  container: {
    marginTop: 12,
  },
  backArrowImage: {
    display: 'none',
  },
  restaurantHeader: {
    ...commonStyle.header,
    marginTop: moderateScale(80),
    marginBottom: moderateScale(20),
    fontSize: moderateScale(18),
    lineHeight: moderateScale(23),
  },
  addressIcon: {
    width: 10,
    height: 10,
    marginRight: 5,
  },
  addressText: {
    ...sans({
      color: '#000000',
      fontWeight: '300',
      fontSize: moderateScale(12),
    }),
    marginRight: 14,
  },
  phoneText: {
    ...sans({
      color: '#000000',
      fontWeight: '300',
      fontSize: moderateScale(12),
    }),
  },
}
const styles = StyleSheet.create(pickStyle(mobileStyle, desktopStyle))


class RestarauntHeader extends React.PureComponent {

  static propTypes = {
    onPress: PropTypes.func.isRequired,
    history: PropTypes.any.isRequired,
    selected: PropTypes.shape({
      name: PropTypes.string,
      location_id: PropTypes.string,
      location: PropTypes.shape({
        address1: PropTypes.string,
        city: PropTypes.string,
        state: PropTypes.string,
      }),
      phone: PropTypes.string,
    }),
  }

  constructor(props) {
    super(props)
    this.handlePress = this.handlePress.bind(this)
  }

  handlePress() {
    this.props.onPress()
    this.props.history.push('/')
  }

  render() {
    let address = ''
    let phoneNum = ''
    let restaurantType = ''
    let distanceMi = ''
    if (!isEmpty(this.props.selected)) {
      const {
        location,
        name,
        phone,
        type,
        distance
      } = this.props.selected
      address = formatRestaurantAddress(location.address1, location.city, location.state)
      phoneNum = phone
      restaurantType = type ? type.split(',').map((item) => `${item}\n`) : ''
      distanceMi = distance.toString().slice(0, 3)
    }
    const backButton = (!isEmpty(this.props.selected)) ? (
      <View style={styles.wrapper}>
        <Touchable onPress={this.handlePress}>
          <Image
            style={styles.backArrowImage}
            resizeMode="contain"
            source={BackArrowImage}
          />
        </Touchable>
      </View>
    ) : null
    return (
      <View style={styles.container}>
        {backButton}
        <Text style={styles.restaurantHeader}>{this.props.selected.name}</Text>
        <View style={styles.subheader}>
          <Image
            style={styles.addressIcon}
            resizeMode="contain"
            source={PositionPinImage}
          />
          <Text style={styles.addressText}>{address}</Text>

          <Image
            style={styles.addressIcon}
            resizeMode="contain"
            source={PhoneImage}
          />
          <Text style={styles.phoneText}>{phoneNum}</Text>
        </View>
      </View>
    )
  }

}


import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { resetRestaurant } from '../restaurant/actions/reset'

const mapStateToProps = (state) => ({
  selected: state.restaurant.selected,
})
const mapDispatchToProps = {
  onPress: resetRestaurant,
}

export const RestarauntHeaderContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(RestarauntHeader)
export default withRouter(RestarauntHeaderContainer)
