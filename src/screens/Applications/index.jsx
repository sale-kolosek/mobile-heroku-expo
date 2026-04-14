/* eslint-disable no-shadow */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable no-nested-ternary */
/* eslint-disable import/named */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import moment from "moment"
import React, { PureComponent } from "react"
import {
  BackHandler,
  Modal,
  StatusBar,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native"
import { Input } from "react-native-elements"
import { SwipeListView } from "react-native-swipe-list-view"
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"

import AppTile from "../../component/AppTile"
import Hairline from "../../component/Hairline"
import NoApps from "../../component/NoApps"
import UnderButton from "../../component/UnderButton"
import Screen from "../../layouts/Screen"
import { restartAllDynos } from "../../store/AppData"
import { fetchApps, fetchAppsByCriteria } from "../../store/Apps"
import { previewApps } from "../../store/Auth"
import Analytics from "../../util/analytics-util"
import Toast from "../../util/Toast"

const styles = StyleSheet.create({
  inputView: {
    backgroundColor: "#EEE",
    width: 300,
    borderRadius: 5,
    marginTop: 5,
  },
  modalView: {
    paddingTop: 20,
    backgroundColor: "#a087bd",
    alignItems: "center",
    marginHorizontal: 20,
    borderRadius: 8,
  },
})

class Applications extends PureComponent {
  constructor() {
    super()
    this.state = {
      isModalVisible: false,
      isDatePickerVisible: false,
      input1: "",
      input2: "",
      currentInput: 0,
      dateFrom: "",
      dateTo: "",
      ids: [],
    }
  }

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", () => true)

    if (this.props.token) this.props.fetchApps()
    this.previewRowKey = undefined
    setTimeout(() => {
      this.props.previewApps()
      this.state.ids = this.getAppList()
    }, 2000)
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", () => true)
  }

  selectApp = (item) => {
    this.props.navigation.navigate("App", { app: item })
  }

  restartApp = (appID) => {
    Analytics.track(Analytics.Events.APP_RESTART, { app_id: appID })
    this.props.restartAllDynos(appID)
  }

  hideModal = () => {
    this.setState({ isModalVisible: false })
  }

  showModal = () => {
    this.setState({ isModalVisible: true })
  }

  getAppList = () => {
    const applist = []
    for (let i = 0; i < this.props.apps.length; i++) {
      applist.push(this.props.apps[i].id)
    }
    return applist
  }

  handleFilter = () => {
    if (this.state.isDatePickerVisible) {
      const { dateFrom, dateTo } = this.state
      if (dateFrom && dateTo) {
        const firstDate = moment(dateFrom, "YYYY-MM-DD").format()
        let secondDate = moment(dateTo, "YYYY-MM-DD").endOf("day").format()
        this.props.fetchAppsByCriteria({
          criterium: `updated_at ${firstDate}..${secondDate}`,
          idList: this.state.ids,
        })
      }
      this.setState({ dateFrom: "", dateTo: "" })
    } else {
      if (this.state.currentInput === 2 && this.state.input2.trim().length === 36) {
        const input2 = this.state.input2.trim().toLowerCase()
        this.props.fetchAppsByCriteria({
          criterium: `id ${input2}..${input2}`,
          idList: this.state.ids,
        })
        this.state.input2 = ""
      } else if (this.state.currentInput === 2) {
        Toast.error("Application ID is Not Valid.")
      }
      if (this.state.currentInput === 1 && this.state.input1.length > 0) {
        const input1 = this.state.input1.toLowerCase().trim()
        this.props.fetchAppsByCriteria({
          criterium: `name ${input1}..${input1}`,
          idList: this.state.ids,
        })
        this.state.input1 = ""
      }
    }
    this.hideModal()
  }

  render() {
    const { apps, loading, token, fetchApps } = this.props
    return (
      <Screen
        withoutScrollView
        route={this.props.route}
        navigation={this.props.navigation}
        headerProps={{
          title: "Dyno Manage",
          right: "settings",
          showFilterModal: this.showModal,
        }}
      >
        <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
        <Modal
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          animationType="fade"
          transparent
          statusBarTranslucent
          visible={this.state.isModalVisible}
        >
          <TouchableOpacity
            style={{ backgroundColor: "rgba(0,0,0,0.5)", flex: 1, justifyContent: "center" }}
            onPress={() => this.hideModal()}
          >
            <View style={styles.modalView}>
              {!this.state.isDatePickerVisible && (
                <View style={styles.inputView}>
                  <Input
                    labelStyle={{ fontSize: 10, fontWeight: "normal" }}
                    inputStyle={{ padding: 0 }}
                    label="Application Name"
                    onChangeText={(text) => this.setState({ input1: text })}
                    onFocus={() => this.setState({ currentInput: 1 })}
                    testID="AppName.Input"
                  />
                  <Input
                    labelStyle={{ fontSize: 10, fontWeight: "normal" }}
                    inputStyle={{ padding: 0 }}
                    label="Application ID"
                    onChangeText={(text) => this.setState({ input2: text })}
                    onFocus={() => this.setState({ currentInput: 2 })}
                    testID="AppID.Input"
                  />
                </View>
              )}
              <View style={{ width: 300, marginTop: 5 }}>
                {this.state.isDatePickerVisible && (
                  <View style={{ backgroundColor: "#EEE", borderRadius: 8, padding: 10 }}>
                    <Input
                      label="From Date (YYYY-MM-DD)"
                      labelStyle={{ fontSize: 10, fontWeight: "normal" }}
                      placeholder="2024-01-01"
                      onChangeText={(text) => this.setState({ dateFrom: text })}
                      value={this.state.dateFrom}
                    />
                    <Input
                      label="To Date (YYYY-MM-DD)"
                      labelStyle={{ fontSize: 10, fontWeight: "normal" }}
                      placeholder="2024-12-31"
                      onChangeText={(text) => this.setState({ dateTo: text })}
                      value={this.state.dateTo}
                    />
                  </View>
                )}
              </View>
              <TouchableOpacity
                onPress={() =>
                  this.setState({ isDatePickerVisible: !this.state.isDatePickerVisible })
                }
              >
                <Text style={{ color: "#ffff", margin: 10, fontWeight: "900" }}>
                  {!this.state.isDatePickerVisible ? `Show Date Filter` : `Hide Date Filter`}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => token && this.handleFilter()}>
                <Text style={{ color: "#ffff", margin: 10, fontWeight: "900" }}>FILTER</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>
        <SwipeListView
          contentContainerStyle={{ flexGrow: 1 }}
          previewOpenDelay={1000}
          previewDuration={400}
          previewOpenValue={60}
          previewRowKey={
            this.props.appsPreviewed ? undefined : apps.length > 0 ? apps[0].id : undefined
          }
          data={apps}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableHighlight underlayColor="#eee" onPress={() => this.selectApp(item)}>
              <AppTile item={item} />
            </TouchableHighlight>
          )}
          onRefresh={() => token && fetchApps()}
          refreshing={loading}
          ListEmptyComponent={loading ? null : <NoApps />}
          ItemSeparatorComponent={() => <Hairline />}
          leftOpenValue={120}
          stopLeftSwipe={120}
          closeOnRowBeginSwipe
          disableLeftSwipe
          useNativeDriver
          renderHiddenItem={(rowData, rowMap) => {
            const { item } = rowData
            return (
              <UnderButton
                onPress={() => {
                  this.restartApp(item.id)
                  rowMap[rowData.item.id].closeRow()
                }}
              >
                <Icon name="restart" style={{ fontSize: 20 }} />
                RESTART
              </UnderButton>
            )
          }}
          onRowOpen={(rowKey) =>
            Analytics.track(Analytics.Events.APP_LIST_SWIPE_OPEN, { app_id: rowKey })
          }
          friction={17}
          swipeToOpenPercent={15}
          swipeToClosePercent={15}
        />
      </Screen>
    )
  }
}

const mapStateToProps = ({ apps, auth }) => ({
  apps: apps.apps,
  loading: apps.loading,
  error: apps.error,
  token: auth.token,
  appsPreviewed: auth.appsPreviewed,
})

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ fetchApps, fetchAppsByCriteria, restartAllDynos, previewApps }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Applications)
