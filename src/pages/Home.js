import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <h1>Monta tu Outfit 👔</h1>
      <Link to="/builder">
        <button>Empezar</button>
      </Link>
    </div>
  );
}
