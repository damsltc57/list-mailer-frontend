import React from "react";
import "../style/App.css";
import { EditorContent, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { Placeholder } from "@tiptap/extension-placeholder";
import { HardBreak } from "@tiptap/extension-hard-break";
import MainCard from "../components/MainCard";
import { getUserSignature } from "../store/reducers/userSlice";
import { useSelector } from "react-redux";
import { Image } from "@tiptap/extension-image";
import { Box, Button } from "@mui/material";
import ContactSelectionModal from "../components/home/ContactSelectionModal";

const extensions = [
	StarterKit.configure({
		hardBreak: false,
	}),
	Placeholder.configure({
		placeholder: "Écrivez quelque chose...",
	}),
	Image,
	// HardBreak.extend({
	// 	addKeyboardShortcuts() {
	// 		return {
	// 			Enter: () => this.editor.commands.setHardBreak(),
	// 		};
	// 	},
	// }),
];

function App() {
	const signature = useSelector(getUserSignature);
	const contactModalRef = React.useRef(null);

	const onContentUpdated = ({ editor }) => {
		localStorage.setItem("draftMail", editor.getHTML());
		// console.log(editor.getHTML());
	};

	const editor = useEditor({
		extensions,
		content: "",
		onUpdate: onContentUpdated,
	});

	const openContactModal = () => {
		contactModalRef.current?.open();
	};

	React.useEffect(() => {
		if (signature && editor) {
			const draft = localStorage.getItem("draftMail");
			if (draft) {
				editor.commands.setContent(draft);
			} else {
				editor.commands.setContent(`<p><br/></p><p><br/></p><p><br/></p>${signature}`);
				editor.commands.focus("start");
			}
		}
	}, [signature, editor]);

	return (
		<div className="App">
			<MainCard contentSX={{ p: 2.25 }}>
				<EditorContent editor={editor} />
				<Box sx={{ display: "flex", justifyContent: "flex-end" }}>
					<Button onClick={openContactModal} variant="contained">
						Choix des destinataires
					</Button>
				</Box>
			</MainCard>
			<ContactSelectionModal ref={contactModalRef} />
		</div>
	);
}

export default App;
