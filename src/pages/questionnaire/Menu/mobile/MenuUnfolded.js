import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View } from 'react-native'
import { moderateScale } from 'scale'
import animateScroll from '../animateScroll'

import Touchable from 'Touchable'
import MenuSectionList from './MenuSectionList'
import MenuUnfoldedHeader from './MenuUnfoldedHeader'
import MenuUnfoldedCategoryList from '../MenuUnfoldedCategoryList'


const styles = StyleSheet.create({
  container: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },
  arrow: {
    height: '6px',
    width: '6px',
    borderBottomWidth: '2px',
    borderLeftWidth: '2px',
    borderColor: '#53A36A',
    transform: [{ rotate: '315deg' }],
  },
  header: {
    minHeight: moderateScale(60),
  },
  sections: {
    backgroundColor: '#FFFFFF',
    paddingTop: 32,
    paddingLeft: 24,
    paddingRight: 24,
    paddingBottom: moderateScale(60), // hack to scroll this div fully
    height: '100%',
    overflowY: 'scroll',
    WebkitOverflowScrolling: 'touch',
  },
})


class MenuUnfolded extends React.Component {

  static propTypes = {
    selectedItem: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    menus: PropTypes.array,
    index: PropTypes.number,
    handleShare: PropTypes.func,
    handleClose: PropTypes.func.isRequired,
  }

  componentDidMount() {
    document.body.classList.add('noscroll')
    const dishEl = document.getElementById(`dish-${this.props.selectedItem}`)
    if (!dishEl) {
      return
    }
    const scrollElement = document.getElementsByClassName('menu-section-list')
    if (!scrollElement.length) {
      return
    }
    let offset = dishEl.offsetTop
    // section offset
    let parent = dishEl.parentElement
    let done = false
    while (!done) {
      offset += parent.offsetTop
      if (parent.classList.contains('menu-section')) {
        done = true
      }
      parent = parent.parentElement
    }
    animateScroll(scrollElement[0], offset, 500)
  }

  componentWillUnmount() {
    document.body.classList.remove('noscroll')
  }

  render() {
    const { menus, index } = this.props
    const menu = menus[index]
    if (!menu) {
      return null
    }
    return (
      <View style={styles.container}>
        <MenuUnfoldedHeader
          style={styles.header}
          handleShare={this.props.handleShare}
          handleClose={this.props.handleClose}
        />
        <MenuSectionList data={menu.sections} style={styles.sections} />
      </View>
    )
  }
}


import { connect } from 'react-redux'

const mapStateToProps = (state) => ({
  menus: state.restaurants.menus,
  index: state.restaurants.menuCategoryIndex,
})

export const MenuUnfoldedContainer = connect(
  mapStateToProps,
)(MenuUnfolded)
export default MenuUnfoldedContainer
