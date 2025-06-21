import React from 'react';
import ProductCard from '../ProductCard/ProductCard'; 
import './ProductList.css';


const products = [
  {
    id: 1,
    imageUrl: 'https://placehold.co/300x200/EFEFEF/AAAAAA?text=Producto+1',
    title: 'Nombre del Producto',
    description: 'Breve descripción del producto.',
    productUrl: '#'
  },
  {
    id: 2,
    imageUrl: 'https://placehold.co/300x200/EFEFEF/AAAAAA?text=Producto+2',
    title: 'Otro Producto',
    description: 'Breve descripción de este otro producto.',
    productUrl: '#'
  },
  {
    id: 3,
    imageUrl: 'https://placehold.co/300x200/EFEFEF/AAAAAA?text=Producto+3',
    title: 'Un Producto Más',
    description: 'Descripción de un producto adicional.',
    productUrl: '#'
  }
];

function ProductList() {
  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Más Productos</h2>
      <div className="row">
        {products.map(product => (
          <div className="col-md-4 mb-4" key={product.id}> {}
            <ProductCard
              imageUrl={product.imageUrl}
              title={product.title}
              description={product.description}
              productUrl={product.productUrl}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
