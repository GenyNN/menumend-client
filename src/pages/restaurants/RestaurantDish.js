import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Text, Image } from 'react-native'
import Touchable from 'Touchable'

import { sans, serif } from 'fonts'
import LeafSmallImage from './img/leaf_small.png'
import LikeEmptySmallImage from './img/like_empty_small.png'
import LikeFullImage from './img/likedish.png'


const styles = StyleSheet.create({
  container: {
  },
  dish: {
    borderBottomColor: '#E5EBEF',
    borderBottomWidth: '1px',
    minHeight: '115px',
    padding: '10px',
    paddingRight: '30px',
    marginBottom: '15px'
  },
  dishName: {
    ...serif({
      color: '#000',
    }),
    letterSpacing: 0,
    fontSize: '16px',
  },
  dishIngredients: {
    ...sans({
      color: '#000',
    }),
    letterSpacing: 0,
    marginTop: '14px',
    fontSize: '14px',
    fontWeight: '200',
  },
  dishPrice: {
    ...sans({
      fontSize: '16px',
      color: '#A8AEB1',
      letterSpacing: 'normal',
      fontWeight: 'normal',
      fontStyle: 'italic',
    }),
    marginTop: '18px',
  },
  dishLeafIcon: {
    display: 'inline-block',
    width: '14px',
    height: '16px',
    marginLeft: '10px'
  },
  dishLikeIcon: {
    position: 'absolute',
    top: '14px',
    right: '10px',
    width: '17px',
    height: '14px',
    resizeMode: 'contain',
  },
})


class RestaurantDish extends React.Component {

  static propTypes = {

  }

  constructor() {
    super()
    this.state = {
    }
    this.onFavourite = this.onFavourite.bind(this)
  }

  componentDidMount() {
    if (this.props.data.favourite) {
      this.setState({ favourite: true })
    } else {
      this.setState({ favourite: false })
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data.favourite) {
      this.setState({ favourite: true })
    } else {
      this.setState({ favourite: false })
    }
  }

  onFavourite() {
    this.setState({ favourite: !this.props.data.favourite })
    this.props.toggleFavourite(this.props.data.favourite ? 'DELETE' : 'POST', this.props.token, 'HC', 'MenuItem', this.props.data.id)
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.dish}>
          <Touchable onPress={() => this.onFavourite()}>
            <Image style={styles.dishLikeIcon} resizeMode="contain" source={this.state.favourite ? LikeFullImage : LikeEmptySmallImage} />
          </Touchable>

          <Text style={styles.dishName}>
            {this.props.data.name}

          </Text>
          <Text style={styles.dishIngredients}>
            {this.props.data.description}
          </Text>
          <Text style={styles.dishPrice}>{'$' + this.props.data.price}</Text>
        </View>
      </View>
    )
  }
}

export default RestaurantDish
