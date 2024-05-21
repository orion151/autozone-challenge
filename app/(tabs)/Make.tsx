import { useEffect, useState } from "react";

import {
  Text,
  FlatList,
  StyleSheet,
  RefreshControl,
  TouchableOpacity,
} from "react-native";

import { useRouter } from "expo-router";

import { MARK, getAllMark } from "@/service/endpoints";
import { ListEmptyView } from "@/components/ListEmptyView";
import { useVehicleInfo } from "@/providers/VehicleInfoProvider";

export default function Make() {
  const router = useRouter();
  const { year, setMake } = useVehicleInfo();

  const [makes, setMakes] = useState<Array<MARK>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getMakes = async (year: number | undefined) => {
    if (year) {
      setIsLoading(true);
      const result = await getAllMark();
      setMakes(result);
      setIsLoading(false);
    }
  };

  const onMakeSelectHandler = (make: MARK) => {
    setMake(make);
    router.push("/Model");
  };

  useEffect(() => {
    setMakes([]);
    getMakes(year);
  }, [year]);

  const MakeItem = ({ make }: { make: MARK }) => {
    return (
      <TouchableOpacity
        accessible
        importantForAccessibility="yes"
        accessibilityLabel={make.Make_Name}
        accessibilityRole="button"
        key={make.Make_ID}
        onPress={() => onMakeSelectHandler(make)}
      >
        <Text style={styles.makeItem}>{make.Make_Name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList<MARK>
      accessible
      accessibilityLabel="Makes"
      importantForAccessibility="yes"
      accessibilityRole="list"
      data={makes}
      contentContainerStyle={styles.flatList}
      refreshControl={<RefreshControl refreshing={isLoading} />}
      renderItem={({ item }) => <MakeItem make={item} />}
      ListEmptyComponent={<ListEmptyView label={"No Makes"} />}
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
  makeItem: {
    marginVertical: 1,
    backgroundColor: "white",
    paddingVertical: 15,
    paddingHorizontal: 20,
    fontSize: 20,
  },
});
