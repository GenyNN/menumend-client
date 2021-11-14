import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Text, Image } from 'react-native'

import Touchable from 'Touchable'
import { moderateScale, pickStyle } from 'scale'
import MenuUnfoldedCategory from './MenuUnfoldedCategory'

import MenuToggleImage from 'pages/restaurants/img/burger.png'

const commonStyle = {
  container: {
    minHeight: 30,
    maxWidth: 500,
    marginTop: 20,
    marginBottom: 40,
  },
  wrapper: {
    minHeight: 30,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
}
const desktopStyle = {
  ...commonStyle,
  container: {
    minHeight: 30,
    maxWidth: 500,
    marginTop: 20,
    marginBottom: 40,
  },
  submenuItemList: {
    marginTop: 30,
  },
  submenuItem: {
    marginBottom: 13,
  },
  image: {
    width: 20,
    height: 15,
    marginRight: 24,
  },
  offset: {
    marginLeft: 24 + 20,
  },
}
const mobileStyle = {
  ...commonStyle,
  container: {
    minHeight: 30,
    maxWidth: 500,
    marginTop: 20,
  },
  submenuItemList: {
    marginTop: 30,
  },
  submenuItem: {
    marginBottom: 13,
  },
  image: {
    width: moderateScale(16),
    height: moderateScale(11),
    marginRight: 16,
  },
  offset: {
    marginLeft: 16 + moderateScale(16),
  },
}
const styles = StyleSheet.create(pickStyle(mobileStyle, desktopStyle))


class MenuUnfoldedCategoryList extends React.Component {

  static propTypes = {
    menus: PropTypes.array.isRequired,
    index: PropTypes.number.isRequired,
    handleChoose: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = {
      open: false,
    }
    this.toggle = () => this.setState({ open: !this.state.open })
    this.handleChoose = (index) => {
      if (this.props.handleChoose) {
        this.props.handleChoose(index)
      }
      this.toggle()
    }

  }

  render() {
    const { menus, index } = this.props
    const menu = menus[index]
    if (!menu) {
      return null
    }

    let categories = null
    if (this.state.open) {
      categories = (
        <View style={styles.submenuItemList}>
          {menus.map((m, iterIndex) => (
            <MenuUnfoldedCategory
              index={iterIndex}
              key={`menu-cat-${m.id}`}
              style={styles.submenuItem}
              disabled={iterIndex === index}
              onPress={this.handleChoose}
            >
              {m.name}
            </MenuUnfoldedCategory>
          ))}
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <MenuUnfoldedCategory
            index={index}
            key="current-cat"
            onPress={this.toggle}
          >
            <Image style={styles.image} resizeMode="contain" source={MenuToggleImage} />
            {menu.name}
          </MenuUnfoldedCategory>
        </View>
        <View style={styles.offset}>
          {categories}
        </View>
      </View>
    )
  }
}


import { connect } from 'react-redux'
import { setCategory } from '../actions/setCategory'

const mapStateToProps = (state) => ({
  menus: state.restaurant.menus,
  index: state.restaurant.menuCategoryIndex,
})
const mapDispatchToProps = {
  handleChoose: setCategory,
}

export const MenuUnfoldedCategoryListContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MenuUnfoldedCategoryList)
export default MenuUnfoldedCategoryListContainer
