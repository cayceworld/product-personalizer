import styles from './Product.module.scss';
import PropTypes from 'prop-types';
import { useState, useMemo } from 'react';
import ProductImage from '../ProductImage/ProductImage';
import ProductForm from '../ProductForm/ProductForm';



const Product = props => {

  const [currentColor, setCurrentColor] = useState(props.colors[0]);
  const [currentSize, setCurrentSize] = useState(props.sizes[0].name);


  const getPrice = useMemo(() => {
    console.log('getPrice')
    const found = props.sizes.find(element => element.name === currentSize);
    return props.basePrice + found.additionalPrice;
  },[props.sizes, props.basePrice, currentSize]);


  const handleSubmit = e => {
    e.preventDefault();
    console.log('Summary');
    console.log('=============');
    console.log('Name:', props.name)
    console.log('Price:', getPrice(props.basePrice))
    console.log('Size:', currentSize)
    console.log('Color:', currentColor)
  }
  
  return (
    <article className={styles.product}>
      <ProductImage name={props.name} currentColor={currentColor} />
      <div>
        <header>
          <h2 className={styles.name}>{props.title}</h2>
          <span className={styles.price}>{getPrice}</span>
        </header>
        <ProductForm key={props.id} sizes={props.sizes} colors={props.colors} currentSize={currentSize}
          setCurrentSize={setCurrentSize} currentColor={currentColor} setCurrentColor={setCurrentColor} handleSubmit={handleSubmit} />

      </div>
    </article>
  )
}

Product.propTypes = {
  name: PropTypes.string.isRequired,
  basePrice: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  colors: PropTypes.array.isRequired,
  sizes: PropTypes.array.isRequired,
}

export default Product;