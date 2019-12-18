import React, {Component} from 'react';
import {SafeAreaView, View} from 'react-native';
import {
  Chat,
  Channel,
  MessageList,
  MessageInput,
} from 'stream-chat-react-native';

export default class ChatView extends Component {
  state = {
    isReady: false,
  };

  render() {
    const channel = this.props.chatClient.channel(
      'messaging',
      'lambda-webhook-chat',
      {
        name: 'Webhook server',
      }
    );

    channel.watch().then(() => {
      this.setState({isReady: true});
    });

    if (!this.state.isReady) {
      return <Chat client={this.props.chatClient} />;
    }

    return (
      <Chat client={this.props.chatClient}>
        <Channel channel={channel}>
          <View style={{display: 'flex', height: '100%'}}>
            <MessageList />
            <MessageInput />
          </View>
        </Channel>
      </Chat>
    );
  }
}
