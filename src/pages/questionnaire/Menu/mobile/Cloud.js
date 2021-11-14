import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View } from 'react-native'

import { moderateScale } from 'scale'
import CloudItem, { isHealthy } from '../CloudItem'
import StartOverButton from '../StartOverButton'


const styles = StyleSheet.create({
  container: {
    width: '100%',
    minWidth: moderateScale(331),
    overflow: 'hidden',

    minHeight: 431,
    marginTop: 50,
    paddingLeft: 24,
    paddingRight: 20,
  },
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  buttonWrapper: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',

    marginTop: 60,
    marginBottom: 40 + 54, // + See full menu button
  },
})


class Cloud extends React.PureComponent {

  static propTypes = {
    menu: PropTypes.shape({
      sections: PropTypes.array,
    }).isRequired,
  }

  componentDidMount() {
    const el = document.getElementById('restaurant_page')
    if (el && el.scrollIntoView) {
      el.scrollIntoView()
    }
  }

  render() {
    const dishes = []
    const { sections } = this.props.menu
    if (sections) {
      sections.forEach((s) => {
        if (!s.dishes) {
          return
        }
        s.dishes.forEach(dish => {
          const enabled = isHealthy(dish)
          if (!enabled) {
            return
          }
          dishes.push(
            <CloudItem enabled={enabled} data={dish} key={`ci-${dish.id}`} />
          )
        })
      })
    }
    return (
      <View style={styles.container}>
        <View style={styles.wrapper}>
          {dishes}
        </View>
        <View style={styles.buttonWrapper}>
          <StartOverButton />
        </View>
      </View>
    )
  }
}


import { connect } from 'react-redux'

const mapStateToProps = (state) => ({
  menu: state.restaurant.menu,
})

export const CloudContainer = connect(
  mapStateToProps,
)(Cloud)
export default CloudContainer
