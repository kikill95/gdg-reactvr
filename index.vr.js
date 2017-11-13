import React from 'react'
import {
  AppRegistry,
  asset,
  Pano,
  View,
  VrButton,
  Model,
  Sound,
  Animated
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
    this.moveEnemies = this.moveEnemies.bind(this)

    setTimeout(this.addNewEnemy, timeout)
    setTimeout(this.moveEnemies, 2 * timeout)
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
    enemy.animX = new Animated.Value(enemy.x)
    enemy.rotateX = new Animated.Value(-Math.atan(enemy.y / enemy.z) + 'rad')
    enemy.animY = new Animated.Value(enemy.y)
    enemy.rotateY = new Animated.Value(Math.atan(enemy.x / enemy.z) + 1.91 + 'rad')
    enemy.animZ = new Animated.Value(enemy.z)

    this.setState({
      enemies: this.state.enemies.concat([enemy])
    }, () => {
      setTimeout(this.addNewEnemy, 2 * timeout)
    })
  }

  moveEnemies () {
    this.setState({
      enemies: this.state.enemies.map(enemy => {
        enemy.x += enemy.x > 0 ? -0.5 : 0.5
        enemy.y += enemy.y > 0 ? -0.5 : 0.5
        enemy.z += enemy.z > 0 ? -0.5 : 0.5
        Animated.parallel([
          Animated.timing(enemy.animX, {toValue: enemy.x}),
          Animated.timing(enemy.rotateX, {toValue: -Math.atan(enemy.y / enemy.z) + 'rad'}),
          Animated.timing(enemy.animY, {toValue: enemy.y}),
          Animated.timing(enemy.rotateY, {toValue: Math.atan(enemy.x / enemy.z) + 1.91 + 'rad'}),
          Animated.timing(enemy.animZ, {toValue: enemy.z})
        ]).start()
        return enemy
      })
    }, () => {
      if (this.state.enemies.find(enemy => Math.abs(enemy.x) < 1 && Math.abs(enemy.y) < 1 && Math.abs(enemy.z) < 1)) {
        console.log('You died')
        return
      }
      setTimeout(this.moveEnemies, timeout)
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
        <Animated.View
          key={index}
          style={{
            transform: [
              {translate: [enemy.animX, enemy.animY, enemy.animZ]},
              {rotateX: enemy.rotateX},
              {rotateY: enemy.rotateY}
            ]
          }}
        >
          <Model
            source={{
              obj: asset('death-star.obj'),
            }}
            texture={asset('death-star.png')}
            wireframe={false}
          >
            <VrButton
              onClick={() => this.removeEnemy(index)}
              onClickSound={{
               mp3: asset('blaster.mp3'),
              }}
              style={{
                width: 1.25,
                height: 1.25,
                backgroundColor: 'red',
                transform: [
                  {translate: [enemy.z > 0 ? 1.25 : -1.25, 0, enemy.z > 0 ? 0.5 : -0.5]},
                  {rotateY: -1.91 + 'rad'}
                ]
              }}
            ></VrButton>
          </Model>
        </Animated.View>
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
