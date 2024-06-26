import { useEffect, useState } from "react";

import {
  Text,
  FlatList,
  StyleSheet,
  RefreshControl,
  TouchableOpacity,
} from "react-native";

import { useRouter } from "expo-router";

import { ListEmptyView } from "@/components/ListEmptyView";
import { useVehicleInfo } from "@/providers/VehicleInfoProvider";

export default function Year() {
  const router = useRouter();
  const { setYear } = useVehicleInfo();

  const [years, setYears] = useState<Array<number>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const generateYears = (startYear: number, endYear: number): Array<number> => {
    setIsLoading(true);
    const years: Array<number> = [...Array(endYear - startYear + 1).keys()]
      .map((i) => i + startYear)
      .reverse();
    setIsLoading(false);
    return years;
  };

  const onYearSelectHandler = (year: number) => {
    setYear(year);
    router.push("/Make");
  };

  useEffect(() => {
    const startYear: number = 1995;
    const endYear: number = new Date().getFullYear();
    const years = generateYears(startYear, endYear);
    setYears(years);
  }, []);

  const YearItem = ({ year }: { year: number }) => {
    return (
      <TouchableOpacity
        accessible
        importantForAccessibility="yes"
        accessibilityLabel={year.toString()}
        accessibilityRole="button"
        onPress={() => onYearSelectHandler(year)}
      >
        <Text style={styles.yearItem}>{year}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList<number>
      accessible
      accessibilityLabel="Years"
      importantForAccessibility="yes"
      accessibilityRole="list"
      data={years}
      contentContainerStyle={styles.flatList}
      refreshControl={<RefreshControl refreshing={isLoading} />}
      renderItem={({ item }) => <YearItem year={item} />}
      ListEmptyComponent={<ListEmptyView label={"No Years"} />}
      scrollEventThrottle={50}
      maxToRenderPerBatch={10}
      onEndReachedThreshold={0.5}
    />
  );
}

const styles = StyleSheet.create({
  flatList: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  yearItem: {
    marginVertical: 1,
    backgroundColor: "white",
    paddingVertical: 15,
    paddingHorizontal: 20,
    fontSize: 20,
  },
});
