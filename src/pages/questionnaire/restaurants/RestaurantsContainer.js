import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Text, TextInput } from 'react-native'
import Header from '../Header'
import BackwardButton from '../BackwardButton';
import {prevStep} from '../actions/questionnaire'
import DishCardList from './DishCardList'
import RestaurantList from './RestaurantList'
import MenuUnfolded from '../Menu/desktop/MenuUnfolded'
import CitySearch from './search/CitySearch'


const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  searchContainer: {
    position: 'relative',
    minWidth: '300px',
    width: '640px',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: '120px',
    zIndex: 10
  },

  healthyChoices: {
    boxShadow: 'inset 0 0 30px 0 rgba(96,143,171,0.20)',
    width: '100%',
    minHeight: '770px',
    paddingTop: '120px',
    alignItems: 'center',
    backgroundColor: 'rgba(247,249,250,0.50)',
    paddingBottom: '100px'
  },

  healthyRestaurants: {
    minHeight: '1000px',
    alignItems: 'center',
    paddingTop: '120px',
    paddingBottom: '150px',
    backgroundColor: '#fff',
  },

  header: {
    fontFamily: '"Source Serif Pro", serif',
    fontSize: '36px',
    color: '#000000',
  },
  description: {
    fontFamily: '"Source Sans Pro", serif',
    fontSize: '24px',
    marginTop: '45px',
    width: '600px',
    color: '#000000',
    textAlign: 'center',
    fontWeight: '200',
  },
  subheader: {
    fontFamily: '"Source Sans Pro", serif',
    fontSize: '28px',
    marginTop: '30px',
    width: '600px',
    color: '#000000',
    textAlign: 'center',
    fontWeight: '300',
  }
})

class Restaurants extends React.Component {
  static propTypes = {
  }

  constructor(props) {
    super(props)

    this.state = {
      restaurant: null,
      suggestions: [],
      isMenuVisible: false,
    }

    this.handleBackwardPress = this.handleBackwardPress.bind(this)
    this.handleShowMenu = this.handleShowMenu.bind(this)
    this.handleCloseMenu = this.handleCloseMenu.bind(this)
    this.handleAfterSlide = this.handleAfterSlide.bind(this)
  }

  componentDidMount() {
    if (!this.props.city) {
      this.props.setCurrentCity({
        city: 'Burbank',
        state: 'CA'
      })
    }
  }

  handleBackwardPress() {
    this.props.onBackwardPress()
  }


  handleCloseMenu() {
    this.setState({ isMenuVisible: false })
    this.props.resetRestaurant()
  }

  handleShowMenu() {
    this.setState({ isMenuVisible: true })
  }

  handleAfterSlide(slideIndex) {
    const restaurant = this.props.topRestaurants[slideIndex]
    if (restaurant) {
      this.setState({ restaurant })
    }

    if (!this.state.isMenuVisible) {
      return
    }

    setTimeout(() => {
      this.handleCloseMenu()
    }, 500)
  }

  render() {
    return (
      <View style={styles.container}>
        <Header text="For You" />

        <View style={styles.searchContainer}>
          <BackwardButton onPress={this.handleBackwardPress} onForYouPage={true} />

          <Text style={styles.description}>
            Enter a restaurant or city to see top recommendations for you
          </Text>

          <CitySearch />
        </View>

        <View style={styles.healthyChoices}>
          <Text style={styles.header}>Top Dishes For You</Text>

          <Text style={styles.subheader}>
            We have searched thousands of menus to find best dishes for you
          </Text>

          <DishCardList dishes={this.props.topDishes} />
        </View>

        <View style={styles.healthyRestaurants}>
          <Text style={styles.header}>Top Restaurants For You</Text>

          <Text style={styles.subheader}>
            You'll love most of the menu in these restaurants
          </Text>

          <RestaurantList restaurants={this.props.topRestaurants} handleShowMenu={this.handleShowMenu} handleAfterSlide={this.handleAfterSlide} />

          {this.state.isMenuVisible &&
            <MenuUnfolded selectedItem={null} handleClose={this.handleCloseMenu} />
          }
        </View>

      </View>
    )
  }
}

import { connect } from 'react-redux'
import { resetRestaurant, setCurrentCity } from './sagas/data'

const mapStateToProps = (state) => ({
  topRestaurants: state.restaurants.topRestaurants,
  topDishes: state.restaurants.topDishes,
  city: state.restaurants.currentCity,
})
const mapDispatchToProps = {
  onBackwardPress: prevStep,
  setCurrentCity,
  resetRestaurant
}

export const RestaurantsContainer = connect(mapStateToProps, mapDispatchToProps)(Restaurants)
export default RestaurantsContainer
