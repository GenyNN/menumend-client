import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { SET_QUESTION_ITEMS } from '../../actions/questionnaire'

export const LOAD_QUESTION_ITEMS = 'LOAD_QUESTION_ITEMS'

export function loadQuestionItems(question) {
  return {
    type: LOAD_QUESTION_ITEMS,
    question
  }
}

export function* watchItems() {
  yield takeLatest(LOAD_QUESTION_ITEMS, handleQuestionLoading)
}

export function* handleQuestionLoading(action) {
  const { question } = action

  try {
    // TODO: request api for question items
    const mockItems = [
      { name: 'item1', text: 'Item 1' },
      { name: 'item2', text: 'Item 2' },
      { name: 'item3', text: 'Item 3' }
    ];

    yield put({ type: SET_QUESTION_ITEMS, question, items: mockItems })
  } catch (e) {
    yield put({ type: SET_QUESTION_ITEMS, question, items: [] })
  }
}
