import Header from '../components/Header';
import { Footer } from '../components';
import { useSelector } from 'react-redux';
import suitcase from '../img/suitcase.svg';
import axios from 'axios';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import moment from 'moment';
import { getBookings } from '../api';
import { useEffect, useState } from 'react';
import { PlaceDetailsLoader } from '../components/loaders';

function Booking() {
	const account = useSelector((state) => state.login.account);
	const [items, setItems] = useState([]);
	const generateRandomDate = (from, to) => {
		return new Date(
			from.getTime() + Math.random() * (to.getTime() - from.getTime())
		);
	};
	const formatDate = (date) => {
		return `${moment(date).format('LL')} | ${moment(date).format('LT')}`;
	};
	const [isLoading, setIsLoading] = useState(true);
	const getStatus = (paymentStatus) => {
		if (!paymentStatus) {
			return 'Pending';
		}
		return 'Completed';
	};

	useEffect(async () => {
		let source = axios.CancelToken.source();
		setIsLoading(true);

		await getBookings(account.id).then((data) => {
			setItems(data.data);
			console.log(data.data);
			setIsLoading(false);
		});

		// Effect Cleanup
		return () => {
			source.cancel();
		};
	}, [account]);

	return (
		<div className="cart-section">
			<Header />
			{isLoading ? (
				<div className='min-h-[calc(100vh-240px)]'></div>
			) : (
				<>
					{items.length === 0 ? (
						<div className="emptyTour min-h-[calc(100vh-240px)] text-center  flex flex-col items-center justify-center">
							<img src={suitcase} alt="suitcase" className="w-36 h-36" />
							<h1 className="text-2xl font-semibold">Your tour history is empty</h1>
							<p className="font-semibold text-base my-2">
								Booking for more tours. Now you can look <br /> for tours,
								attractions, and experiences.{' '}
							</p>
							<Link to="/">
								<div className="sign-in pt-2 pb-2 pl-3 pr-3 bg-black border border-white text-white rounded-full mx-2 hover:bg-white hover:border hover:border-black hover:text-black ease-in duration-500">
									<button className="explore">Explore Now</button>
								</div>
							</Link>
						</div>
					) : (
						<div className="cart-container container mx-auto p-4 min-h-[calc(100vh-240px)]">
							<h1 className="text-3xl font-semibold my-5">Bookings</h1>

							<div className="cart-content flex justify-items-center justify-between">
								<div className="cart-left  ">
									{items.map((item, index) => (
										<Link
											to={
												getStatus(item.paymentStatus).startsWith('P')
													? `checkout/${item?.id}`
													: `attractions/${item?.tour?.location?.locationId}`
											}
											className="cart-left-item flex gap-3 mb-5 items-center"
											key={index}
										>
											<div className="place-image mr-2">
												<img
													src={item?.tour?.location?.locationImage?.small?.url}
													className="w-40 h-40 rounded-2xl"
													alt="place-image"
												/>
											</div>
											<div className="place-info flex flex-col justify-center border rounded-2xl py-3 px-10 min-h-[160px] min-w-[700px]">
												<h1 className="text-2xl font-semibold mb-2">
													{item?.tour?.tourName}
												</h1>
												<div className="flex gap-12 justify-start items-start">
													<table>
														<tr>
															<th className="text-sm text-gray-500 font-normal text-left pr-5">
																Booking ID:
															</th>
															<td>{item?.id}</td>
														</tr>
														<tr>
															<th className="text-sm text-gray-500 font-normal text-left pr-5">Payment Status:</th>
															<td>
																{getStatus(item?.paymentStatus)}
															</td>
														</tr>
														<tr>
															<th className="text-sm text-gray-500 font-normal text-left pr-5">Trip Status:</th>
															<td>
																{item?.tripStatus}
															</td>
														</tr>
													</table>
													<table>
														<tr>
															<th className="text-sm text-gray-500 font-normal text-left pr-5">
																Booking Date:
															</th>
															<td>{formatDate(item?.bookingDate)}</td>
														</tr>
														<tr>
															<th className="text-sm text-gray-500 font-normal text-left pr-5">
																Subtotal:
															</th>
															<td>
																{item?.touristNum} x {(item?.tour?.price).toFixed(0).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")} VND
															</td>
														</tr>
														<tr>
															<th className="text-sm text-gray-500 font-normal text-left pr-5">Total:</th>
															<td>
																{(item?.touristNum * item?.tour?.price).toFixed(0).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")} VND
															</td>
														</tr>
													</table>
												</div>
											</div>
										</Link>
									))}
								</div>
							</div>
						</div>
					)}
				</>
			)}

			<Footer />
		</div>
	);
}

export default Booking;
