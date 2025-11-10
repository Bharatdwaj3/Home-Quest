// src/pages/Product.jsx
import { Header, Footer, LocationMap } from "../components/layout/index";
import {PgGrid} from "../components/PG/index"
import "../style/Chrcts.scss";

const Product = () => (
  <div className="chrcts-container">
    <Header />
    <PgGrid />
    <Footer />
  </div>
);

export default Product;