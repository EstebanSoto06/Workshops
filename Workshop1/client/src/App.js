import "./App.css";

function App() {
  function getCountries() {
    const ajaxRequest = new XMLHttpRequest(); //AJAX

    ajaxRequest.addEventListener("load", (e) => {
      const country = JSON.parse(e.target.responseText);
      console.log(country);
      console.log(country[0].name);

      let optionsHtml = "";
      country.forEach((country) => {
        optionsHtml += `<option value="">${country.name}</option>`;
      });

      document.getElementById("countries").innerHTML = optionsHtml;
    });

    ajaxRequest.addEventListener("error", () => {});
    ajaxRequest.open("GET", "http://localhost:3002/countries");
    ajaxRequest.send();
  }

  function getCurrencies() {
    var getCountry = document.getElementById("countries");
    var selectedCountry = getCountry.options[getCountry.selectedIndex].text;
    console.log(selectedCountry);
    
    const ajaxRequest = new XMLHttpRequest(); //AJAX

    if (selectedCountry == "Costa Rica") {
      ajaxRequest.addEventListener("load", (e) => {
        const currencies = JSON.parse(e.target.responseText);
        console.log(currencies);
        const dolar = 1/currencies.crc.usd;
        console.log(dolar);
        const euro = 1/currencies.crc.eur;
        console.log(euro);
  
        document.getElementById("currencie").innerHTML = 'Colón costarricense CRC';
        document.getElementById("dolar").innerHTML = dolar.toFixed(2);
        document.getElementById("euro").innerHTML = euro.toFixed(2);
      });
  
      ajaxRequest.addEventListener("error", () => {});
      ajaxRequest.open("GET", "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/crc.json");
      ajaxRequest.send();
    } else if (selectedCountry == "Colombia") {
      ajaxRequest.addEventListener("load", (e) => {
        const currencies = JSON.parse(e.target.responseText);
        
        const dolar = 1/currencies.cop.usd;
        const euro = 1/currencies.cop.eur;
  
        document.getElementById("currencie").innerHTML = 'Peso colombiano COP';
        document.getElementById("dolar").innerHTML = dolar.toFixed(2);
        document.getElementById("euro").innerHTML = euro.toFixed(2);
      });
  
      ajaxRequest.addEventListener("error", () => {});
      ajaxRequest.open("GET", "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/cop.json");
      ajaxRequest.send();
    } else if (selectedCountry == "Argentina") {
      ajaxRequest.addEventListener("load", (e) => {
        const currencies = JSON.parse(e.target.responseText);
        
        const dolar = 1/currencies.ars.usd;
        const euro = 1/currencies.ars.eur;
  
        document.getElementById("currencie").innerHTML = 'Peso argentino ARS';
        document.getElementById("dolar").innerHTML = dolar.toFixed(2);
        document.getElementById("euro").innerHTML = euro.toFixed(2);
      });
  
      ajaxRequest.addEventListener("error", () => {});
      ajaxRequest.open("GET", "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/ars.json");
      ajaxRequest.send();
    }
    
  };

  getCountries();


  return (
    <div className="App">
      <h3>Select The Country:</h3>
      <select name="countries" id="countries"></select>
      <button onClick={getCurrencies}>LOAD</button>
      <div>Currencie</div>
      <div id="currencie"></div>
      <div>Exchange Dollar</div>
      <div id="dolar"></div>
      <div>Exchange Euro</div>
      <div id="euro"></div>
    </div>
  );
}

export default App;
