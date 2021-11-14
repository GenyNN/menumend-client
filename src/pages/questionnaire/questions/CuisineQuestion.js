import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Text, TextInput } from 'react-native'
import CuisineQuestionItem from './CuisineQuestionItem'

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
    paddingHorizontal: '8px',
    marginTop: '214px',
    width: '520px',
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

class CuisineQuestion extends React.Component {
  static propTypes = {
    type: PropTypes.string,
  }

  componentDidMount() {
    if (!this.props.cuisines.length) {
      this.props.requestCuisines()
    }
  }

  render() {
    if (!this.props.cuisines.length) {
      return null
    }

    const items = Object.values(this.props.cuisines).map((cuisine, i) => {
      const isSelected = (this.props.selected.indexOf(cuisine.id) !== -1)

      return (
        <CuisineQuestionItem
          key={`item-${i}`}
          data={cuisine}
          isSelected={isSelected}
          onPress={this.props.toggleCuisine}
        />
      )
    })

    return (
      <View style={styles.wrap}>
        <View style={styles.outer}>
          <View style={styles.container}>
            <Text style={styles.text}>Pick cuisines you enjoy</Text>
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
import { requestCuisines } from './sagas/data'
import { toggleCuisine } from '../actions/answers'

const mapStateToProps = (state) => ({
  cuisines: state.question_data.cuisines,
  selected: state.answers.cuisines
})
const mapDispatchToProps = {
  requestCuisines,
  toggleCuisine
}

export const CuisineQuestionContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CuisineQuestion)

export default CuisineQuestionContainer
