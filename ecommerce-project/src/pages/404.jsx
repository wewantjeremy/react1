import { Header } from '../components/Header.jsx';
import { useEffect } from 'react';
    export function NotFound({ cart }) {
        useEffect(() => {
            console.log('404');
        }, []);
    return (
    <>
    <title>
        404 Not Found
    </title>
     <Header cart={cart} />
    <br />
    <br />
    <br />
    <br />
    <br />
    <div style={{ fontSize: '40px', paddingLeft: '15px'}}>
        404 Error: Not Found
    </div>
    </>
    );}

