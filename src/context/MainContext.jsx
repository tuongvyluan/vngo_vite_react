import React, { useState, useEffect } from 'react';
import { getAttractions } from '../api';
import { defaultAttractions } from '../public/defaultData';
import axios from 'axios';

export const MainContext = React.createContext();

export const MainContextProvider = ({ children }) => {
	const [places, setPlaces] = useState();
	const [filteredPlaces, setFilteredPlaces] = useState();
	const [coordinates, setCoordinates] = useState({});
	const [bounds, setBounds] = useState({});
	const [rating, setRating] = useState(0);
	const [type, setType] = useState('restaurants');
	const [isLoading, setIsLoading] = useState(false);
	// const [restaurants, setRestaurants] = useState();
	// const [hotels, setHotels] = useState();
	const [attractions, setAttractions] = useState();

	// Get Current User Location
	useEffect(() => {
		// Getting the current position corrdinates from browsers naviagtor sensor
		navigator.geolocation.getCurrentPosition(
			({ coords: { latitude, longitude } }) => {
				// setting coordinates latitude and longitude to the state
				setCoordinates({ lat: latitude, lng: longitude });
			}
		);
	}, []);

	// Get Places for Map View
	// useEffect(() => {
	// 	let source = axios.CancelToken.source();
	// 	// Setting loading state to true while data is being fetched
	// 	setIsLoading(true);

	// 	// If bounds state value of southwest - 'sw' and northeast 'ne' is available then the try-catch block is fired
	// 	if (bounds.sw && bounds.ne) {
	// 		try {
	// 			// Calling on the getPlacesByBounds endpoint passing in the type (hotels || attractions || restaurant), bounds and 'source' for error handling and effect cleanup
	// 			getPlacesByBounds(type, bounds.sw, bounds.ne, source).then((data) => {
	// 				// Response 'data' is ready and set to the places state
	// 				setPlaces(data?.filter((place) => place.name));

	// 				// Loading state set back to false - to stop loading, after data is fetched
	// 				setIsLoading(false);
	// 			});
	// 			console.log('All set! ', bounds.sw, bounds.ne);
	// 		} catch (error) {
	// 			console.error(error);
	// 		}
	// 	}

	// 	// Effect Cleanup
	// 	return () => {
	// 		source.cancel();
	// 	};
	// }, [type, bounds]);

	// Get Places for Homepage
	// useEffect(async () => {
	// 	let source = axios.CancelToken.source();
	// 	// Setting loading state to true while data is being fetched
	// 	setIsLoading(true);
		
	// 	// setAttractions(defaultAttractions.data);
	// 	await getAttractions(source)
	// 	.then(data => {
	// 		// Data is received and set to 'attractions' state list filtering out items with zero reviews, items with id '0' and items with no 'name' property
	// 		setAttractions(data.filter(item => item.locationId != 0 && item.name))

	// 		// Setting loading state back to false to stop loading
	// 		setIsLoading(false);
	// })

		// Effect Cleanup
	// 	return () => {
	// 		source.cancel();
	// 	};
	// }, [coordinates]);

	// Get Filtered Places by Rating
	useEffect(() => {
		// Places filter by rating for Map view
		// Set new filteredPlaces on change of 'rating' state
		// filter in only data with 'rating' proper greater than or equal to the selcted rating value
		setFilteredPlaces(places?.filter((place) => Number(place.rating) >= rating));
	}, [rating]);

	return (
		// Passing State value through main context to children for access
		<MainContext.Provider
			value={{
				places,
				setPlaces,
				coordinates,
				setCoordinates,
				bounds,
				setBounds,
				rating,
				setRating,
				type,
				setType,
				isLoading,
				setIsLoading,
				filteredPlaces,
				attractions,
				//restaurants,
				//hotels
			}}
		>
			{children}
		</MainContext.Provider>
	);
};
