import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Text } from 'react-native'
import RestaurantCard from '../../components/cards/RestaurantCard'
import DishCard from '../../components/cards/DishCard'

import { moderateScale, pickStyle } from 'scale'

const commonStyle = {
  container: {
    // width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  containerCardsContent: {
    width: '1000px',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
}


const desktopStyle = {
  ...commonStyle,
}

const mobileStyle = {
  ...commonStyle,
  containerCardsContent: {
    ...commonStyle.containerCardsContent,
    width: moderateScale(375),
  },
}
const styles = StyleSheet.create(pickStyle(mobileStyle, desktopStyle))


class CardsContentContainer extends React.PureComponent {

    static propTypes = {
      filteredData: PropTypes.array,
    }

    render() {

      let listCards = []
      if (this.props.filteredData !== undefined && this.props.filteredData !== null) {
        listCards = this.props.filteredData.map((item) => {
          if (item.itemType === 'Restaurant') {
            return (<RestaurantCard
              key={item.item.id}
              name={item.item.name}
              address={item.item.location.address1}
              city={item.item.location.city}
              state={item.item.location.state}
              type={item.item.type}
              distance={item.distance}
              section={item.section}
              itemId={item.item.id}
            />)
          }

          if (item.itemType === 'MenuItem') {
            return (<DishCard
              key={item.item.id}
              name={item.item.name}
              description={item.item.description}
              section={item.section}
              itemId={item.item.id}
              distance={item.distance}
              restaurant={item.item.restaurant}
            />)
          }
        }
          ,
        )
      }

      return (
        <View style={styles.container}>
          <View style={styles.containerCardsContent} >
            {listCards}
          </View>
        </View>
      )
    }
}

import { connect } from 'react-redux'

const mapStateToProps = (state) => ({
  filteredData: state.cards.filteredData,
})
const mapDispatchToProps = {
}

export const CardsContentContainerContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CardsContentContainer)
export default CardsContentContainerContainer
