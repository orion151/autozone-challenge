import { StyleSheet, View, Text } from "react-native";

export default function Engine() {
  return (
    <View style={styles.container}>
      <Text>Comming soon...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
