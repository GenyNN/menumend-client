import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Text, TextInput } from 'react-native'

import Touchable from 'Touchable'
import MenuUnfoldedCategoryList from '../MenuUnfoldedCategoryList'
import MenuUnfoldedHeader from './MenuUnfoldedHeader'
import MenuScrollWrapper from './MenuScrollWrapper'
import MenuSectionList from './MenuSectionList'
import ScrollTopButton from './ScrollTopButton'
import ShareModal from '../../sharing/ShareModal'


const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '800px',
    zIndex: 3,

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
    onShare: PropTypes.any,
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
          <MenuUnfoldedHeader onShare={this.props.onShare.toggleModal} />
          <MenuUnfoldedCategoryList />
          <MenuSectionList data={menu.sections} style={styles.sections} onShare={this.props.onShare} token={this.props.token} toggleFavourite={this.props.toggleFavourite}/>
        </View>
        <ScrollTopButton style={styles.scrollButton} />
        <ShareModal shareModalShown={this.props.onShare.shareModalShown} copyLink={this.props.onShare.copyLink} linkCopied={this.props.onShare.linkCopied} onClose={this.props.onShare.toggleModal} />
      </MenuScrollWrapper>
    )
  }
}


import { connect } from 'react-redux'
import { toggleFavourite } from '../../../favourite/actions'


const mapStateToProps = (state) => ({
  menus: state.restaurant.menus,
  index: state.restaurant.menuCategoryIndex,
  token: state.auth.token,
})

const mapDispatchToProps = {
  toggleFavourite,
}

export const MenuUnfoldedContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MenuUnfolded)
export default MenuUnfoldedContainer
