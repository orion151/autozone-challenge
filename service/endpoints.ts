import axios from "axios";

const GET_ALL_MARK =
  "https://vpic.nhtsa.dot.gov/api/vehicles/GetAllMakes?format=json";
const GET_MODEL_FOR_MARK =
  "https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMake/";

export type MARK = {
  Make_ID: string;
  Make_Name: string;
};

export type MODEL = {
  Make_ID: string;
  Make_Name: string;
  Model_ID: string;
  Model_Name: string;
};

export const getAllMark = async (): Promise<MARK[]> => {
  try {
    const result = await axios.get(GET_ALL_MARK);
    if (result.status == 200) {
      return result.data?.Results as MARK[];
    } else {
      return [];
    }
  } catch (error) {
    return [];
  }
};

export const getModelForMark = async (mark: string): Promise<MODEL[]> => {
  try {
    const result = await axios.get(`${GET_MODEL_FOR_MARK}${mark}?format=json`);
    if (result.status == 200) {
      return result.data?.Results as MODEL[];
    } else {
      return [];
    }
  } catch (error) {
    return [];
  }
};
