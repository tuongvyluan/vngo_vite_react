import { useContext, useEffect, useState } from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import travelerChoiceBg from '../img/coverfb.png';
import { getAttractions } from '../api';
import PlaceCard from './PlaceCard';
import { PlaceCardLoader } from './loaders';
import { MainContext } from '../context/MainContext';
import axios from 'axios';

// OwlCarousel Responsive Options
const responsive = {
	0: {
		items: 1,
		margin: 15
	},
	600: {
		items: 2,
		margin: 10
	},
	768: {
		items: 3,
		margin: 10
	},
	1000: {
		items: 4,
		margin: 10
	}
};

const ToVisit = () => {
	// Bringing the Attraction state from the Main context and saved into variable name 'places'
	const { coordinates } = useContext(MainContext);
	const [isLoading, setIsLoading] = useState(true);
	const [places, setPlaces] = useState();
	const [famousPlace, setFamousPlaces] = useState();
	const [historicalPlace, setHistoricalPlace] = useState();
	const [thingsToDo, setThingsToDo] = useState();
	

	// Effect to fetch list of places for component from the getPlacesByLatLng endpoint and effect is reran on change of coordinates
	useEffect(async () => {
		let source = axios.CancelToken.source();

		// Loading state is set to true while data is being fetched from endpoint
		setIsLoading(true);

		// Calling on the getPlacesByLatLng endpoint passing in the 'attraction' as place type, coordinates (longitude and latitude), a limit parameter and source for error handling
		const data = await getAttractions(source).then((data) => {
			// Data is received and set to 'attractions' state list filtering out items with zero reviews, items with id '0' and items with no 'name' property
			setPlaces(data);
			setFamousPlaces(data.filter((item) => item.locationId < 2000));
			setHistoricalPlace(data.filter((item) => item.locationId > 2000 && item.locationId < 3000));
			setThingsToDo(data.filter((item) => item.locationId > 3000));
			// Setting loading state back to false to stop loading
			setIsLoading(false);
		});

		// Effect Cleanup
		return () => {
			source.cancel();
		};
	}, [coordinates]);

	return (
		<>
			{!places || places?.length < 1 ? (
				// if places list is empty, render a Loader
				<PlaceCardLoader />
			) : (
				// Places are ready, hence the element below is render
				<div>
					<div className="container mx-auto p-4">
						<div className="flex justify-between items-center">
							<div>
								<h2 className="font-semibold text-lg md:text-2xl">Place to Visit</h2>
								<p className="text-sm text-dark mb-2">
									These are some places you might want to visit
								</p>
							</div>
							<a
								className="text-[#AD3938] underline hover:no-underline"
								href="/attractions"
							>
								View all
							</a>
						</div>

						{/* OwlCarousel to Render Places in Carousel */}
						<div className="relative -left-[20px]">
							<OwlCarousel
								nav
								stagePadding={20}
								navClass={['navStyle', 'navStyle']}
								navContainerClass="navContainerStyle"
								responsive={responsive}
								navText={[
									`<svg xmlns="http://www.w3.org/2000/svg" className="h-2 w-2" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                                </svg>`,
									`<svg xmlns="http://www.w3.org/2000/svg" className="h-2 w-2" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>`
								]}
							>
								{/* Mapping through the Places Object, a place card is rendered for each data */}
								{famousPlace?.map((place, index) => (
									// Place card receives each place as prop
									<PlaceCard key={index} place={place} type="attractions" />
								))}
								{/* --- */}
							</OwlCarousel>
						</div>
					</div>
					<div className="container mx-auto p-4">
						<div className="flex justify-between items-center">
							<div>
								<h2 className="font-semibold text-lg md:text-2xl">
									Interested in history?
								</h2>
								<p className="text-sm text-dark mb-2">
									These are the must-see Vietnamese historic sites
								</p>
							</div>
							<a
								className="text-[#AD3938] underline hover:no-underline"
								href="/attractions"
							>
								View all
							</a>
						</div>

						{/* OwlCarousel to Render Places in Carousel */}
						<div className="relative -left-[20px]">
							<OwlCarousel
								nav
								stagePadding={20}
								navClass={['navStyle', 'navStyle']}
								navContainerClass="navContainerStyle"
								responsive={responsive}
								navText={[
									`<svg xmlns="http://www.w3.org/2000/svg" className="h-2 w-2" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                                </svg>`,
									`<svg xmlns="http://www.w3.org/2000/svg" className="h-2 w-2" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>`
								]}
							>
								{/* Mapping through the Places Object, a place card is rendered for each data */}
								{historicalPlace?.map((place, index) => (
									// Place card receives each place as prop
									<PlaceCard key={index} place={place} type="attractions" />
								))}
								{/* --- */}
							</OwlCarousel>
						</div>
					</div>
					{/* --- */}
					{/* Traveler Choice Section */}
					<div className="bg-[#DBAD86] mt-0 mb-5">
						<div className="container w-full h-[350px] overflow-hidden mx-auto ">
							{/* <div className="col-span-3 text-center py-6 flex flex-col items-center justify-center p-4 md:p-2">
						<h2 className="text-white font-bold text-2xl md:text-[2.15em]">
							Recommended Destinations
						</h2>
					</div> */}
							{/* Section Background Image - Displays only on Large devices, Like Desktop */}
							<div
								className="w-full h-full bg-cover"
								style={{ backgroundImage: `url(${travelerChoiceBg})` }}
							/>
							{/* --- */}
							{/* --- */}
						</div>
					</div>
					{/* --- */}
					<div className="container mx-auto p-4">
						<div className="flex justify-between items-center">
							<div>
								<h2 className="font-semibold text-lg md:text-2xl">
									Best things to do
								</h2>
								<p className="text-sm text-dark mb-2">
									These are the must-try activities on your Vietnamese adventure
								</p>
							</div>
							<a
								className="text-[#AD3938] underline hover:no-underline"
								href="/attractions"
							>
								View all
							</a>
						</div>

						{/* OwlCarousel to Render Places in Carousel */}
						<div className="relative -left-[20px]">
							<OwlCarousel
								nav
								stagePadding={20}
								navClass={['navStyle', 'navStyle']}
								navContainerClass="navContainerStyle"
								responsive={responsive}
								navText={[
									`<svg xmlns="http://www.w3.org/2000/svg" className="h-2 w-2" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                                </svg>`,
									`<svg xmlns="http://www.w3.org/2000/svg" className="h-2 w-2" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>`
								]}
							>
								{/* Mapping through the Places Object, a place card is rendered for each data */}
								{thingsToDo?.map((place, index) => (
									// Place card receives each place as prop
									<PlaceCard key={index} place={place} type="attractions" />
								))}
								{/* --- */}
							</OwlCarousel>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default ToVisit;
