import React, { useEffect, useRef, useState } from "react";
const serviceUrl = "https://coffee-varieties.vercel.app/api";

const CoffeeOverview = (props) => {
  const [coffeeProperties, setCoffeeProperties] = useState({});
  const coffeeName = useRef(props.match.params.name).current;
  console.log(coffeeName);

  useEffect(() => {
    GetAllVarieties(coffeeName);
  }, [coffeeName]);

  async function GetAllVarieties(name) {
    return await fetch(serviceUrl)
      .then((response) => response.json())
      .then((results) => {
        let coffeeItems;
        if (results) {
          coffeeItems = results.find((c) => c.name === name);
        }

        setCoffeeProperties(coffeeItems);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div class="container-sm">
      <h4 className="bat">{coffeeProperties?.name}</h4>
      <p>{coffeeProperties?.description}</p>
      <h4>Properties</h4>

      <div className="row">
        <div className="col-sm-4">
          <div className="card">
            <div className="card-body">
              <h6 className="card-title">BEAN SIZE</h6>
              <p className="card-text pSize">{coffeeProperties.bean_size}</p>
              <i className="bi-alarm icon"></i>
            </div>
          </div>
        </div>
        <div className="col-sm-4">
          <div className="card">
            <div className="card-body">
              <h6 className="card-title">QUALITY POTENTIAL</h6>
              <p className="card-text pSize">
                {coffeeProperties.quality_potential}
              </p>
              <i className="bi-cup-fill icon"></i>
            </div>
          </div>
        </div>
        <div className="col-sm-4">
          <div className="card">
            <div className="card-body">
              <h6 className="card-title">YEILD POTENTIAL</h6>
              <p className="card-text pSize">{coffeeProperties.yield}</p>
              <i className="bi-handbag-fill icon"></i>
            </div>
          </div>
        </div>
      </div>

      <h4>Disease Resistance</h4>
      <div class="row">
        {coffeeProperties.disease_resistance !== undefined
          ? coffeeProperties.disease_resistance.map((resistance, index) => (
              <div className="col-sm-4" key={index}>
                <div className="card">
                  <div className="card-body">
                    <h6 className="card-title">
                      {Object.keys(resistance)[0]
                        .replace(/^"(.*)"$/, "$1")
                        .toUpperCase()}
                    </h6>
                    <p className="card-text pSize">
                      {Object.values(resistance)[0].replace(/^"(.*)"$/, "$1")}
                    </p>
                  </div>
                </div>
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default CoffeeOverview;
