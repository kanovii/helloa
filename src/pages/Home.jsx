import React from 'react';
import SearchBar from '../components/SearchBar';
import Footer from './../components/Footer';
import Island from '../components/Island';
import Events from '../components/Events';

export default function Home() {
    return (
        <div>
            <SearchBar />
            <Island />
            <Events />
            <Footer />
        </div>
    );
}
