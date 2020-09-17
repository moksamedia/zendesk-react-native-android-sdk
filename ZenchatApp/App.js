/**
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  StatusBar,
  SafeAreaView,
  StyleSheet,
  View,
  Button,
  Text,
  NativeModules,
} from 'react-native';

class App extends React.Component {

  openZenchat() {
    NativeModules.ZenchatModule.showChat();
  }

  render() {
    return (
        <>
          <StatusBar barStyle="dark-content" />
          <SafeAreaView>
            <View style={styles.container}>
              <Text style={styles.title}>Zenchat App</Text>
              <Button
                  title={"Press to open chat"}
                  onPress={this.openZenchat}
              />
            </View>
          </SafeAreaView>
        </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 50,
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 50,
  },
});

export default App;
