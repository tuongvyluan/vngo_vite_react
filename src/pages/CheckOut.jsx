import { useEffect, useState } from 'react';
import Header from '../components/Header';
import { Footer } from '../components';
import { useDispatch, useSelector } from 'react-redux';
import { BsFillPhoneFill } from 'react-icons/bs';
import momoLogo from '../img/momo-logo.png';
import momoQR from '../img/momo-qr.png';
import { emptyCart } from '../features/cart/cartSlice';
import { useHistory, useParams } from 'react-router-dom';
import { getBooking } from '../api';

function CheckOut() {
	let account = useSelector((state) => state.login.account);
	const [booking, setBooking] = useState();
	const { id } = useParams();
	const [isLoading, setIsLoading] = useState(true);
	const dispatch = useDispatch();
	const history = useHistory();
	const handleOnclickConfirm = () => {
		dispatch(emptyCart());
		history.push('/');
	};

	useEffect(async () => {
		setIsLoading(true);
		await getBooking(id).then((data) => {
			console.log(data)
			setBooking(data.data);
			setIsLoading(false);
		});
	}, [id]);
	return (
		<div>
			<Header />
			<h1 className="text-2xl font-semibold mt-4 container mx-auto px-4 flex">
				Checkout
			</h1>
			{isLoading ? (
				<div className='min-h-[calc(100vh-20rem)]'></div>
			) : (
				<>
					<div className="checkout min-h-[calc(100vh-20rem)] container mx-auto p-4 flex ">
						<div className="checkout-left basis-3/4 mr-5">
							<div className="checkout-info">
								<div className="checkout-info-item text-left bg-slate-50 px-5 py-5 rounded-lg">
									<div className="succes-info bg-green-100 border border-black py-2 text-center rounded-lg my-2">
										<h1 className="text-sm">
											Checkout information has been sent to VietnamGo. You can
											complete payment now.
										</h1>
									</div>
									<div className="checkout-info-bottom border border-slate-500 rounded-lg  px-3 py-2">
										<h1 className="font-semibold text-lg my-2">Booking details</h1>
										<table>
											<tr>
												<th className="font-normal pr-7">Booking ID</th>
												<td>{booking?.id}</td>
											</tr>
											<tr>
												<th className="font-normal pr-7">Customer</th>
												<td>
													{account.firstName} {account.middleName} {account.lastName}
												</td>
											</tr>
											<tr>
												<th className="font-normal pr-7">Contact</th>
												<td>{account.email}</td>
											</tr>
											<tr>
												<th className="font-normal pr-7">Tour</th>
												<td>{booking?.tour?.tourName}</td>
											</tr>
											<tr>
												<th className="font-normal pr-7">Duration</th>
												<td>{booking?.tour?.tourTime}</td>
											</tr>
											<tr>
												<th className="font-normal pr-7">Number of tourists</th>
												<td>{booking?.touristNum}</td>
											</tr>
										</table>
									</div>
								</div>
							</div>
							<div className="checkout-info">
								<h1 className="text-2xl font-semibold my-4">Payment method</h1>
								<div className="checkout-info-item text-left bg-slate-50 px-5 py-5 rounded-lg">
									<div className="payment-method flex items-center">
										<BsFillPhoneFill size={24} />
										<p className="ml-2">Payment via Momo</p>
									</div>
									<img
										src={momoLogo}
										alt="momo logo"
										className="w-14  border border-pink-600 my-2 cursor-pointer"
									/>
									<div className="payment-method-bottom flex items-center justify-between">
										<div className="pmb-left">
											<h1>MoMo</h1>
											<h1 className="my-2">Account number: 0912991515</h1>
											<h1>Account holder: Nguyen Bao Tran</h1>
											<h1 className="my-2">
												Payment note: {account.firstName} {booking?.id}
											</h1>
										</div>
										<div className="pmb-right text-center flex flex-col items-center">
											<img src={momoQR} alt=" momo qr" className="w-28 h-28" />
											<h1 className="">
												Use Momo to scan <br /> QR Code to complete payment
											</h1>
										</div>
									</div>
									<div className="payment-confirm mt-4">
										<div className="sign-in pt-2 pb-2 pl-3 pr-3 bg-black border border-white text-white rounded-lg mx-2 hover:bg-white hover:border hover:border-black hover:text-black ease-in duration-500 text-center">
											<button
												className="confirm text-center"
												onClick={handleOnclickConfirm}
											>
												I've completed payment
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="checkout-right basis-1/4 bg-slate-50 h-1/2 p-4 rounded-lg ">
							<h1 className="text-2xl font-semibold mt-2 mb-4">Booking summary</h1>
							<div className="subtotal flex justify-between  my-2 justify-items-center">
								<p>Subtotal</p>
								<p>{(booking?.touristNum * booking?.tour?.price).toFixed(0).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")} VND</p>
							</div>
							<div className="discount flex justify-between  my-2 justify-items-center">
								<p>Discount</p>
								<p>0 VND</p>
							</div>
							<div className="divider border border-b-0 border-dashed border-slate-400"></div>
							<div className="total flex justify-between  my-2 justify-items-center">
								<p>Total</p>
								<p className="text-xl font-semibold">
									{(booking?.touristNum * booking?.tour?.price).toFixed(0).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")} VND
								</p>
							</div>
						</div>
					</div>
				</>
			)}
			<Footer />
		</div>
	);
}

export default CheckOut;
