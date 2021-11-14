import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'

import animateScroll from '../../animateScroll'


class MenuScrollWrapper extends React.Component {

  static propTypes = {
    style: PropTypes.any,
    children: PropTypes.node,
    selectedItem: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
  }

  componentDidMount() {
    // deferring scroll here to fix a weird bug, when DOM isn't ready enough at this point (wrong
    // elements offset values)
    setTimeout(() => {
      this.initiateDishScroll()
    }, 1)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.selectedItem === this.props.selectedItem) {
      return
    }
    setTimeout(() => {
      this.initiateDishScroll()
    }, 1)
  }

  initiateDishScroll() {
    const dishElement = document.getElementById(`dish-${this.props.selectedItem}`)
    if (!dishElement) {
      return
    }
    const rect = dishElement.getBoundingClientRect()
    const targetElement = document.scrollingElement || document.documentElement
    const offset = rect.top + window.scrollY
    animateScroll(targetElement, offset, 500)
  }

  render() {
    return (
      <View style={this.props.style}>
        {this.props.children}
      </View>
    )
  }
}

export default MenuScrollWrapper
