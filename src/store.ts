// Хранилище Redux
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

const trainsSlice = createSlice ({
    name: "trains",
    initialState: {
        list: [
      { id: 1, name: "010 «Жигули»", route: "Москва - Самара", time: "4:20", price: "4 200 Р" },
      { id: 2, name: "032 «Оренбуржье»", route: "Москва - Самара", time: "4:25", price: "4 300 Р" },
      { id: 3, name: "016 «Двухэтажный состав»", route: "Москва - Самара", time: "6:30", price: "3 200 Р" },
      { id: 4, name: "014 «Южный Урал»", route: "Москва - Самара", time: "18:20", price: "5 600 Р" },
        ]
    },
    reducers: {
      addTrain: (state, action) => {
        state.list.push(action.payload);
      },
      removeTrain: (state, action) => {
        state.list = state.list.filter(train=>train.id !== action.payload);
      },
      updateTrain: (state, action) => {
        const index = state.list.findIndex(train =>train.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      }
    }
});
export const {addTrain, removeTrain, updateTrain} = trainsSlice.actions;

export const store = configureStore({
  reducer: {
    trains: trainsSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;