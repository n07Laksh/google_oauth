import {createSlice} from "@reduxjs/toolkit";

export const userSlice =  createSlice({
  name:"user",
  initialState: {
    loadedImg:null,
    user:null,
    reload:null,
    alert:null,
  },
  reducers:{
    update:(state, action)=>{
      state.loadedImg = action.payload;
    },
    updateUser:(state,action)=>{
      state.user = action.payload;
    },
    reload: (state)=>{
      state.reload = true;
    },
    showAlert:(state, action) => {
      let arr = action.payload.split(",");
      state.alert = {
        message:arr[0],
        type:arr[1],
      }
    },
    hideAlert:(state)=>{
      state.alert = null;
    }
  }
});

export const { update, updateUser, reload, showAlert, hideAlert } = userSlice.actions;
export default userSlice.reducer;
