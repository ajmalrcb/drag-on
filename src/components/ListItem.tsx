import React, { useCallback } from "react";

interface Props {
  name: string;
  onDragStart: (e: any) => void;
  showDelete?: boolean;
  onDelete?: (e: any, name: string) => void;
}

const ListItem = ({ name, onDragStart, showDelete, onDelete }: Props) => {

  const handleClick = useCallback(
    (e: any) => {
      if (onDelete) {
        onDelete(e, name);
      }
    },
    [onDelete,name]
  );
  return (
    <>
      <div
        className="draggable-item"
        draggable
        onDragStart={onDragStart}
        id={name}
      >
        <span>{name}</span>
        <img src="images/drag.svg" alt="drag" className="drag-icon"></img>
        {showDelete && (
          <img
            src="images/delete.svg"
            alt="delete"
            className="delete"
            onClick={handleClick}
          />
        )}
      </div>
    </>
  );
};

export default ListItem;

ListItem.defaultProps = {
  showDelete: false,
  onDelete: (e: any, name: string) => {},
};
