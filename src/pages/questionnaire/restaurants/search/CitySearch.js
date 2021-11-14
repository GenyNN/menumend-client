import React from 'react'
import SearchInput from './SearchInput'


class CitySearch extends React.Component {
  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
    this.handleSelect = this.handleSelect.bind(this)

  }

  handleChange(value) {
    this.props.requestCitySuggestions(value)
  }

  handleSelect(cityData) {
    this.props.requestCitySuggestions('')
    this.props.setCurrentCity({
      city: cityData.city.name,
      state: cityData.city.state,
    })
  }

  render() {
    let suggestions = this.props.suggestions.length ? this.props.suggestions : []
    suggestions = suggestions.map(city => {
      return {
        id: (city.name + city.state).toLowerCase(),
        name: `${city.name}, ${city.state}`,
        city: city
      }
    })

    return (
      <SearchInput
        suggestions={suggestions}
        handleChange={this.handleChange}
        handleSelect={this.handleSelect}
        placeholder='Enter city or restaurant'
        isForQuestionnaire={true}
      />
    )
  }
}

import { connect } from 'react-redux'
import { requestCitySuggestions, setCurrentCity } from '../sagas/data'

const mapStateToProps = (state) => ({
  suggestions: state.restaurants.citySuggestions
})
const mapDispatchToProps = {
  requestCitySuggestions,
  setCurrentCity
}

export const CitySearchContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CitySearch)
export default CitySearchContainer
