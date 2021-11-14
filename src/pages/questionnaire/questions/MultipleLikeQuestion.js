import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Text, TextInput } from 'react-native'
import Item, {DISLIKE, LIKE, NONE} from './Item'
import ItemsContainer from './ItemsContainer'

const styles = StyleSheet.create({
  wrap: {
    width: '800px',
  },
  outer: {
    position: 'absolute',
    left: '42px',
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
  inner: {
    marginTop: '122px',
    paddingVertical: '16px',
    paddingHorizontal: '8px',
    width: '800px',
    alignItems: 'center',
    minHeight: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 'auto',
    overflow: 'hidden',
  },
})

const FIRST = 'first'
const SECOND = 'second'
const BOTH = 'both'
const NEITHER = 'neither'

const SINGLE_LIKE = 'like'
const SINGLE_DISLIKE = 'dislike'

class MultipleLikeQuestion extends React.Component {
  static propTypes = {
    type: PropTypes.string
  }

  constructor(props) {
    super(props)

    this.values = {
    }

    this.handleItemSelect = this.handleItemSelect.bind(this)
  }

  isNewDishes() {
    if (Object.keys(this.values).length === 0) {
      return true
    }

    const selectedDishesIds = this.props.selectionDishes.join('')
    const valuesDishesIds = Object.keys(this.values).join('')

    return selectedDishesIds !== valuesDishesIds
  }

  componentDidUpdate(prevProps) {
    if (!this.props.selectionDishes.length) {
      return
    }

    if (this.isNewDishes()) {
      const dishes = this.props.selectionDishes;
      this.values = {}

      if (dishes.length > 1) {
        this.values[dishes[0]] = NONE
        this.values[dishes[1]] = NONE
      } else {
        this.values[dishes[0]] = DISLIKE
      }
    }
  }

  calculateResp() {
    const values = Object.values(this.values)

    if (values.length === 1) {
      // single like question
      return values[0] === LIKE ? SINGLE_LIKE : SINGLE_DISLIKE
    }

    if (values[0] === NONE && values[1] === NONE) {
      return NEITHER
    }

    if (values[0] === LIKE && values[1] === LIKE) {
      return BOTH
    }

    if (values[0] === LIKE) {
      return FIRST
    }

    return SECOND
  }

  handleItemSelect(dishId, value) {
    this.values[dishId] = value

    const keys = Object.keys(this.values)

    if (keys.length === 1) {
      // single like question
      this.props.updatePreviousSingleAnswer({
        id0: keys[0],
        resp: this.calculateResp()
      })
    }

    this.props.updatePreviousAnswer({
      id0: keys[0],
      id1: keys[1],
      resp: this.calculateResp()
    })
  }

  render() {
    if (!this.props.selectionDishes.length) {
      return null
    }

    let items = this.props.selectionDishes.map(dishId => {
      for (let i = 0; i < this.props.dishes.length; i++) {
        const dish = this.props.dishes[i]
        if (dishId === dish.id) {
          return dish
        }
      }
    })

    return (
      <View style={styles.wrap}>
        <View style={styles.outer}>
          <View style={styles.container}>
            <Text style={styles.text}>How do you feel about these dishes?</Text>
          </View>
        </View>

        <View style={styles.inner}>
          <View style={styles.items}>
            <Item data={items[0]} onSelect={this.handleItemSelect} />

            {items.length > 1 &&
              <Item data={items[1]} onSelect={this.handleItemSelect} />
            }

            {/*<ItemsContainer items={this.props.items} activeItem={this.props.activeItem} />
            <ItemsContainer items={this.props.items} activeItem={this.props.activeItem} />*/}
          </View>
        </View>
      </View>
    )
  }
}

import { connect } from 'react-redux'
import { requestSelectionDishes } from './sagas/data'
import {updatePreviousAnswer, updatePreviousSingleAnswer} from '../actions/answers'

const mapStateToProps = (state) => ({
  selectionDishes: state.question_data.selectionDishes,
  dishes: state.question_data.dishes,
  profile: state.answers
})
const mapDispatchToProps = {
  requestSelectionDishes,
  updatePreviousAnswer,
  updatePreviousSingleAnswer
}

export const MultipleLikeQuestionContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MultipleLikeQuestion)
export default MultipleLikeQuestionContainer
