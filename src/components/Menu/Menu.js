import React, {useContext} from "react";
import ItemsContext from "../Context/ItemsContext";

const Menu = () => {

	const itemsContext = useContext(ItemsContext)

    function handleClick() {
		itemsContext.onNew()
	}

	function handleChange(e){
		itemsContext.onSearch(e)
	}

    return (
        <div className="menu">
				<input className="search" placeholder="Buscar..." onChange={handleChange}></input>
				<button className="btn" onClick={() => handleClick()}>
					+ Nueva Nota
				</button>
			</div>
    )
}

export default Menu
