import React from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'

/* import Carousel from 'nuka-carousel' */
import Carousel from 'pages/restaurants/vendor/carousel/src/index'
import Pagination from './Pagination'
import { PreviousButton, NextButton } from './PagerButton'

const styles = {
  container: {
    height: '314px',
    overflowY: 'visible',
  },
}


class Pager extends React.Component {

  static propTypes = {
    children: PropTypes.node,
  }

  renderNextButton(props) {
    return <NextButton {...props} />
  }

  renderPrevButton(props) {
    return <PreviousButton {...props} />
  }

  renderPagination(props) {
    return <Pagination {...props} />
  }

  render() {
    return (
      <Carousel
        style={styles.container}
        renderCenterLeftControls={this.renderPrevButton}
        renderCenterRightControls={this.renderNextButton}
        renderBottomCenterControls={this.renderPagination}
      >
        {this.props.children}
      </Carousel>
    )
  }
}
export default Pager
