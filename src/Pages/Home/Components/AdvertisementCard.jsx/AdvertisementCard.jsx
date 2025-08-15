import { Link } from "react-router";
import { ImAttachment } from "react-icons/im";
const AdvertisementCard = ({ property }) => {
  const {
    _id,
    title,
    image,
    location,
    agent_name,
    userImage,
    status,
    minPrice,
    maxPrice,
    created_at,
  } = property;
  // console.log(property);
  const createdAt = new Date(created_at);
  const currentTime = new Date();

  // Get time difference in milliseconds
  const timeDifference = currentTime - createdAt;

  // Convert to total days
  const totalDays = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  // Calculate months, weeks, and days
  const monthsAgo = Math.floor(totalDays / 30);
  const weeksAgo = Math.floor((totalDays % 30) / 7);
  const daysAgo = totalDays % 7;

  // Build readable string
  let timeAgo = "";
  if (monthsAgo > 0)
    timeAgo += `${monthsAgo} month${monthsAgo > 1 ? "s" : ""} `;
  if (weeksAgo > 0) timeAgo += `${weeksAgo} week${weeksAgo > 1 ? "s" : ""} `;
  if (daysAgo > 0 || (!monthsAgo && !weeksAgo))
    timeAgo += `${daysAgo} day${daysAgo > 1 ? "s" : ""} `;

  // console.log(timeAgo.trim() + " ago");

  if (status === "verified") {
    return (
      <div className="card bg-base-100 dark:bg-base-300 shadow-xl">
        <figure>
          <img
            src={image}
            alt="Property"
            className="h-48 w-full object-cover relative"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{title}</h2>
          <p className="text-sm">
            <strong>Location:</strong> {location}
          </p>
          <p className="text-sm">
            <strong>Price:</strong> ${minPrice} - ${maxPrice}
          </p>

          <p
            className={`badge absolute -mt-52 -ml-4 text-sm font-medium badge-outline ${
              status ? "text-green-500 bg-gray-100/80" : "text-red-500"
            }`}
          >
            {status ? "Verified" : "Not verified"}
          </p>
          <div className="card-actions justify-end">
            <Link
              to={`/property-details/${_id}`}
              className="btn btn-sm btn-primary"
            >
              Details
            </Link>
          </div>
          <div className="divider"></div>
          <div className="flex flex-col gap-3 md:flex-col xl:flex-row xl:items-center justify-between">
            {/* Agent Info */}
            <div className="flex items-center flex-wrap gap-3">
              <p className="capitalize">
                <strong>Agent:</strong> {agent_name}
              </p>

              <img
                src={userImage}
                className="w-10 h-10 object-cover rounded-full shrink-0"
                alt={agent_name}
              />
            </div>

            {/* Time Info */}
            <div>
              <p className="text-sm text-gray-600 flex items-center gap-1">
                <ImAttachment className="text-base" />
                {timeAgo.trim() + " ago"}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return;
  }
};

export default AdvertisementCard;
