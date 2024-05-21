import { useEffect, useState } from "react";

import {
  Text,
  FlatList,
  StyleSheet,
  RefreshControl,
  TouchableOpacity,
} from "react-native";

import { ListEmptyView } from "@/components/ListEmptyView";
import { MODEL, getModelForMark } from "@/service/endpoints";
import { useVehicleInfo } from "@/providers/VehicleInfoProvider";

export default function Model() {
  const { make, setModel } = useVehicleInfo();

  const [models, setModels] = useState<Array<MODEL>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getModels = async (mark: string | undefined) => {
    if (mark) {
      setIsLoading(true);
      const result = await getModelForMark(mark);
      setModels(result);
      setIsLoading(false);
    }
  };

  const onModelSelectHandler = (model: MODEL) => {
    setModel(model);
  };

  useEffect(() => {
    setModels([]);
    getModels(make?.Make_Name);
  }, [make]);

  const ModelItem = ({ model }: { model: MODEL }) => {
    return (
      <TouchableOpacity
        key={model.Model_ID}
        accessible
        importantForAccessibility="yes"
        accessibilityLabel={model.Model_Name}
        accessibilityRole="button"
        onPress={() => onModelSelectHandler(model)}
      >
        <Text style={styles.modelItem}>{model.Model_Name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList<MODEL>
      accessible
      accessibilityLabel="Makes"
      importantForAccessibility="yes"
      accessibilityRole="list"
      data={models}
      contentContainerStyle={styles.flatList}
      refreshControl={<RefreshControl refreshing={isLoading} />}
      renderItem={({ item }) => <ModelItem model={item} />}
      ListEmptyComponent={<ListEmptyView label={"No models"} />}
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
  modelItem: {
    marginVertical: 1,
    backgroundColor: "white",
    paddingVertical: 15,
    paddingHorizontal: 20,
    fontSize: 20,
  },
});
