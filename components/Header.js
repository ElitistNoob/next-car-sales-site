// Hooks
import React from "react";
import Image from "next/image";
// styles
import styles from "../styles/Header.module.scss";

function Header({
  cars,
  onChange,
  inputData,
  isModalOpen,
  onClick,
  eventType,
}) {
  function searchResultText() {
    if (cars.length < 1) {
      return "No cars found";
    }
    if (cars.length === 1) {
      return `Found 1 car based on your ${eventType}`;
    }
    if (cars.length > 1) {
      return `Found ${cars.length} cars based on your criteria`;
    }
  }

  return (
    <header className={styles.header}>
      <div className={styles.titleContainer}>
        <h1>Available Cars</h1>
        <p>{searchResultText()}</p>
      </div>
      <form className={styles.form}>
        <input
          className={styles.searchInput}
          style={{
            backgroundBlendMode: isModalOpen ? "lighten" : "unset",
          }}
          onChange={onChange}
          value={inputData.search}
          id="search"
          name="search"
          type="text"
          disabled={isModalOpen}
        />
        <Image className="optionBtn" onClick={onClick} alt=""></Image>
      </form>
      {isModalOpen && (
        <div className={styles.optionsMenu}>
          <div>
            <input
              type="checkbox"
              id="isUsed"
              name="isUsed"
              value={inputData.isUsed}
              onChange={onChange}
            ></input>
            <label htmlFor="isUsed">Used Cars</label>
          </div>

          <div>
            <input
              type="checkbox"
              id="isNew"
              name="isNew"
              value={inputData.isNew}
              onChange={onChange}
            ></input>
            <label htmlFor="isNew">New Cars</label>
          </div>

          <div>
            <input
              type="checkbox"
              id="isFavorite"
              name="isFavorite"
              value={inputData.isFavorite}
              onChange={onChange}
            ></input>
            <label htmlFor="isFavorite">Favorite</label>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
