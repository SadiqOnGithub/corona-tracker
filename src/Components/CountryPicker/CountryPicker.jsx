import React, { useState, useEffect } from "react";
import { NativeSelect, FormControl } from "@material-ui/core";
import styles from './CountryPicker.module.css';
import { fetchCountries } from '../../api';

let CountryPicker = ({ handleCountryChange }) => {
  let [fetchedCountries, setFetchedCountries] = useState([]);

  useEffect(() => {
    let fetchAPI = async () => {
      setFetchedCountries(await fetchCountries());
      // console.log(setFetchedCountries)
    }
    fetchAPI();
  }, [])

  console.log(fetchedCountries.map((c, i, a) => c));

  return (
    <FormControl className={styles.formControl}>
      <NativeSelect onChange={(e) => (handleCountryChange(e.target.value))}>
        <option value=''>Global</option>
        {fetchedCountries.map((c, i) => <option key={i} value={c}>{c}</option>)}
      </NativeSelect>
    </FormControl>
  );
};

export default CountryPicker;
