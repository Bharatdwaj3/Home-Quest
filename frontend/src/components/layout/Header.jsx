import React from "react";
import "../../style/tenant-profile.scss";

const Header = () => {
  return (
    <div className="container py-5">
      <div className="stat-card p-5 text-center">
        <h1 className="username mb-3">PG Finder</h1>
        <p className="lead text-light" style={{ maxWidth: "700px", margin: "0 auto" }}>
          Discover your ideal lodging with HomeQuest’s intuitive interface and powerful search features for a seamless rental experience.
        </p>
      </div>
    </div>
  );
};

export default Header;