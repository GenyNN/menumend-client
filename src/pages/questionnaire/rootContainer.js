import React from 'react'
import PropTypes from 'prop-types'
import QuestionnairePage from './QuestionnairePage'
import { StyleSheet, View } from 'react-native'


const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#FFF',
    minHeight: '100%',
  },
})


class QuestionnaireRoot extends React.Component {

  static propTypes = {
  }

  componentDidMount() {
  }

  render() {
    return (
      <View style={styles.container}>
        <QuestionnairePage />
      </View>
    )
  }
}


import { connect } from 'react-redux'

const mapStateToProps = (state) => ({
})
const mapDispatchToProps = {
}

export const QuestionnaireRootContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestionnaireRoot)
export default QuestionnaireRootContainer
