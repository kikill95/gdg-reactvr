import React from 'react'
import {
  AppRegistry,
  asset,
  Pano,
  View,
  Sphere,
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
        x: Math.random() * 100 - 50,
        y: Math.random() * 40 - 20,
        z: (this.state.enemies.length % 2 ? 1 : -1) * (Math.random() * 13 + 7)
      }])
    }, () => {
      setTimeout(this.addNewEnemy, 2000)
    })
  }

  renderEnemies () {
    return (this.state.enemies.map((enemy, index) => {
      return (
        <Sphere
          key={index}
          radius={1}
          widthSegments={50}
          heightSegments={50}
          style={{
            color: 'red',
            transform: [{
              translate: [enemy.x, enemy.y, enemy.z],
              rotateX: enemy.x,
              rotateY: enemy.y
            }]
          }}
        />
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
