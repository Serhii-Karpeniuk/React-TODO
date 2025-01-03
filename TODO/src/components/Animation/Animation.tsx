import { CSSProperties } from "react";
import "./Animation.scss";

const AnimationComponent = () => {
  const spans = Array.from({ length: 20 }, (_, index) => (
    <span key={index} style={{ "--i": index + 1 } as CSSProperties}></span>
  ));

  return (
    <section>
      <div className="loader">{spans}</div>
    </section>
  );
};

export default AnimationComponent;
