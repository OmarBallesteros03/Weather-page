import "dotenv/config";
const apiKey = process.env.API_KEY;

console.log(apiKey);
document.getElementById("fetch-weather").addEventListener("click", async () => {
  const city = document.getElementById("city-input").value;
  const units = "metric";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("City not found");

    const data = await response.json();

    //Weather details
    const weather = data.weather[0];
    const temperature = data.main.temp;
    const feels = data.main.feels_like;
    const iconCode = weather.icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    const humidity = data.main.humidity;
    const wind = data.wind.speed;
    const pressure = data.main.pressure;

    //Date and time
    const unixTimestamp = data.dt;
    const date = new Date(unixTimestamp * 1000);
    const options = {
      weekday: "long",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    };
    let formattedDateTime = new Intl.DateTimeFormat("es-MX", options).format(
      date
    );
    formattedDateTime =
      formattedDateTime.charAt(0).toUpperCase() + formattedDateTime.slice(1);

    //Information display
    document.getElementById("weather-result").innerHTML = `
    <section class="main-result" id="main-result aria-labelledby="city-heading">
    <article class="city-data">
            <h2 id="city-heading">${data.name}</h2>
            <p>${formattedDateTime}</p>
            <p><strong>${temperature}°C</strong></p>
        </article>
        <figure class="icon-container">
            <img src="${iconUrl}" alt="${weather.description}" />
            <figcaption>${weather.description}</figcaption>
        </figure>
    </section>
    <section class="details-result" id="details-result" aria-labelledby="conditions-heading">
        <h3 id="conditions-heading">Air Conditions</h3>
        <div class="details-grid">
            <article>
                <p class="detail-label">Real Feel</p>
                <p class="detail-value">${feels}°C</p>
            </article>
            <article>
                <p class="detail-label">Humidity</p>
                <p class="detail-value">${humidity}%</p>
            </article>
            <article>
                <p class="detail-label">Wind</p>
                <p class="detail-value">${wind} m/s</p>
            </article>
            <article>
                <p class="detail-label">Pressure</p>
                <p class="detail-value">${pressure} hPa</p>
            </article>
        </div>
    </section>`;
  } catch (error) {
    document.getElementById("weather-result").innerText =
      "Error: " + error.message;
  }
});
