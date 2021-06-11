import React, {useState} from "react";
import "./index.css";

export default function StockData() {
      const [dataResponse, setDataResponse] = useState([])
      const [dateInput, setDateInput] = useState('')
      const [loaded, setLoaded] =useState(false)

      // data search
      const  handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`https://jsonmock.hackerrank.com/api/stocks?date=${dateInput}`)
        const result = await response.json();
        setDataResponse(result.data)
        setLoaded(true)
      }

  return (
    <div className="layout-column align-items-center mt-50">
      <section className="layout-row align-items-center justify-content-center">
        <input type="text" className="large" placeholder="5-January-2000" id="app-input"
               data-testid="app-input" name="dateInput"
               value={dateInput} onChange={(text) => setDateInput(text.target.value)}
          />
        <button className="" id="submit-button" data-testid="submit-button" onClick={handleSubmit}>Search</button>
      </section>
        {    
          !loaded ? null :
          <>
              { 
                  dataResponse.length > 0  ? 
                        Object.entries(dataResponse).map(([key, value])=> {
                                    return  <ul className="mt-50 slide-up-fade-in styled" id="stockData" data-testid="stock-data" key={key}>
                                            <li className="py-10" >Open: {value.open} </li>
                                            <li className="py-10">Close: {value.close} </li>
                                            <li className="py-10">High: {value.high} </li>
                                            <li className="py-10">Low: {value.low} </li>  
                                        </ul>
                                  }) : 
                <div className="mt-50 slide-up-fade-in" id="no-result" data-testid="no-result"> No Results Found</div>
              }
          </>
        }          
     
    </div>
  );
}
