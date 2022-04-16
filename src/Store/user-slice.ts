import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export type ListArr = { _id: string };
interface SlicerState {
  sliderOpen: Boolean;
  currentIdx: number;
  currentImg: string;
  imgArr: ListArr[];
  selectedItem: ListArr[];
}
const initialState: SlicerState = {
  sliderOpen: false,
  imgArr: [],
  currentIdx: 0,
  currentImg: "",
  selectedItem: [],
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getList(state, action: PayloadAction<ListArr[]>) {
      state.imgArr = action.payload;
    },
    setCurrentidx(state, action) {
      state.currentIdx = action.payload;
    },
    imgDelete(state, action) {
      state.imgArr = action.payload;
    },
    setSelected(state, action) {
      state.selectedItem.push(action.payload);
    },
    changeSelected(state, action) {
      state.selectedItem = action.payload;
    },
    sliderOpen(state) {
      state.sliderOpen = true;
    },
    sliderClose(state) {
      state.sliderOpen = false;
    },
    sliderNext(state) {
      state.currentIdx < state.imgArr.length - 1 &&
        (state.currentIdx = state.currentIdx + 1);

      //loop
      // state.currentIdx < state.imgArr.length - 1
      //   ? (state.currentIdx = state.currentIdx + 1)
      //   : (state.currentIdx = 0);
    },
    sliderPrev(state) {
      state.currentIdx > 0 && (state.currentIdx = state.currentIdx - 1);

      //loop
      // state.currentIdx < 1
      //   ? (state.currentIdx = state.imgArr.length - 1)
      //   : (state.currentIdx = state.currentIdx - 1);
    },
  },
});
export const userAction = userSlice.actions;
export default userSlice;
