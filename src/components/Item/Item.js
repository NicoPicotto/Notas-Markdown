import React from "react";

const Item = ({item}) => {
	return (
		<div key={item.id} className="note">
			<div>
				{item.title === "" ? "[Sin titulo]" : item.title.substring(0, 20)}
			</div>

			<div>
				<button className="pinButton">{item.pinned ? "Pinned" : "Pin"}</button>
			</div>
		</div>
	);
};

export default Item;
