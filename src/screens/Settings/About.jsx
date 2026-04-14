/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import React from "react"
import { Linking, StyleSheet, TouchableOpacity } from "react-native"

import useOTAVersion from "../../hooks/useOTAVersion"
import Screen from "../../layouts/Screen"
import { Colors, Text } from "../../Theme"

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 14,
    fontWeight: "900",
  },
  sectionText: {
    fontSize: 12,
    marginBottom: 30,
  },
  link: {
    fontSize: 12,
    marginBottom: 30,
    color: Colors.primary,
  },
})

const About = () => {
  const { appVersion } = useOTAVersion()

  return (
    <Screen headerProps={{ left: "back", title: "About" }} style={{ padding: 15 }}>
      <Text style={styles.sectionTitle}>Built by:</Text>
      <TouchableOpacity onPress={() => Linking.openURL("https://kolosek.com/")}>
        <Text style={styles.link}>Kolosek</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Version:</Text>
      <Text style={styles.sectionText}>{appVersion}</Text>

      <Text style={styles.sectionTitle}>Description:</Text>
      <Text style={styles.sectionText}>
        We made this application so it's easier for development teams to manage their servers from
        their mobile devices. You can restart your servers and rollback to any previous release. If
        you need any assistance on your specific server, please let us know via the Contact Us page.
      </Text>
    </Screen>
  )
}

export default About
