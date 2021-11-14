import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Text, TextInput } from 'react-native'
import SearchInput from './search/SearchInput'
import AllergyQuestionItem from './AllergyQuestionItem'
import QuestionSelectedItem from './QuestionSelectedItem'

const styles = StyleSheet.create({
  searchWrapper: {
    width: '100%',
    minWidth: '400px',
    maxWidth: '620px',
    paddingLeft: '32px',
    paddingRight: '32px',
    justifyContent: 'center',
  },
  wrap: {
    width: '620px',
  },
  outer: {
    position: 'absolute',
    left: '-102px',
    top: '42px',
  },
  container: {
    height: '66px',
    marginLeft: '10px',
    marginRight: '10px',
    marginTop: '16px',
    marginBottom: '8px',
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: 'auto',
    overflow: 'hidden',
    // TODO: ask the designer to convert Sketch shadow to css shadow
    boxShadow: '0 0 30px 0 rgba(96,143,171,0.2)',
    borderTopLeftRadius: '40px',
    borderTopRightRadius: '40px',
    borderBottomRightRadius: '40px',
  },
  text: {
    fontFamily: '"Source Sans Pro", sans-serif',
    fontSize: '20px',
    lineHeight: '66px',
    color: '#000000',
    whiteSpace: 'nowrap',
    paddingHorizontal: '40px',
  },
  answers: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 'auto',
  },
  items: {
    marginTop: '32px',
    display: 'flex',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: '0%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 0,
  },
  selectedItems: {
    marginTop: '32px',
    display: 'flex',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: '0%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  selectedItemsWrap: {
    position: 'absolute',
    left: '-70px',
    right: 0,
    width: '830px',
    maxHeight: '158px',
    overflow: 'hidden',
    alignItems: 'baseline',
    bottom: '-282px',
  },
  inner: {
    display: 'flex',
    width: '100%',
  }
})

class AllergyQuestion extends React.Component {

  static propTypes = {
    type: PropTypes.string
  }

  constructor(props) {
    super(props)

    this.state = {
      suggestions: []
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
    this.toggleSelect = this.toggleSelect.bind(this)
    this.handleAllergenRemoval = this.handleAllergenRemoval.bind(this)
  }

  componentDidMount() {
    if (!this.props.allergens.length) {
      this.props.requestAllergens()
    }
  }

  handleChange(value) {
    if (value.length < 3) {
      this.setState({ suggestions: [] })
      return
    }

    value = value.toLowerCase()

    const suggestions = this.props.allergens.filter(allergy =>
      allergy.name.toLowerCase().indexOf(value) === 0)

    this.setState({ suggestions })
  }

  handleSelect(allergen) {
    this.props.toggleAllergen(allergen.id)
    this.setState({ suggestions: [] })
  }

  toggleSelect(allergen) {
    this.props.toggleAllergen(allergen.id)
  }

  handleAllergenRemoval(allergenId) {
    if (!this.isSelectedAllergen(allergenId)) {
      return
    }

    this.props.toggleAllergen(allergenId)
  }

  isSelectedAllergen(allergenId) {
    return this.props.selected.some(id => id === allergenId)
  }

  getAllergen(allergenId) {
    return this.props.allergens.find(allergen => allergen.id === allergenId)
  }

  render() {
    if (!this.props.allergens.length) {
      return null
    }

    const commonAllergens = [
      {id: 'milk', name: 'Milk'}, {id: 'egg', name: 'Egg'},
      {id: 'peanut', name: 'Peanuts'}, {id: 'tree nut', name: 'Tree Nut'},
      {id: 'shellfish', name: 'Shellfish'}, {id: 'fish', name: 'Fish'},
      {id: 'soy', name: 'Soy'}, {id: 'wheat', name: 'Wheat'}
    ]

    const items = Object.values(commonAllergens).map((allergen, i) => {
      const selected = this.isSelectedAllergen(allergen.id)

      return (
        <AllergyQuestionItem
          key={`commonAllergen-${i}`}
          item={allergen}
          selected={selected}
          onPress={this.toggleSelect}
        />
      )
    })

    const selectedItems = Object.values(this.props.selected).map((allergenId, i) => {
      const allergen = this.getAllergen(allergenId)
      if (!allergen) {
        return null
      }

      return (
        <QuestionSelectedItem
          key={`answer-${i}`}
          item={allergen}
          onRemovePress={this.handleAllergenRemoval}
        />
      )
    })

    return (
      <View style={styles.wrap}>
        <View style={styles.outer}>
          <View style={styles.container}>
            <Text style={styles.text}>Tell us about any allergies you may have</Text>
          </View>
        </View>

        <View style={styles.answers}>
          <View style={styles.inner}>
            <View style={styles.selectedItemsWrap}>
              <View style={styles.selectedItems}>
                {selectedItems}
              </View>
            </View>
          </View>

          <SearchInput
            suggestions={this.state.suggestions}
            handleChange={this.handleChange}
            handleSelect={this.handleSelect}
            placeholder='Start typing an ingredient'
            isForQuestionnaire={true}
          />

          <View style={styles.items}>
            {items}
          </View>
        </View>
      </View>
    )
  }

}

import { connect } from 'react-redux'
import { requestAllergens } from './sagas/data'
import { toggleAllergen } from '../actions/answers'

const mapStateToProps = (state) => ({
  allergens: state.question_data.allergens,
  selected: state.answers.allergens
})
const mapDispatchToProps = {
  requestAllergens,
  toggleAllergen
}

export const AllergyQuestionContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AllergyQuestion)

export default AllergyQuestionContainer
