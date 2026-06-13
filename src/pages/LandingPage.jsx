import React from 'react'
import Navbar from '../components/Navbar'
import Features from '../components/Features'
import HowItWorks from '../components/HowItWorks'
import Footer from '../components/Footer'
import About from '../components/About'
import Hero from '../components/Hero'
import TestimonialsSection from '../components/Testimonialssection'


const LandingPage = () => {
  return (
    <div>
      <Navbar/>
      <Hero/>
      <About/>
      <Features/>
      <HowItWorks/>
      <TestimonialsSection/>
      <Footer/>
    </div>
  )
}

export default LandingPage
