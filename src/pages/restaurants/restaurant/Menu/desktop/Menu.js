import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import { Route, withRouter } from 'react-router-dom'
import MenuUnfolded from './MenuUnfolded'
import MenuSignUPSpacer from './MenuSignUPSpacer'

const styles = {
  container: {
  },
  wrapper: {
  },
}


class Menu extends React.Component {

  static propTypes = {
  }

  constructor(props) {
    super(props)

    this.open = (scrollToDish = false) => {
      if (!scrollToDish) {
        this.props.unselectDish()
      }

      this.props.history.push(this.props.match.url + '/menu')
    }
    this.close = () => {
      this.props.unselectDish()
      this.props.history.push(this.props.match.url)
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.selectedDish && this.props.selectedDish !== prevProps.selectedDish) {
      this.open(true)
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
      <View >
        <View style={styles.container}>
          <View style={styles.wrapper} />
          <MenuUnfolded onShare={onShare} selectedItem={this.props.selectedDish}/>
          <MenuSignUPSpacer />
        </View>
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
  mapDispatchToProps,
)(Menu)
export default withRouter(MenuContainer)
