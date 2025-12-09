import { useState, useEffect } from "react";
import { pants } from "../data/pants";
import { tops } from "../data/tops";
import { jackets } from "../data/jackets";
import { shoes } from "../data/shoes";
import { socks } from "../data/socks";
import { belts } from "../data/belts";
import OutfitPreview from "./OutfitPreview";

export default function Selector() {
  const [step, setStep] = useState(1);
  const [formality, setFormality] = useState(null);

  const [selected, setSelected] = useState({
    pants: null,
    top: null,
    jacket: null,
    shoes: null,
    socks: null,
    belt: null,
  });

  const handleSelect = (key, value) => {
    setSelected((prev) => ({ ...prev, [key]: value }));

    if (key === "pants") {
      setFormality(null);
      setSelected({ pants: value, top: null, jacket: null, shoes: null, socks: null, belt: null });
      setStep(2);
      return;
    }

    setStep(step + 1);
  };

  const filteredTops = formality
    ? tops.filter((t) => t.formality.includes(formality))
    : [];

  const filteredJackets = selected.top
    ? jackets.filter((j) => j.formality.includes(formality))
    : [];

  const filteredShoes = jackets
    ? shoes.filter((s) => s.formality.includes(formality))
    : [];

  const filteredSocks = selected.shoes ? socks : [];
  const filteredBelts = selected.shoes ? belts : [];

  return (
    <div className="wizard">

      {step === 1 && (
        <>
          <h2>1️⃣ Elige pantalón</h2>
          {pants.map((p) => (
            <button key={p.id} onClick={() => handleSelect("pants", p)}>
              {p.name}
            </button>
          ))}
        </>
      )}

      {step === 2 && (
        <>
          <h2>2️⃣ Elige formalidad</h2>
          {selected.pants.formality.map((level) => (
            <button key={level} onClick={() => {
              setFormality(level);
              setStep(3);
            }}>
              {level}
            </button>
          ))}
        </>
      )}

      {step === 3 && (
        <>
          <h2>3️⃣ Parte de arriba ({formality})</h2>
          {filteredTops.map((t) => (
            <button key={t.id} onClick={() => handleSelect("top", t)}>
              {t.name}
            </button>
          ))}
        </>
      )}

      {step === 4 && (
        <>
          <h2>4️⃣ Abrigo</h2>
          {filteredJackets.map((j) => (
            <button key={j.id} onClick={() => handleSelect("jacket", j)}>
              {j.name}
            </button>
          ))}

          {/* Permitir saltar abrigo */}
          <button className="skip" onClick={() => setStep(5)}>
            Sin abrigo
          </button>
        </>
      )}

      {step === 5 && (
        <>
          <h2>5️⃣ Calzado</h2>
          {filteredShoes.map((s) => (
            <button key={s.id} onClick={() => handleSelect("shoes", s)}>
              {s.name}
            </button>
          ))}
        </>
      )}

      {step === 6 && (
        <>
          <h2>6️⃣ Calcetines</h2>
          {filteredSocks.map((so) => (
            <button key={so.id} onClick={() => handleSelect("socks", so)}>
              {so.name}
            </button>
          ))}
        </>
      )}

      {step === 7 && (
        <>
          <h2>7️⃣ Cinturón</h2>
          {filteredBelts.map((b) => (
            <button key={b.id} onClick={() => handleSelect("belt", b)}>
              {b.name}
            </button>
          ))}
        </>
      )}

      {step > 7 && (
        <OutfitPreview selected={selected} reset={() => {
          setSelected({ pants: null, top: null, jacket: null, shoes: null, socks: null, belt: null });
          setFormality(null);
          setStep(1);
        }} />
      )}
    </div>
  );
}
