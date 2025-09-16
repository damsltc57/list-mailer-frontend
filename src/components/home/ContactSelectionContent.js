import React from "react";
import {
	Box,
	Button,
	Card,
	CardActionArea,
	CardContent,
	Checkbox,
	Chip,
	FormControl,
	Grid,
	IconButton,
	InputLabel,
	ListItemText,
	MenuItem,
	OutlinedInput,
	Select,
	Typography,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import { useFindContactQuery, useGetContactListsQuery } from "../../store/api/contact";
import ClearIcon from "@mui/icons-material/Clear";
import ContactItem from "./ContactItem";
import GridPreviewSelectedContacts from "./GridPreviewSelectedContacts";
import DialogContent from "@mui/material/DialogContent";
import { useDispatch, useSelector } from "react-redux";
import { addMultipleContacts, getSelectedContacts, resetContacts } from "../../store/reducers/contactSlice";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
};

const CATEGORIES = {
	tvProducer: { name: "Producteur télé", value: "tvProducer" },
	filmProducer: { name: "Producteur ciné", value: "filmProducer" },
	broadcaster: { name: "Diffuseur", value: "broadcaster" },
	distributor: { name: "Distributeur", value: "distributor" },
};

const FORMALITIES = {
	informal: { name: "Tutoiement", value: "informal" },
	formal: { name: "Vouvoiement", value: "formal" },
};
const INTERESTING = {
	true: { name: "Oui", value: true },
	false: { name: "Non", value: false },
};

const COUNTRIES = {
	france: { name: "France", value: "france" },
	belgique: { name: "Belgique", value: "belgique" },
};

const ContactSelectionContent = () => {
	const [categoryValue, setCategoryValue] = React.useState([]);
	const [formalityLevel, setFormalityLevel] = React.useState("");
	const [interesting, setInteresting] = React.useState("");
	const [country, setCountry] = React.useState("");
	const [query, setQuery] = React.useState("");
	const [selectedList, setSelectedList] = React.useState(-1);
	const selectedContacts = useSelector(getSelectedContacts);
	const dispatch = useDispatch();

	const { data: contactList, refetch: refetchContactLists } = useGetContactListsQuery();
	const { data } = useFindContactQuery({
		categoryValue,
		formalityLevel,
		interesting,
		country,
		query,
		listId: selectedList,
	});

	const handleListChange = (event) => {
		setSelectedList(event.target.value);
	};

	const handleCategoryChange = (event) => {
		const {
			target: { value },
		} = event;
		setCategoryValue(value);
	};
	const handleFormalityChange = (event) => {
		const {
			target: { value },
		} = event;
		if (value === formalityLevel) {
			setFormalityLevel("");
		} else {
			setFormalityLevel(value);
		}
	};
	const handleInterestingChange = (event) => {
		const {
			target: { value },
		} = event;
		setInteresting(value);
	};
	const handleCountryChange = (event) => {
		const {
			target: { value },
		} = event;
		setCountry(value);
	};

	const onSelectAllPressed = () => {
		console.log(selectedContacts);
		if (selectedContacts.length > 0) {
			dispatch(resetContacts());
		} else {
			dispatch(addMultipleContacts(data));
		}
	};
	return (
		<Box>
			<div>
				<FormControl sx={{ mr: 1, mb: 1, mt: 1, width: 300 }}>
					<InputLabel id="demo-multiple-checkbox-label">Catégorie</InputLabel>
					<Select
						labelId="demo-multiple-checkbox-label"
						id="demo-multiple-checkbox"
						multiple
						value={categoryValue}
						onChange={handleCategoryChange}
						input={<OutlinedInput label="Tag" />}
						IconComponent={() => (
							<>
								{categoryValue !== "" ? (
									<IconButton
										size="small"
										onClick={(e) => {
											setCategoryValue([]);
										}}
									>
										<ClearIcon />
									</IconButton>
								) : undefined}
							</>
						)}
						renderValue={(selected) => {
							let response = "";
							selected.forEach((item) => {
								if (CATEGORIES[item].name) {
									response += `${CATEGORIES[item].name}, `;
								}
							});
							return response;
						}}
						MenuProps={MenuProps}
					>
						{Object.values(CATEGORIES).map(({ name, value }) => (
							<MenuItem key={value} value={value}>
								<Checkbox checked={categoryValue.indexOf(value) > -1} />
								<ListItemText primary={name} />
							</MenuItem>
						))}
					</Select>
				</FormControl>
				<FormControl sx={{ m: 1, width: 200 }}>
					<InputLabel id="demo-multiple-checkbox-label">Formalité</InputLabel>
					<Select
						labelId="demo-multiple-checkbox-label"
						id="demo-multiple-checkbox"
						value={formalityLevel}
						onChange={handleFormalityChange}
						input={<OutlinedInput label="Tag" />}
						IconComponent={() => (
							<>
								{formalityLevel !== "" ? (
									<IconButton
										size="small"
										onClick={(e) => {
											setFormalityLevel("");
										}}
									>
										<ClearIcon />
									</IconButton>
								) : undefined}
							</>
						)}
						renderValue={(selected) => {
							return FORMALITIES[selected].name;
						}}
						MenuProps={MenuProps}
					>
						{Object.values(FORMALITIES).map(({ name, value }) => (
							<MenuItem key={value} value={value}>
								<Checkbox checked={formalityLevel === value} />
								<ListItemText primary={name} />
							</MenuItem>
						))}
					</Select>
				</FormControl>
				<FormControl sx={{ m: 1, width: 200 }}>
					<InputLabel id="demo-multiple-checkbox-label">Intéressant</InputLabel>
					<Select
						labelId="demo-multiple-checkbox-label"
						id="demo-multiple-checkbox"
						value={interesting}
						onChange={handleInterestingChange}
						input={<OutlinedInput label="Tag" />}
						IconComponent={() => (
							<>
								{interesting !== "" ? (
									<IconButton
										size="small"
										onClick={(e) => {
											setInteresting("");
										}}
									>
										<ClearIcon />
									</IconButton>
								) : undefined}
							</>
						)}
						renderValue={(selected) => {
							return INTERESTING[selected].name;
						}}
						MenuProps={MenuProps}
					>
						{Object.values(INTERESTING).map(({ name, value }) => (
							<MenuItem key={value} value={value}>
								<Checkbox checked={interesting === value} />
								<ListItemText primary={name} />
							</MenuItem>
						))}
					</Select>
				</FormControl>
				{/*<FormControl sx={{ m: 1, width: 200 }}>*/}
				{/*	<InputLabel id="demo-multiple-checkbox-label">Pays</InputLabel>*/}
				{/*	<Select*/}
				{/*		labelId="demo-multiple-checkbox-label"*/}
				{/*		id="demo-multiple-checkbox"*/}
				{/*		value={country}*/}
				{/*		onChange={handleCountryChange}*/}
				{/*		input={<OutlinedInput label="Tag" />}*/}
				{/*		IconComponent={() => (*/}
				{/*			<>*/}
				{/*				{country !== "" ? (*/}
				{/*					<IconButton*/}
				{/*						size="small"*/}
				{/*						onClick={(e) => {*/}
				{/*							setCountry("");*/}
				{/*						}}*/}
				{/*					>*/}
				{/*						<ClearIcon />*/}
				{/*					</IconButton>*/}
				{/*				) : undefined}*/}
				{/*			</>*/}
				{/*		)}*/}
				{/*		renderValue={(selected) => {*/}
				{/*			return COUNTRIES[selected].name;*/}
				{/*		}}*/}
				{/*		MenuProps={MenuProps}*/}
				{/*	>*/}
				{/*		{Object.values(COUNTRIES).map(({ name, value }) => (*/}
				{/*			<MenuItem key={value} value={value}>*/}
				{/*				<Checkbox checked={country === value} />*/}
				{/*				<ListItemText primary={name} />*/}
				{/*			</MenuItem>*/}
				{/*		))}*/}
				{/*	</Select>*/}
				{/*</FormControl>*/}
				<FormControl sx={{ m: 1, width: 200 }}>
					<InputLabel id="demo-simple-select-label">Liste</InputLabel>
					<Select
						labelId="demo-simple-select-label"
						id="demo-simple-select"
						value={selectedList}
						label="Age"
						onChange={handleListChange}
					>
						<MenuItem value={-1}>Aucune</MenuItem>
						<MenuItem value={0}>Toutes</MenuItem>
						{contactList?.map((list) => (
							<MenuItem key={list.id} value={list.id}>
								{list.name}
							</MenuItem>
						))}
					</Select>
				</FormControl>
				<FormControl sx={{ m: 1, width: 200 }}>
					<Button variant={"outlined"} onClick={onSelectAllPressed}>
						{selectedContacts?.length === 0 ? "Tout sélectionner" : "Tout déselectionner"}
					</Button>
				</FormControl>
				<TextField
					id="firstName"
					label="Rechercher"
					variant="outlined"
					value={query}
					fullWidth
					onChange={(event) => setQuery(event.target.value)}
				/>
			</div>

			<GridPreviewSelectedContacts />
			<ContactItem contact={data} />
			{/*<Grid container sx={{ mt: 1, overflowY: "auto", height: "100%" }} spacing={3}>*/}
			{/*	{data?.map((contact) => (*/}
			{/*		<Grid item xs={3} key={contact.id}>*/}
			{/*			<ContactItem contact={contact} />*/}
			{/*		</Grid>*/}
			{/*	))}*/}
			{/*</Grid>*/}
		</Box>
	);
};
export default ContactSelectionContent;
