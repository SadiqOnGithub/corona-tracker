import React from "react";
import Cards from "./Components/Cards/Cards";
import { Charts } from "./Components/Charts/Charts";
import CountryPicker from "./Components/CountryPicker/CountryPicker";
import styles from "./App.module.css";
import { fetchData, fetchDailyData, fetchCountries } from "./api";
import coronaVirus from "./Images/image.png";

class App extends React.Component {
  state = {
    data: {},
    country: "",
  };

  async componentDidMount() {
    let fetchedData = await fetchData();
    this.setState({ data: fetchedData });
    // fetchDailyData();
    // fetchCountries();
  }

  handleCountryChange = async (country) => {
    let fetchedData = await fetchData(country);
    this.setState({ data: fetchedData, country: country });

    console.log(fetchedData);
    console.log(country);
  };

  render() {
    let { data, country } = this.state;
    return (
      <div className={styles.container}>
        <img className={styles.images} src={coronaVirus} alt="covid-19" />
        <Cards data={data} />
        <CountryPicker handleCountryChange={this.handleCountryChange} />
        <Charts data={data} country={country} />
      </div>
    );
  }
}

export default App;
