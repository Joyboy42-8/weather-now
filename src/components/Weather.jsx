import { Ban } from "lucide-react";

export default function Weather({ weather, error = false }) {
    return (
      <>
        {error ? <Error /> : weather ? <IsWeather weather={weather} /> : <NoWeather />}
      </>
    );
  }
  
  function IsWeather({ weather }) {
    if (!weather || !weather.main || !weather.sys || !weather.weather) {
      return <NoWeather />;
    }
  
    return (
      <section className="mt-10 bg-white/20 backdrop-blur-lg rounded-3xl p-6 shadow-2xl border border-white/30">
        <h2 className="text-3xl font-semibold mb-2">
          {weather.name}, {weather.sys.country}
        </h2>
        <p className="text-lg mb-4 capitalize">
          {weather.weather[0].description}
        </p>

        <div className="flex items-center justify-center gap-4 mb-6">
          <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} alt={`weather icon ${weather.weather[0].icon}`} class="size-20" />
          <span className="text-6xl font-bold">
            {Math.round(weather.main.temp)}°C
          </span>
        </div>

        <div className="grid grid-cols-3 gap-4 text-sm text-green-100">
          <div className="flex flex-col items-center">
            <span>💨</span>
            <span>{weather.wind.speed} m/s</span>
            <span>Vent</span>
          </div>
          <div className="flex flex-col items-center">
            <span>💧</span>
            <span>{weather.main.humidity}%</span>
            <span>Humidité</span>
          </div>
          <div className="flex flex-col items-center">
            <span>☁️</span>
            <span>{weather.clouds.all}%</span>
            <span>Nuages</span>
          </div>
        </div>
      </section>
    );
  }
  
  function NoWeather() {
    return (
      <section className="mt-10 bg-white/20 backdrop-blur-lg rounded-3xl p-6 shadow-2xl border border-white/30">
        <p className="text-2xl">Choisis une ville 🌤️</p>
      </section>
    );
  }
  
  function Error() {
    return (
      <section className="mt-10 bg-white/20 backdrop-blur-lg rounded-3xl p-6 shadow-2xl border border-white/30">
        <p className="text-xl text-error">
            <Ban size={96} />
        </p>
      </section>
    );
  }
  