import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Text } from 'react-native'

import Touchable from 'Touchable'

const commonStyles = {
  answer: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    height: '110px',
    width: '110px',
    marginHorizontal: '8px',
    alignItems: 'center',
    backgroundColor: '#FFF',
    boxShadow: '0 0 30px 0 rgba(96,143,171,0.2)',
    marginBottom: '16px',
  },

  text: {
    color: '#000000',
    fontFamily: '"Source Serif Pro", serif',
    fontSize: '14px',
    fontWeight: 'bold',
    lineHeight: '20px',
    textAlign: 'center',
    paddingHorizontal: '10px',
    userSelect: 'none',
  },
}

const styles = StyleSheet.create({
  ...commonStyles,

  answerActive: {
    ...commonStyles.answer,
    backgroundColor: '#DCBF76',
  },

  textActive: {
    ...commonStyles.text,
    color: '#FFFFFF',
  }
})

class CuisineQuestion extends React.Component {
  static propTypes = {
    data: PropTypes.object,
    isSelected: PropTypes.bool,
    onPress: PropTypes.func,
  }

  constructor(props) {
    super(props)

    this.handlePress = this.handlePress.bind(this)
  }

  handlePress() {
    this.props.onPress(this.props.data.id)
  }

  render() {
    const style = this.props.isSelected ? styles.answerActive : styles.answer
    const textStyle = this.props.isSelected ? styles.textActive : styles.text

    return (
      <Touchable onPress={this.handlePress}>
        <View style={style}>
          <Text style={textStyle}>{this.props.data.name}</Text>
        </View>
      </Touchable>
    )
  }
}

export default CuisineQuestion
