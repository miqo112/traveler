import axios, { AxiosResponse } from "axios";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import ICountryDetails from "../../../interfaces/ICoutryDetails"
import { DEFAULT_VALUES } from "../constants"

export type CountryDetailsSlice = {
  data: ICountryDetails;
  loading: boolean;
  error: string;
}

const initialState: CountryDetailsSlice = { data: DEFAULT_VALUES, loading: false, error: '' };

export const fetchCountryDetails = createAsyncThunk(
  'countryDetails/fetchCountryDetails',
  async (name: string) => {
    const response = await axios(`https://api.api-ninjas.com/v1/country?name=${name}`, {
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': 'd5YlFfXHXlqA2wCvhkmCGg==99Ru6pD1T0ww6B8w',
      },
    });
    
    if (!response.data[0]) {
      throw new Error('no such country')
    }

    return response.data[0] as ICountryDetails;
  }
)

export const countryDetailsSlice = createSlice({
  name: 'countryDetails',
  initialState,
  reducers: {
    setCountryDetails: (state, action: PayloadAction<ICountryDetails>) => {
      state.data = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCountryDetails.pending, (state, action) => {
      state.loading = true;
      state.error = '';
    });
    builder.addCase(fetchCountryDetails.rejected, (state, action) => {
      state.loading = false;
      state.error = 'No such Country';
    });
    builder.addCase(fetchCountryDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.error = '';
      state.data = action.payload;
    });
  }
})

export const { actions: { setCountryDetails }, reducer: countryDetailsReducer } = countryDetailsSlice;