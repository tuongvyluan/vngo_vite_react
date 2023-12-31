// Single Place Details for => Attractions and Restaurants

import { useParams, useHistory } from 'react-router-dom';
import ReactStarsRating from 'react-awesome-stars-rating';
import { Fragment, useEffect, useState } from 'react';
import { Accordion, AccordionHeader, AccordionBody } from '@material-tailwind/react';
import { createBooking, getPlaceDetails, createReview } from '../../api';
import { Footer, Review } from '../../components';
import { Loader, PlaceDetailsLoader } from '../../components/loaders';
import { AiOutlineUser } from 'react-icons/ai';
import Header from '../../components/Header';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { defaultDescriptions } from '../../public/defaultDescription';

function Icon({ open }) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			className={`${open ? 'rotate-180' : ''} h-5 w-5 transition-transform`}
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			strokeWidth={2}
		>
			<path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
		</svg>
	);
}

const PlaceDetails = () => {
	const [openAcc1, setOpenAcc1] = useState(true);
	const [openAcc2, setOpenAcc2] = useState(false);
	const [openAcc3, setOpenAcc3] = useState(false);
	const [openAcc4, setOpenAcc4] = useState(false);
	const [openAcc5, setOpenAcc5] = useState(false);

	const handleOpenAcc1 = () => setOpenAcc1((cur) => !cur);
	const handleOpenAcc2 = () => setOpenAcc2((cur) => !cur);
	const handleOpenAcc3 = () => setOpenAcc3((cur) => !cur);
	const handleOpenAcc4 = () => setOpenAcc4((cur) => !cur);
	const handleOpenAcc5 = () => setOpenAcc5((cur) => !cur);

	let account = useSelector((state) => state.login.account);
	const { type, id } = useParams(); // Destucturing 'type' and 'id' from route parameter
	const [defaultTour, setDefaultTour] = useState();
	const [place, setPlace] = useState();
	const [tours, setTours] = useState();
	const [rating, setRating] = useState(5);
	const history = useHistory();
	const formik = useFormik({
		initialValues: {
			touristNum: 1,
			id: 0
		}
	});

	const handleCheckout = () => {
		const touristNum = formik.values.touristNum;
		const tourId = formik.values.id;
		const customerId = account.id;
		createBooking(customerId, touristNum, tourId).then((d) => {
			history.push(`/checkout/${d.data.id}`);
		});
	};
	const [isLoading, setIsLoading] = useState(true);

	const handleRating = () => {
		const reviewContent = document.getElementById('reviewContent').value;
		const reviewTitle = document.getElementById('reviewTitle').value;
		const data = {
			summary: reviewContent,
			author: account.firstName + ' ' + account.lastName,
			rating: rating,
			locationId: id,
			title: reviewTitle
		};
		console.log(data);
		createReview(data).then(() => {
			window.location.reload(true);
		});
	};

	useEffect(() => {
		setIsLoading(true);
		const calcId = ((id % 1000) - (id % 100)) / 100;
		console.log(id, calcId);
		switch (calcId) {
			case 1:
				setDefaultTour(defaultDescriptions.oneDayTour);
				break;
			case 2:
				setDefaultTour(defaultDescriptions.twoDayTour);
				break;
			case 3:
				setDefaultTour(defaultDescriptions.halfDayNoFood);
				break;
			case 4:
				setDefaultTour(defaultDescriptions.halfDayWithFood);
				break;
			case 5:
				setDefaultTour(defaultDescriptions.foodTour);
				break;
		}
	}, [id]);
	// Effect to fetch place details from getPlaceDetails endpoint and Effect is reran dependent on 'type' or 'id' change
	useEffect(async () => {
		// calling the getPlaceDetails endpoint passing in the 'type' of place (hotel || restaurant || attraction), 'id' and 'source' for error handling
		await getPlaceDetails(id).then((data) => {
			setPlace(data.data);
		});
	}, [type, id]);

	useEffect(() => {
		if (typeof place !== 'undefined') {
			setTours(place.tours);
		}
	}, [place]);

	useEffect(() => {
		if (typeof tours !== 'undefined' && tours.length > 0) {
			formik.values.id = tours[0].id;
			setIsLoading(false);
		}
	}, [tours]);

	return (
		<div className="relative">
			{/* Navbar with border */}
			<Header />
			{/* -- */}

			{/* Place Details */}
			{isLoading ? (
				<PlaceDetailsLoader />
			) : (
				<>
					{/* <div className="border-b w-full h-fit flex justify-between items-center sticky top-0 bg-white z-20">
						<div className="container mx-auto px-4"> */}
					{/* Link Routing back to a list of the currently viewed place type -> i.e list of "Hotels", "Restaurants" or "Attractions" */}
					{/* <Link to={`/${type}`}>
								<div className="w-fit border-r py-3 pl-3 pr-3 md:pl-0 md:pr-4 cursor-pointer flex item-center">
									<svg
										className="h-6 w-6 mr-2"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										strokeWidth="2"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M10 19l-7-7m0 0l7-7m-7 7h18"
										/>
									</svg>
									<p>Back to all {type}</p>
								</div>
							</Link> */}
					{/* --- */}
					{/* </div>
					</div> */}
					<div className="top-content flex justify-items-center justify-between items-center container mx-auto">
						<div className="top-left-content">
							<div className="container mx-auto px-4 pt-4">
								{/* Plcae Name */}
								<h1 className="font-bold text-lg md:text-[35px] my-2 md:my-4">
									{place?.name}
								</h1>
								{/* --- */}

								<p className="my-2 text-sm flex flex-wrap leading-relaxed">
									{/* Place Rating with 'place.rating' value passed to generate a React Stars Rating element */}
									<span className="flex items-center mr-2">
										<ReactStarsRating
											value={Number(place?.rating)}
											className="flex mr-2"
											size={20}
											isEdit={false}
											primaryColor="#00afef"
											secondaryColor="#e5e7eb"
										/>
										{place?.num_reviews > 1 ? `${place?.num_reviews} Reviews` : `${place?.num_reviews} Review` } 
									</span>
									{/* --- */}
									{/* Place Ranking and Place Price Level */}~ {place?.ranking} ~{' '}
									{place?.price_level}
									{/* --- */}
								</p>

								{/* Place Details */}
								<div className="text-sm flex flex-wrap items-center my-2 leading-relaxed">
									{/* Place Address - diplayed only if found in place details */}
									{place?.address && (
										<p className="flex items-center mr-2">
											<svg
												className="h-5 w-5 mr-1"
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 20 20"
												fill="currentColor"
											>
												<path
													fillRule="evenodd"
													d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
													clipRule="evenodd"
												/>
											</svg>
											<span className="underline decoration-dotted decoration-gray-400">
												{place?.address}
											</span>
										</p>
									)}
									{/* -- */}

									{/* Place Phone - displayed only if found in place details */}
									{place?.phone && (
										<p className="hidden md:flex items-center mr-2">
											<svg
												className="h-5 w-5 mr-1"
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 20 20"
												fill="currentColor"
											>
												<path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
											</svg>

											{/* Anchor Link to call phone */}
											<a
												href={`tel:${place?.phone}`}
												className="underline decoration-dotted decoration-gray-400"
											>
												{place?.phone}
											</a>
											{/* --- */}
										</p>
									)}
									{/* --- */}

									{/* Place Email - Display only if found in plcae details */}
									{place?.email && (
										<p className="hidden md:flex items-center mr-2">
											<svg
												className="h-5 w-5 mr-1"
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 20 20"
												fill="currentColor"
											>
												<path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
												<path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
											</svg>

											{/* Anchor linkto send a mail to email */}
											<a
												href={`mailto:${place?.email}`}
												className="underline decoration-dotted decoration-gray-400"
											>
												Email
												<svg
													className="h-3 w-3 ml-1 inline"
													xmlns="http://www.w3.org/2000/svg"
													viewBox="0 0 20 20"
													fill="currentColor"
												>
													<path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
													<path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
												</svg>
											</a>
											{/* --- */}
										</p>
									)}
									{/* --- */}

									{/* Place Website - displayed only if found in place details */}
									{place?.website && (
										<p className="hidden md:flex items-center mr-2">
											<svg
												className="h-5 w-5 mr-1"
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 20 20"
												fill="currentColor"
											>
												<path
													fillRule="evenodd"
													d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z"
													clipRule="evenodd"
												/>
											</svg>

											{/* Anchor Link to visit place website */}
											<a
												href={place?.website}
												target="_blank"
												className="underline decoration-dotted decoration-gray-400"
											>
												Website
												<svg
													className="h-3 w-3 ml-1 inline"
													xmlns="http://www.w3.org/2000/svg"
													viewBox="0 0 20 20"
													fill="currentColor"
												>
													<path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
													<path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
												</svg>
											</a>
											{/* --- */}
										</p>
									)}
									{/* --- */}
								</div>
								{/* --- */}

								{/* Place Open or Close Button - Displayed with specific colors based on status */}
								{!place?.isClose && place?.open_now_text && (
									<button
										className={`${
											place?.open_now_text?.includes('Closed')
												? 'bg-red-400'
												: 'bg-green-400'
										} rounded-full py-1 px-3 my-2 mr-2`}
									>
										<p className="text-sm flex items-center">
											<svg
												className="h-5 w-5 mr-1"
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
												strokeWidth="2"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
												/>
											</svg>

											{/* Place Close/Open Status Diplay with an Open now fallback just incase no text is found in object */}
											{place?.open_now_text || 'Open Now'}
											{/* --- */}
										</p>
									</button>
								)}
								{/* --- */}

								{/* Place Price, Displays if price is found in place info */}
								{place?.price && (
									<button className="bg-yellow-400 rounded-full py-1 px-3 my-2 mr-2">
										<p className="text-sm flex items-center">
											<svg
												className="h-5 w-5 mr-1"
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
												strokeWidth={2}
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
												/>
											</svg>
											{place?.price}
										</p>
									</button>
								)}
								{/* --- */}
							</div>
						</div>
					</div>

					<div className="container mx-auto grid grid-cols-2">
						<div className="col-span-2">
							{/* Place Photo - displays only if found in place info else a default photo is displayed as fallback  */}
							<img
								src={
									place?.photo
										? place?.photo?.images?.original?.url
										: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/03/f7/49/68/hotel-bon-voyage.jpg?w=200&h=-1&s=1'
								}
								className="w-full h-[250px] md:h-[400px] object-cover my-2"
								alt=""
							/>
							{/* --- */}
						</div>
					</div>

					{/* A Mobile Only Section - Diplays if either of Place Email, Phone or Website is found */}
					<div className="container mx-auto px-4 pb-4">
						{(place?.phone || place?.email || place?.website) && (
							<div className="flex bg-white shadow-sm rounded-b p-2 md:hidden border border-t-0 mb-2">
								{/* Place phone - displays only if found in place details  */}
								{place?.phone && (
									<p className="flex flex-col items-center justify-center w-full">
										<svg
											className="h-7 w-7 mx-1"
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20"
											fill="currentColor"
										>
											<path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
										</svg>

										{/* Anchor link to call phone */}
										<a
											href={`tel:${place?.phone}`}
											className="underline decoration-dotted decoration-gray-400"
										>
											Call
										</a>
										{/* --- */}
									</p>
								)}
								{/* --- */}

								{/* Place email - displays only if found in place details  */}
								{place?.email && (
									<p className="flex flex-col items-center justify-center w-full">
										<svg
											className="h-7 w-7 mx-1"
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20"
											fill="currentColor"
										>
											<path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
											<path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
										</svg>

										{/* Anchor Link to send mail to email */}
										<a
											href={`mailto:${place?.email}`}
											className="underline decoration-dotted decoration-gray-400"
										>
											Email
										</a>
										{/* --- */}
									</p>
								)}

								{/* Place website - displayed only of found in place details */}
								{place?.website && (
									<p className="flex flex-col items-center justify-center w-full">
										<svg
											className="h-7 w-7 mx-1"
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20"
											fill="currentColor"
										>
											<path
												fillRule="evenodd"
												d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z"
												clipRule="evenodd"
											/>
										</svg>

										{/* Anchor link to visit website */}
										<a
											href={place?.website}
											target="_blank"
											className="underline decoration-dotted decoration-gray-400"
										>
											Website
											<svg
												className="h-3 w-3 ml-1 inline"
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 20 20"
												fill="currentColor"
											>
												<path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
												<path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
											</svg>
										</a>
										{/* --- */}
									</p>
								)}
								{/* --- */}
							</div>
						)}

						<div className=" sm:grid grid-cols-5 gap-8">
							<div className="md:grid grid-cols-1 md:grid-cols-6 gap-3 pb-10 col-span-3">
								{/* About Info */}
								<div className="col-span-6 bg-white my-1 mx-0 space-y-2">
									{/* Place description section - displays only if found in place details  */}
									{place?.description && (
										<>
											<h1 className="font-semibold text-lg md:text-xl">About</h1>
											<p className="text-base">{place?.description}</p>
										</>
									)}
									{/* --- */}
								</div>

								{/* Section displays If either awards, rating or ranking is found in place details */}
								{(place?.awards?.length > 0 ||
									Number(place?.rating) > 0 ||
									place?.ranking) && (
									<div className="grid grid-cols-6 gap-3 col-span-6">
										<div className="col-span-6 bg-white my-1 mx-0 space-y-3 md:space-y-4">
											<h2 className="font-semibold text-xl">
												Ratings & Recognitions
											</h2>

											{/* Place Rating with 'place.rating' value passed to generate a React Stars Rating element - displays only if found in place details  */}
											{Number(place?.rating) > 0 && (
												<p className="my-2 flex flex-wrap items-center">
													<span className="font-semibold text-lg md:text-3xl">
														{place?.rating}
													</span>
													<ReactStarsRating
														value={Number(place?.rating)}
														className="flex mx-2"
														size={20}
														isEdit={false}
														primaryColor="#00afef"
														secondaryColor="#e5e7eb"
													/>
													<span className="text-sm font-medium">
														{place?.num_reviews}{' '}
														{place?.num_reviews > 1 ? 'Reviews' : 'Review'}
													</span>
												</p>
											)}
											{/* --- */}

											{/* Place ranking - displays only if found in place details */}
											{place?.ranking && (
												<p className="my-2 text-sm">{place?.ranking}</p>
											)}
											{/* --- */}

											{/* Place awards - displays only if the award array has any item i.e. greater than 0 */}
											{place?.awards?.length > 0 && (
												<div className="text-xs space-y-2">
													<h3 className="font-medium uppercase">Awards</h3>
													<div className="flex flex-wrap items-center">
														{/* Mapping through awards */}
														{place?.awards?.map((award, i) => (
															<div key={i} className="group relative cursor-pointer">
																<div className="flex flex-wrap items-center bg-white border border-gray-200 shadow-md rounded-md p-2 mr-2 mb-2">
																	{/* Award Image */}
																	<img src={award?.images?.small} />
																	{/* --- */}

																	{/* Award display name - Hidden on desktop (Large devices) but display on Mobile */}
																	<p className="ml-2 md:hidden">
																		{award?.display_name}
																	</p>
																	{/* --- */}
																</div>

																{/* Award display name - Display only on hover of award Image. Only on Desktop, Hidden on Mobile */}
																<div className="w-content hidden md:group-hover:block absolute bg-white border border-gray-200 shadow-md rounded-md p-2 mr-2 mb-2 -bottom-10 z-10">
																	<p className="ml-2 whitespace-nowrap">
																		{award?.display_name}
																	</p>
																</div>
																{/* --- */}
															</div>
														))}
														{/* --- */}
													</div>
												</div>
											)}
											{/* --- */}
										</div>
									</div>
								)}
								{/* --- */}
								<div className="col-span-6">
									{defaultTour ? (
										<div className="col-span-3 bg-white my-1 mx-0 space-y-3 md:space-y-4">
											<Fragment>
												<Accordion open={openAcc1} icon={<Icon open={openAcc1} />}>
													<AccordionHeader onClick={handleOpenAcc1}>
														<h2 className="font-semibold text-xl">
															Basic Information
														</h2>
													</AccordionHeader>
													<AccordionBody>
														{defaultTour.BasicInformation?.map((tour, i) => (
															<p
																key={i}
																className="text-base text-black font-normal mt-3"
															>
																{tour}
															</p>
														))}
													</AccordionBody>
												</Accordion>
												<Accordion open={openAcc2} icon={<Icon open={openAcc2} />}>
													<AccordionHeader onClick={handleOpenAcc2}>
														<h2 className="font-semibold text-xl">
															What's Included
														</h2>
													</AccordionHeader>
													<AccordionBody>
														{defaultTour.WhatIncluded?.map((tour, i) => (
															<p
																key={i}
																className="text-base text-black font-normal mt-3"
															>
																{tour}
															</p>
														))}
													</AccordionBody>
												</Accordion>
												<Accordion open={openAcc3} icon={<Icon open={openAcc3} />}>
													<AccordionHeader onClick={handleOpenAcc3}>
														<h2 className="font-semibold text-xl">Pick-up</h2>
													</AccordionHeader>
													<AccordionBody>
														{defaultTour.Pickup?.map((tour, i) => (
															<p
																key={i}
																className="text-base text-black font-normal mt-3"
															>
																{tour}
															</p>
														))}
													</AccordionBody>
												</Accordion>
												<Accordion open={openAcc4} icon={<Icon open={openAcc4} />}>
													<AccordionHeader onClick={handleOpenAcc4}>
														<h2 className="font-semibold text-xl">
															Additional Information
														</h2>
													</AccordionHeader>
													<AccordionBody>
														{defaultTour.AdditionalInformation?.map((tour, i) => (
															<p
																key={i}
																className="text-base text-black font-normal mt-3"
															>
																{tour}
															</p>
														))}
													</AccordionBody>
												</Accordion>
												<Accordion open={openAcc5} icon={<Icon open={openAcc5} />}>
													<AccordionHeader onClick={handleOpenAcc5}>
														<h2 className="font-semibold text-xl">
															Cancellation Policy
														</h2>
													</AccordionHeader>
													<AccordionBody>
														{defaultTour.CancellationPolicy?.map((tour, i) => (
															<p
																key={i}
																className="text-base text-black font-normal mt-3"
															>
																{tour}
															</p>
														))}
													</AccordionBody>
												</Accordion>
											</Fragment>
										</div>
									) : (
										<></>
									)}
								</div>

								{/* Cuisines/Special Diets - Section display only if either cusine or diet restriction is found in place details */}
								{(place?.cuisine || place?.dietary_restrictions) && (
									<div className="col-span-2 bg-white border border-gray-200 p-4 my-1 mx-0 shadow-sm space-y-3 md:space-y-4">
										<h2 className="font-medium text-lg">Details</h2>

										{/* Place cuisines - displays only if the cuisine array has any item i.e. greater than 0 */}
										{place?.cuisine?.length > 0 && (
											<div className="text-xs space-y-2">
												<h3 className="font-medium uppercase">Cuisine</h3>
												<p>
													{/* Mapping through list of cuisines */}
													{place?.cuisine?.map((type) => (
														<span
															className="bg-gray-200 rounded-full py-1 px-2 mb-2 mr-2 inline-block"
															key={type.key}
														>
															{type.name}
														</span>
													))}
													{/* --- */}
												</p>
											</div>
										)}
										{/* --- */}

										{/* Place diet restriction - displays only if the diet restriction array has any item i.e. greater than 0 */}
										{place?.dietary_restrictions?.length > 0 && (
											<div className="text-xs space-y-2">
												<h3 className="font-medium uppercase">Special Diet</h3>
												<p>
													{/* Mapping through list of diet restriction */}
													{place?.dietary_restrictions?.map((type) => (
														<span
															className="bg-gray-200 rounded-full py-1 px-2 mb-2 mr-2 inline-block"
															key={type.key}
														>
															{type.name}
														</span>
													))}
													{/* --- */}
												</p>
											</div>
										)}
										{/* --- */}
									</div>
								)}
								{/* --- */}

								{/* Contact Details - Section Diplays only if either of Place Email, Phone or Website is found */}
								{(place?.phone || place?.email || place?.website) && (
									<div className="col-span-2 bg-white border border-gray-200 p-4 my-1 mx-0 shadow-sm space-y-3 md:space-y-4">
										<h2 className="font-medium text-lg">Contact Details</h2>

										{/* Place address - displays only if found in place details */}
										{place?.address && (
											<div className="flex items-start mr-2 text-sm">
												<div className="w-1/12">
													<svg
														className="h-5 w-5 mr-1"
														xmlns="http://www.w3.org/2000/svg"
														viewBox="0 0 20 20"
														fill="currentColor"
													>
														<path
															fillRule="evenodd"
															d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
															clipRule="evenodd"
														/>
													</svg>
												</div>
												<span className="underline decoration-dotted decoration-gray-400">
													{place?.address}
												</span>
											</div>
										)}
										{/* --- */}

										{/* Place phone - displays only if found in place details */}
										{place?.phone && (
											<div className="flex items-center mr-2 text-sm">
												<div className="w-1/12">
													<svg
														className="h-5 w-5 mr-1"
														xmlns="http://www.w3.org/2000/svg"
														viewBox="0 0 20 20"
														fill="currentColor"
													>
														<path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
													</svg>
												</div>

												{/* Anchor link to call phone */}
												<a
													href={`tel:${place?.phone}`}
													className="underline decoration-dotted decoration-gray-400"
												>
													{place?.phone}
												</a>
												{/* --- */}
											</div>
										)}
										{/* --- */}

										{/* Place email - displays only if found in place details */}
										{place?.email && (
											<div className="flex items-center mr-2 text-sm">
												<div className="w-1/12">
													<svg
														className="h-5 w-5 mr-1"
														xmlns="http://www.w3.org/2000/svg"
														viewBox="0 0 20 20"
														fill="currentColor"
													>
														<path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
														<path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
													</svg>
												</div>

												{/* Anchor link to send mail to email */}
												<a
													href={`mailto:${place?.email}`}
													className="underline decoration-dotted decoration-gray-400"
												>
													Email
													<svg
														className="h-3 w-3 ml-1 inline"
														xmlns="http://www.w3.org/2000/svg"
														viewBox="0 0 20 20"
														fill="currentColor"
													>
														<path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
														<path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
													</svg>
												</a>
												{/*  */}
											</div>
										)}
										{/* --- */}

										{/* Place website - displays only if found in place details */}
										{place?.website && (
											<div className="flex items-center mr-2 text-sm">
												<div className="w-1/12">
													<svg
														className="h-5 w-5 mr-1"
														xmlns="http://www.w3.org/2000/svg"
														viewBox="0 0 20 20"
														fill="currentColor"
													>
														<path
															fillRule="evenodd"
															d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z"
															clipRule="evenodd"
														/>
													</svg>
												</div>

												{/* Anchor link to visit webiste */}
												<a
													href={place?.website}
													target="_blank"
													className="underline decoration-dotted decoration-gray-400"
												>
													Website
													<svg
														className="h-3 w-3 ml-1 inline"
														xmlns="http://www.w3.org/2000/svg"
														viewBox="0 0 20 20"
														fill="currentColor"
													>
														<path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
														<path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
													</svg>
												</a>
												{/* --- */}
											</div>
										)}
										{/* --- */}
									</div>
								)}
							</div>
							<div className="col-span-2 bg-white my-1 mx-0 space-y-3 md:space-y-4 border-2 shadow-sm border-gray-300 rounded-xl p-3 h-fit">
								<div className="sm:block flex md:flex w-full justify-between items-center">
									<h1 className="font-semibold text-lg md:text-xl">
										Reserve your spot
									</h1>
									<div className="top-right-content">
										<div>
											<div className="sign-in pt-2 pb-2 pl-3 pr-3 w-fit bg-black border border-white text-white rounded-full mx-2 md:mx-2 sm:mx-auto hover:bg-white hover:border hover:border-black hover:text-black ease-in duration-500">
												<button onClick={handleCheckout} className="addToTour">
													Checkout
												</button>
											</div>
										</div>
									</div>
								</div>
								<form id="tour">
									<div className="flex gap-2 mb-3 bg-white border border-gray-300 shadow-sm w-fit p-2 items-center rounded-xl">
										<AiOutlineUser />
										<input
											name="touristNum"
											onChange={formik.handleChange}
											value={formik.values.touristNum}
											required
											type="number"
											className="w-8"
											min={1}
										/>
									</div>
									<div className="">
										{place.tours.map((tour, i) => (
											<div
												key={tour.id}
												className={
													formik.values.id == tour.id
														? 'col-span-1 hover:scale-105 transition duration-300 ease-in-out border-2 rounded-xl shadow-sm border-gray-300 p-4'
														: 'col-span-1 hover:scale-105 transition duration-300 ease-in-out border rounded-xl shadow-sm border-gray-300 p-4'
												}
											>
												<div className="flex justify-between items-center mb-3">
													<div className="font-semibold">{tour?.tourName}</div>
													<input
														id="default-radio-1"
														type="radio"
														onChange={() => formik.setFieldValue('id', tour?.id)}
														value={formik.values.id}
														defaultChecked={i === 0}
														name="id"
														className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2"
													></input>
												</div>
												<div className="mb-2">{tour?.tourDescription}</div>
												<div className="mb-1">
													{formik.values.touristNum} x {tour?.price?.toFixed(0).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")} VND
												</div>
												<div className="font-semibold">
													Total: {(formik.values.touristNum * tour?.price).toFixed(0).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")} VND
												</div>
												<div>(No additional tax or booking fees)</div>
											</div>
										))}
									</div>
								</form>
							</div>
						</div>
						{/* Place Reviews */}
						<div className="md:col-span-6 bg-white my-1 mx-0 mt-3">
							{/* Review Count Display */}
							<h2 className="font-semibold text-xl">
								Reviews <span className="text-gray-400">({place?.num_reviews})</span>
							</h2>
							{/* --- */}
							<div className="h-[1px] bg-gray-300 my-3 md:my-4" />
							{account?.firstName ? (
								<div className="w-full">
									<div className="mb-3">
										<div className="font-semibold mb-3">
											{account.firstName} {account.lastName}
										</div>
										<div className="flex gap-2 items-center">
											<input
												type="text"
												id="reviewTitle"
												placeholder="Enter review title"
												className="w-1/2 border-2 p-2 rounded-xl"
											/>
											<ReactStarsRating
												key={rating}
												value={rating}
												onChange={setRating}
												className="flex"
												size={20}
												isEdit={true}
												isHalf={true}
												isArrowSubmit={true}
												primaryColor="#00afef"
												secondaryColor="#e5e7eb"
											/>
											<span>{rating}</span>
										</div>
									</div>
									<div>
										<form>
											<textarea
												rows={5}
												id="reviewContent"
												placeholder="Enter your reviews"
												required
												type="text"
												className="border-2 w-full rounded-xl p-2"
												minLength={50}
											/>
										</form>
									</div>
									<div className="flex justify-end">
										<div className="sign-in w-fit pt-2 pb-2 pl-3 pr-3 bg-black border border-white text-white rounded-full mx-2 hover:bg-white hover:border hover:border-black hover:text-black ease-in duration-500">
											<button onClick={handleRating} className="addToTour">
												Submit
											</button>
										</div>
									</div>
								</div>
							) : (
								<div></div>
							)}
							{/* Reviews - Renders Reviews when ready or a Loader is Displayed */}
							{place?.reviews ? (
								<>
									{/* If Reviews is Greater than Zero, that means current place has reviews, 
                                        Hence we map through list of Reviews
                                        otherwise, the 'no review message is render'  */}
									{place?.num_reviews > 0 ? (
										place?.reviews?.map((review, i) => (
											<Review key={i} review={review} place={place?.name} />
										))
									) : (
										// No Review Message - At this stage the current place has no reviews
										<p className="text-gray-300 text-center">
											There are currently no reviews for this place.
										</p>
									)}
									{/* --- */}
								</>
							) : (
								// Loading Displayed when Reviews isn't ready
								<div className="h-14">
									<Loader />
								</div>
							)}
						</div>
						{/* --- */}
					</div>
					{/* --- */}
				</>
			)}
			{/* --- */}
			{/* Footer Component */}
			<Footer />
			{/* --- */}
		</div>
	);
};

export default PlaceDetails;
