import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'

import DynamicSlide from './DynamicSlide'
import StaticSlide from './StaticSlide'
import StaticSlideList from './StaticSlideList'


const styles = {
  slideContainer: {
    height: '314px',
  },
}

class Slider extends React.PureComponent {

  static propTypes = {
    children: PropTypes.array,
  }

  constructor(props) {
    super(props)
    this.state = {
      finished: false,
      currentSlide: null,
    }
    this.slideSizes = []
    this.slideCounter = 0
    this.processedAmt = 0
    this.maxSlideSize = 20
    this.totalAmt = this.props.children.length
    this.renderSlide = this.renderSlide.bind(this)
    this.renderCallback = this.renderCallback.bind(this)
  }

  componentDidMount() {
    const sliceStartIndex = this.processedAmt
    const sliceStopIndex = this.maxSlideSize
    const firstSlide = this.renderSlide(this.slideCounter, sliceStartIndex, sliceStopIndex)
    this.slideCounter = this.slideCounter + 1
  }

  renderCallback(index, renderedAmt) {
    let nextProcessedAmt
    const slideSize = this.slideSizes[index]
    if (!slideSize) {
      nextProcessedAmt = this.processedAmt + renderedAmt
      const sliceStartIndex = nextProcessedAmt
      const sliceStopIndex = sliceStartIndex + this.maxSlideSize
      this.renderSlide(this.slideCounter, sliceStartIndex, sliceStopIndex)
      this.slideCounter = this.slideCounter + 1
    } else {
      nextProcessedAmt = this.processedAmt - slideSize + renderedAmt
    }
    this.slideSizes[index] = renderedAmt
    this.processedAmt = nextProcessedAmt
    if (nextProcessedAmt >= this.totalAmt) {
      this.setState({ finished: true })
    }
  }

  renderSlide(index, start, stop) {
    const children = this.props.children.slice(start, stop)
    if (!children.length) {
      this.setState({ finished: true })
      return
    }
    const slide = (
      <DynamicSlide
        index={index}
        key={`dynamic-slide-${index}`}
        onFinishRender={this.renderCallback}
      >
        {children}
      </DynamicSlide>
    )
    this.setState({
      currentSlide: slide,
    })
  }

  render() {
    return this.state.finished ? (
      <StaticSlideList slideSizes={this.slideSizes}>
        {this.props.children}
      </StaticSlideList>
    ) : (
      <View style={styles.slideContainer}>
        {this.state.currentSlide}
      </View>
    )
  }
}

export default Slider
