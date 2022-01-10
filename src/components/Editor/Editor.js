import React, {useContext} from "react";
import Status from "../Status/Status"
import StatusContext from "../Context/StatusContext";

const Editor = ({item, onChangeTitle, onChangeText}) => {

	const statusContext = useContext(StatusContext)

	function handleTitleChange(e){
		onChangeTitle(e)
		statusContext.autosave()
	}

	function handleTextChange(e) {
		onChangeText(e)
		statusContext.autosave()
	}

	return (
		<div className="editor">
			<Status statusCode={statusContext.status}></Status>
			<div>
				<input className="title" value={item.title} onChange={handleTitleChange}></input>
			</div>

			<div className="editor-textarea">
				<textarea className="content" value={item.text} onChange={handleTextChange}></textarea>
			</div>
		</div>
	);
};

export default Editor;
