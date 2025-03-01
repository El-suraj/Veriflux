import React from 'react'
import HeroSection from '../components/HeroSection'
import Carousel from '../components/Carousel'
import Testimonials from '../components/Testimonials'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function HomePage() {
    return (
        <div>
            <Navbar />
            <HeroSection />
            <Carousel/>
            <Testimonials/>
            <Footer/>
        </div>
    );
}

export default HomePage;