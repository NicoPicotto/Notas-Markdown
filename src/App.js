import { useState } from "react";
import Panel from "./components/Panel/Panel";
import Menu from "./components/Menu/Menu";
import List from "./components/List/List";
import Item from "./components/Item/Item";
import Editor from "./components/Editor/Editor";
import Preview from "./components/Preview/Preview";
import uuid from "react-uuid";
import "./App.css";

function App() {

  const [items, setItems] = useState([]);

  function handleNew() {
    const note = {
      id: uuid(),
      title: "mi primer nota",
      text: "# hola como andas",
      pinned: false,
      created: Date.now()
    }
    setItems([...items, note])
  }

	return (
		<div className="App container">
      <Panel>
        <Menu onNew={handleNew}/>
        <List>
          {
              items.map( (item, i) => {
              return <Item key={item.id} item={item}/>
            })
          }
        </List>
      </Panel>

      <>
      <Editor />
      <Preview />
      </>

		</div>
	);
}

export default App;
