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
        z: (this.state.enemies.length % 2 ? 1 : -1) * (Math.random() * 6 + 4)
      }])
    }, () => {
      setTimeout(this.addNewEnemy, 2000)
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
        <Model
          key={index}
          source={{
            obj: asset('death-star.obj'),
          }}
          texture={asset('death-star.png')}
          wireframe={false}
          style={{
            transform: [
              {translate: [enemy.x, enemy.y, enemy.z]},
              {rotateX: -Math.atan(enemy.y / enemy.z) + 'rad'},
              {rotateY: Math.atan(enemy.x / enemy.z) + 1.91 + 'rad'}
            ]
          }}
        >
          <VrButton
            onClick={() => this.removeEnemy(index)}
            onClickSound={{
             mp3: asset('blaster.mp3'),
            }}
            style={{
              width: 1,
              height: 1,
              transform: [
                {translate: [enemy.z > 0 ? 1.15 : -1.15, 0, enemy.z > 0 ? 0.5 : -0.5]},
                {rotateY: -1.91 + 'rad'}
              ]
            }}
          ></VrButton>
        </Model>
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
