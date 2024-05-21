import React from "react";
import { TextStyle, ViewProps, StyleSheet, View, Text } from "react-native";

interface Props extends ViewProps {
  label: string;
  labelStyle?: TextStyle | TextStyle[];
}

export const ListEmptyView = ({ style, label, labelStyle, ...rest }: Props) => {
  return (
    <View style={[styles.container, style]} {...rest}>
      <Text style={[styles.label, labelStyle]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: 20,
  },
});
