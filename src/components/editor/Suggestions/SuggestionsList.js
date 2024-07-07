import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { Button, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledStack = styled(Stack)(() => {
	return {
		backgroundColor: "white",
		border: "1px solid #fffff",
		borderColor: "#b2b2b2",
	};
});

export default forwardRef((props, ref) => {
	const [selectedIndex, setSelectedIndex] = useState(0);

	const selectItem = (index) => {
		const item = props.items[index];

		if (item) {
			props.command({ id: item });
		}
	};

	const upHandler = () => {
		setSelectedIndex((selectedIndex + props.items.length - 1) % props.items.length);
	};

	const downHandler = () => {
		setSelectedIndex((selectedIndex + 1) % props.items.length);
	};

	const enterHandler = () => {
		selectItem(selectedIndex);
	};

	useEffect(() => setSelectedIndex(0), [props.items]);

	useImperativeHandle(ref, () => ({
		onKeyDown: ({ event }) => {
			if (event.key === "ArrowUp") {
				upHandler();
				return true;
			}

			if (event.key === "ArrowDown") {
				downHandler();
				return true;
			}

			if (event.key === "Enter") {
				enterHandler();
				return true;
			}

			return false;
		},
	}));

	return (
		<StyledStack sx={{}}>
			{props.items.length ? (
				props.items.map((item, index) => (
					<Button
						variant={"outlined"}
						className={index === selectedIndex ? "is-selected" : ""}
						key={index}
						onClick={() => selectItem(index)}
					>
						{item}
					</Button>
				))
			) : (
				<div className="item">No result</div>
			)}
		</StyledStack>
	);
});
