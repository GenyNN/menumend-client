import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Text, TextInput } from 'react-native'

import Touchable from 'Touchable'
import MenuUnfoldedCategoryList from '../MenuUnfoldedCategoryList'
import MenuUnfoldedHeader from './MenuUnfoldedHeader'
import MenuScrollWrapper from './MenuScrollWrapper'
import MenuSectionList from './MenuSectionList'
import ScrollTopButton from './ScrollTopButton'

const styles = StyleSheet.create({
  container: {
    marginTop: 80,
    height: '100%',
    width: '800px',
    zIndex: 3,

    marginBottom: 88,

    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',

    borderRadius: '10px',
    backgroundColor: '#FFFFFF',
    boxShadow: '0 0 30px 0 rgba(96,143,171,0.2)',
  },
  content: {
    height: '100%',
  },
  sections: {
    flex: 1,
    flexDirection: 'column',
    height: '100%',
    overflowY: 'scroll',
  },
  scrollButton: {
    position: 'fixed',
    left: '50%',
    bottom: 24,
    marginLeft: (800 / 2) + 24,
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

  render() {
    const { menus, index } = this.props
    const menu = menus[index]
    if (!menu) {
      return null
    }

    return (
      <MenuScrollWrapper selectedItem={this.props.selectedItem} style={styles.container}>
        <View style={styles.content}>
          <MenuUnfoldedHeader
            handleShare={this.props.handleShare}
            handleClose={this.props.handleClose}
          />
          <MenuUnfoldedCategoryList />
          <MenuSectionList restaurant={this.props.restaurant} data={menu.sections} style={styles.sections} />
        </View>
        {/*<ScrollTopButton style={styles.scrollButton} />*/}
      </MenuScrollWrapper>
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
