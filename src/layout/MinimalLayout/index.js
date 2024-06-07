import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAuthToken } from "../../store/reducers/userSlice";
import { useEffect } from "react";

// ==============================|| MINIMAL LAYOUT ||============================== //

const MinimalLayout = ({ authenticated = false }) => {
	const token = useSelector(getAuthToken);
	const navigate = useNavigate();

	useEffect(() => {
		if (authenticated) {
			if (!token) {
				navigate("/login");
			}
		}
	}, [token]);

	return (
		<>
			<Outlet />
		</>
	);
};

export default MinimalLayout;
