import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Text, Image } from 'react-native'
import Touchable from 'Touchable'

import LeafSmallImage from '../img/leaf_small.png'
import LocationImage from '../img/location.png'
import ShareInactiveImage from '../img/share_inactive.png'
import ShareImage from '../img/share.png'
import LikeFullImage from '../img/like_full_middle.png'
import { toggleModal } from '../sharing/reducer'
import { moderateScale, pickStyle } from 'scale'


const commonStyle = {
  infoCard: {
    alignItems: 'center',
    width: '409px',
    marginTop: '60px', /* '150px' */
    minHeight: '246px',
    padding: '20px',
    backgroundColor: '#FFFFFF',
    boxShadow: '0 4px 26px 0 rgba(139,158,170,0.20)',
    borderRadius: '8.64px',
    zIndex: 10,
    marginLeft: '60px', /**/
  },
  restaurantType: {
    fontFamily: '"Source Sans Pro", serif',
    fontSize: '18px',
    color: '#000',
    fontWeight: '200',
    position: 'absolute',
    left: '35px',
    bottom: '40px',
  },
  restaurantName: {
    fontFamily: '"Source Serif Pro", serif',
    fontSize: '24px',
    color: '#000',
    fontWeight: '600',
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
    minWidth: '60px',
    height: '33px',
    paddingHorizontal: '10px',
    backgroundColor: '#DCBF76',
    borderRadius: '120px',
    alignItems: 'center',
    justifyContent: 'center',
  },
  restaurantDistanceText: {
    /* ...commonStyle.sansText, */
    fontSize: '16px',
    color: '#fff',
  },
  infoLocationIcon: {
    width: '27px',
    height: '27px',
    marginRight: '15px',
  },
  shareIcon: {
    width: '22px',
    height: '20px',
    resizeMode: 'contain',
    position: 'absolute',
    bottom: '43px',
    right: '85px',
  },
  restaurantLocationText: {
    fontFamily: '"Source Sans Pro", serif',
    fontSize: '16px',
    color: '#000',
    letterSpacing: 0,
    width: '230px',
    fontWeight: '300',
    marginTop: '4px',
  },
  infoLeafIcon: {
    position: 'absolute',
    width: '29px',
    height: '42px',
    top: '-16px',
    left: '-10px',
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
}

const desktopStyle = {
  ...commonStyle,
}

const mobileStyle = {
  ...commonStyle,
  infoCard: {
    ...commonStyle.infoCard,
    width: moderateScale(327),
    minHeight: moderateScale(207),
    marginLeft: moderateScale(24),
    marginTop: moderateScale(20),
    padding: moderateScale(5),
  },
}
const styles = StyleSheet.create(pickStyle(mobileStyle, desktopStyle))

class RestaurantCard extends React.Component {

    static propTypes = {
      section: PropTypes.string,
      name: PropTypes.string,
      address: PropTypes.string,
      city: PropTypes.string,
      state: PropTypes.string,
      type: PropTypes.string,
      distance: PropTypes.number,
      itemId: PropTypes.string,
      filteredData: PropTypes.array,
      handleCardUnliking: PropTypes.func,
      authenticated: PropTypes.string,
    }

    constructor() {
      super()
    }

    handleUnlike() {
      const params = {
        authenticated: this.props.authenticated,
        sectionSelected: this.props.section,
        type: 'Restaurant',
        itemId: this.props.itemId,
        filteredData: this.props.filteredData,
      }

      this.props.handleCardUnliking(params)
    }

    render() {
      return (
        <View style={styles.infoCard}>
          <Image style={[styles.infoLeafIcon, this.props.section === 'HC' ? { display: 'block' } : { display: 'none' }]} resizeMode="contain" source={LeafSmallImage} />
          <Text style={styles.restaurantName}>{this.props.name}</Text>

          <View style={styles.restaurantLocation}>
            <Image style={styles.infoLocationIcon} resizeMode="contain" source={LocationImage} />
            <Text style={styles.restaurantLocationText}>
              {this.props.address}, {this.props.city}, {this.props.state}
            </Text>
          </View>
          <Text style={styles.restaurantType}>{this.props.type}</Text>
          <Touchable onPress={() => this.handleUnlike()}>
            <Image style={styles.infoLikeIcon} resizeMode="contain" source={LikeFullImage} />
          </Touchable>
          <Touchable onPress={() => this.props.toggleModal()}>
            <Image style={styles.shareIcon} resizeMode="contain" source={ShareImage} />
          </Touchable>
          <View style={styles.restaurantDistance}>
            <Text style={styles.restaurantDistanceText}>{Number(`${Math.round(`${this.props.distance}e1`)}e-1`)} Mi</Text>
          </View>
        </View>
      )
    }
}

import { connect } from 'react-redux'
import { requesthCardUnliking } from './sagas/liking'

const mapStateToProps = (state) => ({
  authenticated: state.auth.token,
  filteredData: state.cards.filteredData,
})
const mapDispatchToProps = {
  handleCardUnliking: requesthCardUnliking,
  toggleModal,
}

export const RestaurantCardContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(RestaurantCard)
export default RestaurantCardContainer
