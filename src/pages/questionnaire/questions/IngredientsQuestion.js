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

class IngredientsQuestion extends React.Component {

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
    this.handleIngredientRemoval = this.handleIngredientRemoval.bind(this)
  }

  componentDidMount() {
    if (!this.props.ingredients.length) {
      this.props.requestDislikedIngredients()
    }
  }

  handleChange(value) {
    if (value.length < 3) {
      this.setState({ suggestions: [] })
      return
    }

    value = value.toLowerCase()

    const suggestions = this.props.ingredients.filter(allergy =>
      allergy.name.toLowerCase().indexOf(value) === 0)

    this.setState({ suggestions })
  }

  handleSelect(ingredient) {
    this.props.toggleDislikedIngredient(ingredient.id)
    this.setState({ suggestions: [] })
  }

  toggleSelect(ingredient) {
    this.props.toggleDislikedIngredient(ingredient.id)
  }

  handleIngredientRemoval(ingredientId) {
    if (!this.isSelectedIngredient(ingredientId)) {
      return
    }

    this.props.toggleDislikedIngredient(ingredientId)
  }

  isSelectedIngredient(ingredientId) {
    return this.props.selected.some(id => id === ingredientId)
  }

  getIngredient(ingredientId) {
    return this.props.ingredients.find(ingredient => ingredient.id === ingredientId)
  }

  render() {
    if (!this.props.ingredients.length) {
      return null
    }

    const commonIngredients = [
      {id: 'anchovies', name: 'Anchovies'}, {id: 'beets', name: 'Beets'},
      {id: 'blue cheese', name: 'Blue Cheese'}, {id: ' cauliflower', name: 'Cauliflower'},
      {id: 'eggplant', name: 'Eggplant'}, {id: 'garlic', name: 'Garlic'},
      {id: 'onions', name: 'Onions'}, {id: 'tofu', name: 'Tofu'}
    ]

    const items = Object.values(commonIngredients).map((ingredient, i) => {
      const selected = this.isSelectedIngredient(ingredient.id)

      return (
        <AllergyQuestionItem
          key={`commonIngredient-${i}`}
          item={ingredient}
          selected={selected}
          onPress={this.toggleSelect}
        />
      )
    })

    const selectedItems = Object.values(this.props.selected).map((ingredientId, i) => {
      const ingredient = this.getIngredient(ingredientId)
      if (!ingredient) {
        return null
      }

      return (
        <QuestionSelectedItem
          key={`answer-${i}`}
          item={ingredient}
          onRemovePress={this.handleIngredientRemoval}
        />
      )
    })

    return (
      <View style={styles.wrap}>
        <View style={styles.outer}>
          <View style={styles.container}>
            <Text style={styles.text}>Almost there! Are there are any ingredients you dislike?</Text>
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
import { requestDislikedIngredients } from './sagas/data'
import { toggleDislikedIngredient } from '../actions/answers'

const mapStateToProps = (state) => ({
  ingredients: state.question_data.dislikedIngredients,
  selected: state.answers.dislikedIngredients
})
const mapDispatchToProps = {
  requestDislikedIngredients,
  toggleDislikedIngredient
}

export const IngredientsQuestionContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(IngredientsQuestion)

export default IngredientsQuestionContainer
