import React from "react";
import { useRegisterGoogleOAuthMutation } from "../store/api/user";

const OAuthCallback = () => {
	const [registerGoogleOauth] = useRegisterGoogleOAuthMutation();

	React.useEffect(() => {
		const urlParams = new URLSearchParams(window.location.search);
		const code = urlParams.get("code");
		console.log(code);
		if (code) {
			console.log("Calling");
			registerGoogleOauth({ code });
		}

		console.log(window.location.search);
	}, []);
	return null;
};

export default OAuthCallback;
