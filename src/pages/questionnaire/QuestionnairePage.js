import React from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import QuestionsContainer from './questions/QuestionsContainer';
import RestaurantsContainer from './restaurants/RestaurantsContainer'
import TasteProfileContainer from './taste_profile/TasteProfileContainer'
import HeaderBar from './HeaderBar'

String.prototype.capitalize = function(isAllWords = false) {
  if (isAllWords) {
    return this.replace(/(?:^|\s)\S/g, a => a.toUpperCase())
  } else {
    return this.charAt(0).toUpperCase() + this.slice(1);
  }
}

export const STEP_QUESTION = 'STEP_QUESTION';
export const STEP_TASTE_PROFILE = 'STEP_TASTE_PROFILE'
export const STEP_RESTAURANTS = 'STEP_RESTAURANTS'

export const STEPS = [
  STEP_QUESTION, /*STEP_TASTE_PROFILE,*/ STEP_RESTAURANTS
]

const QUESTION_CUISINE = 'QUESTION_CUISINE'
const QUESTION_DIETARY = 'QUESTION_DIETARY'
const QUESTION_ALLERGY = 'QUESTION_ALLERGY'
const QUESTION_INGREDIENTS = 'QUESTION_INGREDIENTS'
const QUESTION_MULTIPLE_LIKE = 'QUESTION_MULTIPLE_LIKE'
const QUESTION_SINGLE_LIKE = 'QUESTION_SINGLE_LIKE'

export const QUESTIONS = [
  QUESTION_CUISINE, QUESTION_DIETARY, QUESTION_ALLERGY, QUESTION_INGREDIENTS,
  QUESTION_MULTIPLE_LIKE/*, QUESTION_SINGLE_LIKE*/
]

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
  },
  container: {
    width: 852 + 10, // fixed with for CloudItem marginRight
    alignSelf: 'center',
    display: 'flex',
    flexDirection: 'column',
  },
  forYouContainer: {
    width: '100%',
    alignSelf: 'center',
    display: 'flex',
    flexDirection: 'column',
  }
})

class QuestionnairePage extends React.PureComponent {

  static propTypes = {
    step: PropTypes.oneOf(STEPS),
  }

  renderStep() {
    if (this.props.step === STEP_QUESTION) {
      // one of the questions
      return (
        <QuestionsContainer />
      )
    } else if (this.props.step === STEP_TASTE_PROFILE) {
      // taste profile
      return <TasteProfileContainer />
    }

    // restaurants
    return <RestaurantsContainer />
  }

  render() {
    const containerStyle = (this.props.step === STEP_RESTAURANTS) ? styles.forYouContainer : styles.container

    return (
      <View style={styles.wrapper}>
        <HeaderBar marks={QUESTIONS.length} active={QUESTIONS.indexOf(this.props.question)} />
        <View style={containerStyle}>
          {this.renderStep()}
        </View>
      </View>
    )
  }
}


import { connect } from 'react-redux'

const mapStateToProps = (state) => ({
  step: state.questionnaire.activeStep,
  question: state.questionnaire.activeQuestion,
})

export const QuestionnairePageContainer = connect(mapStateToProps)(QuestionnairePage)
export default QuestionnairePageContainer
