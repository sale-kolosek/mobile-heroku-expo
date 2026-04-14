/* eslint-disable no-shadow */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/named */
import PropTypes from "prop-types"
import React, { Component } from "react"
import { Text, TouchableOpacity, View } from "react-native"
import { Input } from "react-native-elements"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"

import Screen from "../../layouts/Screen"
import { createCollaborator } from "../../store/AppData"
import { globalStyles } from "../../Theme"
import Toast from "../../util/Toast"

class AddColaborator extends Component {
  constructor(props) {
    super(props)
    this.state = { text: "" }
  }

  handleAddCollaborator() {
    const { appID, createCollaborator, navigation } = this.props
    const inputValue = this.state.text

    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(inputValue)) {
      if (inputValue) createCollaborator(appID, inputValue)
      navigation.goBack(null)
    } else {
      Toast.error("Wrong ID")
    }
  }

  render() {
    const { text } = this.state
    return (
      <Screen
        style={{
          ...globalStyles.container,
          padding: 15,
        }}
        headerProps={{ left: "back", title: "Add collaborator" }}
      >
        <Input
          labelStyle={{ fontSize: 10, fontWeight: "normal" }}
          inputStyle={{ padding: 0 }}
          value={text}
          label="User ID"
          onChangeText={(val) => this.setState({ text: val })}
          testID="CollaboratorId.Input"
        />
        <View style={{ flex: 1 }} />
        <TouchableOpacity
          style={globalStyles.button}
          onPress={() => {
            this.handleAddCollaborator()
          }}
          disabled={text === ""}
        >
          <Text style={{ color: "white", fontWeight: "900" }}>ADD</Text>
        </TouchableOpacity>
      </Screen>
    )
  }
}

AddColaborator.propTypes = {
  navigation: PropTypes.instanceOf(Object).isRequired,
  appID: PropTypes.string.isRequired,
  createCollaborator: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  appID: state.appData.data.id,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({ createCollaborator }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(AddColaborator)
