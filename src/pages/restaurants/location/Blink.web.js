import React from 'react'
import PropTypes from 'prop-types'


class Blink extends React.PureComponent {

  static propTypes = {
    active: PropTypes.bool,
    children: PropTypes.node,
  }

  render() {
    if (this.props.active) {
      return (
        <div className="blink">
          {this.props.children}
        </div>
      )
    }
    return this.props.children
  }

}

export default Blink
