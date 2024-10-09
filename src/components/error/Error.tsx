import React from "react";

const Error: React.FC = () => {
  return (
    <article className="error-container" role="alert" aria-live="assertive">
      <p className="error">Failed to load cart</p>
    </article>
  );
};

export default Error;
