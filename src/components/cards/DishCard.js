import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Text, Image } from 'react-native'
import Touchable from 'Touchable'
import LeafSmallImage from '../img/leaf_small.png'
import SpoonsImage from '../img/spoons.png'
import PhoneImage from '../img/phone.png'
import LocationSmallImage from '../img/location_small.png'
import ArrowMenuImage from '../img/arrow_menu.png'
import DownTickImage from '../img/tick_down.png'
import UpTickImage from '../img/tick_up.png'

import LikeDishImage from '../img/likedish.png'
import ShareInactiveImage from '../img/share_inactive.png'
import { toggleModal } from '../sharing/reducer'
import ShareImage from '../img/share.png'
import { moderateScale, pickStyle } from 'scale'

const commonStyle = {
  container: {
    width: '409px', /**/
    marginTop: '60px', /**/
    marginLeft: '60px', /**/
  },
  card: {
    width: '409px', /* 320px */
    minHeight: '220px',
    padding: '25px',
    backgroundColor: '#FFFFFF',
    boxShadow: '0 4px 26px 0 rgba(139,158,170,0.20)',
    borderRadius: '8.64px',
    marginRight: '20px', /**/
  },
  cardHeader: {
    fontFamily: '"Source Serif Pro", serif',
    fontSize: '24px',
    color: '#000000',
    fontWeight: '600',
  },

  cardText: {
    marginTop: '10px',
    fontFamily: '"Source Sans Pro", serif',
    fontSize: '20px',
    color: '#000000',
    fontWeight: '300',
  },

  cardIcons: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: '25px',
  },

  leafIcon: {
    display: 'inline-block',
    width: '20px',
    height: '19px',
  },
  leafIconLast: {
    display: 'inline-block',
    width: '20px',
    height: '19px',
    marginLeft: '10px',
  },

  restaurantContainer: {
    padding: '25px',
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
    fontFamily: '"Source Serif Pro", serif',
    fontSize: '18px',
    color: '#000000',
    fontWeight: '300',
  },
  restaurantInfo: {
    padding: '5px',
    paddingTop: '25px',
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
    fontFamily: '"Source Sans Pro", serif',
    fontSize: '14px',
    color: '#DCBF76',
    letterSpacing: '0',
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
    fontFamily: '"Source Sans Pro", serif',
    fontSize: '14px',
    color: '#000000',
    letterSpacing: '0',
  },
  infoTextDistance: {
    position: 'relative',
    top: '-10px',
    textAlign: 'right',
    fontFamily: '"Source Sans Pro", serif',
    fontWeight: 'bold',
    fontSize: '14px',
    color: '#000000',
    letterSpacing: '0',
    marginTop: '15px',
  },
  phoneIcon: {
    width: '12px',
    height: '12px',
    resizeMode: 'contain',
    marginRight: '10px',
  },
  locationIcon: {
    width: '11px',
    height: '13px',
    resizeMode: 'contain',
    marginRight: '10px',
  },
  spoonsIcon: {
    flex: 1,
    width: '19px',
    marginRight: '10px',
  },
  downTickIcon: {
    display: 'inline-block',
    width: '11px',
    height: '20px',
  },
}

const desktopStyle = {
  ...commonStyle,
}

const mobileStyle = {
  ...commonStyle,
  container: {
    ...commonStyle.container,
    width: moderateScale(327),
    marginLeft: moderateScale(24),
    marginTop: moderateScale(20),
  },
  card: {
    ...commonStyle.card,
    width: moderateScale(327),
  },
}
const styles = StyleSheet.create(pickStyle(mobileStyle, desktopStyle))

class DishCard extends React.Component {
    static propTypes = {
      section: PropTypes.string,
      name: PropTypes.string,
      description: PropTypes.string,
      restaurant: PropTypes.object,
      itemId: PropTypes.string,
      filteredData: PropTypes.array,
      handleCardUnliking: PropTypes.func,
      authenticated: PropTypes.string,
      distance: PropTypes.number,
    }

    constructor() {
      super()
      this.state = {
        isInfoVisible: false,
      }
      this.toggleInfo = this.toggleInfo.bind(this)
    }

    handleUnlike() {
      const params = {
        authenticated: this.props.authenticated,
        sectionSelected: this.props.section,
        type: 'MenuItem',
        itemId: this.props.itemId,
        filteredData: this.props.filteredData,
      }

      this.props.handleCardUnliking(params)
    }

    toggleInfo() {
      this.setState({ isInfoVisible: !this.state.isInfoVisible })
    }

    openRestaurant() {
      // this.props.requestSelectRestaurant(this.props.restaurant)
      // this.props.history.push(`/r/${this.props.restaurant.string_id}`)
    }

    render() {
      const linkMenu = `/r/${this.props.restaurant.string_id}`
      return (
        <View style={styles.container}>
          <View style={styles.card}>
            <Text style={styles.cardHeader}>{this.props.name}</Text>
            <Text style={styles.cardText}>
              {this.props.description}
            </Text>

            <View style={styles.cardIcons}>
              <Image style={[styles.leafIcon, this.props.section === 'HC' ? { display: 'block' } : { display: 'none' }]} resizeMode="contain" source={LeafSmallImage} />

              <div>
                <Touchable onPress={() => this.handleUnlike()}>
                  <Image style={styles.leafIcon} resizeMode="contain" source={LikeDishImage} />
                </Touchable>
                <Touchable onPress={() => this.props.toggleModal()}>
                  <Image style={styles.leafIconLast} resizeMode="contain" source={ShareImage} />
                </Touchable>
              </div>

            </View>
          </View>

          <View style={styles.restaurantContainer}>
            <Touchable onPress={() => this.toggleInfo()}>
              <View style={styles.restaurant}>
                <View style={styles.restaurantNameContainer}>
                  <Image style={styles.spoonsIcon} resizeMode="contain" source={SpoonsImage} />
                  <Text style={styles.restaurantName}>{this.props.restaurant.name}</Text>
                </View>

                <Image
                  style={styles.downTickIcon}
                  resizeMode="contain"
                  source={this.state.isInfoVisible ? UpTickImage : DownTickImage}
                />
              </View>
            </Touchable>

            {this.state.isInfoVisible &&
              <View style={styles.restaurantInfo}>
                <View style={styles.restaurantInfoRow}>
                  <Image style={styles.phoneIcon} source={PhoneImage} />
                  <Text style={styles.infoText}>{this.props.restaurant.phone}</Text>
                </View>
                <View style={styles.restaurantInfoRow}>
                  <Image style={styles.locationIcon} source={LocationSmallImage} />
                  <Text style={styles.infoText}>{this.props.restaurant.location.address1}</Text>
                  <Text style={styles.infoTextDistance}>{`${this.props.distance.toString().slice(0, 4)} mi`}</Text>
                </View>
                <Touchable onPress={() => this.openRestaurant()}>
                  <View style={styles.restaurantInfoMenuLink}>
                    <Text style={styles.infoMenuLink} href={linkMenu} accessibilityRole="link">See Menu</Text>
                    <Image style={styles.infoMenuImage} source={ArrowMenuImage} />
                  </View>
                </Touchable>
              </View>
            }
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

export const DishCardContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DishCard)
export default DishCardContainer
