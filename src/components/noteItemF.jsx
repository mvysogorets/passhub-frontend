import React from "react";
import { lastModified } from "../lib/utils";

function NoteItem(props) {
  const item = props.item;

  const showModal = () => {
    props.showModal(item);
  };

  function dragStart(ev) {
    // Change the source element's background color to signify drag has started
    //ev.currentTarget.style.border = "dashed";
    ev.dataTransfer.setData("application/json", JSON.stringify(item));
    // Tell the browser both copy and move are possible
    ev.effectAllowed = "copyMove";
  }

  return (
    <tr className="d-flex" style={{ alignItems: "center" }}>
      <td
        colSpan="3"
        className="col-md-12 col-lg-8 col-xl-9"
        onClick={showModal}
        style={{ cursor: "pointer" }}
      >
        <div
          draggable
          id={`drag${item._id}`}
          onDragStart={dragStart}
          style={{ overflow: "hidden", textOverflow: "ellipsis" }}
        >
          <svg
            width="24"
            height="24"
            className="itemIcon"
            style={{ cursor: "move" }}
          >
            <use href="#i-note"></use>
          </svg>
          {item.cleartext[0]}
        </div>
        {props.searchMode && (
          <div className="search-path">{item.path.join(" > ")}</div>
        )}
      </td>
      <td className="column-modified d-none d-xl-table-cell col-xl-3">
        {lastModified(item)}
      </td>
    </tr>
  );
}

export default NoteItem;
