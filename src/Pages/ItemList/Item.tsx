import React, { useEffect, useState } from "react";
import "./Item.css";
import { useAppSelector, useAppDispatch } from "../../Store/hooks";
import { userAction } from "../../Store/user-slice";
import { saveAs } from "file-saver";

const Item = (props: { imgSrc: string; index: number; imgArr: object[] }) => {
  const dispatch = useAppDispatch();
  const [isHover, setIsHover] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const imgList = useAppSelector((state) => state.user.imgArr);
  const selected = useAppSelector((state) => state.user.selectedItem);
  let filtered = selected.filter((item) => item._id === props.imgSrc);

  useEffect(() => {
    filtered.length && filtered[0]._id == props.imgSrc
      ? setIsChecked(true)
      : setIsChecked(false);
  }, [selected]);

  const viewImg = () => {
    dispatch(userAction.sliderOpen());
    dispatch(userAction.setCurrentidx(props.index));
  };

  const hover = (boolean: boolean) => {
    !isHover && setIsClicked(false);
    setIsHover(boolean);
  };
  const setClicked = () => {
    setIsClicked(true);
  };

  const selectItem = () => {
    let [selected] = imgList.filter(
      (img) => img._id == imgList[props.index]._id
    );
    dispatch(userAction.setSelected(selected));
  };

  const unselected = () => {
    let newarr = selected.filter((img) => img._id !== props.imgSrc);
    dispatch(userAction.changeSelected(newarr));
  };

  const imgDownload = async () => {
    let url = imgList[props.index]._id;
    let name = url.split("/");
    let filename = name[name.length - 1];
    let blob = await fetch(url).then((r) => r.blob());
    saveAs(blob, filename);
  };

  const deleteItem = () => {
    let newImgList = imgList.filter(
      (img) => img._id !== imgList[props.index]._id
    );
    let newarr = selected.filter((img) => img._id !== props.imgSrc);
    dispatch(userAction.changeSelected(newarr));
    dispatch(userAction.imgDelete(newImgList));
    dispatch(userAction.sliderClose());
    setIsChecked(false);
  };

  return (
    <div
      className="item"
      onMouseEnter={() => hover(true)}
      onMouseLeave={() => hover(false)}
    >
      {isChecked && (
        <button className="checked_item" onClick={unselected}></button>
      )}

      {isHover && (
        <div className="hover_box">
          <div className="btn_box">
            <button onClick={selectItem} className="unchecked_item"></button>
            <button onClick={setClicked} className="more_menu">
              ...
            </button>
          </div>
          {isClicked && (
            <div className="opt_box">
              <button onClick={imgDownload}>다운로드</button>
              <button onClick={deleteItem}>삭제</button>
            </div>
          )}
          <div className="view_img" onClick={viewImg}></div>
        </div>
      )}

      <div className="img_box">
        <img src={props.imgSrc} alt="" />
      </div>
    </div>
  );
};

export default Item;
