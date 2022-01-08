import React, { useState } from "react";

const Menu = ({onNew}) => {

    const [items, setItems] = useState([]);

    function handleClick() {
		onNew()
	}

    return (
        <div className="menu">
				<input className="search" placeholder="Buscar..."></input>
				<button className="btn" onClick={() => handleClick()}>
					+ Nueva Nota
				</button>
			</div>
    )
}

export default Menu
