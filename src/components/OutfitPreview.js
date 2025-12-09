export default function OutfitPreview({ selected, reset }) {
  return (
    <div className="preview">
      <h2>Outfit Final 👕👖</h2>
      <ul>
        {Object.entries(selected).map(([key, val]) => (
          <li key={key}>{key}: {val?.name ?? "-"}</li>
        ))}
      </ul>

      <button onClick={reset}>Crear nuevo outfit</button>
    </div>
  );
}
