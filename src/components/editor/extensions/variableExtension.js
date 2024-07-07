import { Mention, MentionPluginKey } from "@tiptap/extension-mention";
import { mergeAttributes } from "@tiptap/react";

const SuggestionNode = Mention.extend({
	addOptions() {
		return {
			HTMLAttributes: {},
			renderText({ options, node }) {
				return `${options.suggestion.char}${node.attrs.label ?? node.attrs.id}`;
			},
			deleteTriggerWithBackspace: false,
			renderHTML({ options, node }) {
				return [
					"span",
					mergeAttributes(this.HTMLAttributes, options.HTMLAttributes),
					`{{ ${node.attrs.label ?? node.attrs.id} }}`,
				];
			},
			suggestion: {
				char: "/",
				pluginKey: MentionPluginKey,
				command: ({ editor, range, props }) => {
					// increase range.to by one when the next node is of type "text"
					// and starts with a space character
					const nodeAfter = editor.view.state.selection.$to.nodeAfter;
					const overrideSpace = nodeAfter?.text?.startsWith(" ");

					if (overrideSpace) {
						range.to += 1;
					}

					editor
						.chain()
						.focus()
						.insertContentAt(range, [
							{
								type: this.name,
								attrs: props,
							},
							{
								type: "text",
								text: " ",
							},
						])
						.run();

					window.getSelection()?.collapseToEnd();
				},
				allow: ({ state, range }) => {
					const $from = state.doc.resolve(range.from);
					const type = state.schema.nodes[this.name];
					const allow = !!$from.parent.type.contentMatch.matchType(type);

					return allow;
				},
			},
		};
	},
});

export default SuggestionNode;
