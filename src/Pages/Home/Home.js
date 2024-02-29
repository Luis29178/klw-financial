import React from "react";
import "./Home.css";
import HomeList from "../../Components/HomeList/HomeList";
import data from "../../consts/Links";

function Home() {
  return (
    <div>
      <div className="App">
        <header className="App-header">
          <p className="bio">
            Welcome to my page! I’m Kay West, a dedicated financial advisor with
            a heart for empowering individuals and families to secure their
            financial futures. With a specialization in leveraging universal
            indexed life insurance, I offer my clients a unique opportunity for
            tax-free, unlimited growth without the risk of losing money. This
            innovative approach ensures your investments are not just safe but
            also thriving. Beyond universal indexed life insurance, my expertise
            extends to term and whole life insurance, comprehensive estate and
            will planning, effective debt management, and more. My educational
            background in business, coupled with my initial professional journey
            as a health insurance agent, has deeply informed my approach to
            financial advising. My transition into financial advising was
            sparked by my experiences working with senior citizens, who often
            faced financial constraints that limited their retirement enjoyment.
            Witnessing their struggles firsthand ignited my commitment to change
            the narrative for future generations. I am driven by the desire to
            ensure no family has to endure the uncertainty of not knowing how
            they will afford their next meal during retirement. My mission is
            simple: to improve your financial well-being and reignite hope
            through personalized and strategic financial planning. Let’s embark
            on this journey together, building a secure and prosperous future
            for you and your loved ones.
          </p>
          <h1 className="name">Kay Lynn West</h1>
          <div className="pfp-container">
          <img
          className="pfp"
            src={`${process.env.PUBLIC_URL}/assets/temppfp.png`}
            alt='Kay Lynn West'
          />
          </div>

          <HomeList links={data.links} />
          
        </header>
      </div>
    </div>
  );
}

export default Home;
