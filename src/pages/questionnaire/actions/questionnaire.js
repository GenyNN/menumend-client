import {STEP_QUESTION, STEP_RESTAURANTS, STEP_TASTE_PROFILE, STEPS} from '../QuestionnairePage'
import {QUESTION_MULTIPLE_LIKE, QUESTIONS} from '../questions/QuestionsContainer'

export const STEP_FORWARD = 'STEP_FORWARD'
export const STEP_BACKWARD = 'STEP_BACKWARD'

export const SET_QUESTION_ITEMS = 'SET_QUESTION_ITEMS'

export function nextStep() {
  return {
    type: STEP_FORWARD
  }
}

export function prevStep() {
  return {
    type: STEP_BACKWARD
  }
}

export function setQuestionItems(items) {
  return {
    type: SET_QUESTION_ITEMS,
    items
  }
}

const initialState = {
  steps: STEPS,
  activeStep: STEP_QUESTION,
  questions: QUESTIONS,
  activeQuestion: QUESTIONS[0],
  questionItems: {},
  activeQuestionItem: 0
}

export function reducer(state = initialState, action) {
  switch (action.type) {
    case STEP_FORWARD: {
      const {
        steps, activeStep, questions, activeQuestion
      } = state;

      if (activeQuestion === QUESTION_MULTIPLE_LIKE && !action.force) {
        // multiple and single like questions handle next separately
        return state
      }

      const activeQuestionIndex = questions.indexOf(activeQuestion);
      const isLastQuestion = activeQuestionIndex === questions.length - 1;

      if (!isLastQuestion) {
        // last question item, switching to next question
        return {
          ...state,
          activeQuestion: questions[activeQuestionIndex + 1]
        }
      }

      // next step (eithter current step is not a question or it is last and finished)
      const index = steps.indexOf(activeStep)

      let nextStep = activeStep;
      if (index !== steps.length - 1) {
        nextStep = steps[index + 1];
      }

      return { ...state, activeStep: nextStep}
    }

    case STEP_BACKWARD: {
      const {
        steps, activeStep, questions, activeQuestion, questionItems, activeQuestionItem
      } = state;

      const activeQuestionIndex = questions.indexOf(activeQuestion);
      const activeStepIndex = steps.indexOf(activeStep);
      const isStepAfterQuestion = steps[activeStepIndex - 1] === STEP_QUESTION;

      const activeQuestionItems = questionItems[activeQuestion] || [];
      const isFirstQuestionItem = activeQuestionItem === 0 || activeQuestionItems.length === 0;

      if (activeStep !==  STEP_QUESTION) {
        // previous step
        const index = steps.indexOf(activeStep)

        let nextStep = activeStep;
        if (index > 0) {
          nextStep = steps[index - 1];
        }

        let activeQuestionItem = 0;
        if (isStepAfterQuestion) {
          const prevQuestion = questions[questions.length - 1];
          const prevQuestionItems = questionItems[prevQuestion] || [];
          activeQuestionItem = prevQuestionItems.length ? prevQuestionItems.length - 1 : 0;
        }

        return { ...state, activeStep: nextStep, activeQuestionItem }
      }

      if (isFirstQuestionItem) {
        if (activeQuestionIndex === 0) {
          // first question
          return;
        }

        // first question item, switching to previous question
        const prevQuestion = questions[activeQuestionIndex - 1];
        const prevActiveQuestionItems = questionItems[prevQuestion] || [];

        return {
          ...state,
          activeQuestion: questions[activeQuestionIndex - 1],
          activeQuestionItem: prevActiveQuestionItems.length ? prevActiveQuestionItems.length - 1 : 0
        }
      }

      // switching to previous question item
      return {
        ...state,
        activeQuestionItem: activeQuestionItem - 1
      }
    }

    case SET_QUESTION_ITEMS: {
      const { questionItems } = state
      questionItems[action.question] = action.items

      return { ...state, questionItems, activeQuestionItem: 0 }
    }

    default:
      return state
  }
}

export default reducer
