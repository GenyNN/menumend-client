import React from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types';
import Mark from './Mark';


const styles = StyleSheet.create({
  progress: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: '80px'
  }
})

class Progress extends React.Component {
  static propTypes = {
    marks: PropTypes.number,
    active: PropTypes.number
  }

  render() {
    let marks = []
    for (let i = 0; i < this.props.marks; i++) {
      marks.push(<Mark key={i} isActive={i === this.props.active} />)
    }

    return (
      <View style={styles.progress}>
        {marks}
      </View>
    )
  }

}

import { connect } from 'react-redux'

const mapStateToProps = (state) => ({
  step: state.questionnaire.step,
})

export const ProgressContainer = connect(mapStateToProps)(Progress)
export default ProgressContainer
