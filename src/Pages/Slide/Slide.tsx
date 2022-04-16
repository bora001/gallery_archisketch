import React from "react";
import Slider from "../../UI/Slider";
import { useAppSelector, useAppDispatch } from "../../Store/hooks";
import { userAction } from "../../Store/user-slice";
import { saveAs } from "file-saver";
import "./Slide.css";

const Slide = (props: any) => {
  const dispatch = useAppDispatch();
  const currentIdx = useAppSelector((state) => state.user.currentIdx);
  const imgList = useAppSelector((state) => state.user.imgArr);
  const sliderClose = () => {
    dispatch(userAction.sliderClose());
  };
  const sliderNext = () => {
    dispatch(userAction.sliderNext());
  };
  const sliderPrev = () => {
    dispatch(userAction.sliderPrev());
  };

  const imgDownload = async () => {
    let url = imgList[currentIdx]._id;
    let name = url.split("/");
    let filename = name[name.length - 1];
    let blob = await fetch(url).then((r) => r.blob());
    saveAs(blob, filename);
  };

  const imgDelete = () => {
    let newImgList = imgList.filter(
      (img) => img._id !== imgList[currentIdx]._id
    );
    dispatch(userAction.imgDelete(newImgList));
    dispatch(userAction.sliderClose());
  };

  return (
    <Slider>
      <div className="slider_box">
        <header className="slide">
          <button onClick={sliderClose}>close</button>
          <div className="btn_box">
            <button onClick={imgDownload}>Download</button>
            <button onClick={imgDelete}>Delete</button>
          </div>
        </header>
        <div className="img_box">
          <img src={imgList[currentIdx]._id} alt="" />
        </div>
      </div>
      <div className="btn_box slider_btn">
        {currentIdx > 0 && (
          <button className="prev_btn" onClick={sliderPrev}>
            &lt;
          </button>
        )}
        {currentIdx < imgList.length - 1 && (
          <button className="next_btn" onClick={sliderNext}>
            &gt;
          </button>
        )}
      </div>
    </Slider>
  );
};

export default Slide;
