export default function SearchBar({ search, onSearchChange, onSubmit }) {
  return (
    <form className="flex items-center bg-white/20 backdrop-blur-md rounded-2xl overflow-hidden shadow-lg border border-white/30" onSubmit={onSubmit}>
          <input type="text" placeholder="Entrez une ville..."
            className="flex-1 px-4 py-3 bg-transparent text-white placeholder-white/70 focus:outline-none"
           value={search || ""} onChange={onSearchChange}/>
          <button type="submit" className="p-3 bg-green-500/60 hover:bg-green-500 transition-all">
            🔍
          </button>
        </form>
    )
}