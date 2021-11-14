import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Text } from 'react-native'
import Header from '../Header'
import CuisineQuestion from './CuisineQuestion'
import DietaryQuestion from './DietaryQuestion'
import AllergyQuestion from './AllergyQuestion'
import IngredientsQuestion from './IngredientsQuestion'
import MultipleLikeQuestion from './MultipleLikeQuestion'
import SingleLikeQuestion from './SingleLikeQuestion'
import ForwardButton from '../ForwardButton'
import BackwardButton from '../BackwardButton'

const QUESTION_CUISINE = 'QUESTION_CUISINE'
const QUESTION_DIETARY = 'QUESTION_DIETARY'
const QUESTION_ALLERGY = 'QUESTION_ALLERGY'
const QUESTION_INGREDIENTS = 'QUESTION_INGREDIENTS'
export const QUESTION_MULTIPLE_LIKE = 'QUESTION_MULTIPLE_LIKE'
export const QUESTION_SINGLE_LIKE = 'QUESTION_SINGLE_LIKE'

const QUESTION_COMPONENTS = {
  QUESTION_CUISINE: CuisineQuestion,
  QUESTION_DIETARY: DietaryQuestion,
  QUESTION_ALLERGY: AllergyQuestion,
  QUESTION_INGREDIENTS: IngredientsQuestion,
  QUESTION_MULTIPLE_LIKE: MultipleLikeQuestion,
  QUESTION_SINGLE_LIKE: SingleLikeQuestion
}

export const QUESTIONS = [
  QUESTION_CUISINE, QUESTION_DIETARY, QUESTION_ALLERGY, QUESTION_INGREDIENTS,
  QUESTION_MULTIPLE_LIKE/*, QUESTION_SINGLE_LIKE*/
]

const styles = StyleSheet.create({
  container: {
    width: '100%',
    minHeight: '100%',
    alignItems: 'center',
    marginBottom: '40px',
  },
  hint: {
  },
  wrap: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: '20px',
  }
})


class Questions extends React.Component {

  static propTypes = {
    hint: PropTypes.string,
    question: PropTypes.string
  }

  constructor(props) {
    super(props)

    this.handleForwardPress = this.handleForwardPress.bind(this)
    this.handleBackwardPress = this.handleBackwardPress.bind(this)
  }

  componentDidMount() {
    if (!this.props.dishes.length) {
      this.props.requestDishes()
    }
  }

  handleForwardPress() {
    this.props.onForwardPress()
  }

  handleBackwardPress() {
    this.props.onBackwardPress()
  }

  render() {
    const QuestionComponent = QUESTION_COMPONENTS[this.props.question]

    return (
      <View style={styles.container}>
        {this.props.isBackwardVisible &&
          <BackwardButton onPress={this.handleBackwardPress} />
        }

        <Header text="Questionnaire" subtitleVisible={this.props.question === 'QUESTION_CUISINE'} />

        {this.props.hint &&
          <Text style={styles.hint}>
            {this.props.hint}
          </Text>
        }

        <View style={styles.wrap}>
          <QuestionComponent type={this.props.question} />
        </View>

        <ForwardButton onPress={this.handleForwardPress} />
      </View>
    )
  }
}

import { connect } from 'react-redux'
import { nextStep, prevStep } from '../actions/questionnaire'
import { requestDishes } from './sagas/data'

const mapStateToProps = (state) => {
  const isBackwardVisible = (state.questionnaire.questions.indexOf(state.questionnaire.activeQuestion) > 0);

  return {
    question: state.questionnaire.activeQuestion,
    dishes: state.question_data.dishes,
    isBackwardVisible
  };
};

const mapDispatchToProps = {
  onBackwardPress: prevStep,
  onForwardPress: nextStep,
  requestDishes
}

export const QuestionsContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Questions)
export default QuestionsContainer

