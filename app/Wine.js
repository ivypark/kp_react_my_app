import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, TextInput } from "react-native";
import PropTypes from "prop-types";

const { width, height } = Dimensions.get("window");

export default class Wine extends Component {
    constructor(props) {
        super(props);
        this.state = { isEditing: false, editingValue: props.name };
    }

    static propTypes = {
        name: PropTypes.string.isRequired,
        // isCompleted: PropTypes.bool.isRequired,
        deleteWine: PropTypes.func.isRequired,
        id: PropTypes.string.isRequired,
        uncompleteWine: PropTypes.func.isRequired,
        completeWine: PropTypes.func.isRequired,
        updateWine: PropTypes.func.isRequired
    };

    state = {
        isEditing: false,
        editingValue: ""
    };
    
    render() {
        const { isEditing, editingValue } = this.state;
        const { name, deleteWine, id, isCompleted } = this.props;
        console.log(name);
        return (
        <View style={styles.container}>
            <View style={styles.column}>
                <TouchableOpacity onPress={this._toggleComplete}>
                    <View style={[styles.circle, isCompleted ? styles.completedCircle : styles.uncompletedCircle]} />
                </TouchableOpacity>
                { isEditing ?
                    (
                    <TextInput
                        style={[styles.text, styles.input, isCompleted ? styles.completedText : styles.uncompletedText]}
                        value={editingValue}
                        multiline={true}
                        onChangeText={this._controllInput}
                    />
                ) : (
                    <Text style={[styles.text, isCompleted ? styles.completedText : styles.uncompletedText]}>
                        {name}
                    </Text>
                ) }
            </View>
            {isEditing ? (
                <View style={styles.actions}>
                    <TouchableOpacity onPressOut={this._finishEditing}>
                        <View style={styles.actionContainer}>
                            <Text style={styles.actionText}>V</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            ) : (
                <View style={styles.actions}>
                    <TouchableOpacity onPressOut={this._startEditing}>
                        <View style={styles.actionContainer}>
                            <Text style={styles.actionText}>M</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPressOut={() => deleteWine(id)}>
                        <View style={styles.actionContainer}>
                            <Text style={styles.actionText}>X</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            )}
        </View>
        )
    }

    _toggleComplete = () => {
        const { isCompleted, uncompleteWine, completeWine, id } = this.props;
        if (isCompleted) {
            uncompleteWine(id);
        } else {
            completeWine(id);
        }
    };

    _startEditing = () => {
        this.setState({
            isEditing: true
        });
    };

    _finishEditing = () => {
        const { editingValue } = this.state;
        const { id, updateWine } = this.props;
        updateWine(id, editingValue);
        this.setState({
            isEditing: false
        })
    };

    _controllInput = text => {
        this.setState({
            editingValue: text
        })
    }
}

const styles = StyleSheet.create({
    container: {
        width: width - 50,
        borderBottomColor: "#bbb",
        borderBottomWidth: StyleSheet.hairlineWidth,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    circle: {
        width: 30,
        height: 30,
        borderRadius: 15,
        borderWidth: 3,
        marginRight: 20
    },
    completedCircle: {
        borderColor: "#bbb"
    },
    uncompletedCircle: {
        borderColor: "#F23657"
    },
    text: {
        fontWeight: "600",
        fontSize: 20,
        marginVertical: 20
    },
    completedText: {
        color: "#bbb",
        textDecorationLine: "line-through"
    },
    uncompletedText: {
        color: "#353839"
    },
    column: {
        flexDirection: "row",
        alignItems: "center",
        width: width / 2
    },
    actions: {
        flexDirection: "row",
    },
    actionContainer: {
        marginVertical: 10,
        marginHorizontal: 10,
    },
    input: {
        width: width / 2,
        marginVertical: 15,
        paddingBottom: 5
    }
});