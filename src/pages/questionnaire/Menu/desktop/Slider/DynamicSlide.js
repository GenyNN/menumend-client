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


class DynamicSlide extends React.Component {

  static defaultProps = {
    onFinishRender: () => {},
  }

  static propTypes = {
    children: PropTypes.node,
    index: PropTypes.number,
    onFinishRender: PropTypes.func,
  }

  constructor(props) {
    super(props)
    let childrenSize
    if (Array.isArray(this.props.children)) {
      childrenSize = this.props.children.length
    } else if (this.props.children) {
      childrenSize = 1
    } else {
      childrenSize = 0
    }
    this.state = { childrenSize }
    this.initialSize = childrenSize
    this.checkOverflow = this.checkOverflow.bind(this)
  }

  componentDidMount() {
    this.checkOverflow()
  }

  componentDidUpdate(prevProps, prevState) {
    this.checkOverflow()
  }

  checkOverflow() {
    const { childrenSize } = this.state
    if (childrenSize <= 0) {
      return
    }
    const { element } = this
    const heightOverflow = element.scrollHeight - element.offsetHeight
    const hasOverflowingChildren = heightOverflow > 8

    if (hasOverflowingChildren && (childrenSize > 0)) {
      const nextSize = childrenSize - 1
      this.setState({ childrenSize: nextSize })
    } else {
      this.props.onFinishRender(this.props.index, childrenSize)
    }
  }

  render() {
    const { childrenSize } = this.state
    let { children } = this.props
    if (childrenSize > 1 && childrenSize !== this.initialSize) {
      const indexStart = 0
      const indexStop = childrenSize
      children = children.slice(indexStart, indexStop)
    }
    return (
      <div ref={(el) => { this.element = el }} style={styles.container}>
        {children}
      </div>
    )
  }
}

export default DynamicSlide
