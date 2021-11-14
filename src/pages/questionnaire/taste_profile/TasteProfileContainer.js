import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Text, TextInput } from 'react-native'
import Touchable from 'Touchable'
import Header from '../Header'
import BackwardButton from '../BackwardButton';
import TasteChart from './TasteChart'
import {connect} from 'react-redux'
import {nextStep, prevStep} from '../actions/questionnaire'


const styles = StyleSheet.create({
  container: {
  },
  summary: {
  },
  checkOutText: {
  },
  nextButton: {
  }
})


class TasteProfile extends React.Component {

  static propTypes = {
  }

  constructor(props) {
    super(props)

    this.handleForwardPress = this.handleForwardPress.bind(this)
    this.handleBackwardPress = this.handleBackwardPress.bind(this)
  }

  handleForwardPress() {
    this.props.onForwardPress()
  }

  handleBackwardPress() {
    this.props.onBackwardPress()
  }

  render() {
    return (
      <View style={styles.container}>
        <BackwardButton onPress={this.handleBackwardPress} />

        <Header text="Here is your taste profile!" />

        <TasteChart />

        <Text style={styles.summary}>
          Now that we’ve learned your taste profile, we have personalized all restaurant menus in the country for you. You can find recommended restaurants or dishes anytime in any location.
        </Text>

        <Touchable onPress={this.handleForwardPress}>
          <View>
            <Text style={styles.checkOutText}>
              Check this out!
            </Text>
            <View style={styles.nextButton} />
          </View>
        </Touchable>
      </View>
    )
  }

}

const mapStateToProps = (state) => ({
})
const mapDispatchToProps = {
  onForwardPress: nextStep,
  onBackwardPress: prevStep
}

export const TasteProfileContainer = connect(mapStateToProps, mapDispatchToProps)(TasteProfile)
export default TasteProfileContainer
