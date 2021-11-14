import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Text, TextInput } from 'react-native'
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

class MultipleLikeQuestion extends React.Component {
  static propTypes = {
    type: PropTypes.string
  }

  componentDidMount() {
    if (this.props.loadQuestionItems && !this.props.items) {
      this.props.loadQuestionItems(this.props.type)
    }
  }

  render() {
    return (
      <View style={styles.wrap}>
        <View style={styles.outer}>
          <View style={styles.container}>
            <Text style={styles.text}>How do you feel about these dishes?</Text>
          </View>
        </View>

        <View style={styles.inner}>
          <View style={styles.items}>
            <ItemsContainer items={this.props.items} activeItem={this.props.activeItem} />
          </View>
        </View>
      </View>
    )
  }
}

import { connect } from 'react-redux'
import { loadQuestionItems } from './sagas/items'

const mapStateToProps = (state) => ({
  items: state.questionnaire.questionItems[state.questionnaire.activeQuestion],
  activeItem: state.questionnaire.activeQuestionItem,
})
const mapDispatchToProps = {
  loadQuestionItems,
}

export const MultipleLikeQuestionContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MultipleLikeQuestion)
export default MultipleLikeQuestionContainer
