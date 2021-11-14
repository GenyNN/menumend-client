import React from 'react'
import PropTypes from 'prop-types'


const styles = ({
  container: {
    display: 'flex',
    height: '262px',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
})

class StaticSlide extends React.PureComponent {

  static propTypes = {
    children: PropTypes.node,
  }

  render() {
    return (
      <div style={styles.container}>
        {this.props.children}
      </div>
    )
  }
}

export default StaticSlide
