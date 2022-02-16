import React from 'react';
import { Button } from '../../components';
import './index.styles.scss';
import { Link } from 'react-router-dom';

function Home() {
  const links = [
    { path: '#', title: 'Privacy Policy' },
    { path: '#', title: 'Contact Us' },
  ];
  return (
    <>
      <div className="homeContainer">
        <div>
          <div className="homeSignInButtonContainer">
            <button className="signInButton">sign in</button>
          </div>
          <div className="homeBannerSection">
            <h1 className="bannerHeading">Welcome to RacquetPass.</h1>
            <p className="bannerDescription">
              Making stringing fun and easy <br /> for players and stingers.{' '}
            </p>
          </div>
          <div className="homeButtons">
            <Button text="String a racquet" isDark />
            <Button text="Create a business account" />
          </div>
        </div>
        <div>
          <div className="homeFooterContainer">
            {links.map((link, index) => (
              <Link className="linkText" key={index} to={link.path}>
                {link.title}
              </Link>
            ))}
          </div>
          <div className="homeImageContainer">
            <img
              className="homeImage"
              src="img/homepage/racquet.png"
              alt="racquet"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
