import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, StyleSheet, Image } from 'react-native'
import { moderateScale, pickStyle } from 'scale'
import DishShareButton from './DishShareButton'
import HealthyLeafImage from '../../img/healthy_dish_leaf.png'
import Touchable from '../../../../Touchable'
import LikeEmptyMediumImage from '../../img/like_empty_medium.png'
import LikeFullImage from '../../img/likedish.png'
import { sans } from 'fonts'

const desktopFontSize = {
  fontSize: 16,
  lineHeight: 20,
}

const mobileFontSize = {
  fontSize: moderateScale(14),
  lineHeight: moderateScale(18),
}

const commonStyle = {
  container: {
    paddingTop: '20px',
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  spacer: {
    flex: 10,
  },
  name: {
    ...sans({
      color: 'black',
    }),
  },
  description: {
    marginTop: 10,
    ...sans({
      fontWeight: '300',
      color: 'black',
    }),
  },
  price: {
    fontSize: 16,
    marginTop: 14,
    ...sans({
      fontWeight: '400',
      fontStyle: 'italic',
      color: '#A8AEB1',
    }),
  },
  likeButton: {
    display: 'inline-block',
    width: '17px',
    height: '14px',
    marginRight: 8,
  },
}

const desktopStyle = {
  ...commonStyle,
  name: {
    ...commonStyle.name,
    ...desktopFontSize,
  },
  description: {
    ...commonStyle.description,
    ...desktopFontSize,
  },
  image: {
    marginLeft: 8,
    width: 14,
    height: 14,
  },
}

const mobileStyle = {
  ...commonStyle,
  name: {
    ...commonStyle.name,
    ...mobileFontSize,
  },
  description: {
    ...commonStyle.description,
    ...mobileFontSize,
  },
  image: {
    marginLeft: 8,
    width: 12,
    height: 12,
  },
}
const styles = StyleSheet.create(pickStyle(mobileStyle, desktopStyle))


class MenuDish extends React.Component {

  static propTypes = {
    data: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      price: PropTypes.number,
      tags: PropTypes.array.isRequired,
    }).isRequired,
  }

  constructor() {
    super()
    this.state = {
      liked: false,
    }
  }

  onFavourite() {
    this.setState({ liked: !this.state.liked })
    this.props.toggleFavourite(this.state.liked ? 'DELETE' : 'POST', this.props.token, 'HC', 'MenuItem', this.props.data.id)
  }

  render() {
    const { id, name, description, price, tags } = this.props.data
    const healthy = tags.indexOf('healthy-choice') !== -1
    const healthyTag = healthy ? (
      <Image
        style={styles.image}
        resizeMode="contain"
        source={HealthyLeafImage}
      />
    ) : null
    return (
      <View id={`dish-${id}`} style={styles.container}>
        <View style={styles.wrapper}>
          <Text style={styles.name}>
            {name}
            {healthyTag}
          </Text>
          <View style={styles.spacer} />
          <Touchable onPress={() => this.onFavourite()}>
            <Image style={styles.likeButton} resizeMode="contain" source={this.state.liked ? LikeFullImage : LikeEmptyMediumImage} />
          </Touchable>
          <DishShareButton onShare={this.props.onShare} />
        </View>
        <Text style={styles.description}>
          {description}
        </Text>
        <Text style={styles.price}>
          {price !== null ? `$${price}` : null}
        </Text>
      </View>
    )
  }

}

export default MenuDish
