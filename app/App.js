import React from 'react';
import { StyleSheet, Text, View, StatusBar, TextInput, Dimensions, Platform } from 'react-native';
import { AppLoading } from 'expo';
import { ScrollView } from 'react-native-gesture-handler';
import Wine from "./Wine";
import uuidv1 from "uuid/v1";
import axios from "axios";

const { height, width } = Dimensions.get("window");

export default class App extends React.Component {
    state = {
        search: "",
        loadedApp: false,
        toDos: {},
        wineList: {}
    };

    componentDidMount() {
        this._loadApp();
    };

    _loadApp = async () => {
        const wineList = await this._load();
        this.setState({
            loadedApp: true,
            wineList
        })
    };

    // Get, FindAll API
    _load = () => {
        let url = 'http://106.240.247.44:6767/wines';
        let option = {
            method: 'GET',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            }
        };

        return fetch(url, option)
            .then(resp => resp.json())
            .then(json => json)
            .catch(e => {console.log(e)});
    };

  render() {
    const { search, loadedApp, toDos, wineList } = this.state;
    console.log('ivypark : ', wineList, loadedApp);
    if (!loadedApp) {
      return <AppLoading />;
    }
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Text style={styles.title}> Wine Brewery </Text>
        <View style={styles.card}>
          <TextInput 
            style={styles.input} 
            placeholder={"SEARCH"}
            value={search} 
            onChangeText={this._controlSearch} 
            placeholderTextColor={"#999"} 
            returnKeyType={"done"}
            autoCorrect={false}
            onSubmitEditing={this._addWine}
          />
          <ScrollView contentContainerStyle={styles.toDos}>
              {Object.values(wineList).map(list =>
                  <Wine
                      key={list.id}
                      {...list}
                      deleteWine={this._deleteWine}
                      uncompleteWine={this._uncompleteWine}
                      completeWine={this._completeWine}
                      updateWine={this._updateWine}
                  /> )}
          </ScrollView>
        </View>
      </View>
    );
  }

  _controlSearch = text => {
    this.setState({
      search: text
    })
  };

  _addWine = () => {
    const { search } = this.state;
    if (search !== "") {
      this.setState(prevState => {
        const ID = uuidv1();
        const searchObject = {
          [ID]: {
            id: ID,
            isCompleted: false,
            text: search,
            createdAt: Date.now()
          }
        };

        const newState = {
          ...prevState,
          search: "",
          toDos: {
            ...prevState.toDos,
            ...searchObject
          }
        };

        return { ...newState };
      });
    }
  };

  _deleteWine = id => {
    this.setState(prevState => {
      const toDos = prevState.toDos;
      delete toDos[id];
      const newState = {
        ...prevState,
        ...toDos
      };
      return { ...newState }
    })
  };

  _uncompleteWine = (id) => {
    this.setState(prevState => {
        const newState = {
          ...prevState,
          toDos: {
            ...prevState.toDos,
            [id]: {
              ...prevState.toDos[id],
              isCompleted: false
            }
          }
        };
        return { ...newState };
    });
  };

  _completeWine = (id) => {
      this.setState(prevState => {
          const newState = {
              ...prevState,
              toDos: {
                  ...prevState.toDos,
                  [id]: {
                      ...prevState.toDos[id],
                      isCompleted: true
                  }
              }
          };
          return { ...newState };
      });
  };

  _updateWine = (id, text) => {
      this.setState(prevState => {
          const newState = {
              ...prevState,
              toDos: {
                  ...prevState.toDos,
                  [id]: {
                      ...prevState.toDos[id],
                      text: text
                  }
              }
          };
          return { ...newState };
      });
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
    fontSize: 25,
  },
  toDos: {
    alignItems: "center"
  }
});
