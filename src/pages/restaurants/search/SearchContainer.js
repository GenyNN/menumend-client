import React from 'react'
import { StyleSheet, View, Text, TextInput, Image } from 'react-native'
import { isEmpty } from 'lodash'
import post from '../post'
import _ from 'lodash'
import Header from '../Header'
import SearchInput from './SearchInput'
import { moderateScale, pickStyle } from 'scale'
import DishCardList from '../DishCardList'
import RestaurantList from '../RestaurantList'
import Touchable from '../../../Touchable'
import PopupModal from '../auth/PopupModal'
import UserProfile from '../auth/UserProfile'
import TakeSurveyBlock from '../TakeSurveyBlock'
import mobileImage from '../../../../static/img/landing/explore.png'
import { requestHealthyChoices } from '../homepage/actions'
import { toggleModal } from '../restaurant/sharing/reducer'
import { sans, serif } from 'fonts'
import Subscribe from './Subscribe'
import SearchToscana from './SearchToscana'
import SearchMobileSection from './SearchMobileSection'


const commonStyle = {
  container: {
    flex: 1,
    alignItems: 'center',
    minHeight: 600-88,
  },
  wrapper: {
    width: '100%',
    minWidth: '300px',
    maxWidth: '620px',
  },

  topDishes: {
      width: window.innerWidth,
      minHeight: '1046px',
      height: '1046px',
      paddingTop: '100px',
      paddingBottom: 68,
      alignItems: 'center',
      backgroundColor: 'rgba(247, 249, 250, 0.5)',
    },

    topRestaurants: {
        width: window.innerWidth,
        minHeight: '850px',
        paddingTop: '100px',
        alignItems: 'center',
        backgroundColor: 'white',
      },

    topHealthyChoices: {
      width: window.innerWidth,
      minHeight: 1015,
      alignItems: 'center',
      paddingTop: 313,
      backgroundColor: '#EAF0EC',
    },

    healthyRestaurants: {
        width: window.innerWidth,
        minHeight: '850px',
        paddingTop: '100px',
        alignItems: 'center',
        backgroundColor: '#FBFCFC',
      },

    header: {
      ...serif({
        fontSize: '36px',
        color: '#000000',
        letterSpacing: '0',
      }),
    },

    subheader: {
      ...sans({
        fontSize: '24px',
        fontWeight: '300',
        color: '#000000',
        letterSpacing: '0',
      }),
      marginTop: '30px',
      width: '650px',
      textAlign: 'center',
    },

    surveyWrap: {
      position: 'absolute',
      zIndex: 12,
      left: 0,
      right: 0,
      top: '-212px',
      margin: 'auto',
      width: '620px',
      height: '426px',
    },
}

const desktopStyle = {
  ...commonStyle,
  subheader: {
    ...commonStyle.subheader,
    fontSize: 24,
    lineHeight: 31,
  },
}

const mobileStyle = {
  ...commonStyle,
  subheader: {
    ...commonStyle.subheader,
    paddingLeft: moderateScale(48),
    paddingRight: moderateScale(48),
    fontSize: moderateScale(14),
    lineHeight: moderateScale(18),
  },
}

const styles = StyleSheet.create(pickStyle(mobileStyle, desktopStyle))

class SearchContainer extends React.Component {

  constructor() {
    super()
    this.state = {
      userSubscribed: 'none',
      city: 'none',
      initialLoad: false,
    }
    this.updateCity = this.updateCity.bind(this)
    this.handleFavourite = this.handleFavourite.bind(this)
  }


  componentDidMount() {
    window.onpopstate = null
  }

  componentWillMount() {
    if (_.isUndefined(this.props.healthyChoices.data)) {
      this.props.requestHealthyChoices('undef')
    }
  }

  updateCity(city) {
    console.log(city)
    this.props.requestHealthyChoices(city)
    this.setState({
      city
    })
  }


  handleFavourite(method, token, section, itemType, itemId) {
    this.props.toggleFavourite(method, token, section, itemType, itemId)
  }

  render() {
    let healthyChoices = _.isUndefined(this.props.healthyChoices.data) ? null : this.props.healthyChoices.data.healthyChoices[0]
    let topDishes = _.isUndefined(this.props.healthyChoices.data) ? null : this.props.healthyChoices.data.healthyChoices[1]
    try {
    if (!_.isUndefined(this.props.favourites.allFavourites) && healthyChoices !== null && topDishes !== null) {
      let favs = this.props.favourites.allFavourites.map((item) => item.item.id)

        healthyChoices.items.forEach(function(h) {
        if (_.includes(favs, h.id)) {
          h.favourite = true
        } else {
          h.favourite = false
        }
      })
      healthyChoices.restaurants.forEach(function(hr) {
        if (_.includes(favs, hr.id)) {
          hr.favourite = true
        } else {
          hr.favourite = false
        }
        hr.healthyItems.forEach(function(hi) {
          if (_.includes(favs, hi.id)) {
            hi.favourite = true
          } else {
            hi.favourite = false
          }
        })
      })
      topDishes.items.forEach(function(d) {
        if (_.includes(favs, d.id)) {
          d.favourite = true
        } else {
          d.favourite = false
        }
      })
      topDishes.restaurants.forEach(function(dr) {
        if (_.includes(favs, dr.id)) {
          dr.favourite = true
        } else {
          dr.favourite = false
        }
        dr.healthyItems.forEach(function(di) {
          if (_.includes(favs, di.id)) {
            di.favourite = true
          } else {
            di.favourite = false
          }
        })
      })
    }
  }
  catch (e) {
    console.log(e)
  }

      console.log(topDishes)
      console.log(healthyChoices)

    return (
      <View>
        <View style={styles.container}>
          <SearchToscana />
          <Header />
          <View style={styles.wrapper}>
            <SearchInput updateCity={this.updateCity} />
          </View>
        </View>

        <View style={styles.topDishes}>
          <Text style={styles.header}>Top Dishes {this.state.city === 'none' ? 'Near You' : `in ${this.state.city}`}</Text>
          <Text style={styles.subheader}>
            We found delicious dishes on restaurant menus for you. Take the survey below and we will personalize our recommendations.
          </Text>
          <DishCardList
            keyPrefix="top-dishes-"
            data={topDishes ? topDishes.items : null}
            onShare={this.props.toggleModal}
            toggleFavourite={this.handleFavourite}
            token={this.props.token}
          />
        </View>

        {this.props.token.length > 0 ? <View style={styles.topRestaurants}>
          <Text style={styles.header}>Top Restaurants {this.state.city === 'none' ? 'Near You' : `in ${this.state.city}`}</Text>
          <Text style={styles.subheader}>
            You’ll love most of the menu in these restaurants
          </Text>
          <RestaurantList data={topDishes ? topDishes.restaurants : null} onShare={this.props.toggleModal} toggleFavourite={this.handleFavourite} token={this.props.token} requestSelectRestaurant={this.props.requestSelectRestaurant}/>
        </View> : null}

        <View style={styles.topHealthyChoices}>
          <TakeSurveyBlock style={styles.surveyWrap} />
          <Text style={styles.header}>Top Healthy Choices {this.state.city === 'none' ? 'Near You' : ` in ${this.state.city}`}</Text>
          <Text style={styles.subheader}>
            We discover healthy dishes on restaurant menus for you
          </Text>
          <DishCardList
            keyPrefix="top-hc-"
            data={healthyChoices ? healthyChoices.items : null}
            onShare={this.props.toggleModal}
            toggleFavourite={this.handleFavourite}
            token={this.props.token}
          />
        </View>

        {this.props.token.length > 0 ? <View style={styles.healthyRestaurants}>
          <Text style={styles.header}>Top Healthy Restaurants {this.state.city === 'none' ? 'Near You' : ` in ${this.state.city}`}</Text>
          <Text style={styles.subheader}>
            We’ve curated restaurants near you with most healthy dishes on the menu
          </Text>
          <RestaurantList data={healthyChoices ? healthyChoices.restaurants : null} onShare={this.props.toggleModal} toggleFavourite={this.handleFavourite} token={this.props.token} requestSelectRestaurant={this.props.requestSelectRestaurant}/>
        </View> : null}

        <SearchMobileSection />
        <Subscribe />

      </View>
    )
  }
}

import { connect } from 'react-redux'
import { toggleFavourite } from '../favourite/actions'


const mapStateToProps = (state) => ({
  healthyChoices: state.healthyChoices,
  token: state.auth.token,
  favourites: state.favourites.all,
})

const mapDispatchToProps = {
  requestHealthyChoices,
  toggleModal,
  toggleFavourite,
}

export const SearchContainerContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchContainer)
export default SearchContainerContainer
