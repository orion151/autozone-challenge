import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";

import {
  MaterialTopTabBarProps,
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationOptions,
  MaterialTopTabNavigationEventMap,
} from "@react-navigation/material-top-tabs";
import { withLayoutContext } from "expo-router";
import { ParamListBase, TabNavigationState } from "@react-navigation/native";

import { Header } from "@/components/Header";
import { useVehicleInfo } from "@/providers/VehicleInfoProvider";

const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator);

export default function TabLayout() {
  const { year, make } = useVehicleInfo();

  const CustomTabBar = ({
    state,
    descriptors,
    navigation,
  }: MaterialTopTabBarProps) => {
    return (
      <View style={styles.tabbarContainer}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label = options.title;
          const isFocused = state.index === index;
          let disabled = false;
          if (label === "Year") {
            disabled = false;
          } else if (label === "Make" && year === undefined) {
            disabled = true;
          } else if (
            label === "Model" &&
            (year === undefined || make === undefined)
          ) {
            disabled = true;
          } else {
            disabled = false;
          }

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          return (
            <TouchableOpacity
              key={label}
              accessibilityRole="tabbar"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={label}
              testID={options.tabBarTestID}
              onPress={onPress}
              disabled={disabled}
              style={styles.tabbar}
            >
              <Text style={isFocused ? styles.active : styles.normal}>
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <MaterialTopTabs
        accessibilityRole="tablist"
        initialRouteName="index"
        screenOptions={{ tabBarIndicator: () => null, swipeEnabled: false }}
        tabBar={(props) => <CustomTabBar {...props} />}
      >
        <MaterialTopTabs.Screen name="index" options={{ title: "Year" }} />
        <MaterialTopTabs.Screen name="Make" options={{ title: "Make" }} />
        <MaterialTopTabs.Screen name="Model" options={{ title: "Model" }} />
        <MaterialTopTabs.Screen name="Engine" options={{ title: "Engine" }} />
      </MaterialTopTabs>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  tabbarContainer: {
    flexDirection: "row",
    borderTopColor: "#ececec",
    borderTopWidth: 1,
    borderStyle: "solid",
  },
  tabbar: {
    flex: 1,
    paddingVertical: 20,
    flexDirection: "row",
    justifyContent: "center",
  },
  active: {},
  normal: {
    color: "gray",
  },
});
