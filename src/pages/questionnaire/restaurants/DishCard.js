import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Text, Image } from 'react-native'
import Touchable from 'Touchable'

import LeafSmallImage from './img/leaf_small.png'
import SpoonsImage from './img/spoons.png'
import DownTickImage from './img/tick_down.png'
import UpTickImage from './img/tick_up.png'
import LikeEmptyMediumImage from './img/like_empty_medium.png'
import ShareInactiveImage from './img/share_inactive.png'
import PhoneImage from './img/phone.png'
import LocationSmallImage from './img/location_small.png'

const styles = StyleSheet.create({
  container: {
  },
  card: {
    width: '320px',
    minHeight: '220px',
    padding: '25px',
    backgroundColor: '#FFFFFF',
    boxShadow: '0 4px 26px 0 rgba(139,158,170,0.20)',
    borderRadius: '10px'
  },
  cardHeader: {
    fontFamily: '"Source Serif Pro", serif',
    fontSize: '19px',
    color: '#000000',
  },

  cardText: {
    marginTop: '14px',
    fontFamily: '"Source Sans Pro", serif',
    fontSize: '16px',
    color: '#000000',
    fontWeight: '200',
  },

  cardIcons: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: '25px'
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
    fontSize: '14px',
    color: '#000000',
    letterSpacing: '0'
  },
  restaurantInfo: {
    padding: '25px'
  },
  restaurantInfoRow: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: '15px',
    alignItems: 'baseline'
  },
  infoText: {
    display: 'inline-block',
    fontFamily: '"Source Sans Pro", serif',
    fontSize: '14px',
    color: '#000000',
    letterSpacing: '0'
  },
  phoneIcon: {
    display: 'inline-block',
    width: '12px',
    marginRight: '10px'
  },
  locationIcon: {
    display: 'inline-block',
    width: '11px',
    marginRight: '10px'
  },
  spoonsIcon: {
    display: 'inline-block',
    width: '19px',
    marginRight: '10px'
  },
  downTickIcon: {
    display: 'inline-block',
    width: '11px',
    height: '20px'
  }
})


class DishCard extends React.Component {
  static propTypes = {
    dish: PropTypes.object
  }

  constructor(props) {
    super(props)

    this.state = {
      isInfoVisible: false
    }

    this.toggleInfo = this.toggleInfo.bind(this)
  }

  toggleInfo() {
    this.setState({ isInfoVisible: !this.state.isInfoVisible })
  }

  render() {
    const dish = this.props.dish
    const isHealthy = !!dish.tags['healthy-choice']

    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.cardHeader}>{dish.name}</Text>
          <Text style={styles.cardText}>
            {dish.description.capitalize()}
          </Text>

          <View style={styles.cardIcons}>
            {isHealthy &&
              <Image style={styles.leafIcon} resizeMode="contain" source={LeafSmallImage} />
            }

            {/*<div>*/}
              {/*<Touchable>*/}
                {/*<Image style={styles.leafIcon} resizeMode="contain" source={LikeEmptyMediumImage} />*/}
              {/*</Touchable>*/}
              {/*<Touchable>*/}
                {/*<Image style={styles.leafIconLast} resizeMode="contain" source={ShareInactiveImage} />*/}
              {/*</Touchable>*/}
            {/*</div>*/}
          </View>
        </View>

        <View style={styles.restaurantContainer}>
          <Touchable onPress={this.toggleInfo}>
            <View style={styles.restaurant}>
              <View style={styles.restaurantNameContainer}>
                <Image style={styles.spoonsIcon} resizeMode="contain" source={SpoonsImage} />
                <Text style={styles.restaurantName}>{dish.restaurant.name}</Text>
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
                <Image style={styles.phoneIcon} resizeMode="contain" source={PhoneImage} />
                <Text style={styles.infoText}>{dish.restaurant.phone}</Text>
              </View>
              <View style={styles.restaurantInfoRow}>
                <Image style={styles.locationIcon} resizeMode="contain" source={LocationSmallImage} />
                <Text style={styles.infoText}>{dish.restaurant.location.address1}</Text>
              </View>
            </View>
          }
        </View>
      </View>
    )
  }
}

export default DishCard
