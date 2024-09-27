import React from 'react';
import NavPub from '../../NavPub/NavPub.jsx';
import ProductCard from '../productCard/productCard.jsx';

const CatalogPage = () => {
  return (
    <>
      <NavPub />
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <ProductCard
              name="Producto 1"
              description="Descripción del producto 1."
              price={49.99}
              imageUrl="https://via.placeholder.com/200"
            />
          </div>
          <div className="col-md-3">
            <ProductCard
              name="Producto 2"
              description="Descripción del producto 2."
              price={79.99}
              imageUrl="https://via.placeholder.com/200"
            />
          </div>
          <div className="col-md-3">
            <ProductCard
              name="Producto 3"
              description="Descripción del producto 3."
              price={99.99}
              imageUrl="https://via.placeholder.com/200"
            />
          </div>
          <div className="col-md-3">
            <ProductCard
              name="Producto 3"
              description="Descripción del producto 3."
              price={99.99}
              imageUrl="https://via.placeholder.com/200"
            />
          </div>
          <div className="col-md-3">
            <ProductCard
              name="Producto 4"
              description="Descripción del producto 4."
              price={99.99}
              imageUrl="https://via.placeholder.com/200"
            />
          </div>
          <div className="col-md-3">
            <ProductCard
              name="Producto 5"
              description="Descripción del producto 5."
              price={99.99}
              imageUrl="https://via.placeholder.com/200"
            />
          </div>
          <div className="col-md-3">
            <ProductCard
              name="Producto 3"
              description="Descripción del producto 3."
              price={99.99}
              imageUrl="https://via.placeholder.com/200"
            />
          </div>
          <div className="col-md-3">
            <ProductCard
              name="Producto 3"
              description="Descripción del producto 3."
              price={99.99}
              imageUrl="https://via.placeholder.com/200"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default CatalogPage;