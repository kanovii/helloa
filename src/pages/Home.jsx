import React from 'react';
import SearchBar from '../components/SearchBar';
import Footer from './../components/Footer';
import Island from '../components/Island';
import Events from '../components/Events';
import Notice from '../components/Notice';

export default function Home() {
    return (
        <div>
            <SearchBar />
            <Island />
            <Events />
            <Notice />
            <Footer />
        </div>
    );
}
