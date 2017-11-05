import React from 'react'
import {
  AppRegistry,
  asset,
  Pano,
  View,
  Sound
} from 'react-vr'

export default class gdgReactVr extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      isAudioReady: false
    }

    this.startAudio = this.startAudio.bind(this)
  }

  startAudio (event) {
    if (event.nativeEvent.playStatus === 'ready') {
      this.setState({isAudioReady: true})
    }
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
        <Pano source={asset('space2.jpg')} />
      </View>
    )
  }
};

AppRegistry.registerComponent('gdg_reactvr', () => gdgReactVr)
