import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, TextInput } from 'react-native'
import _ from 'lodash'
import SearchInputEl from './SearchInputEl'
import SearchItemList from './SearchItemList'
import { moderateScale, pickStyle } from 'scale'

const commonStyle = {
  container: {
    zIndex: -5,
    marginBottom: 30,
  },
  searchWrapper: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: '10px',
    boxShadow: '0 0 30px 0 rgba(96,143,171,0.2)',
  },
  inputWrapper: {
    flex: 1,
    justifyContent: 'center',
  },
}

const desktopStyle = {
  container: {
    marginTop: 120,
    marginBottom: 60,
  },
  searchWrapper: {
    ...commonStyle.searchWrapper,
  },
  inputWrapper: {
    ...commonStyle.inputWrapper,
    paddingTop: 23,
    paddingBottom: 26,
    paddingLeft: 44,
    paddingRight: 44,
  },
}

const mobileStyle = {
  container: {
    marginTop: 100,
  },
  searchWrapper: {
    ...commonStyle.searchWrapper,
  },
  inputWrapper: {
    ...commonStyle.inputWrapper,
    height: moderateScale(60),
    minHeight: moderateScale(60),
    paddingLeft: moderateScale(20),
    paddingRight: moderateScale(20),
  },
}
const styles = StyleSheet.create(pickStyle(mobileStyle, desktopStyle))


class SearchInput extends React.Component {

  static propTypes = {
    restaurants: PropTypes.array,
    cities: PropTypes.array,
    handleReset: PropTypes.func,
    handleChange: PropTypes.func,
    handleSelect: PropTypes.func,
    updateCity: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = {
      selectedResultIndex: -1,
      value: '',
    }
    this.onKeyDown = this.onKeyDown.bind(this)
    this.update = this.update.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleHover = this.handleHover.bind(this)
  }

  onKeyDown(ev) {
    const rests = this.props.restaurants.slice(0, 4)
    const cities = this.props.cities.slice(0, 2)
    const combined = rests.concat(cities)
    const { length } = combined
    const { selectedResultIndex } = this.state
    switch (ev.keyCode) {
      case 13:
      ev.preventDefault()
      ev.stopPropagation()
      if (selectedResultIndex < 0) {
        return
      }
      if (rests.length === 0 && _.isUndefined(cities[selectedResultIndex])) {
        return
      }
      if (selectedResultIndex <= cities.length - 1) {
        this.update(cities[selectedResultIndex])
        this.props.handleReset()
      }
      if (!_.isUndefined(rests[selectedResultIndex - cities.length])) {
      const restaurantData = rests[selectedResultIndex - cities.length]
      this.props.handleSelect(restaurantData)
      this.props.history.push(`/r/${restaurantData.location_id}`)
      this.props.handleReset()
    } else if (cities.length !== 0) {
      this.update(cities[selectedResultIndex])
      this.props.handleReset()
    } else {
      this.props.handleReset()
    }
      break
    case 40: { // down
      let nextSelectedResultIndex = selectedResultIndex + 1
      if (nextSelectedResultIndex >= length) {
        nextSelectedResultIndex = 0
      }
      this.setState({ ...this.state, selectedResultIndex: nextSelectedResultIndex })
    }
      break
    case 38: { // up
      let nextSelectedResultIndex = selectedResultIndex - 1
      if (nextSelectedResultIndex < 0) {
        nextSelectedResultIndex = length - 1
      }
      if (selectedResultIndex == null) { nextSelectedResultIndex = -1 }
      this.setState({ ...this.state, selectedResultIndex: nextSelectedResultIndex })
    }
      break
    default:
      break
    }
  }


  handleChange(event) {
    const { value } = event.target
    if (!value || value === '') {
      this.setState({ value: '', selectedResultIndex: -1 })
      this.props.handleReset()
    } else {
      this.setState({
        value
      })
      this.props.handleChange(value)
    }
  }

  handleHover(index) {
    this.setState({ selectedResultIndex: index })
  }

  update(city) {
    this.props.handleReset()
    this.props.updateCity(city)
    this.setState({ value: city })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.searchWrapper}>

          <View style={styles.inputWrapper}>
            <SearchInputEl
              onFocus={this.props.handleChange}
              onChange={this.handleChange}
              placeholder="Enter a restaraunt or location"
              onKeyDown={this.onKeyDown}
              value={this.state.value}
            />
          </View>
          <SearchItemList
            onHover={this.handleHover}
            restaurants={this.props.restaurants}
            cities={this.props.cities}
            selectedIndex={this.state.selectedResultIndex}
            updateCity={this.update}
            justCloseRestaurants={this.props.justCloseRestaurants}
          />
        </View>
      </View>
    )
  }

}


import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { resetSearch } from './actions/reset'
import { requestSearch } from './sagas/search'
import { requestSelectRestaurant } from '../restaurant/sagas/select'

const mapStateToProps = (state) => ({
  selected: state.restaurant.selected,
  restaurants: state.search.restaurants,
  cities: state.search.cities,
  justCloseRestaurants: state.search.justCloseRestaurants,
})
const mapDispatchToProps = {
  handleChange: requestSearch,
  handleReset: resetSearch,
  handleSelect: requestSelectRestaurant,
}

export const SearchInputContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchInput)
export default withRouter(SearchInputContainer)
