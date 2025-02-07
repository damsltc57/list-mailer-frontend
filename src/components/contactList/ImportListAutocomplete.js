import React from "react";
import TextField from "@mui/material/TextField";
import { Autocomplete, createFilterOptions } from "@mui/material";

const filter = createFilterOptions();

const ImportListAutocomplete = ({ contactList, list, setList }) => {
	return (
		<Autocomplete
			value={list}
			onChange={(event, newValue) => {
				if (typeof newValue === "string") {
					setList({
						name: newValue,
					});
				} else if (newValue && newValue.inputValue) {
					setList({
						name: newValue.inputValue,
					});
				} else {
					setList(newValue);
				}
			}}
			filterOptions={(options, params) => {
				const filtered = filter(options, params);

				const { inputValue } = params;
				// Suggest the creation of a new value
				const isExisting = options.some((option) => inputValue === option.name);
				if (inputValue !== "" && !isExisting) {
					filtered.push({
						inputValue,
						name: `Add "${inputValue}"`,
					});
				}

				return filtered;
			}}
			selectOnFocus
			clearOnBlur
			handleHomeEndKeys
			id="list-name-autocomplete"
			options={contactList}
			getOptionLabel={(option) => {
				if (typeof option === "string") {
					return option;
				}
				if (option.inputValue) {
					return option.inputValue;
				}
				return option.name;
			}}
			renderOption={(props, option) => {
				const { key, ...optionProps } = props;
				return (
					<li key={key} {...optionProps}>
						{option.name}
					</li>
				);
			}}
			sx={{ width: "100%" }}
			freeSolo
			renderInput={(params) => <TextField {...params} label="Nom de la liste" />}
		/>
	);
};

export default ImportListAutocomplete;
