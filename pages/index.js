// hooks
import { useState, useEffect } from "react";
// react components
import Head from "next/head";
import Header from "../components/Header";
// components
import Listing from "../components/Listing";
// Data
import { carsList } from "../data/carsData.js";

export default function Home() {
  const [cars, setCars] = useState(carsList);
  const [inputData, setInputData] = useState({
    search: "",
    isNew: false,
    isUsed: false,
    isFavorite: false,
  });
  const [searchResults, setSearchResults] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  function changeHandler(event) {
    event.preventDefault();
    const { value, name, type, checked } = event.target;
    const checkType = type === "checkbox" ? checked : value;
    setInputData(prevData => ({ ...prevData, [name]: checkType }));

    const resultsArray = cars.filter(car =>
      type !== "checkbox"
        ? car.title.toLowerCase().includes(inputData.search.toLowerCase())
        : (checked && name === car.condition) || (checked && car.liked)
    );
    setSearchResults(resultsArray);
  }

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

  return (
    <>
      <Head>
        <title>#1 used cars site</title>
      </Head>
      <main>
        <Header
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          inputData={inputData}
          onChange={changeHandler}
          cars={cars}
          searchResults={searchResults}
        />
        <Listing cars={cars} setCars={setCars} searchResults={searchResults} />
      </main>
    </>
  );
}
