// audio and its events

import React from 'react'
import {
  AppRegistry,
  asset,
  Pano,
  View,
  VrButton,
  Model,
  Sound
} from 'react-vr'

const timeout = 1000

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
    this.removeEnemy = this.removeEnemy.bind(this)

    setTimeout(this.addNewEnemy, timeout)
  }

  startAudio (event) {
    if (event.nativeEvent.playStatus === 'ready') {
      this.setState({isAudioReady: true})
    }
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

  removeEnemy (index) {
    this.setState({
      enemies: this.state.enemies.slice(0, index).concat(this.state.enemies.slice(index + 1))
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
            <VrButton
              onClick={() => this.removeEnemy(index)}
              onClickSound={{
                mp3: asset('blaster.mp3'),
              }}
              onEnter={() => this.removeEnemy(index)}
              onEnterSound={{
                mp3: asset('blaster.mp3'),
              }}
              style={{
                width: 1.25,
                height: 1.25,
                transform: [
                  {translate: [-1.25, enemy.z > 0 ? 0.25 : 0, enemy.z > 0 ? -0.25 : -0.5]},
                  {rotateY: -1.91 + 'rad'}
                ]
              }}
            ></VrButton>
          </Model>
        </View>
      )
    }))
  }

  render () {
    return (
      <View>
        <Sound
          source={{
            mp3: asset('audio.mp3'),
            ogg: asset('audio.ogg')
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
