import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Text } from 'react-native'

import Touchable from 'Touchable'

const textTrimmer = {
  display: 'inline-block',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
}

const commonStyle = {
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  answerActive: {
    backgroundColor: '#DCBF76',
    borderWidth: '1px',
    borderColor: '#DCBF76',
  },
  answerSelected: {
    backgroundColor: '#A8AEB1',
    borderWidth: '1px',
    borderColor: '#A8AEB1',
  },
  answerInactive: {
    backgroundColor: '#FFFFFF',
    borderWidth: '1px',
    borderColor: '#C3C9CD',
  },
  textActive: {
    ...textTrimmer,
    color: '#FFFFFF',
  },
  textInactive: {
    ...textTrimmer,
    color: '#C3C9CD',
  },
  textSelected: {
    ...textTrimmer,
    color: '#FFFFFF',
  },
}

const containerDesktop = {
  height: '26px',
  borderRadius: '40px',
  marginLeft: '12px',
  marginRight: '12px',
  marginBottom: '16px',
  paddingVertical: '27px',
  minHeight: '20px',
}
const textDesktop = {
  maxWidth: 431 - (24 * 2),
  fontFamily: '"Source Sans Pro", sans-serif',
  fontSize: 20,
  textAlign: 'center',
  minHeight: '24px',
  lineHeight: 24,
  fontWeight: '300',
  textTransform: 'capitalize',
  userSelect: 'none',
}

const desktopStyle = {
  ...commonStyle,
  answerActive: {
    ...commonStyle.answerActive,
    ...containerDesktop,
  },
  answerInactive: {
    ...commonStyle.answerInactive,
    ...containerDesktop,
  },
  answerSelected: {
    ...commonStyle.answerSelected,
    ...containerDesktop,
  },
  textActive: {
    ...commonStyle.textActive,
    ...textDesktop,
  },
  textInactive: {
    ...commonStyle.textInactive,
    ...textDesktop,
  },
  textSelected: {
    ...commonStyle.textSelected,
    ...textDesktop,
  },
  wrapper: {
    ...commonStyle.wrapper,
    paddingLeft: 24,
    paddingRight: 24,
  },
}

const styles = StyleSheet.create(desktopStyle)

class AllergyQuestionItem extends React.Component {
  static propTypes = {
    item: PropTypes.object,
    onPress: PropTypes.func,
    enabled: PropTypes.bool,
    selected: PropTypes.bool,
  }

  constructor(props) {
    super(props)

    this.handlePress = this.handlePress.bind(this)
  }

  handlePress() {
    this.props.onPress(this.props.item)
  }

  render() {
    let textStyle = styles.textInactive
    let containerStyle = styles.answerInactive

    if (this.props.enabled) {
      textStyle = styles.textActive
      containerStyle = styles.answerActive
    }

    if (this.props.selected) {
      textStyle = styles.textSelected
      containerStyle = styles.answerSelected
    }

    return (
      <Touchable onPress={this.handlePress}>
        <View style={containerStyle}>
          <View style={styles.wrapper}>
            <Text style={textStyle}>{this.props.item.name}</Text>
          </View>
        </View>
      </Touchable>
    )
  }
}

export default AllergyQuestionItem
