import { useState, useEffect } from "react";
import Panel from "./components/Panel/Panel";
import Menu from "./components/Menu/Menu";
import List from "./components/List/List";
import Item from "./components/Item/Item";
import Editor from "./components/Editor/Editor";
import Preview from "./components/Preview/Preview";
import ItemsContext from "./components/Context/ItemsContext";
import StatusContext from "./components/Context/StatusContext";
import uuid from "react-uuid";
import {get, post, put} from "./Lib/http"
import "./App.css";

function App() {
  //Estado de las notas
	const [items, setItems] = useState([]);
  //Estado para la búsqueda de las notas
  const [copyItems, setCopyItems] = useState([]);
  //Estado del índice
  const [actualIndex, setActualIndex] = useState(-1);
  //Estado para autoguardado
  const [lock, setLock] = useState(false)
  const [status, setStatus] = useState(0)
  //URL para el servidor
  const URL = "http://localhost:3010/"

  //Funciones para hacer llamadas al servidor
  async function getItems(){
    let data = await get(`${URL}`);
    let res = getOrderedNotes(data)

    setItems(res)
    setCopyItems(res)
    
    if(items.length > 0) setActualIndex(0);
  }

  useEffect(() => {
    getItems();
  }, []);

  //Función para crear una nueva nota
	async function handleNew() {
		const note = {
			id: uuid(),
			title: "Título",
			text: "Contenido",
			pinned: false,
			created: Date.now(),
		};

    let notes = [...items];
    notes.unshift(note)

    let res = getOrderedNotes(notes)

		setItems(res);
    setCopyItems(res)

    const data = await post (`${URL}new`, note)
	}

  //Funcion para pinear (toggle) las notas al hacer click
  function handlePinned(item, i){
    setActualIndex(i)
    let id = item.id
    let notes = [...items]
    notes[i].pinned = !notes[i].pinned

    //Llama función para ordenar
    let res = getOrderedNotes(notes)

    setItems(res)
    setCopyItems(res)

    let index = res.findIndex(x => x.id === id)

    setActualIndex(index)
  }

  //Funcion para ordenar
  function getOrderedNotes(arr){
    let items = [...arr]
    let pinned = items.filter(x => x.pinned === true)
    let rest = items.filter(x => x.pinned === false)

    pinned = sortByDate(pinned, true)
    rest = sortByDate(rest, true)

    return [...pinned, ...rest]
  }

  //Función para ordenar por fecha
  function sortByDate(arr, asc = false){
    if(asc) return arr.sort( (a, b) => new Date(b.created) - new Date(a.created));
    return arr.sort((a, b) => new Date(a.created) - new Date(b.created));
  }

  //Funcion para seleccionar cada nota
  function handleSelectNote(item, e){
    if(!e.target.classList.contains("note")) return;
    const index = items.findIndex(x => x === item)
    setActualIndex(index)
  }

  function onChangeTitle(e){
    const title = e.target.value;
    let notes = [...items]
    notes[actualIndex].title = title
    setItems(notes)
    setCopyItems(notes)
  }

  function onChangeText(e){
    const text = e.target.value;
    let notes = [...items]
    notes[actualIndex].text = text
    setItems(notes)
    setCopyItems(notes)
  }

  //Función para guardar automático, que se llama en el StatusContext
  function autosave(){
    if (!lock){
      setLock(true);
      setStatus(1);
      setTimeout( () => {
        save()
        setLock(false)
      }, 3000)
    }
  }

  async function save(){
    const item = items[actualIndex]
    const response = await put(`${URL}update`, item)
    setStatus(2)
    setTimeout (() => {
      setStatus(0)
    }, 1000)
  }

  //Funcion para renderizar la nota al hacerle click
  function renderEditorAndPreview() {
    return (
      <>
        <StatusContext.Provider value={{status: status, autosave: autosave}}>
          <Editor item={copyItems[actualIndex]} onChangeTitle={onChangeTitle} onChangeText={onChangeText}/> 
        </StatusContext.Provider>
        <Preview text={items[actualIndex].text}/>
      </>
    )
  }

  //Función para buscar dentro del search
  function handleSearch(e){
    const q = e.target.value;

    if(q === ""){
      setCopyItems([...items])
    }else{
      let res = items.filter (x => x.title.indexOf(q) >= 0 || x.text.indexOf(q) >= 0);

      if(res.length === 0){
        setActualIndex(-1)
      }else{
      setCopyItems([...res])
      setActualIndex(0)
      }
    }
  }


	return (
		<div className="App container">
			<Panel>
         <ItemsContext.Provider value={{onSearch:handleSearch, onNew:handleNew}}>
				  <Menu/>
        </ItemsContext.Provider>
				<List>
					{copyItems.map((item, i) => {
						return (
							<Item
								key={item.id}
								item={item}
								index={i}
                actualIndex={actualIndex}
								onHandlePinned={handlePinned}
								onHandleSelectNote={handleSelectNote}
							/>
						);
					})}
				</List>
			</Panel>
      
      <>
          { (actualIndex >= 0) ? renderEditorAndPreview() : "" }
      </>
		</div>
	);
}

export default App;
