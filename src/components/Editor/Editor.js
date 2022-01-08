import React from "react";

const Editor = () => {
	return (
		<div className="editor">
			<div>
				<input className="title"></input>
			</div>

			<div className="editor-textarea">
				<textarea className="content"></textarea>
			</div>
		</div>
	);
};

export default Editor;
