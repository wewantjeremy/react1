import axios from 'axios';
import { Header } from '../../components/Header.jsx';
import { useEffect } from 'react';
import { useState } from 'react';
import { ProductsGrid } from './ProductsGrid'
import './HomePage.css';

export function HomePage({ cart, loadCart }) {
    useEffect(() => {
        const favicon = document.querySelector("link[rel='icon']");

        if (favicon) {
            favicon.href = '/home-favicon.png';
        }
    }, []);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const getHomeData = async () => {
        const response = await axios.get('/api/products')
                setProducts(response.data);
            };
            
            getHomeData();
        }, []);

    return (
        <>
            <Header cart={cart}/>
            <div className="home-page">
                <ProductsGrid products={products} loadCart={loadCart}/>
            </div>
        </>
    )
};