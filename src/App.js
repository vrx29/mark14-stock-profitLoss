import "./styles.css";
import "remixicon/fonts/remixicon.css";
import Banner from "./components/Banner";
import { stocks } from "./data/stocks";
import { useEffect, useState } from "react";
import sad from "./img/sad.svg";
import happy from "./img/happy.svg";
import market from "./img/market.svg";

function App() {
  const [data, setData] = useState(stocks);
  const [index, setIndex] = useState(0);
  const [purchasePrice, setPurchasePrice] = useState("");
  const [stockQuantity, setStockQuantity] = useState("");
  const [currentPrice, setCurrentPrice] = useState("");
  const [pic, setPic] = useState(market);
  const [output, setOutput] = useState({ flag: false, msg: "" });

  useEffect(() => {
    let slider = setInterval(() => {
      if (index === data.length - 1) {
        setIndex(0);
      } else {
        setIndex(index + 1);
      }
    }, 1000);
    return () => {
      clearInterval(slider);
    };
  }, [index]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!purchasePrice || !stockQuantity || !currentPrice) {
      setOutput({ flag: true, msg: "Please enter proper data.." });
      return;
    }
    let buyPrice = purchasePrice * stockQuantity;
    let currPrice = currentPrice * stockQuantity;
    let pl = currPrice - buyPrice;
    let plPerc = 0;
    let msg;
    if (pl < 0) {
      setPic(sad);
      plPerc = (Math.abs(pl) / buyPrice) * 100;
      msg = `You lost ${plPerc}%. Your total loss is Rs.${Math.abs(pl)}`;
    } else {
      setPic(happy);
      plPerc = (pl / buyPrice) * 100;
      msg = `You gained ${plPerc}%. Your total profit is Rs.${pl}`;
    }
    setOutput({ flag: true, msg: msg });
  };

  return (
    <>
      {data.map((item, indx) => {
        if (indx === index) {
          return <Banner key={indx} item={item} index={index} />;
        }
      })}

      <div className="container">
        <div className="left">
          <h1>Calculate Profit/Loss on your Stock</h1>
          <form onSubmit={submitHandler}>
            <div className="item">
              <label className="form-item">
                <input
                  type="number"
                  value={purchasePrice}
                  onChange={(e) => setPurchasePrice(e.target.value)}
                />
                Purchase Price
              </label>
              <br />
            </div>
            <div className="item">
              <label className="form-item">
                <input
                  type="number"
                  value={stockQuantity}
                  onChange={(e) => setStockQuantity(e.target.value)}
                />
                Stock Quantity
              </label>
              <br />
            </div>
            <div className="item">
              <label className="form-item">
                <input
                  type="number"
                  value={currentPrice}
                  onChange={(e) => setCurrentPrice(e.target.value)}
                />
                Current Price
              </label>
              <br />
            </div>

            <button type="submit">Check</button>
          </form>
          {output.flag && <h4 className="output">{output.msg}</h4>}
        </div>
        <div className="right">
          <img src={pic} alt="demo" />
        </div>
      </div>
    </>
  );
}

export default App;
