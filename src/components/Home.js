import { useEffect, useState } from "react";
import { qualityPotential } from "../Api/data";
const serviceUrl = "https://coffee-varieties.vercel.app/api";

export default function Home(prop) {
  const [countries, setCountries] = useState([]);
  const [varieties, setVarieties] = useState([]);
  const [quality, setQuality] = useState([]);
  const [resistances, setResistances] = useState([]);
  const [varietyList, setVarietyList] = useState([]);

  async function GetAllVarieties() {
    return await fetch(serviceUrl)
      .then((response) => response.json())
      .then((results) => {
        setVarieties(results);
        setVarietyList(results);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const LoadQuality = async () => {
    setQuality(qualityPotential);
  };

  const LoadCountries = (value) => {
    const producingCountries = varieties.filter(
      (q) => q.quality_potential === value
    );
    let pCountries = producingCountries.map((res) => res.producing_countries);
    if (pCountries) {
      let countryArray = [].concat(pCountries).flat();
      let distinctArray = [...new Set(countryArray)];

      setCountries(distinctArray);
    }
  };

  const LoadResistance = (key) => {
    const filteredValues = varieties.filter((r) => r.quality_potential === key);
    let diseaseResistance = filteredValues.map(
      (resist) => resist.disease_resistance
    );
    if (diseaseResistance) {
      let resistanceArray = [].concat(diseaseResistance).flat();
      let normalizedArray = resistanceArray
        .map((res) => res.leaf_rust)
        .filter((s) => s !== undefined);
      setResistances(normalizedArray);
    }
  };

  const LoadVarietyList = (keyValue) => {
    const varietyNames = varieties.filter(
      (v) => v.quality_potential === keyValue
    );

    if (varietyNames) {
      setVarietyList(varietyNames);
    }
  };

  useEffect(() => {
    GetAllVarieties();
    LoadQuality();
  }, []);

  return (
    <div className="container">
      <h2>List of Coffee Varieties</h2>
      <form className="row g-3" style={{ width: "70%" }}>
        <div className="col-md-4">
          <label for="inputState" className="form-label">
            Quality Potential
          </label>
          <select
            id="inputState"
            className="form-select"
            onChange={(e) => {
              LoadCountries(e.target.value);
              LoadResistance(e.target.value);
              LoadVarietyList(e.target.value);
            }}
          >
            <option disabled selected>
              Choose...
            </option>
            {quality.map((q, index) => (
              <option key={index} value={q.value}>
                {q.quality}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-4">
          <label for="inputState" className="form-label">
            Country
          </label>

          <select
            id="inputState"
            name="country"
            className="form-select"
            onChange={(e) => e.target.value}
          >
            <option disabled selected>
              Choose...
            </option>
            {countries.map((country, index) => (
              <option value={country} key={index}>
                {country}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-4">
          <label for="inputState" className="form-label">
            Leaf Rut Resistance
          </label>
          <select
            id="inputState"
            className="form-select"
            onChange={(e) => e.target.value}
          >
            <option disabled selected>
              Choose...
            </option>
            {resistances.map((rust, index) => (
              <option key={index}>{rust}</option>
            ))}
          </select>
        </div>
      </form>

      <div className="coffee-varieties">
        <h5>Coffee Varieties</h5>
        <ul className="list-group list-group-flush">
          {varietyList.map((vr, index) => (
            <li
              key={index}
              className="list-group-item"
              onClick={() => {
                prop.history.push(`/coffee/${vr.name}`);
              }}
            >
              {vr.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
