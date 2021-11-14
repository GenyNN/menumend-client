import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Text, Image } from 'react-native'

import Touchable from 'Touchable'

import Picture from '../img/pic_1.png'
import Heart from '../img/heart.png'
import HeartBroken from '../img/heart_broken.png'
import HeartDefault from '../img/heart_default.png'
import HeartBrokenDefault from '../img/heart_broken_default.png'

const actionStyles = {
  height: '50px',
  width: '50px',
  borderRadius: '50px',
  borderWidth: 1,
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: '20px',
  backgroundColor: '#FFFFFF',
  borderColor: '#E5EBEF',
  marginHorizontal: '12px',
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    width: '268px',
    marginHorizontal: '40px',
    alignItems: 'center',
    marginBottom: '16px',
  },
  pic: {
    width: '200px',
    height: '200px',
    boxShadow: '0 0 30px 0 rgba(96,143,171,0.2)',
  },
  picWrap: {
    width: '268px',
    alignItems: 'center',
  },
  header: {
    height: '56px',
    overflow: 'hidden',
    marginTop: '24px',
    display: 'flex',
    justifyContent: 'flex-start',
  },
  headerText: {
    color: '#000000',
    fontFamily: '"Source Serif Pro", serif',
    fontSize: '20px',
    fontWeight: '300',
    lineHeight: '30px',
    textAlign: 'center',
  },
  par: {
  },
  parText: {
    fontFamily: '"Source Sans Pro", sans-serif',
    fontSize: '16px',
    lineHeight: '20px',
    color: '#000000',
    fontWeight: '200',
    height: '80px',
    overflow: 'hidden',
    textAlign: 'center',
  },
  actions: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: '16px',
    marginTop: '4px',
  },
  action: {
    ...actionStyles,
    boxShadow: '0 0 30px 0 rgba(96,143,171,0.2)',
  },
  actionDefault: {
    ...actionStyles,
  },
  actionImage: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    margin: 'auto',
    width: '24px',
    height: '20px',
  }
})

export const NONE = 'NONE'
export const LIKE = 'LIKE'
export const DISLIKE = 'DISLIKE'

class Item extends React.Component {
  static propTypes = {
    data: PropTypes.object,
    onSelect: PropTypes.func
  }

  constructor(props) {
    super(props)

    this.state = {
      value: NONE
    }

    this.handleLike = this.handleLike.bind(this)
    this.handleDislike = this.handleDislike.bind(this)
  }

  componentDidUpdate(prevProps) {
    if (this.props.data.id !== prevProps.data.id) {
      this.setState({ value: NONE })
    }
  }

  handleLike() {
    const dish = this.props.data

    if (this.state.value === LIKE) {
      this.setState({ value: NONE })
      this.props.onSelect(dish.id, NONE)
      return
    }

    this.setState({ value: LIKE })
    this.props.onSelect(dish.id, LIKE)
  }

  handleDislike() {
    const dish = this.props.data

    if (this.state.value === DISLIKE) {
      this.setState({ value: NONE })
      this.props.onSelect(dish.id, NONE)
      return
    }

    this.setState({ value: DISLIKE })
    this.props.onSelect(dish.id, DISLIKE)
  }

  render() {
    const dish = this.props.data

    let likeIcon = HeartDefault
    let dislikeIcon = HeartBrokenDefault
    let likeStyle = styles.actionDefault
    let dislikeStyle = styles.actionDefault

    switch (this.state.value) {
      case LIKE:
        likeIcon = Heart
        likeStyle = styles.action
        break
      case DISLIKE:
        dislikeIcon = HeartBroken
        dislikeStyle = styles.action
        break
    }

    return (
      <View style={styles.container}>
        <View style={styles.picWrap}>
          <Image style={styles.pic} resizeMode="cover" source={dish.image_url} />
        </View>
        <View style={styles.header}>
          <Text style={styles.headerText}>{dish.name}</Text>
        </View>
        <View style={styles.par}>
          <Text style={styles.parText}>
            {dish.description}
          </Text>
        </View>
        <View style={styles.actions}>
          <Touchable onPress={this.handleLike}>
            <View style={likeStyle}>
              <Image style={styles.actionImage} resizeMode="contain" source={likeIcon} />
            </View>
          </Touchable>
          <Touchable onPress={this.handleDislike}>
            <View style={dislikeStyle}>
              <Image style={styles.actionImage} resizeMode="contain" source={dislikeIcon} />
            </View>
          </Touchable>
        </View>
      </View>
    )
  }
}


export default Item
