import React from 'react'
import {
  AppRegistry,
  asset,
  Pano,
  View,
  VrButton,
  Sound
} from 'react-vr'

export default class gdgReactVr extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      isAudioReady: false,
      enemies: []
    }

    this.renderEnemies = this.renderEnemies.bind(this)
    this.startAudio = this.startAudio.bind(this)
    this.addNewEnemy = this.addNewEnemy.bind(this)

    setTimeout(this.addNewEnemy, 1000)
  }

  startAudio (event) {
    if (event.nativeEvent.playStatus === 'ready') {
      this.setState({isAudioReady: true})
    }
  }

  addNewEnemy () {
    this.setState({
      enemies: this.state.enemies.concat([{
        x: Math.random() * 20 - 10,
        y: Math.random() * 20 - 10,
        z: (this.state.enemies.length % 2 ? 1 : -1) * (Math.random() * 13 + 7)
      }])
    }, () => {
      setTimeout(this.addNewEnemy, 2000)
    })
  }

  renderEnemies () {
    return (this.state.enemies.map((enemy, index) => {
      return (
        <VrButton
          key={index}
          style={{
            width: 1,
            height: 1,
            backgroundColor: 'red',
            transform: [
              {translate: [enemy.x, enemy.y, enemy.z]},
              {rotateX: -Math.atan(enemy.y / enemy.z) + 'rad'},
              {rotateY: Math.atan(enemy.x / enemy.z) + 'rad'}
            ]
          }}
        ></VrButton>
      )
    }))
  }

  render () {
    return (
      <View>
        <Sound
          source={{
            mp3: asset('audio.mp3')
          }}
          loop
          playControl={this.state.isAudioReady ? 'play' : 'stop'}
          onPlayStatusChange={this.startAudio}
        />
        <Pano source={asset('space2.jpg')}/>
        {this.renderEnemies()}
      </View>
    )
  }
};

AppRegistry.registerComponent('gdg_reactvr', () => gdgReactVr)
