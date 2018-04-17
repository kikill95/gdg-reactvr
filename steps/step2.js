// create and display enemies
// model

import React from 'react'
import {
  AppRegistry,
  asset,
  Pano,
  View,
  Model
} from 'react-vr'

const timeout = 1000

export default class gdgReactVr extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      enemies: []
    }

    this.renderEnemies = this.renderEnemies.bind(this)
    this.addNewEnemy = this.addNewEnemy.bind(this)

    setTimeout(this.addNewEnemy, timeout)
  }

  addNewEnemy () {
    let enemy = {
      x: Math.random() * 20 - 10,
      y: Math.random() * 20 - 10,
      z: (this.state.enemies.length % 2 ? 1 : -1) * (Math.random() * 6 + 4)
    }

    this.setState({
      enemies: this.state.enemies.concat([enemy])
    }, () => {
      setTimeout(this.addNewEnemy, 2 * timeout)
    })
  }

  renderEnemies () {
    return (this.state.enemies.map((enemy, index) => {
      return (
        <View
          key={index}
          style={{
            transform: [
              {translate: [enemy.x, enemy.y, enemy.z]}
            ]
          }}
        >
          <Model
            source={{
              obj: asset('death-star.obj'),
            }}
            texture={asset('death-star.png')}
          >
          </Model>
        </View>
      )
    }))
  }

  render () {
    return (
      <View>
        <Pano source={asset('space2.jpg')}/>
        {this.renderEnemies()}
      </View>
    )
  }
};

AppRegistry.registerComponent('gdg_reactvr', () => gdgReactVr)
