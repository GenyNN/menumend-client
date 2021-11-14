import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Text, Image } from 'react-native'

import Touchable from 'Touchable'

import DeleteImage from '../img/delete.png'

const styles = StyleSheet.create({
  // TODO: закончить стили выбранных элементов
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginRight: '10px',
  },
  selectedItem: {
    marginRight: '16px',
    marginBottom: '18px',
    height: '26px',
    minHeight: '20px',
  },
  text: {
    color: '#000000',
    fontFamily: '"Source Sans Pro", serif',
    fontSize: '20px',
    lineHeight: '24px',
    paddingHorizontal: '10px',
    maxWidth: 431 - (24 * 2),
    display: 'inline-block',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    minHeight: '20px',
    textTransform: 'capitalize',
    fontWeight: '400',
  },
  image: {
    width: 24,
    height: 24,
    position: 'absolute',
    top: 0,
    right: '-22px',
  },
})

class QuestionSelectedItem extends React.Component {
  static propTypes = {
    item: PropTypes.object,
    onRemovePress: PropTypes.func,
  }

  constructor(props) {
    super(props)

    this.handleRemovePress = this.handleRemovePress.bind(this)
  }

  handleRemovePress() {
    this.props.onRemovePress(this.props.item.id)
  }

  render() {
    return (
      <View style={styles.selectedItem}>
        <View style={styles.wrapper}>
          <Touchable onPress={this.handleRemovePress}>
            <Image style={styles.image} resizeMode="contain" source={DeleteImage} />
          </Touchable>
          <Text style={styles.text}>{this.props.item.name}</Text>
        </View>
      </View>
    )
  }
}

export default QuestionSelectedItem
