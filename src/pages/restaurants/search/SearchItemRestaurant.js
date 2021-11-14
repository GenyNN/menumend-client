import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Image, Text, TextInput } from 'react-native'

import Touchable from 'Touchable'
import RestaurantImage from '../../../../static/img/landing/restaurant.png'
import CloseRestaurantImage from '../../../../static/img/landing/close_restaurant.png'
import { moderateScale, pickStyle } from 'scale'
import { formatRestaurantAddress } from 'pages/restaurants/format'
import { sans } from 'fonts'


const commonStyle = {
  container: {
    width: '100%',
    borderTopWidth: '1px',
    borderColor: '#E5EBEF',
  },
  containerActive: {
    backgroundColor: '#EEEEEE',
  },
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textWrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  icon: {
    resizeMode: 'cover'
  },
  name: {
    ...sans({
      fontWeight: '400',
    }),
  },
  address: {
    ...sans({
      fontWeight: '300',
    }),
  },
}

const desktopStyle = {
  ...commonStyle,
  wrapper: {
    ...commonStyle.wrapper,
    height: 76,
    paddingTop: 16,
    paddingBottom: 16,
  },
  icon: {
    marginLeft: '26px',
    marginRight: '22px',
    width: '23px',
    height: '25px',
  },
  name: {
    ...commonStyle.name,
    fontSize: 18,
    lineHeight: 23,
  },
  address: {
    ...commonStyle.address,
    fontSize: 16,
    lineHeight: 20,
  },
}

const mobileStyle = {
  ...commonStyle,
  wrapper: {
    ...commonStyle.wrapper,
    height: moderateScale(61),
    paddingTop: moderateScale(14),
    paddingBottom: moderateScale(14),
  },
  icon: {
    marginLeft: moderateScale(18),
    marginRight: moderateScale(21),
    width: moderateScale(17),
    height: moderateScale(18),
  },
  name: {
    ...commonStyle.name,
    fontSize: moderateScale(12),
    lineHeight: moderateScale(16),
  },
  address: {
    ...commonStyle.address,
    fontSize: moderateScale(10),
    lineHeight: moderateScale(13),
  },
}

const styles = StyleSheet.create(pickStyle(mobileStyle, desktopStyle))


class SearchItemRestaurant extends React.PureComponent {

  static propTypes = {
    index: PropTypes.number.isRequired,
    selected: PropTypes.bool,
    data: PropTypes.shape({
      name: PropTypes.string.isRequired,
      location: PropTypes.shape({
        address1: PropTypes.string.isRequired,
        city: PropTypes.string,
        state: PropTypes.string,
      }).isRequired,
    }).isRequired,
    onHover: PropTypes.func.isRequired,
    onPress: PropTypes.func.isRequired,
    justCloseRestaurants: PropTypes.bool
  }

  constructor(props) {
    super(props)
    this.handlePress = () => {
      this.props.onPress(this.props.data)
      this.props.history.push(`/r/${this.props.data.location_id}`)
    }
    this.handleMouseEnter = () => {
      this.props.onHover(this.props.index)
    }
    this.handleMouseLeave = () => {
      this.props.onHover(-1)
    }
  }

  render() {
    const { location } = this.props.data
    const address = formatRestaurantAddress(location.address1, location.city, location.state)
    const containerStyle = this.props.selected ? [
      styles.container, styles.containerActive,
    ] : styles.container
    return (
      <Touchable
        onPress={this.handlePress}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <View style={containerStyle}>
          <View style={styles.wrapper}>
            <Image source={this.props.justCloseRestaurants ? CloseRestaurantImage : RestaurantImage} style={styles.icon} />
            <View style={styles.textWrapper}>
              <Text style={styles.name}>
                {this.props.data.name}
              </Text>
              <Text style={styles.address}>
                {address}
              </Text>
            </View>
          </View>
        </View>
      </Touchable>
    )
  }
}


import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { requestSelectRestaurant } from '../restaurant/sagas/select'

const mapStateToProps = null
const mapDispatchToProps = {
  onPress: requestSelectRestaurant,
}

export const SearchItemRestaurantContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchItemRestaurant)

export default withRouter(SearchItemRestaurantContainer)
