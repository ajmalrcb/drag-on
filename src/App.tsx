import React, { useState, useRef,useEffect } from "react";
import "./App.scss";
import ListItem from "./components/ListItem";
const librariesList = [
  "React",
  "Angular",
  "Svelte",
  "Vue JS",
  "Objective C",
  "PHP",
  "Python",
  "SQL",
  "Html",
  "Jquery"
];
const shrinkClass = "selected-list shrink";
const expandClass = "selected-list";

function App() {
  const [libraries, setLibraries] = useState([...librariesList]);
  const [searchValue, setSearchvalue] = useState("");
  const [droppedList, setDroppedList] = useState<any>([]);
  const dropRef = useRef(null);

  const handleSearch = (e: any) => {
    setSearchvalue(e.target.value);
    const keyword = e.target.value.trim("");
    const filtered = libraries.filter((item: string) =>
      item.toUpperCase().includes(keyword.toUpperCase())
    );

    if (keyword.length === 0 && droppedList.length === 0) {
      setLibraries(librariesList);
    } 
    else if(keyword.length === 0 && droppedList.length) {
      // @ts-ignore
      setLibraries(librariesList.filter((library) => droppedList.indexOf(library) ===-1))
    }
    else {
      setLibraries(filtered);
    }
  };

  useEffect(() => {
    if(droppedList.length === 0) {
      // @ts-ignore
      dropRef.current.className = expandClass;
    }
    if(droppedList.length === 1) {
      // @ts-ignore
      dropRef.current.className = shrinkClass;
    }
  }, [droppedList.length]);

  const onDragStart = (e: any) => {
    e.dataTransfer.setData("id", e.target.id);
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const onDrop = (e: React.DragEvent) => {
    const droppedId = e.dataTransfer.getData("id");
    setDroppedList([...droppedList, droppedId]);
    setLibraries(libraries.filter((lib) => lib !== droppedId));
    // @ts-ignore
    dropRef.current.className = shrinkClass;
    e.dataTransfer.clearData("id");
  };

  const renderSearchResults = () => {
    return libraries.length ? (
      libraries.map((library) => (
        <ListItem name={library} key={library} onDragStart={onDragStart} />
      ))
    ) : (
      <div>No search results...</div>
    );
  };

  const onDelete = (e: any, name: string) => {
    const removedList = droppedList.filter((item: string) => item !== name);
    setDroppedList(removedList);
    setLibraries([...libraries, name]);
  };

  const renderDroppedElements = () => {
    return (
      <div
        className="dropzone"
      >
          <div className="dropped-items">
              {droppedList.map((item: any) => (
                <ListItem
                  name={item}
                  key={item}
                  onDragStart={onDragStart}
                  showDelete
                  onDelete={onDelete}
                />
            ))}
          </div>

      </div>
    );
  };
  return (
    <section className="section">
      <div className="language-list" id="language-list">
        <h3>
          <b>Language List</b>
        </h3>
        <div className="search">
          <input
            placeholder="Search Language"
            id="search"
            onChange={handleSearch}
            value={searchValue}
          />
          <img src="images/search.svg" alt="search-icon" />
        </div>
        {renderSearchResults()}
      </div>
      <div>
        <h3>
          <b>Selected List</b>
        </h3>
        <div 
          className="selected-list" 
          onDrop={(e) => onDrop(e)}
          onDragOver={onDragOver}
          ref={dropRef}>
          <img src="images/drag_drop_icon.svg" alt="drop here" />
          <p>Drag and drop your language here!!</p>
          {renderDroppedElements()}
        </div>
      </div>
    </section>
  );
}

export default App;
