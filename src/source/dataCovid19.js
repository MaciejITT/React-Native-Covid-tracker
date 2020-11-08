import {useState} from 'react';
import axios from 'axios';

const url_countries = "https://disease.sh/v3/covid-19/countries";

export const getCountriesData = async () => {
   try {
     const {data} = await axios.get(url_countries);

     const modifiedData = {
       label: data.country,
       value: data.countryInfo.iso2,
     }
     return modifiedData;
   } catch (error) {
     
   }
}

/* await fetch(url_countries)
  .then((response) => response.json())
    .then((data) => {
      const countries_data = data.map((country) => (
        {
          label: country.country,
          value: country.countryInfo.iso2
        }));
        const sortedData = sortData(data)
    });
    return countries_data; */

    /* const countries = [];
  await fetch(url_countries)
  .then((response) => response.json())
    .then((data) => {
        const countries_data = data.map((country) => (
        {
          label: country.country,
          value: country.countryInfo.iso2
        }));
      }).catch((error) => {
        console.error(error);
      });
    
    countries = countries_data;
    return countries; */