import { useState } from 'react';
import { WhereTo, Footer, ToVisit } from '../components';
import { ToastContainer } from 'react-toastify';
import Header from '../components/Header';

const Home = () => {
	// Home Page Trending in Travel toggle state
	const [toggle, setToggle] = useState({
		toGo: true, // Place to Go state, active by defaul
		toDo: false, //Things to Do state
		toStay: false //Places to staty
	});

	return (
		<>
			{/* Navbar with Sticky poperty */}
			{/* <Navbar sticky /> */}
			{/* --- */}
			<Header/>
			{/* Search Form - Where to */}
			<WhereTo />
			{/* --- */}

			{/* Places to Visit Carousel */}
			<ToVisit />
			{/* --- */}

			{/* Places to Eat Carousel */}
			{/* <ToEat /> */}
			{/* --- */}

			{/* Places to Stay Carousel */}
			{/* <ToStay /> */}
			{/* --- */}

			

			{/* Footer */}
			<Footer />
			{/* --- */}
			<ToastContainer/>
		</>
	);
};

export default Home;
