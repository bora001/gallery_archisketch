import React, { useEffect } from "react";
import "./App.css";
import ItemList from "./Pages/ItemList/ItemList";
import Slide from "./Pages/Slide/Slide";
import { useAppSelector, useAppDispatch } from "./Store/hooks";
import { userAction } from "./Store/user-slice";
import imglist from "./imglist.json";
const App = () => {
  const sliderOpen = useAppSelector((state) => state.user.sliderOpen);
  const dispatch = useAppDispatch();

  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    // const res = await fetch("url");
    // const data = await res.json();
    // dispatch(userAction.getList(data.renderings));
    dispatch(userAction.getList(imglist.renderings));
  };

  return (
    <div className="App">
      {!sliderOpen && <ItemList />}
      {sliderOpen && <Slide />}
    </div>
  );
};

export default App;
