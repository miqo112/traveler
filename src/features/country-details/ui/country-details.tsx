import React, { useCallback, useEffect, useState } from 'react';
import debounce from "lodash/debounce";
import styles from './styles.module.sass'

import { CountryImage, Input } from '../../../components';
import { useAppDispatch, useAppSelector } from '../../../store';
import { fetchCountryDetails } from '../slice';

const CountryDetails = () => {
  const [countryName, setCountryName] = useState<string>('');

  const { data: countryDetails, error, loading } = useAppSelector(state => state.countryDetails);

  const dispatch = useAppDispatch();

  const debouncedSearchCallback = useCallback(
    debounce(async (name: string) => {
      dispatch(fetchCountryDetails(name))
    }, 500),
    []
  );

  useEffect(() => {
    if (countryName) {
      debouncedSearchCallback(countryName);
      return () => {
        debouncedSearchCallback.cancel()
      };
    }
  }, [countryName, debouncedSearchCallback]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCountryName(event.target.value.trim());
  };

  const { name, capital, population, region, pop_growth, pop_density,
    urban_population, urban_population_growth, gdp, gdp_per_capita, gdp_growth,
    unemployment, imports, exports, currency, iso2,
    internet_users, tourists, refugees } = countryDetails;

  return (
    <div className={styles.content}>
      <h1>Please write country name</h1>
      <Input className={styles.search_input} type="text" placeholder='Enter country name' value={countryName} onChange={handleInputChange} />
      {loading && <p>Loading...</p>}
      {error && !loading && <p className={styles.error}>{error}</p>}
      {!loading && !error && name && countryDetails && (

        <>
          <div>
            <h2>{name}</h2>
            <CountryImage countryCode={iso2} />
          </div>

          <div className={styles.sections}>
            <section className={styles.item}>
              <h3>Geography</h3>
              <p>Region: {region}</p>
              <p>Capital: {capital}</p>
              <p>Population: {population}</p>
              <p>Population Growth: {pop_growth}%</p>
              <p>Population Density: {pop_density} per sq km</p>
              <p>Urban Population: {urban_population}%</p>
              <p>Urban Population Growth: {urban_population_growth}%</p>
            </section>

            <section className={styles.item}>
              <h3>Economy</h3>
              <p>GDP: ${gdp} million</p>
              <p>GDP Per Capita: ${gdp_per_capita}</p>
              <p>GDP Growth Rate: {gdp_growth}%</p>
              <p>Unemployment Rate: {unemployment}%</p>
              <p>Imports: ${imports} million</p>
              <p>Exports: ${exports} million</p>
            </section>

            <section className={styles.item}>
              <h3>International Relations</h3>
              <p>Currency: {currency.name}</p>
              <p>ISO2 Code: {iso2}</p>
              <p>Internet Users: {internet_users}%</p>
              <p>Tourists: {tourists}</p>
              <p>Refugees: {refugees}</p>
            </section>
          </div>
        </>

      )}
    </div>
  )
}
export default CountryDetails;