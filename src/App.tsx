import React, { useEffect, useRef} from "react";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import { addNotes, deletingHand, getAllData, searchData } from "./store/slice";
import Content from "./component/Content";
import { RootState } from "./store/store";

function App() {
  interface inputTypes {
    title: string | undefined;
    content: string | undefined;
    color: string | "red";
    id: string;
  }

  const colorBoxes = {
    width: "30px",
    height: "30px",
    borderRadius: "50%",
  };

  const headerRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const dispatch = useDispatch();

  let selectedColor: string = "red";

  const addNoteHandler = () => {
    const notes: inputTypes = {
      title: headerRef.current?.value,
      content: contentRef.current?.value,
      color: selectedColor as string,
      id: nanoid(),
    };
    console.log(allData);
    dispatch(addNotes(notes));
    if (contentRef.current != null && headerRef.current != null) {
      contentRef.current.value = "";
      headerRef.current.value = "";
    }
  };

  const selectColor = (color: string) => {
    selectedColor = color;
    console.log(selectedColor);
  };
  const allData = useSelector((state: RootState) => state.noteSlice.allData);
  const searchGet= useSelector((state: RootState) => state.noteSlice.searchData);
  const deletingHandler=useSelector((state: RootState) => state.noteSlice.deletingHandler);
  useEffect(() => {
    dispatch(getAllData());
  }, []);

  
  const searchRef: any = useRef(null);
  const searching = () => {
    dispatch(deletingHand())
    dispatch(searchData(searchRef.current.value));
    if(deletingHandler){
      searchRef.current.value=null
    }
  };

  return (
    <div className="App">
      <div>
        <input
          type="text"
          placeholder="search"
          ref={searchRef}
          onChange={searching}
        />
        <h1>My Notes</h1>
        <input ref={headerRef} type="text" placeholder="Title" />
        <div
          style={{
            minWidth: "300px",
            width: "50%",
            height: "30%",
            margin: "auto",
          }}
        >
          <textarea
            style={{ width: "100%", height: "100%", minHeight: "100px" }}
            ref={contentRef}
          ></textarea>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ display: "flex", gap: "1rem" }}>
              {" "}
              <div
                onClick={() => selectColor("red")}
                style={{ ...colorBoxes, backgroundColor: "red" }}
              ></div>
              <div
                onClick={() => selectColor("green")}
                style={{ ...colorBoxes, backgroundColor: "green" }}
              ></div>
              <div
                onClick={() => selectColor("yellow")}
                style={{ ...colorBoxes, backgroundColor: "yellow" }}
              ></div>
            </div>
            <button onClick={addNoteHandler}>Add</button>
          </div>
        </div>
        <div>Notes</div>
        <div
          style={{
            margin: "auto",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "3rem",
            width: "50%",
            minWidth: "350px",
          }}
        >
          
          {allData.length>0 && !searchRef.current.value&&
            allData.map((item: any, idx: number) => (
              <div key={idx}>
                <Content
                  title={item.title}
                  content={item.content}
                  color={item.color}
                  id={item.id}
                />
              </div>
            ))}

            {allData.length>0 && searchRef.current.value&&
  searchGet.map((item: any, idx: number) => (
  <div key={idx}>
    <Content
      title={item.title}
      content={item.content}
      color={item.color}
      id={item.id}
    />
  </div>
))
            }
        </div>
      </div>
    </div>
  );
}

export default App;
