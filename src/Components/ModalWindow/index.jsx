import React, { useEffect } from "react";
import { createPortal } from "react-dom";

import styles from "./ModalWindow.module.css";

const modalRoot = document.getElementById("modal-root");

export default function ModalWindow({
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
  const showHideClassName = show
    ? `${styles.modal} ${styles.displayBlock}`
    : `${styles.modal} ${styles.displayNone}`;
  const el = document.createElement("div");

  useEffect(() => {
    modalRoot.appendChild(el);

    return () => {
      modalRoot.removeChild(el);
    };
  }, [el]);

  //** Close modal by Esc key press */
  useEffect(() => {
    const close = (e) => {
      if (e.keyCode === 27) {
        handleClose();
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [handleClose]);

  //** Close Modal on backdrop click  */
  const handleOutSideClick = (e) => {
    handleClose();
    document.removeEventListener("click", handleOutSideClick);
  };

  return (
    show &&
    createPortal(
      <div className={showHideClassName}>
        <section
          className={styles.modalMain}
          onMouseLeave={() => {
            document.addEventListener("click", handleOutSideClick);
          }}
        >
          <div className={styles.modalHeader}>
            <h3>Game details | Game ID: {currentGameIndex}</h3>
            <button
              className={styles.modalCloseBtn}
              onClick={handleClose}
            ></button>
          </div>
          <div className={styles.pointsSection}>
            <span className={styles.modalSectionTitles}>Points</span>
            <div className={styles.pointsInfo}>
              {points ? (
                points
              ) : (
                <p>
                  Sorry, no info availible now. We're working under this problem
                </p>
              )}
            </div>
          </div>
          <div className={styles.statsSection}>
            <span className={styles.modalSectionTitles}>Team Stats</span>
            <div className={styles.statsInfo}>
              {stats ? (
                stats
              ) : (
                <p>
                  Sorry, no info availible now. We're working under this problem
                </p>
              )}
            </div>
          </div>
          <div className={styles.detailsSection}>
            <div className={styles.teamsDetailsCont}>
              <span
                className={`${styles.modalSectionTitles} ${styles.teamTitles}`}
              >
                {currentTeam}
              </span>
              <div className={styles.currentTeamInfo}>
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
            <div className={styles.teamsDetailsCont}>
              <span
                className={`${styles.modalSectionTitles} ${styles.teamTitles}`}
              >
                {opponent}
              </span>
              <div className={styles.opponentTeamInfo}>
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
