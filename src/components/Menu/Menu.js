import React from "react";

const Menu = ({onNew, onSearch}) => {

    function handleClick() {
		onNew()
	}

	function handleChange(e){
		onSearch(e)
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
