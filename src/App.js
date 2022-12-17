import './App.css';
import React, { Component } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

export default class App extends Component {
  pageSize=10;
  render() {
    return (
      <>
      <BrowserRouter>
      <NavBar/>
      <Routes><Route exact path="/" element={<News key="general" page={this.pageSize} country='in' category='General'/>}> </Route></Routes>
      <Routes><Route exact path="/About" element={<News key="About" page={this.pageSize} country='in' category='About'/>}> </Route></Routes>
      <Routes><Route exact path="/Business" element={<News key="Business" page={this.pageSize} country='in' category='Business'/>}> </Route></Routes>
      <Routes><Route exact path="/Entertainment" element={ <News key="Entertainmen" page={this.pageSize} country='in' category='Entertainment'/>}></Route></Routes>
      <Routes><Route exact path="/Health" element={<News key="Health" page={this.pageSize} country='in' category='Health'/>}> </Route></Routes>
      <Routes><Route exact path="/Science" element={<News key="Science" page={this.pageSize} country='in' category='Science'/>}> </Route></Routes>
      <Routes><Route exact path="/Technology" element={<News key="Technology" page={this.pageSize} country='in' category='Technology'/>}> </Route></Routes>
      </BrowserRouter>
      </>
    )
  }
}

