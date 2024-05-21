import React, { useEffect, useState } from "react";

import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";
import { usePathname, useRouter } from "expo-router";
import { useVehicleInfo } from "@/providers/VehicleInfoProvider";

export const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { year, make, model, setYear, setMake, setModel } = useVehicleInfo();

  const [headerTitle, setHeaderTitle] = useState<string>("");

  const onBackHandler = () => {
    switch (pathname) {
      case "/":
        break;
      case "/Make":
        router.replace("/");
        break;
      case "/Model":
        router.replace("/Make");
        break;
      case "/Engine":
        router.replace("/Model");
        break;
      default:
        router.back();
        break;
    }
  };

  useEffect(() => {
    switch (pathname) {
      case "/":
        setYear(undefined);
        setMake(undefined);
        setModel(undefined);
        setHeaderTitle("Choose Year");
        break;
      case "/Make":
        setMake(undefined);
        setModel(undefined);
        setHeaderTitle("Choose Make");
        break;
      case "/Model":
        setModel(undefined);
        setHeaderTitle("Choose Model");
        break;
      case "/Engine":
        setHeaderTitle("Choose Engine");
        break;
      default:
        setHeaderTitle("Choose Year");
        break;
    }
  }, [pathname]);

  return (
    <View
      accessible={false}
      importantForAccessibility="no"
      style={styles.header}
    >
      <TouchableOpacity
        accessible
        importantForAccessibility="yes"
        accessibilityLabel="back"
        style={styles.backButton}
        onPress={onBackHandler}
      >
        <Ionicons
          accessible={false}
          importantForAccessibility="no"
          name={pathname === "/" ? "close" : "chevron-back"}
          size={30}
          color="#ff7606"
        />
      </TouchableOpacity>
      <View
        accessible={false}
        importantForAccessibility="no"
        style={styles.titleContainer}
      >
        <Text
          accessible
          importantForAccessibility="yes"
          accessibilityLabel={`title ${headerTitle}`}
          style={styles.title}
        >
          {headerTitle}
        </Text>
        <Text
          accessible
          importantForAccessibility="yes"
          accessibilityLabel={`You selected ${year ?? ""} ${
            make?.Make_Name ?? ""
          } ${model?.Model_Name ?? ""}`}
          style={styles.subtitle}
        >{`${year ?? ""} ${make?.Make_Name ?? ""} ${
          model?.Model_Name ?? ""
        }`}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    backgroundColor: "white",
    marginBottom: 2,
    paddingVertical: 5,
    alignItems: "center",
  },
  backButton: {
    position: "absolute",
    zIndex: 99,
    left: 5,
  },
  titleContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    paddingBottom: 5,
  },
  subtitle: {
    fontSize: 12,
    color: "gray",
  },
});
