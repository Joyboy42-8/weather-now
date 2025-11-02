import Footer from "./components/Footer";
import Brand from "./components/Brand";
import SearchBar from "./components/SearchBar";
import Weather from "./components/Weather";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const API_KEY = "36c1dc509687b2a5366079e5aa9edc33";

export default function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(false);
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  }

  const handleSearchChange = (e) => {
    setCity(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(city.trim() == "") return toast.error("Ce champ ne peut pas etre vide !")
    fetchWeather(city);
    setCity("");
  }

  async function fetchWeather(city) {
    try {
      setError(false);
      const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=fr`, requestOptions);
      const data = await res.json();
      if (data.cod !== 200) {
        setError(true);
        toast.error("Erreur lors de la recupération des données !");
        setWeather(null);
        return;
      }
      toast.success("Données récupérées avec succes !");
      console.log(data)
      setWeather(data);
    } catch (error) {
      setError(true);
      toast.error("Erreur lors de la recupération des données !");
      console.log(error);
    }
  }

  async function fetchWeatherByCoords(lat, lon) {
    try {
      setError(false);
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=fr`
      );
      const data = await res.json();

      if (data.cod != 200) {
        setError(true);
        setWeather(null);
        toast.error(data.message || "Erreur lors de la récupération !");
        return;
      }

      setWeather(data);
    } catch (err) {
      setError(true);
      toast.error("Erreur de connexion !");
      console.log(err);
    }
  }

  // ✅ Demande la localisation au chargement de la page
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          fetchWeatherByCoords(latitude, longitude);
        },
        (err) => {
          console.error("Erreur de géolocalisation :", err);
          if (err.code === 1) {
            toast.error("Localisation refusée. Entrez une ville manuellement 🌍");
          } else if (err.code === 2) {
            toast.info("Impossible de récupérer votre position. Entrez une ville manuellement 🌍");
          } else if (err.code === 3) {
            toast.info("Délai de localisation dépassé. Entrez une ville manuellement 🌍");
          } else {
            toast.info("Erreur de localisation inconnue. Entrez une ville manuellement 🌍");
          }
        }
      );
    } else {
      toast.warning("La géolocalisation n'est pas supportée par ce navigateur.");
    }
  }, []);
  

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat relative text-white" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=80')" }}>
      {/* Voile nature avec flou doux */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

      {/* Contenu principal */}
      <section className="relative z-10 text-center max-w-md w-full px-6">
        {/* Titre principal */}
        <Brand />

        {/* Champ de recherche */}
        <SearchBar search={city} onSearchChange={handleSearchChange} onSubmit={handleSubmit} />

        {/* Carte météo */}
        <Weather weather={weather} error={error} />
      </section>

      {/* Pied de page */}
     <Footer />
    </main>
  );
}