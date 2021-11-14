import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import { Route, withRouter } from 'react-router-dom'

import Leaf from 'pages/restaurants/Leaf'
import Cloud from './Cloud'
import MenuFolded from './MenuFolded'
import MenuUnfolded from './MenuUnfolded'

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: '60px',
  },
  wrapper: {
  },
  leaf: {
    position: 'absolute',
    left: -80,
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
    return (
      <View >
        <Leaf style={styles.leaf} />
        <View style={styles.container}>

          <View style={styles.wrapper}>
            <Cloud />
          </View>
          <Route
            exact
            path={this.props.match.url + '/'}
            render={() => (
              <MenuFolded handleOpen={this.open} />
            )}
          />

          <Route
            exact
            path={this.props.match.url + '/menu'}
            render={() => (
              <MenuUnfolded handleClose={this.close} selectedItem={this.props.selectedDish}/>
            )}
          />
        </View>
      </View>
    )
  }

}

import { connect } from 'react-redux'
import { unselectDish } from '../actions/dishes'

const mapStateToProps = (state) => ({
  selectedDish: state.dishes.selected
})
const mapDispatchToProps = {
  unselectDish
}

export const MenuContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu)
export default withRouter(MenuContainer)

