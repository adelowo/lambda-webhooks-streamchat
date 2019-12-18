import React, {Fragment, Component} from 'react';
import {StreamChat} from 'stream-chat';
import axios from 'axios';
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

    this.chatClient = new StreamChat('5ru3vgh26prc');
  }

  handleSignin = () => {
    if (this.state.username === '') {
      Alert.alert('Username', 'Please provide your username');
      return;
    }

    axios
      .post('http://localhost:3000/users/create', {
        username: this.state.username,
      })
      .then(res => {
        if (res.data.status) {
          this.chatClient
            .setUser(
              {
                id: res.data.user_id,
                username: this.state.username,
                image:
                  'https://stepupandlive.files.wordpress.com/2014/09/3d-animated-frog-image.jpg',
              },
              res.data.token
            )
            .then(() => {
              axios
                .post('http://localhost:3000/users/add_member', {
                  username: this.state.username,
                })
                .then(() => {
                  this.setState({isAuthenticated: true});
                });
            });
          return;
        }

        Alert.alert('Authentication', 'Could not authenticate you. Try again');
      })
      .catch(err => {
        console.log(err);
        Alert.alert(
          'Authentication',
          'An error occurred while authenticating you. Try again'
        );
      });
  };

  render() {
    if (this.state.isAuthenticated) {
      return (
        <ChatView chatClient={this.chatClient} username={this.state.username} />
      );
    }
    return (
      <View style={styles.container}>
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
