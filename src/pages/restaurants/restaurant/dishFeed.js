import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Text } from 'react-native'

import { sans } from 'fonts'
import flatten from './Menu/flatten'
import DishFeedCard from './DishFeedCard'
import Touchable from '../../../Touchable'


const styles = StyleSheet.create({
  container: {
    minHeight: 262,
    maxWidth: '1040px',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  seeMore: {
    marginBottom: 110,
    marginRight: 'auto',
    marginLeft: 'auto',
    marginTop: 'auto',
    ...sans({
      color: '#53A36A',
      fontWeight: 'regular',
      fontSize: '27px',
    }),
    textAlign: 'center',
    alignSelf: 'stretch',
    width: '132px',
  },
})


class DishFeed extends React.PureComponent {

  static propTypes = {
    menus: PropTypes.array,
  }

  constructor() {
    super()
    this.state = {
      lastShownDish: 0,
      allShown: false
    }
  }

showMore(dishesToShowHealthy) {
    if (this.state.lastShownDish + 4 >= dishesToShowHealthy.length) {
      this.setState({
        allShown: true
      })
    }
    this.setState({
      lastShownDish: this.state.lastShownDish + 4
    })
}

renderDishes() {
 const dishes = flatten(this.props.menus).map(dish => (
    <DishFeedCard
      dish={dish}
      key={`ci-${dish.id}`}
      token={this.props.token}
      toggleFavourite={this.props.toggleFavourite}
      toggleModal={this.props.toggleModal}
    />
  ))
  return dishes
}

  render() {
    const dishesToShowHealthy = this.renderDishes().slice(0, this.state.lastShownDish + 4)
    const dishesToShowRecommended = this.renderDishes().splice(Math.floor(Math.random() * this.renderDishes().length), 4)
    const seeMoreLink = !this.state.allShown ? (
      <Text style={styles.seeMore}>See More</Text>
    ) : null
    return (
      <View>
        <View style={styles.container}>
          {this.props.recommended ? dishesToShowRecommended : dishesToShowHealthy}
        </View>
        {!this.props.recommended && !this.state.allShown ?
         <Touchable onPress={() => this.showMore(dishesToShowHealthy)}>
           <View>{seeMoreLink}</View>
         </Touchable> : null}
      </View>
    )
  }
}


import { connect } from 'react-redux'
import { toggleFavourite } from '../favourite/actions'
import { toggleModal } from '../restaurant/sharing/reducer'

const mapStateToProps = (state) => ({
  menus: state.restaurant.menus,
  token: state.auth.token,
})

const mapDispatchToProps = {
  toggleFavourite,
  toggleModal,
}


export const DishFeedContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DishFeed)
export default DishFeedContainer
