import { createSlice } from "@reduxjs/toolkit";
import { FILE_PATH } from "./action";

const chargers = [
    {
        name: "Bangalore-mysore highway",
        id: "a001",
        address: "ring road, Bangalore",
        distance: "2102",
        distance_metrics: "metres",
        latitude: 12.9459157,
        longitude: 77.5217112,
        connector_types: ["lvl1dc-2", "lvl2dc-1", "normalac-1"]
    },
    {
        name: "expressway charging - mariam enterprise",
        id: "a002",
        address: "connaught place, delhi",
        distance: "2102",
        distance_metrics: "metres",
        latitude: 12.947,
        longitude: 77.5217112,
        connector_types: ["lvl1dc-2", "lvl2dc-1", "normalac-1"]
    },
    {
        name: "expressway charging - mariam enterprise",
        id: "a003",
        address: "connaught place, delhi",
        distance: "2102",
        distance_metrics: "metres",
        latitude: 12.947123,
        longitude: 77.5227129,
        connector_types: ["lvl1dc-2", "lvl2dc-1", "normalac-1"]
    },
    {
        name: "expressway charging - mariam enterprise",
        id: "a004",
        address: "connaught place, delhi",
        distance: "2102",
        distance_metrics: "metres",
        latitude: 12.948,
        longitude: 77.5227112,
        connector_types: ["lvl1dc-2", "lvl2dc-1", "normalac-1"]
    },
]

const file = {
    path: '',
    lat: '',
    long: ''
}

export const fileReducer = (state = file, action) => {
    switch (action.type) {
        case FILE_PATH:
            return { ...state, path: action.payload }
        case 'LAT':
            return { ...state, lat: [action.payload] }
        case 'LONG':
            return { ...state, long: action.payload }
        default:
            return state;
    }
};

const evSlice = createSlice({
    name: 'evaay',
    initialState: chargers,
    reducers: {
        chargerData(state, action) {
            state
        }
    }
})

export default evSlice.reducer;




