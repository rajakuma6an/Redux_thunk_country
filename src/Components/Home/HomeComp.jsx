import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../Navbar/Navbar";
import "../style.css";
import SearchBar from "../SearchBar/SearchBar";
import DropDown from "../DropDown/DropDown";
import { getCountries } from "../../Redux/Action";
const HomeComp = () => {
  const [selectedRegion, setSelectedRegion] = useState("");
  const [query, setQuery] = useState("");
  // const [isDarkMode, setIsDarkMode] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("#202c38");

  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countries);

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  useEffect(() => {
    const interval = setInterval(() => {
      setBackgroundColor((prevColor) =>
        prevColor === "#202c38" ? "black" : "#202c38"
      );
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div>
      <Navbar />
      <div className="Home_Page container" style={{ backgroundColor: backgroundColor }}>
        <div className="row align-items-center justify-content-between py-3">
          <div className={window.innerWidth > 600 ? "col-4" : "col-6"}>
            <SearchBar query={query} setQuery={setQuery} />
          </div>
          <div className={window.innerWidth > 600 ? "col-3" : "col-6"}>
            {" "}
            <DropDown
              selectedRegion={selectedRegion}
              setSelectedRegion={setSelectedRegion}
            />
          </div>
        </div>
        <div className="">
          <div className="row">
            {countries
              .filter(
                (country) =>
                  selectedRegion === "" || country.region === selectedRegion
              )
              .filter((country) =>
                country.name.common.toLowerCase().includes(query.toLowerCase())
              )
              ?.map((country, i) => (
                <div key={i} className="col-12 col-lg-3 col-md-12 py-3">
                  <div className="Card_Country">
                    <img className="card_image" src={country?.flags?.png} />
                    <div className="card_body">
                      <p>{country?.name?.common}</p>
                      <span>Population : {country?.population}</span>
                      <br />
                      <span>Region : {country?.region}</span>
                      <br />
                      <span>Capital : {country?.capital}</span>
                      <br />
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    // </div>
  );
};

export default HomeComp;
