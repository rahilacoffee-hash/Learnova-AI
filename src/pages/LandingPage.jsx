import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Features from '../components/Features'
import HowItWorks from '../components/HowItWorks'
import Footer from '../components/Footer'
import About from '../components/About'

const LandingPage = () => {
  return (
    <div>
      <Navbar/>
      <Hero/>
      <About/>
      <Features/>
      <HowItWorks/>
      <Footer/>
    </div>
  )
}

export default LandingPage
