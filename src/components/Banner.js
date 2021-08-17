import "../styles.css";
import "remixicon/fonts/remixicon.css";

function Banner({ item }) {
  return (
    <>
      <div className="stock-card">
        <div className="stock-name">
          <i className="ri-stock-fill"></i>
          <h5>{item.name}</h5>
        </div>
        <div className="stock-price">
          {item.profit ? (
            <>
              <i className="ri-arrow-up-s-fill profit"></i>
              <small>{item.profit}</small>
            </>
          ) : (
            <>
              <i className="ri-arrow-down-s-fill loss"></i>
              <small className="loss">{item.loss}</small>
            </>
          )}
          <p>{item.price}</p>
        </div>
      </div>
    </>
  );
}

export default Banner;
