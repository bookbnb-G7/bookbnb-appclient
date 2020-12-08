import React from "react";

/**Sin usar, no tiene sentido hacer un hook de una funcion helper */
function useAverageRating(props) {
  const url_ratings =
    "http://bookbnb-appserver.herokuapp.com/rooms/" +
    props.room.id +
    "/ratings";

  const status = {
    error: {},
    is_loaded: false,
    avg_rating: 0,
  };

  const [_ratings, setRatings] = useState({});

  useEffect(() => {
    fetch(url_ratings)
      .then((response) => response.json())
      .then(
        (response) => {
          setRatings(response);
          status.is_loaded = true;
        },
        (error) => {
          status.error = error;
          status.is_loaded = true;
        }
      );
  }, []);

  const getAverageRating = () => {
    let average_rating = 0;
    _ratings.ratings.forEach(function (item, index, array) {
      average_rating += item.rating;
    });
    average_rating = average_rating / _ratings.ratings.length;
    status.avg_rating = average_rating;
  };

  if (status.is_loaded && !status.error) {
    getAverageRating;
  }

  return status;
}

export default useAverageRating;
