import axios from "axios";

let url = "https://covid19.mathdro.id/api";

export let fetchData = async (country) => {
  let changeableURL = url;
  if (country) {
    changeableURL = `${url}/countries/${country}`;
  }
  try {
    let {
      data: { confirmed, recovered, deaths, lastUpdate },
    } = await axios.get(changeableURL);

    return { confirmed, recovered, deaths, lastUpdate };
  } catch (error) {
    console.error(error);
  }
};

export let fetchDailyData = async () => {
  try {
    let { data } = await axios.get(`${url}/daily`);

    // console.log(data);
    let modifiedData = data.map((dailyData) => ({
      confirmed: dailyData.confirmed.total,
      deaths: dailyData.deaths.total,
      date: dailyData.reportDate,
    }));

    // console.log(modifiedData);
    // console.log(modifiedData.map((x) => x.date));

    return modifiedData;
  } catch (error) {
    console.error(error);
  }
};

export const fetchCountries = async () => {
  try {
    const response = await axios.get(`${url}/countries`);

    // console.log(response.data.countries.map((c) => c.name));

    return response.data.countries.map((c) => c.name);
  } catch (error) {
    console.error(error);
  }
};
