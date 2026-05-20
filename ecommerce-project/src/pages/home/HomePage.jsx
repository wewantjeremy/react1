import axios from 'axios';
import { Header } from '../../components/Header.jsx';
import { useEffect } from 'react';
import { useState } from 'react';
import { ProductsGrid } from './ProductsGrid'
import './HomePage.css';

export function HomePage({ cart }) {
    useEffect(() => {
        const favicon = document.querySelector("link[rel='icon']");

        if (favicon) {
            favicon.href = '/home-favicon.png';
        }
    }, []);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('/api/products')
            .then((response) => {
                setProducts(response.data);
            }); 
        }, []);

    return (
        <>
            <Header cart={cart}/>
            <div className="home-page">
                <ProductsGrid products={products}/>
            </div>
        </>
    )
};