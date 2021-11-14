import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Text, TextInput } from 'react-native'
import { PieChart, Pie, Cell } from 'recharts'

const data = [{
  name: 'Group A', value: 400,
}, {
  name: 'Group B', value: 300,
}, {
  name: 'Group C', value: 300,
}, {
  name: 'Group D', value: 200,
}]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']
const RADIAN = Math.PI / 180

const styles = StyleSheet.create({
  chart: {
    width: '260px',
    flex: 1,
    justifyContent: 'center',
  },
  label: {
    color: '#000000',
    fontFamily: '"Source Serif Pro", serif',
    fontSize: '24px',
    fontWeight: 'bold',
    lineHeight: '30px',
    textAlign: 'center',
  },
})

class TasteChart extends React.Component {

  static propTypes = {
  }

  renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + ((outerRadius - innerRadius) * 0.5)
    const x = cx + (radius * Math.cos(-midAngle * RADIAN))
    const y = cy + (radius * Math.sin(-midAngle * RADIAN))

    return (
      <text x={x} y={y} fill="#222" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
          Лейбл {`${(percent * 100).toFixed(0)}%`}
      </text>
    )
  }

  render() {
    return (
      <View style={styles.chart}>
        <PieChart width={620} height={400} onMouseEnter={this.onPieEnter}>
          <Pie
            dataKey="value"
            data={data}
            cx={120}
            cy={200}
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={5}
            label={this.renderCustomizedLabel}
          >
            {
              data.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]} key={index} />)
            }
          </Pie>
        </PieChart>
      </View>
    )
  }
}

export default TasteChart
