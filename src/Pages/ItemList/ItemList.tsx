import React, { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../Store/hooks";
import { userAction } from "../../Store/user-slice";
import Item from "./Item";
import { saveAs } from "file-saver";
import "./ItemList.css";
const zip = require("jszip")();

const ItemList = () => {
  const dispatch = useAppDispatch();
  const [allSelected, setAllSelected] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const list = useAppSelector((state) => state.user.imgArr);
  const selected = useAppSelector((state) => state.user.selectedItem);

  const unselected = () => {
    dispatch(userAction.changeSelected([]));
  };

  const selectedAll = () => {
    if (allSelected) {
      setAllSelected(false);
      unselected();
    } else {
      setAllSelected(true);
      dispatch(userAction.changeSelected(list));
    }
  };
  const selectedDelete = () => {
    let newList = list.filter((element) => !selected.includes(element));
    dispatch(userAction.imgDelete(newList));
    dispatch(userAction.changeSelected([]));
  };

  const selectedDownload = () => {
    setDownloading(true);
    document.body.style.overflow = "hidden";
    if (selected.length > 1) {
      for (let s of selected) {
        let url = s._id;
        let name = url.split("/");
        let filename = name[name.length - 1];
        let blob = fetch(url).then((r) => r.blob());

        zip.file(filename, blob);
      }

      zip
        .generateAsync({ type: "blob" })
        .then((content: any) => {
          saveAs(content, `img.zip`);
        })

        .then((data: any) => {
          setDownloading(false);
          document.body.style.overflow = "scroll";
        });
    } else {
      let url = selected[0]._id;
      let name = url.split("/");
      let filename = name[name.length - 1];
      fetch(url)
        .then((r) => r.blob())
        .then((blob) => saveAs(blob, filename));
    }
  };

  return (
    <div className="item_cnt">
      {downloading && <div className="downloading">Downloading.....</div>}

      <header>
        {selected.length < 1 && <p>{list.length} ?????? ?????????</p>}
        {selected.length > 0 && (
          <div className="select_box">
            <p>{selected.length} ?????? ?????? ????????? ?????????</p>
            <div className="select_all">
              <div className="checked_box">
                <button
                  className="unchecked_item"
                  onClick={selectedAll}
                ></button>
                {allSelected && (
                  <button
                    className="checked_item"
                    onClick={selectedAll}
                  ></button>
                )}
              </div>
              <p>??????????????????</p>
            </div>
          </div>
        )}
        <h1>?????????</h1>
        {selected.length < 1 && (
          <div className="opt_box">
            <select>
              <option>?????? ?????????</option>
            </select>
            <select>
              <option>?????? ??????</option>
            </select>
          </div>
        )}
        {selected.length > 0 && (
          <div className="selected">
            <button onClick={selectedDownload}>??????</button>
            <button onClick={selectedDelete}>??????</button>
            <button onClick={unselected}>????????????</button>
          </div>
        )}
      </header>

      <div className="item_list">
        {list &&
          list.map((img, i, arr) => (
            <Item key={i} imgSrc={img._id} index={i} imgArr={arr} />
          ))}
      </div>
    </div>
  );
};

export default ItemList;
