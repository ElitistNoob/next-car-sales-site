// Hooks
import useWindowwidth from "../hooks/useWindowWidth";
// Styles
import styles from "../styles/Listing.module.scss";
// Assets
import Car from "./Car";

function Listing({ cars, setCars, searchResults }) {

  function updateLikeStatus(id) {
    const updateLike = cars.map(car => {
      if (id === car.id) {
        return { ...car, liked: !car.liked };
      }
      return car;
    });
    setCars(updateLike);
  }

  const ternary = searchResults.length === 0 ? cars : searchResults;

  const carPost = ternary.map(car => (
    <Car key={car.id} car={car} updateLikes={updateLikeStatus} />
  ));

  return (
    <div className={styles.container}>
      <ul className={styles.labels}>
        <li>Car details</li>
        <li>Location</li>
        <li>Price</li>
        <li>Action</li>
      </ul>

      {carPost}
    </div>
  );
}

export default Listing;