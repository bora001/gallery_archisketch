import React, { useEffect } from "react";
import "./App.css";
import ItemList from "./Pages/ItemList/ItemList";
import Slide from "./Pages/Slide/Slide";
import { useAppSelector, useAppDispatch } from "./Store/hooks";
import { userAction } from "./Store/user-slice";

const App = () => {
  const sliderOpen = useAppSelector((state) => state.user.sliderOpen);
  const dispatch = useAppDispatch();

  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    const res = await fetch(
      "https://s3.us-west-2.amazonaws.com/secure.notion-static.com/a7804447-abeb-473e-be8b-8025c4f624f6/test.json?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220414%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220414T015025Z&X-Amz-Expires=86400&X-Amz-Signature=c0c9e82761b18db3ea8456577207756a9cbf9545fe2760fee3418ecdaf19f40c&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22test.json%22&x-id=GetObject"
    );

    const data = await res.json();
    dispatch(userAction.getList(data.renderings));
  };

  return (
    <div className="App">
      {!sliderOpen && <ItemList />}
      {sliderOpen && <Slide />}
    </div>
  );
};

export default App;
