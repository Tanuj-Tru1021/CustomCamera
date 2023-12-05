import React from 'react';
import { View } from 'react-native'
import CustomCamera from './src/CustomCamera';

const App = () => {

  return (
    <View style={{ flex: 1 }}>
      <CustomCamera />
    </View>
  );
}

export default App;