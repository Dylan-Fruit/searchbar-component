import React from "react";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import Search from "./components/Search/Search";
import "./Home.scss";

const Home = () => {
  return (
    <div className="Home">
      <Header />
      <Hero />
      <Search />
    </div>
  );
};

export default Home;
