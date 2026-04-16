import { useState } from "react";

const NeuralNetworkBg = () => {
  const [missingImage, setMissingImage] = useState(false);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div className="absolute inset-0 anatomy-bg-layer" />
      <div className="anatomy-glow anatomy-glow-brain" />

      {!missingImage ? (
        <img
          src="/anatomy/brain.png"
          alt="Anatomical brain visualization"
          className="anatomy-bg-image anatomy-brain-motion"
          loading="lazy"
          onError={() => setMissingImage(true)}
        />
      ) : (
        <div className="anatomy-bg-fallback">Add public/anatomy/brain.png</div>
      )}
    </div>
  );
};

export default NeuralNetworkBg;
