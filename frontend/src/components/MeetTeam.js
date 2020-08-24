import React, { Component } from "react";
export default class MeetTeam extends Component {
  render() {
    return (
      <div className="aboutus">
        <h1 className="aboutTitle">Meet The Team</h1>
        <div className="usinfo">
          <div className="roy">
            <h2>Roy Gutierrez</h2>
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
          <div className="valerie">
            <h2>Matthew Manzo</h2>
            <p>From: Davie, FL</p>
            <div className="githubLinkedIn">
              <a href="https://github.com/mattjmanzo" target="_blank">
                GitHub
              </a>
              <div>|</div>
              <a href="https://www.linkedin.com/in/mattjmanzo" target="_blank">
                LinkedIn
              </a>
            </div>
          </div>
          <div className="valerie">
            <h2>Christina Rice</h2>
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
  }
}
