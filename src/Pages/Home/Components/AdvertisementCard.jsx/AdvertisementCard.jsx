import { Link } from "react-router";

const AdvertisementCard = ({ property }) => {
  const { _id, title, image, location, priceRange, isVerified } = property;

  return (
    <div className="card bg-base-100 shadow-xl">
      <figure>
        <img src={image} alt="Property" className="h-48 w-full object-cover" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p className="text-sm">Price: {priceRange}</p>
        <p className="text-sm">Location: {location}</p>
        <p
          className={`text-sm font-medium ${
            isVerified ? "text-green-500" : "text-red-500"
          }`}
        >
          {isVerified ? "Verified" : "Not verified"}
        </p>
        <div className="card-actions justify-end">
          <Link to={`/property/${_id}`} className="btn btn-sm btn-primary">
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdvertisementCard;
