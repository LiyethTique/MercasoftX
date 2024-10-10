import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavPub from '../../NavPub/NavPub.jsx';
import ProductCard from '../productCard/productCard.jsx';
import Cart from '../../Carrito/crudCarrito.jsx'; 
import Swal from 'sweetalert2';

const URI_PRODUCTO = `${process.env.REACT_APP_SERVER_BACK}/producto`;
const IMAGE_URI = `${process.env.REACT_APP_SERVER_BACK}${process.env.REACT_APP_IMAGE_PATH}`;

const CatalogPage = () => {
  const [products, setProducts] = useState([]); 
  const [carrito, setCarrito] = useState([]); 

  const fetchProducts = async () => {
    try {
      const response = await axios.get(URI_PRODUCTO);
      console.log('Respuesta de la API:', response.data);
      setProducts(response.data);
    } catch (error) {
      console.error('Error al cargar los productos:', error);
      Swal.fire('Error', 'No se pudieron cargar los productos', 'error');
    }
  };

  useEffect(() => {
    fetchProducts(); // Llama a la función fetchProducts al cargar el componente
  }, []);

  const handleAddToCart = (product) => {
    if (product.Exi_Producto === 0) { // Verifica si el producto está agotado
      Swal.fire('¡Producto Agotado!', 'Este producto no se puede añadir al carrito.', 'error');
      return; // Sale de la función si está agotado
    }

    const existingProduct = carrito.find(item => item.Id_Producto === product.Id_Producto);
    
    if (existingProduct) {
      setCarrito(carrito.map(item => 
        item.Id_Producto === product.Id_Producto 
          ? { ...item, Can_Producto: item.Can_Producto + 1 }
          : item
      ));
    } else {
      setCarrito([...carrito, { ...product, Can_Producto: 1 }]);
    }

    Swal.fire('¡Producto agregado!', 'El producto ha sido agregado al carrito.', 'success');
  };

  const cartItemCount = carrito.reduce((total, item) => total + item.Can_Producto, 0); // Calcula el conteo total de artículos en el carrito

  return (
    <div>
      <NavPub cartItemCount={cartItemCount} carrito={carrito} setCarrito={setCarrito} />
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', padding: '20px' }}>
        {products.map(product => (
          <ProductCard
            key={product.Id_Producto}
            name={product.Nom_Producto}
            description={product.Car_Producto}
            price={product.Pre_Producto}
            stock={product.Exi_Producto}
            imageUrl={product.Ima_Producto ? `${IMAGE_URI}${product.Ima_Producto}` : ''}
            onAddToCart={() => handleAddToCart(product)} 
          />
        ))}
      </div>
    </div>
  );
};

export default CatalogPage;
