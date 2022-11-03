// Hooks
import React, { useState } from "react";
import Image from "next/image";
// Assets
import menuIcon from "../assets/menu.svg";
// styles
import styles from "../styles/Header.module.scss";

function Header({ onChange, inputSearch, isModalOpen, setIsModalOpen }) {
  function clickHandler() {
    setIsModalOpen(prevData => !prevData);
  }

  return (
    <header className={styles.header}>
      <div className={styles.titleContainer}>
        <h1>Available Cars</h1>
        <p>There are 15 cars that match your criteria</p>
      </div>
      <form className={styles.form}>
        <input
          className={styles.searchInput}
          onChange={onChange}
          value={inputSearch.search}
          id="search"
          name="search"
          type="text"
        />
        <Image
          className="optionBtn"
          onClick={clickHandler}
          src={menuIcon}
          alt=""
        ></Image>
      </form>
      {isModalOpen && (
        <div className={styles.optionsMenu}>
          <div>
            <input
              type="checkbox"
              id="isUsed"
              name="isUsed"
              value={inputSearch.isUsed}
              onChange={onChange}
            ></input>
            <label htmlFor="isUsed">Used Cars</label>
          </div>

          <div>
            <input
              type="checkbox"
              id="isNew"
              name="isNew"
              value={inputSearch.isNew}
              onChange={onChange}
            ></input>
            <label htmlFor="isNew">New Cars</label>
          </div>

          <div>
            <input
              type="checkbox"
              id="isFavorite"
              name="isFavorite"
              value={inputSearch.isFavorite}
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
