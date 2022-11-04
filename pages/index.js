// hooks
import { useState, useEffect, use } from "react";
// react components
import Head from "next/head";
import Header from "../components/Header";
// components
import Listing from "../components/Listing";
// Data
import { carsList } from "../data/carsData.js";

export default function Home() {
  // States
  const [cars, setCars] = useState(carsList);
  const [inputData, setInputData] = useState({
    search: "",
    isNew: false,
    isUsed: false,
    isFavorite: false,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [eventType, setEventType] = useState("");
  // use State to get favorites to endure even after search
  const [isFavorite, setIsFavorite] = useState([]);

  // To delete - Used to text
  useEffect(() => {
    console.log(isFavorite);
  }, [isFavorite]);

  function changeHandler(event) {
    const { value, name, type, checked } = event.target;
    const eventValue = type === "checkbox" ? checked : value;

    setInputData(prevData => ({ ...prevData, [name]: eventValue }));

    const syncFavorites = arr =>
      arr.map(car => {
        if (isFavorite.find(favorite => favorite.id === car.id)) {
          return {
            ...car,
            liked: true,
          };
        }
        return car;
      });

    const resultsArray = cars.filter(car =>
      type === "checkbox" && checked
        ? name === car.condition || car.liked
        : car.title.toLowerCase().includes(inputData.search.toLowerCase())
    );

    type === "checkbox" ? setEventType("criteria") : setEventType("search");

    (isModalOpen && !checked) || (!isModalOpen && !value)
      ? setCars(() => syncFavorites(carsList))
      : setCars(() => syncFavorites(resultsArray));
  }

  // onMouseUp eventListener body
  useEffect(() => {
    function mouseUpHandler(event) {
      const { className, tagName } = event.target;
      if (
        isModalOpen &&
        className !== "Header_optionsMenu__b3AaW" &&
        className !== "optionBtn" &&
        tagName !== "LABEL" &&
        tagName !== "INPUT"
      )
        setIsModalOpen(false);
    }
    document.body.addEventListener("mouseup", mouseUpHandler);
    return () => document.body.removeEventListener("mouseup", mouseUpHandler);
  }, [isModalOpen]);

  // onClick eventListener for dot menu
  function clickHandler() {
    setIsModalOpen(prevData => !prevData);
  }

  return (
    <>
      <Head>
        <title>#1 used cars site</title>
      </Head>
      <main>
        <Header
          isModalOpen={isModalOpen}
          onClick={clickHandler}
          inputData={inputData}
          onChange={changeHandler}
          cars={cars}
          eventType={eventType}
        />
        <Listing cars={cars} setCars={setCars} setIsFavorite={setIsFavorite} />
      </main>
    </>
  );
}
