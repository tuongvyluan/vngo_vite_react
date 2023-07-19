import { defaultAttractions } from '../public/defaultData';
import axios from 'axios';
const apiBase = 'https://vietnamgo.azurewebsites.net'
const deployApiBase = ''

// Check login
export const login = async (email, password) => {
	const data = await axios.post(apiBase + '/api/Login', {
		email: email,
		password: password
	});
	return data;
};

// Register
export const register = async (email, password, firstName, middleName, lastName) => {
	const data = await axios.post(apiBase + '/api/Register', {
		email: email,
		password: password,
		firstName: firstName,
		middleName: middleName,
		lastName: lastName
	});
	return data;
};

// Post booking
export const createBooking = async (customerId, touristNum, tourId) => {
	try {
		const data = await axios.post(
			`${apiBase}/api/Booking?customerId=${customerId}&touristNum=${touristNum}&tourId=${tourId}`
		);
		return data;
	} catch (error) {
		console.log(error);
	}
};

// Post booking
export const createReview = async (review) => {
	try {
		const data = await axios.post(
			`${apiBase}/api/Review`, review
		);
		return data;
	} catch (error) {
		console.log(error);
	}
};
// Get bookings by customer
export const getBookings = async (customerId) => {
	try {
		const data = await axios.get(`${apiBase}/api/Booking/${customerId}`);
		return data;
	} catch (error) {
		console.log(error);
	}
};

// Get booking details
export const getBooking = async (bookingId) => {
	try {
		const data = await axios.get(`${apiBase}/api/Booking?bookingId=${bookingId}`);
		return data;
	} catch (error) {
		console.log(error);
	}
};

// Get Places by Latitude and longitude, receives 'type', 'lat', 'lng', some 'params' and source for effect cleanup and error handling as parameter to endpoint call
export const getAttractions = async (source) => {
	try {
		const {
			data: { data }
		} = await axios.get(`${apiBase}/api/Attraction`);
		return data;
	} catch (error) {
		console.log(error);
		throw error;
		// return defaultAttractions.data
	}
};

// Get Place details RTCRtpReceiver, 'type', 'locationId' and 'source' as paramter to endpoint call
export const getPlaceDetails = async (locationId) => {
	const data = await axios.get(
		`${apiBase}/api/Attraction/${locationId}`
	);
	return data;
};

// Get Place Review received the 'locationId' and 'source' as paramters for endpoint call
export const getPlaceReviews = async (locationId, source) => {
	try {
		const {
			data: { data }
		} = await axios.get(
			`https://travel-advisor.p.rapidapi.com/reviews/list`,
			{
				params: {
					locationId: locationId,
					limit: 20
				},
				headers: {
					'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com',
					'X-RapidAPI-Key': '7113f37e8bmshbf0e592cb9617c8p1524dejsn3dae556f1d78'
				}
			},
			{ cancelToken: source.token }
		);

		// Data is returned once resolved
		return data;
	} catch (error) {
		if (axios.isCancel(error)) {
			console.log('axios Call Cancelled');
		} else {
			throw error;
		}
	}
};

// Search Place recieves 'location', some 'params' and 'source' as a parameters for endpoint call
export const searchPlaces = async (location, params, source) => {
	try {
		const {
			data: { data }
		} = await axios.get(
			'https://travel-advisor.p.rapidapi.com/locations/search',
			{
				params: {
					query: location,
					...params
				},
				headers: {
					'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com',
					'X-RapidAPI-Key': '7113f37e8bmshbf0e592cb9617c8p1524dejsn3dae556f1d78'
				}
			},
			{ cancelToken: source.token }
		);

		// Data is returned once resolved
		return data;
	} catch (error) {
		if (axios.isCancel(error)) {
			console.log('axios Call Cancelled');
		} else {
			throw error;
		}
	}
};
