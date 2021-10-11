import React from "react";

const AuthPage = () => {
  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1>Links</h1>
        <div className="card blue darken-1">
          <div className="card-content white-text">
            <span className="card-title">Authentication</span>
          </div>
          <div>
            <div class="input-field ">
              <input
                placeholder="enter email address"
                id="email"
                type="text"
                name="email"
                className="yellow-input"
              />
              <label htmlFor="email"> Email</label>
            </div>
          </div>

          <div>
            <div class="input-field ">
              <input
                placeholder="enter password"
                id="password"
                type="password"
                name="password"
                className="yellow-input"
              />
              <label htmlFor="password"> Password</label>
            </div>
          </div>

          <div className="card-action">
            <button className="btn yellow darken-4 mr10">Log in</button>
            <button className="btn grey lighten-1 black text">Register</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
