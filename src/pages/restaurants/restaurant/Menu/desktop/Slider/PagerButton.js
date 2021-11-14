import React from 'react'
import PropTypes from 'prop-types'

const commonStyle = {
  boxSizing: 'border-box',
  border: 'solid black',
  borderWidth: '0 4px 4px 0',
  display: 'inline-block',
  width: '17px',
  height: '17px',
  position: 'absolute',
}

const makeButtonStyle = disabled => ({
  ...commonStyle,
  opacity: disabled ? 0.3 : 1,
  cursor: disabled ? 'not-allowed' : 'pointer',
})

const rightButtonStyle = {
  left: 14,
  transform: [{ rotate: '-45deg' }],
  WebkitTransform: [{ rotate: '-45deg' }],
}

const leftButtonStyle = {
  right: 14,
  transform: [{ rotate: '135deg' }],
  WebkitTransform: [{ rotate: '135deg' }],
}


export class PreviousButton extends React.PureComponent {

  static propTypes = {
    currentSlide: PropTypes.number,
    slideCount: PropTypes.number,
    wrapAround: PropTypes.bool,
    previousSlide: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
  }

  componentWillMount() {
    document.addEventListener('keydown', this.handleKeyDown)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown)
  }

  handleKeyDown(event) {
    if (event.keyCode === 37) { // left arrow key
      this.props.previousSlide()
    }
  }

  handleClick(event) {
    event.preventDefault()
    this.props.previousSlide()
  }

  render() {
    const disabled =
      (this.props.currentSlide === 0 && !this.props.wrapAround) ||
      this.props.slideCount === 0
    const style = makeButtonStyle(disabled)
    return (
      <div
        style={{ ...style, ...leftButtonStyle }}
        disabled={disabled}
        onClick={this.handleClick}
      />
    )
  }
}


export class NextButton extends React.PureComponent {

  static propTypes = {
    currentSlide: PropTypes.number,
    slidesToScroll: PropTypes.number,
    slideCount: PropTypes.number,
    wrapAround: PropTypes.bool,
    nextSlide: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
  }

  componentWillMount() {
    document.addEventListener('keydown', this.handleKeyDown)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown)
  }

  handleKeyDown(event) {
    if (event.keyCode === 39) { // right arrow key
      this.props.nextSlide()
    }
  }

  handleClick(event) {
    event.preventDefault()
    this.props.nextSlide()
  }

  render() {
    const disabled =
      this.props.currentSlide + this.props.slidesToScroll >=
        this.props.slideCount && !this.props.wrapAround
    const style = makeButtonStyle(disabled)
    return (
      <div
        style={{ ...style, ...rightButtonStyle }}
        disabled={disabled}
        onClick={this.handleClick}
      />
    )
  }
}
