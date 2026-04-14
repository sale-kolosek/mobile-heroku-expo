/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from "react"
import { View } from "react-native"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import Header from "../../component/Header"
import { globalStyles } from "../../Theme"

const Screen = ({
  withoutHeader,
  style,
  headerProps,
  children,
  route,
  withoutScrollView,
  scrollViewProps,
}) => {
  const insets = useSafeAreaInsets()
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View style={globalStyles.screen}>
        {!withoutHeader && <Header {...headerProps} route={route} />}
        {withoutScrollView ? (
          <View style={[{ flex: 1 }, style]}>{children}</View>
        ) : (
          <KeyboardAwareScrollView
            contentContainerStyle={{
              flexGrow: 1,
              paddingLeft: insets.left,
              paddingRight: insets.right,
            }}
            {...scrollViewProps}
            showsVerticalScrollIndicator={false}
            {...scrollViewProps}
          >
            <View style={[{ flex: 1 }, style]}>{children}</View>
          </KeyboardAwareScrollView>
        )}
      </View>
    </View>
  )
}

export default Screen
