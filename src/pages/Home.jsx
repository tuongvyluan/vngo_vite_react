import { useState } from 'react';
import { Navbar, WhereTo, Footer, ToVisit } from '../components';
import travelerChoiceBg from '../img/coverfb.png';
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

			{/* Traveler Choice Section */}
			<div className='bg-[#DBAD86] mt-10'>
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

			{/* Trending in Travel Section */}
			<div className="container mx-auto px-4 py-10">
				<h2 className="font-bold text-lg md:text-2xl my-5">Trending in Travel</h2>
				<div>
					{/* Trending in Travel Toggles */}
					<div className="flex text-sm md:text-base space-x-4 md:space-x-8 whitespace-nowrap overflow-x-auto travel_toggle">
						{/* Places to go toggle */}
						<h3
							className={`${
								toggle.toGo ? 'border-black' : 'border-transparent'
							} font-medium mb-3 border-b-2 pb-1 hover:border-black w-fit cursor-pointer`}
							// onClick toggle, all items in the 'toggle' state object is set to false while 'toGo' is true
							onClick={() => setToggle({ toGo: true, toDo: false, toStay: false })}
						>
							Places to Go
						</h3>
						{/* --- */}

						{/* Things to Do toggle */}
						<h3
							className={`${
								toggle.toDo ? 'border-black' : 'border-transparent'
							} font-medium mb-3 border-b-2 pb-1 hover:border-black w-fit cursor-pointer`}
							// onClick toggle, all items in the 'toggle' state object is set to false while 'toDo' is true
							onClick={() => setToggle({ toGo: false, toDo: true, toStay: false })}
						>
							Things to Do
						</h3>
						{/* --- */}

						{/* Places to Stay toggle */}
						{/* <h3
							className={`${
								toggle.toStay ? 'border-black' : 'border-transparent'
							} font-medium mb-3 border-b-2 pb-1 hover:border-black w-fit cursor-pointer`}
							// onClick toggle, all items in the 'toggle' state object is set to false while 'toStay' is true
							onClick={() => setToggle({ toGo: false, toDo: false, toStay: true })}
						>
							Places to Stay
						</h3> */}
						{/* --- */}
					</div>
					{/* --- */}
					<div>
						{/* List of Places to Go - Display only if 'toGo'is true */}
						{toggle.toGo && (
							<div className="grid grid-cols-12">
								{/* Mapping throughlist of items to render */}
								{[
									'Vinh Trang Pagoda',
									'Cu Chi Tunnels',
									'Mekong Delta',
									'Around city',
									'Notre Dame Cathedral of Saigon',
									'Ho Chi Minh Post office',
									'Book street',
									'Ben Thanh Martket',
									'Land Mark 81',
									'Water bus',
									'Walking street',
									'Ho Chi Minh Museum'
								].map((item, i) => (
									<a
										key={i}
										className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 text-xs md:text-sm font-medium cursor-pointer hover:underline mb-1"
										href="#"
									>
										{item}
									</a>
								))}
								{/* --- */}
							</div>
						)}
						{/* --- */}

						{/* List of Things to Do - Displays only if 'toDo' is true */}
						{toggle.toDo && (
							<div className="grid grid-cols-12">
								{/* Mapping through List of Items to render */}
								{[
									'Bus tour in saigon',
									'Explore history',
									'Street food at night',
									'Street food breakfast',
									'Ride bike around city',
									'Cooking local food',
									'Watch drama',
									'Eat banh mi',
									'Watch water pupept',
									'Listen to Dan ca tai tu',
									'Try Ao dai',
									'Rowing sup in Saigon river'
								].map((item, i) => (
									<a
										key={i}
										className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 text-xs md:text-sm font-medium cursor-pointer hover:underline mb-1"
										href="#"
									>
										{item}
									</a>
								))}
								{/* --- */}
							</div>
						)}
						{/* --- */}

						{/* List of Places to Stay - Displays only if 'toStay' is true */}
						{toggle.toStay && (
							<div className="grid grid-cols-12">
								{/* Mapping through list of Items to render */}
								{[
									'Beaches Turks & Caicos',
									'Moon Palace Cancun',
									'Majestic Elegance Costa Mujeres',
									'Hyatt Ziva Cancun',
									'Moon Palace Jamaica',
									'Dreams Punta Cana Resort & Spa',
									"Disney's Grand Floridian Resort & Spa",
									'Majestic Mirage Punta Cana',
									'Planet Hollywood Cancun',
									'Barcelo Aruba',
									'Sheraton Waikiki',
									'Finest Playa Mujeres',
									'Hyatt Ziva Cap Cana',
									'JW Marriott Marco Island Beach Resort',
									'Wyndham Alltra Cancun',
									'Atelier Playa Mujeres',
									'Hotel Riu Palace Cabo San Lucas',
									'Grand Hyatt Baha Mar',
									'The Venetian Resort',
									'Hyatt Ziva Puerto Vallarta',
									'Barcelo Maya Riviera',
									'Grand Velas Riviera Maya',
									'Hard Rock Hotel Cancun',
									'The Ritz-Carlton Orlando, Grande Lakes',
									'Sandos Caracol Eco Resort',
									'Hyatt Ziva Los Cabos',
									'Grand Fiesta Americana Coral Beach',
									'Hard Rock Hotel Riviera Maya',
									'Andaz Maui At Wailea Resort',
									'Caribe Hilton',
									'Live Aqua Beach Resort Cancun',
									'Iberostar Selection Cancun',
									'Hyatt Zilara Cancun',
									'Hilton Playa del Carmen',
									"Ka'anapali Beach Hotel",
									'Paris Las Vegas',
									'Planet Hollywood Resort & Casino',
									'Club Med Sandpiper Bay',
									'Hyatt Zilara Cap Cana',
									'Beloved Playa Mujeres',
									'Hilton Hawaiian Village Waikiki Beach Resort'
								].map((item, i) => (
									<a
										key={i}
										className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 text-xs md:text-sm font-medium cursor-pointer hover:underline mb-1"
										href="#"
									>
										{item}
									</a>
								))}
								{/* --- */}
							</div>
						)}
						{/* --- */}
					</div>
				</div>
			</div>
			{/* --- */}

			{/* Footer */}
			<Footer />
			{/* --- */}
			<ToastContainer/>
		</>
	);
};

export default Home;
