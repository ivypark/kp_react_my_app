import React from 'react';
import { StyleSheet, Text, View, StatusBar, TextInput, Dimensions, Platform } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Wine from "./Wine";

const { height, width } = Dimensions.get("window");

export default class App extends React.Component {
  state = {
    search: ""
  }
  render() {
    const { search } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Text style={styles.title}> Wine Brewery </Text>
        <View style={styles.card}>
          <TextInput 
            style={styles.input} 
            placeholder={"S E A R C H"}
            value={search} 
            onChangeText={this._controlSearch} 
            placeholderTextColor={"#999"} 
            returnKeyType={"done"}
            autoCorrect={false}
          />
          <ScrollView contentContainerStyle={styles.todos}>
            <Wine />
          </ScrollView>
        </View>
      </View>
    );
  }

  _controlSearch = text => {
    this.setState({
      search: text
    })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#a74faf',
    alignItems: 'center',
  },
  title: {
    color: "white",
    fontSize: 30,
    marginTop: 30,
    fontWeight: "200",
    marginBottom: 20
  },
  card: {
    backgroundColor: "white",
    flex: 1,
    width: width - 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    ...Platform.select({
      ios: {
        shadowColor: "rgb(50, 50, 50)",
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowOffset: {
          height: -1,
          width: 0
        }
      },
      android: {
        elevation: 3
      }
    })
  },
  input: {
    padding: 20,
    borderBottomColor: "#bbb",
    borderBottomWidth: 1,
    fontSize: 25
  },
  todos: {
    alignItems: "center";
  }
});
