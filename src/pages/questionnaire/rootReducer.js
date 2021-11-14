import questionnaireReducer from './actions/questionnaire'
import answersReducer from './actions/answers'
import questionDataReducer from './questions/actions/data'
import restaurantsDataReducer from './restaurants/actions/data'
import {combineReducers} from 'redux'

const reducers = combineReducers({
  questionnaire: questionnaireReducer,
  question_data:  questionDataReducer,
  answers: answersReducer,
  restaurants: restaurantsDataReducer
})

export default reducers
