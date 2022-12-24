import React from 'react'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../node_modules/bootstrap/dist/js/bootstrap.bundle"
import Navbar from './components/Navbar/Navbar'
import Intro from './components/Intro/Intro';
import Services from './components/Services/Services';
import Experience from './components/Experience/Experience';
import Works from './components/Works/Works';
import ExpertsReview from './components/ExpertsReview/ExpertsReview';
import Portfolio from './components/Portfolio/Portfolio';
import Testimonials from './components/Testimonials/Testimonials';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import {themeContext} from './Context'
import { useContext } from 'react';
import Announce from './components/Announce/Announce';
import Slider from './components/Slider/Slider';
import MessengerCustomerChat from 'react-messenger-customer-chat';
import "swiper/css/bundle";

const Home = () => {
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;
  return (
    <div className="App" style={{
      background: darkMode? 'black': '', 
      color: darkMode? 'white': ''}}>
      <Announce/>
      <Navbar/>
      <Slider/>
      <Intro/>
      <Services/>
      <Experience/>
      <Works />
      <ExpertsReview/>
      <Portfolio/>
      <Testimonials/>
      <Contact/>
      <Footer/>
      <MessengerCustomerChat
    pageId="106086172168383" appId="825385341781764"/>
    </div>
  )
}

export default Home