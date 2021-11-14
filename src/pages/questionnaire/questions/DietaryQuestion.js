import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Text, TextInput } from 'react-native'
import DietaryQuestionItem from './DietaryQuestionItem'

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
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
  answers: {
    paddingVertical: '16px',
    paddingHorizontal: '16px',
    marginTop: '214px',
    width: '420px',
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


class DietaryQuestion extends React.Component {
  static propTypes = {
    type: PropTypes.string,
  }

  componentDidMount() {
    if (!this.props.diets.length) {
      this.props.requestDiets()
    }
  }

  render() {
    if (!this.props.diets.length) {
      return null
    }

    const items = Object.values(this.props.diets).map((diet, i) => {
      const isSelected = (this.props.selected.indexOf(diet.id) !== -1)

      return (
        <DietaryQuestionItem
          key={`item-${i}`}
          data={diet}
          isSelected={isSelected}
          onPress={this.props.toggleDiet}
        />
      )

    })

    return (
      <View style={styles.wrap}>
        <View style={styles.outer}>
          <View style={styles.container}>
            <Text style={styles.text}>Choose a diet you follow</Text>
          </View>
        </View>

        <View style={styles.answers}>
          {items}
        </View>
      </View>
    )
  }
}

import { connect } from 'react-redux'
import { requestDiets } from './sagas/data'
import { toggleDiet } from '../actions/answers'

const mapStateToProps = (state) => ({
  diets: state.question_data.diets,
  selected: state.answers.diets
})
const mapDispatchToProps = {
  requestDiets,
  toggleDiet
}

export const DietaryQuestionContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DietaryQuestion)

export default DietaryQuestionContainer
