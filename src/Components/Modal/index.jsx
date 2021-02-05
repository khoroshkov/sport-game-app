import React, { useEffect } from "react";
import { createPortal } from "react-dom";

const modalRoot = document.getElementById("modal-root");

export default function Modal({
  show,
  handleClose,
  currentGameIndex,
  currentTeam,
  opponent,
  points,
  stats,
  currentTeamInfo,
  opponentTeamInfo,
}) {
  const showHideClassName = show ? "modal display-block" : "modal display-none";
  const el = document.createElement("div");

  useEffect(() => {
    modalRoot.appendChild(el);

    return () => {
      modalRoot.removeChild(el);
    };
  }, [el]);

  // Close modal by Esc key
  useEffect(() => {
    const close = (e) => {
      if (e.keyCode === 27) {
        handleClose();
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [handleClose]);

  // Close Modal on backdrop click
  const handleOutSideClick = (e) => {
    handleClose();
    document.removeEventListener("click", handleOutSideClick);
  };

  return (
    show &&
    createPortal(
      <div className={showHideClassName}>
        <section
          className="modal-main"
          onMouseLeave={() => {
            document.addEventListener("click", handleOutSideClick);
          }}
        >
          <div className="modal-header">
            <h3>Game details | Game ID: {currentGameIndex}</h3>
            <button className="modal-close-btn" onClick={handleClose}></button>
          </div>
          <div className="points-section">
            <span className="modal-section-titles">Points</span>
            <div className="point-info">
              {points ? (
                points
              ) : (
                <p>
                  Sorry, no info availible now. We're working under this problem
                </p>
              )}
            </div>
          </div>
          <div className="stats-section">
            <span className="modal-section-titles">Team Stats</span>
            <div className="stats-info">
              {stats ? (
                stats
              ) : (
                <p>
                  Sorry, no info availible now. We're working under this problem
                </p>
              )}
            </div>
          </div>
          <div className="details-section">
            <div className="teams-details-cont">
              <span className="modal-section-titles team-titles">
                {currentTeam}
              </span>
              <div className="current-team-info">
                {currentTeamInfo ? (
                  currentTeamInfo
                ) : (
                  <p>
                    Sorry, no info availible now. We're working under this
                    problem
                  </p>
                )}
              </div>
            </div>
            <div className="teams-details-cont">
              <span className="modal-section-titles team-titles">
                {opponent}
              </span>
              <div className="opponent-team-info">
                {opponentTeamInfo ? (
                  opponentTeamInfo
                ) : (
                  <p>
                    Sorry, no info availible now. We're working under this
                    problem
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>,
      el
    )
  );
}
