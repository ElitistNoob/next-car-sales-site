import Image from "next/image";
// assets
import heartEmpty from "../assets/save.svg";
import heartFilled from "../assets/save-filled.svg";
// styles
import styles from "../styles/Listing.module.scss";

function Car({ car, updateLikes }) {
  return (
    <div className={styles.carList}>
      <h3 className={styles.title}>{car.title}</h3>
      <p className={styles.location}>
        {car.address.street}
        <br />
        {car.address.city}
      </p>
      <p className={styles.price}>${car.price}</p>
      <Image
        onClick={() => updateLikes(car.id)}
        className={styles.like}
        src={car.liked ? heartFilled : heartEmpty}
        alt=""
      />
    </div>
  );
}

export default Car;
