import React from "react";

// material-ui
import {
	Button,
	FormHelperText,
	Grid,
	IconButton,
	InputAdornment,
	InputLabel,
	OutlinedInput,
	Stack,
} from "@mui/material";

// third party
import * as Yup from "yup";
import { Formik } from "formik";

// project import
import AnimateButton from "components/@extended/AnimateButton";

// assets
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { useLazyGetUserTokenQuery } from "../../../store/api/user";
import { useDispatch } from "react-redux";
import { setAuthToken, setUser } from "../../../store/reducers/userSlice";
import { useNavigate } from "react-router-dom";

// ============================|| FIREBASE - LOGIN ||============================ //

const AuthLogin = () => {
	const [checked, setChecked] = React.useState(false);
	const [getUserToken] = useLazyGetUserTokenQuery();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [showPassword, setShowPassword] = React.useState(false);
	const handleClickShowPassword = () => {
		setShowPassword(!showPassword);
	};

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	return (
		<>
			<Formik
				initialValues={{
					email: "",
					password: "",
					submit: null,
				}}
				validationSchema={Yup.object().shape({
					email: Yup.string().email("Must be a valid email").max(255).required("Email is required"),
					password: Yup.string().max(255).required("Password is required"),
				})}
				onSubmit={async ({ email, password }, { setErrors, setStatus, setSubmitting }) => {
					try {
						getUserToken({ email, password })
							.then((data) => {
								if (data.isError) {
									setStatus({ success: false });
									setErrors({ submit: "Mot de passe invalide" });
									setSubmitting(false);
									return;
								}
								dispatch(setAuthToken(data.data?.token));
								dispatch(setUser(data.data?.user));
								navigate("/");
							})
							.catch(() => {
								setStatus({ success: false });
								setErrors({ submit: "Mot de passe invalide" });
								setSubmitting(false);
							});
						setStatus({ success: false });
						setSubmitting(false);
					} catch (err) {
						setStatus({ success: false });
						setErrors({ submit: err.message });
						setSubmitting(false);
					}
				}}
			>
				{({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
					<form noValidate onSubmit={handleSubmit}>
						<Grid container spacing={3}>
							<Grid item xs={12}>
								<Stack spacing={1}>
									<InputLabel htmlFor="email-login">Adresse email</InputLabel>
									<OutlinedInput
										id="email-login"
										type="email"
										value={values.email}
										name="email"
										onBlur={handleBlur}
										onChange={handleChange}
										placeholder="Enter email address"
										fullWidth
										error={Boolean(touched.email && errors.email)}
									/>
									{touched.email && errors.email && (
										<FormHelperText error id="standard-weight-helper-text-email-login">
											{errors.email}
										</FormHelperText>
									)}
								</Stack>
							</Grid>
							<Grid item xs={12}>
								<Stack spacing={1}>
									<InputLabel htmlFor="password-login">Mot de passe</InputLabel>
									<OutlinedInput
										fullWidth
										error={Boolean(touched.password && errors.password)}
										id="-password-login"
										type={showPassword ? "text" : "password"}
										value={values.password}
										name="password"
										onBlur={handleBlur}
										onChange={handleChange}
										endAdornment={
											<InputAdornment position="end">
												<IconButton
													aria-label="toggle password visibility"
													onClick={handleClickShowPassword}
													onMouseDown={handleMouseDownPassword}
													edge="end"
													size="large"
												>
													{showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
												</IconButton>
											</InputAdornment>
										}
										placeholder="Enter password"
									/>
									{touched.password && errors.password && (
										<FormHelperText error id="standard-weight-helper-text-password-login">
											{errors.password}
										</FormHelperText>
									)}
								</Stack>
							</Grid>

							{errors.submit && (
								<Grid item xs={12}>
									<FormHelperText error>{errors.submit}</FormHelperText>
								</Grid>
							)}
							<Grid item xs={12}>
								<AnimateButton>
									<Button
										disableElevation
										disabled={isSubmitting}
										fullWidth
										size="large"
										type="submit"
										variant="contained"
										color="primary"
									>
										Login
									</Button>
								</AnimateButton>
							</Grid>
						</Grid>
					</form>
				)}
			</Formik>
		</>
	);
};

export default AuthLogin;
