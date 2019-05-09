import React, {Component} from 'react';
import {View, StyleSheet, TextInput, TouchableOpacity, Text} from 'react-native';
export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ""
    }
  }

  onPress = () => {
    this.props.navigation.navigate('Chat', { name: this.state.name });
  }

  onChangeText = name => this.setState({ name });

    render() {
      return (
        <View>
          <Text style={styles.title}>Enter your name:</Text>
          <TextInput
          style={styles.nameInput}
          placeHolder="John Cena"
          onChangeText={this.onChangeText}
          value={this.state.name}
        />
          <TouchableOpacity onPress={this.onPress}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      );
    }
}

const offset = 24;
const styles = StyleSheet.create({
  nameInput: {
    height: offset * 2,
    margin: offset,
    paddingHorizontal: offset,
    borderColor: '#111',
    borderWidth: 1
  },
  title: {
    marginTop: offset,
    marginLeft: offset,
    fontSize: offset,
  },
  buttonText: {
    marginLeft: offset,
    fontSize: offset,
  },
});

