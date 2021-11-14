import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import { Route, withRouter } from 'react-router-dom'

import Cloud from './Cloud'
import MenuFolded from './MenuFolded'
import MenuUnfolded from './MenuUnfolded'

const styles = {
  container: {
    position: 'relative',
  },
  wrapper: {
  },
}


class Menu extends React.Component {

  static propTypes = {
  }

  constructor(props) {
    super(props)

    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  handleOpen(scrollToDish = false) {
    if (!scrollToDish) {
      this.props.unselectDish()
    }

    const { body } = window.document
    if (!body.classList.contains('mobileMenuOpened')) {
      body.classList.add('mobileMenuOpened')
    }

    this.props.history.push(this.props.match.url + '/menu')
  }

  handleClose() {
    const { body } = window.document
    while (body.classList.contains('mobileMenuOpened')) {
      body.classList.remove('mobileMenuOpened')
    }

    this.props.unselectDish()
    this.props.history.push(this.props.match.url)
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.selectedDish && this.props.selectedDish !== prevProps.selectedDish) {
      this.handleOpen(true)
    }
  }

  render() {
    const onShare = {
      shareModalShown: this.props.shareModalShown,
      toggleModal: this.props.toggleModal,
      linkCopied: this.props.linkCopied,
      copyLink: this.props.copyLink,
    }
    return (
      <View style={styles.container}>
        <Cloud />

        <Route exact path={this.props.match.url} render={() => (
          <MenuFolded handleOpen={this.handleOpen} />
        )} />

        <Route exact path={this.props.match.url + '/menu'} render={() => (
          <MenuUnfolded onShare={onShare} selectedItem={this.props.selectedDish} handleClose={this.handleClose} />
        )} />
      </View>
    )
  }

}

import { connect } from 'react-redux'
import { unselectDish } from '../actions/dishes'
import { toggleModal, copyLink } from '../../sharing/reducer'

const mapStateToProps = (state) => ({
  selectedDish: state.dishes.selected,
  shareModalShown: state.shareModal.isShown,
  linkCopied: state.shareModal.linkCopied,
})
const mapDispatchToProps = {
  unselectDish,
  toggleModal,
  copyLink,
}

export const MenuContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu)
export default withRouter(MenuContainer)
