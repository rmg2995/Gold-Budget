import React, { Component } from "react";
import "../components/styles/meetteam.scss";

const MeetTeam = () => {
  return (
    <div className="aboutus">
      <h1 className="aboutTitle">Meet the Team</h1>
      <div className="usinfo">
        <div className="roy">
          <h2>Roy Gutierrez</h2>
          <p>Software Developer</p>
          <p>From: Miami, FL</p>
          <div className="githubLinkedIn">
            <a href="https://github.com/rmg2995" target="_blank">
              GitHub
            </a>
            <div>|</div>
            <a href="https://www.linkedin.com/in/rmg2995/" target="_blank">
              LinkedIn
            </a>
          </div>
        </div>
        <div className="andrew">
          <h2>Andrew Harari</h2>
          <p>Software Developer</p>
          <p>From: Miami, FL</p>
          <div className="githubLinkedIn">
            <a href="https://github.com/hararia" target="_blank">
              GitHub
            </a>
            <div>|</div>
            <a href="https://www.linkedin.com/in/hararia//" target="_blank">
              LinkedIn
            </a>
          </div>
        </div>
        <div className="valerie">
          <h2>Valerie Lee</h2>
          <p>Software Developer</p>
          <p>From: Los Angeles, CA</p>
          <div className="githubLinkedIn">
            <a href="https://github.com/vlee13" target="_blank">
              GitHub
            </a>
            <div>|</div>
            <a href="https://www.linkedin.com/in/vlee13/" target="_blank">
              LinkedIn
            </a>
          </div>
        </div>
        <div className="mo">
          <h2>Christina Rice</h2>
          <p>UX/UI Designer</p>
          <p>From: Coral Springs, FL</p>
          <div className="githubLinkedIn">
            {/* <a href="https://github.com/mattjmanzo" target="_blank">
                GitHub
              </a>
              <div>|</div> */}
            <a href="https://www.linkedin.com/in/chrimoni" target="_blank">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MeetTeam;
