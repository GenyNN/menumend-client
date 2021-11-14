import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Text, Image } from 'react-native'

import Touchable from 'Touchable'
import { sans, serif } from 'fonts'
import SpoonsImage from '../img/spoons.png'
import LikeEmptyMediumImage from '../img/like_empty_medium.png'
import LikeFullImage from '../img/likedish.png'
import ShareInactiveImage from '../img/share_inactive.png'

const styles = StyleSheet.create({
  container: {
  },
  card: {
    width: 410,
    minHeight: 220,
    padding: '32px',
    backgroundColor: '#FFFFFF',
    boxShadow: '0 4px 26px 0 rgba(139,158,170,0.20)',
    borderRadius: '10px',
    marginBottom: 60,
    marginRight: 30,
    marginLeft: 30,
  },
  bottomLine: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '26px',
  },
  cardHeader: {
    ...serif({
      fontSize: '24px',
      fontWeight: '400',
      color: '#000000',
      letterSpacing: 'normal',
    }),
  },

  cardText: {
    flex: 1,
    marginTop: '16px',
    ...sans({
      fontSize: '20px',
      fontWeight: '300',
      lineHeight: 25,
      color: '#000000',
      letterSpacing: 'normal',
    }),
  },

  cardPrice: {
    ...sans({
      fontSize: '20px',
      fontStyle: 'italic',
      lineHeight: 25,
      color: '#000000',
      letterSpacing: 'normal',
    }),
  },

  cardIcons: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },

  leafIcon: {
    display: 'inline-block',
    width: '20px',
    height: '19px'
  },
  leafIconLast: {
    display: 'inline-block',
    width: '20px',
    height: '19px',
    marginLeft: '10px'
  },
})


class DishFeedCard extends React.PureComponent {

  static propTypes = {
    dish: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string,
      price: PropTypes.number,
    }).isRequired,
    token: PropTypes.string,
    toggleModal: PropTypes.func.isRequired,
    toggleFavourite: PropTypes.func.isRequired,
  }

  constructor() {
    super()
    this.state = {
      liked: false,
    }
    this.onFavorite = this.onFavorite.bind(this)
  }

  onFavorite() {
    this.setState({ liked: !this.state.liked })
    this.props.toggleFavourite(this.state.isFavorite ? 'DELETE' : 'POST', this.props.token, 'HC', 'MenuItem', this.props.dish.id)
  }

  render() {
    const { name, price, description } = this.props.dish
    const priceElement = price ? (
      <Text style={styles.cardPrice}>
        {`$${price}`}
      </Text>
    ) : null
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.cardHeader}>{name}</Text>
          <Text style={styles.cardText}>{description}</Text>
          <View style={styles.bottomLine}>

            <View>{priceElement}</View>

            <View style={styles.cardIcons}>
              <Touchable onPress={this.onFavorite}>
                <Image style={styles.leafIcon} resizeMode="contain" source={this.state.liked ? LikeFullImage : LikeEmptyMediumImage} />
              </Touchable>
              <Touchable onPress={this.props.toggleModal}>
                <Image style={styles.leafIconLast} resizeMode="contain" source={ShareInactiveImage} />
              </Touchable>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

export default DishFeedCard
