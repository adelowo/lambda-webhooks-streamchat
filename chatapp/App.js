import React, { Fragment, Component } from 'react';
import {
  TouchableOpacity,
  Text,
  Alert,
  Button,
  TextInput,
  View,
  StyleSheet,
} from 'react-native';
import Chat from './Chat';

export default class App extends Component {
  state = {
    username: '',
    isAuthenticated: false,
  };

  handleSignin = () => {
    Alert.alert('Credentials', `${this.state.username} `);
  };

  render() {
    return (
      <View style={styles.container}>
        {this.state.isAuthenticated ? (
          <Chat />
        ) : (
          <Fragment>
            <TextInput
              style={styles.input}
              value={this.state.username}
              onChangeText={username => this.setState({ username })}
              placeholder={'Please provide your username'}
              style={styles.input}
            />
            <TouchableOpacity style={styles.button} onPress={this.handleSignin}>
              <Text style={{ textAlign: 'center', height: 20 }}>Login</Text>
            </TouchableOpacity>
          </Fragment>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'silver',
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: 20,
  },
  button: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'orange',
    marginBottom: 12,
    paddingVertical: 12,
    borderRadius: 4,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'red',
  },
});
