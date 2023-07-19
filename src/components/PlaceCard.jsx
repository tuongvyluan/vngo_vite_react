import ReactStarsRating from 'react-awesome-stars-rating';
import { Link } from 'react-router-dom';

const PlaceCard = ({ place, type }) => {
	return (
		<>
			{/* Place card is rendered if place prop is received */}
			{place && (
				<div className="group cursor-pointer">
					{/* Place locationId is passed as parameter to place_type (hotels || restaurants || attractions) route for full place details */}
					<Link to={`${type}/${place?.locationId}`}>
						{/* Place Photo is render if found or a default image is renderedas fallback */}
						<img
							src={
								place?.photo
									? place?.photo?.images?.large?.url
									: 'https://media-cdn.tripadvisor.com/media/photo-s/22/d9/7b/42/this-image-has-been-removed.jpg'
							}
							alt={place?.name}
							className="w-full h-[250px] object-cover group-hover:brightness-125"
						/>
						{/* --- */}

						{/* Place name */}
						<h2 className="font-semibold text-lg group-hover:underline">
							{place?.name}
						</h2>
						{/* --- */}

						{/* Place Rating with place.rating value passed into component to render star rating */}
						
						<p className="flex items-center text-xs">
							{/* Attraction Rating with 'rating' property passed to generate a React Stars Rating element - displays only if found in result object  */}
							<span className="flex items-center mr-1">
								<ReactStarsRating
									value={Number(place?.rating)}
									size={20}
									className="flex mr-2"
									isEdit={false}
									primaryColor="#00afef"
									secondaryColor="#e5e7eb"
								/>
							</span>
							{/* --- */}
							{/* Attraction Revies Count */}
							{place?.num_reviews > 1
								? `${place?.num_reviews} Reviews`
								: `${place?.num_reviews} Review`}
							{/* --- */}
						</p>
						{/* --- */}
					</Link>
					{/* --- */}
				</div>
			)}
		</>
	);
};

export default PlaceCard;
