import React from 'react';
import NavPub from '../../NavPub/NavPub.jsx';
import ProductCard from '../productCard/productCard.jsx';

const CatalogPage = () => {
  // Definir los productos como un array de objetos
  const products = [
    {
      Nom_Producto: "Producto 1",
      Car_Producto: "Descripción del producto 1.",
      Pre_Producto: 49.99,
      Ima_Producto: "https://via.placeholder.com/200",
      Exi_Producto: 10, // Cantidad en stock
    },
    {
      Nom_Producto: "Producto 2",
      Car_Producto: "Descripción del producto 2.",
      Pre_Producto: 79.99,
      Ima_Producto: "https://via.placeholder.com/200",
      Exi_Producto: 5, // Cantidad en stock
    },
    {
      Nom_Producto: "Producto 3",
      Car_Producto: "Descripción del producto 3.",
      Pre_Producto: 99.99,
      Ima_Producto: "https://via.placeholder.com/200",
      Exi_Producto: 0, // Sin stock
    },
    {
      Nom_Producto: "Producto 4",
      Car_Producto: "Descripción del producto 4.",
      Pre_Producto: 59.99,
      Ima_Producto: "https://via.placeholder.com/200",
      Exi_Producto: 3, // Cantidad en stock
    },
    {
      Nom_Producto: "Producto 5",
      Car_Producto: "Descripción del producto 5.",
      Pre_Producto: 89.99,
      Ima_Producto: "https://via.placeholder.com/200",
      Exi_Producto: 2, // Cantidad en stock
    },
  ];

  // Manejar la adición al carrito (puedes personalizar esto)
  const handleAddToCart = (product) => {
    console.log('Producto agregado al carrito:', product);
    // Aquí puedes añadir lógica para manejar el carrito
  };

  return (
    <>
      <NavPub />
      <div className="container">
        <div className="row">
          {products.map((product, index) => (
            <div className="col-md-3" key={index}>
              <ProductCard 
                product={product} // Pasar el objeto producto
                onAddToCart={handleAddToCart} // Pasar la función para agregar al carrito
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default CatalogPage;