// hooks
import { useState, useEffect } from "react";
// react components
import Head from "next/head";
import Header from "../components/Header";
// components
import Listing from "../components/Listing";

export default function Home() {
  const [cars, setCars] = useState([]);
  const [inputSearch, setinputSearch] = useState({
    search: "",
    isNew: false,
    isUsed: false,
    isFavorite: false,
  });
  const [searchResults, setSearchResults] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    try {
      const fetchCars = async () => {
        const res = await fetch("/api");
        const data = await res.json();
        setCars(data);
      };
      return fetchCars;
    } catch (err) {
      console.log(err);
    }
  }, []);

  function changeHandler(event) {
    const { value, name, type, checked } = event.target;
    const checkType = type === "checkbox" ? checked : value;
    setinputSearch(prevData => ({ ...prevData, [name]: checkType }));

    const resultsArray = cars.filter(car =>
      type !== "checkbox"
        ? car.title.toLowerCase().includes(inputSearch.search.toLowerCase())
        : (checked && name === car.condition) || (checked && car.liked)
    );
    setSearchResults(resultsArray);
  }

  function mouseUpHandler(event) {
    const { className } = event.target;
    if (
      isModalOpen &&
      className !== "Header_optionsMenu__b3AaW" &&
      className !== "optionBtn"
    )
      setIsModalOpen(false);
  }

  return (
    <>
      <Head>
        <title>#1 used cars site</title>
      </Head>
      <main onMouseUp={mouseUpHandler}>
        <Header
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          inputSearch={inputSearch}
          onChange={changeHandler}
        />
        <Listing
          cars={cars}
          setCars={setCars}
          inputSearch={inputSearch}
          searchResults={searchResults}
        />
      </main>
    </>
  );
}
