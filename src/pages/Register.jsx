import React, { useState } from 'react';
import loginBg from '../img/login_bg.png';
import fb from '../img/facebook.png';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { register } from '../api';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import { loginSuccess } from '../features/login/loginSlice';
function Register() {
	const [hasError, setHasError] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const dispatch = useDispatch();
	let history = useHistory();
	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
			confirm: '',
			firstName: '',
			middleName: '',
			lastName: ''
		},
		onSubmit: async (values) => {
			let isOk = true;
			if (values.password !== values.confirm) {
				setErrorMessage('Password and confirmed password do not match');
				isOk = false;
			}
			if (!isOk) {
				setHasError(true);
			} else {
				setErrorMessage('');
				let checkAcc = await register(
					values.email,
					values.password,
					values.firstName,
					values.middleName,
					values.lastName
				).then((data) => {
          setHasError(false);
					formik.resetForm();
					history.push('/login');
        }).catch((e) => {
          setErrorMessage('Submit form failed');
					setHasError(true);
        })
			}
		}
	});

	return (
		<div
			className="Login-section min-h-screen bg-cover bg-no-repeat bg-fixed bg-center"
			style={{ backgroundImage: `url(${loginBg})` }}
		>
			<div className="h-full flex items-center justify-center">
				<div className="w-96 p-4 bg-white shadow-lg my-16 text-center px-5 rounded-xl">
					<h1 className="text-xl font-semibold py-2">V I E T N A M G O</h1>
					<h1 className="text-2xl font-bold py-2">Welcome to 'local'</h1>

					<form
						className="space-y-4 md:space-y-6 text-left mt-4"
						action="#"
						onSubmit={(event) => {
							event.preventDefault();
							formik.handleSubmit(event);
						}}
					>
						<div>
							<label>
								First name<span className="text-red-500">*</span>
							</label>
							<input
								type="text"
								name="firstName"
								id="firstName"
								className="bg-gray-50 border border-gray-500 text-gray-900 italic sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
								placeholder="Type your first name"
								onChange={formik.handleChange}
								value={formik.values.firstName}
								required
							/>
						</div>
						<div>
							<label>Middle name</label>
							<input
								type="text"
								name="middleName"
								id="middleName"
								className="bg-gray-50 border border-gray-500 text-gray-900 italic sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
								placeholder="Type your first name"
								onChange={formik.handleChange}
								value={formik.values.middleName}
							/>
						</div>
						<div>
							<label>Last name</label>
							<input
								type="text"
								name="lastName"
								id="lastName"
								className="bg-gray-50 border border-gray-500 text-gray-900 italic sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
								placeholder="Type your first name"
								onChange={formik.handleChange}
								value={formik.values.lastName}
							/>
						</div>
						<div>
							<label>
								Email<span className="text-red-500">*</span>
							</label>
							<input
								type="email"
								name="email"
								id="email"
								className="bg-gray-50 border border-gray-500 text-gray-900 italic sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
								placeholder="Type your email"
								onChange={formik.handleChange}
								value={formik.values.email}
								required
							/>
						</div>
						<div>
							<label>
								Password<span className="text-red-500">*</span>
							</label>
							<input
								type="password"
								name="password"
								id="password"
								placeholder="••••••••"
								className="bg-gray-50 border border-gray-500 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
								onChange={formik.handleChange}
								value={formik.values.password}
								required
							/>
						</div>
						<div>
							<label>
								Confirm password<span className="text-red-500">*</span>
							</label>
							<input
								type="password"
								name="confirm"
								id="confirm"
								placeholder="••••••••"
								className="bg-gray-50 border border-gray-500 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
								onChange={formik.handleChange}
								value={formik.values.confirm}
								required
							/>
						</div>
						{hasError ? (
							<div className="error-notify">
								<h1 className="text-center text-red-500">{errorMessage}</h1>
							</div>
						) : (
							<></>
						)}
						<button
							type="submit"
							className="w-full text-white bg-black border border-white focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:bg-white hover:border hover:border-black hover:text-black ease-in duration-500"
						>
							Register
						</button>
						<p className="text-sm font-light text-gray-500 dark:text-gray-400 italic text-center">
							Already have an account yet?{' '}
							<a
								href="/login"
								className="font-medium text-primary-600 hover:underline dark:text-primary-500"
							>
								Sign in
							</a>
						</p>

						<div className="divider-or ">
							<p className=" text-center before:w-24 relative before:content-[''] before:h-px before:bg-black before:left-0 before:block before:absolute before:top-1/2 after:w-24 after:content-[''] after:h-px after:bg-black after:right-0 after:block after:absolute after:top-1/2">
								Or Sign in with
							</p>
						</div>
						<div className="another-login">
							<div className="google-login">
								<button
									aria-label="Continue with google"
									role="button"
									className="focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-700 py-2.5 px-4 border rounded-lg border-gray-700 flex items-center w-full mt-5 hover:bg-slate-100"
								>
									<img
										src="https://tuk-cdn.s3.amazonaws.com/can-uploader/sign_in-svg2.svg"
										alt="google"
									/>
									<p className="text-base font-medium ml-12 text-gray-700">
										Continue with Google
									</p>
								</button>
							</div>
							<div className="facebook-login">
								<button
									aria-label="Continue with facebook"
									role="button"
									className="focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-700 py-2.5 px-4 border rounded-lg border-gray-700 flex items-center w-full mt-5 hover:bg-slate-100"
								>
									<img src={fb} alt="facebook" />
									<p className="text-base font-medium ml-12 text-gray-700">
										Continue with Facebook
									</p>
								</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

export default Register;
