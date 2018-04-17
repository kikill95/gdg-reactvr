// initial view
// pano

import React from 'react'
import {
  AppRegistry,
  asset,
  Pano,
  View
} from 'react-vr'

export default class gdgReactVr extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      
    }
  }

  render () {
    return (
      <View>
        <Pano source={asset('space2.jpg')}/>
      </View>
    )
  }
};

AppRegistry.registerComponent('gdg_reactvr', () => gdgReactVr)
