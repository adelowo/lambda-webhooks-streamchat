import React, {Fragment, Component} from 'react';
import {StreamChat} from 'stream-chat';
import {
  TouchableOpacity,
  Text,
  Alert,
  Button,
  TextInput,
  View,
  StyleSheet,
} from 'react-native';
import ChatView from './ChatView';

export default class App extends Component {
  state = {
    username: '',
    isAuthenticated: false,
  };

  constructor(props) {
    super(props);

    this.chatClient = new StreamChat('9agc4x9dmrft');
  }

  handleSignin = () => {
    if (this.state.username === '') {
      Alert.alert('Username', 'Please provide your username');
      return;
    }

    // Use lambda for the authentication and token retrieval.
    this.chatClient.setGuestUser({id: this.state.username}).then(() => {
      this.setState({isAuthenticated: true});
    });
  };

  render() {
    return (
      <View style={styles.container}>
        {this.state.isAuthenticated ? (
          <ChatView chatClient={this.chatClient} />
        ) : (
          <Fragment>
            <TextInput
              style={styles.input}
              value={this.state.username}
              onChangeText={username => this.setState({username})}
              placeholder={'Please provide your username'}
              style={styles.input}
            />
            <TouchableOpacity style={styles.button} onPress={this.handleSignin}>
              <Text style={{textAlign: 'center', height: 20}}>Login</Text>
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
