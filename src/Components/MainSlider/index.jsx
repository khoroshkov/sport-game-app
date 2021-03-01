import React, { useState, useEffect, useRef } from "react";
import { useLocation, useHistory } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Scrollbar } from "swiper";
import Loader from "react-loader-spinner";
import { createFileName, useScreenshot } from "use-react-screenshot";
import Moment from "react-moment";
import "moment-timezone";
import dateFormat from "../../helpers/dateFormat";

import GameResult from "./GameResult";
import Modal from "../ModalWindow";
// import FBshare from "../Buttons/FBShare";
// import TwitterShare from "../Buttons/TWShare";
// import ScreenshotButton from "../Buttons/ScreenshotButton";
import TvChannel from "./TvChannel";
// import Location from "./Location";

import "swiper/swiper-bundle.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import styles from "./MainSlider.module.css";

SwiperCore.use([Navigation, Scrollbar]);

export default function MainSlider({
  league,
  team,
  teamNickname,
  slides,
  isLoading,
  currentGameIndex,
}) {
  const history = useHistory();
  // const currentURL = useLocation();

  const [allGames, setAllGames] = useState(slides);
  const [currGame, setCurrGame] = useState(currentGameIndex);

  useEffect(() => {
    setAllGames(slides);
    setCurrGame(currentGameIndex);
  }, [slides, currentGameIndex]);

  // console.log("allGames", allGames);
  // console.log("currGame", currGame);

  const [progress, setProgress] = useState(currentGameIndex);

  const [currentTeam, setCurrentTeam] = useState("");
  const [opponent, setOpponent] = useState("");
  const [gameIndex, setGameIndex] = useState(null);

  const [image, takeScreenShot] = useScreenshot();
  const [isShowModal, setIsShowModal] = useState(false);

  //** number of all games in array */
  const allSlides = allGames?.length;

  //** CREATE REFs ARRAY OF ALL GAMES - NEED FOR SCREENSHOT FUNCTION  */
  const refsArr = [...new Array(allSlides?.length)]?.map((_, index) => index);
  const screenshotRef = useRef(refsArr);
  const saveRefs = (index) => (element) => {
    screenshotRef.current[index] = element;
  };

  //** URL CHANGE */

  useEffect(() => {
    history.replace(
      `/${league.toLowerCase()}/${team
        .toLowerCase()
        .replace(" ", "")}${teamNickname.toLowerCase()}/games/${progress}`
    );
  }, [progress, history, team, league, teamNickname]);

  //** DOWNLOAD SCREENSHOT IMAGE */
  useEffect(() => {
    if (image) {
      download(image, { name: "sample-image", extension: "png" });
    }
  }, [image]);

  //** FIND event_id FUNCTION */
  function slideChanged(index) {
    if (!allGames) return;
    const oneGame = allGames[index]?.event_id;
    if (oneGame) {
      setProgress(oneGame);
    }
  }

  //** SCREENSHOT FUNCTION */
  const getScreenshot = () => {
    if (screenshotRef.current[progress])
      takeScreenShot(screenshotRef.current[progress]);
  };

  //** DOWNLOAD SCREENSHOT FUNCTION */
  function download(image, { name = "img", extension = "png" } = {}) {
    const a = document.createElement("a");
    a.href = image;
    a.download = createFileName(extension, name);
    a.click();
  }

  //** SHOW/HIDE MODAL INFO WINDOW FUNCTIONS */
  const handleShow = (id, team, team2) => {
    setGameIndex(id);
    setCurrentTeam(team);
    setOpponent(team2);
    setIsShowModal(true);
  };

  const handleClose = () => {
    setIsShowModal(false);
  };

  return (
    <>
      <Modal
        show={isShowModal}
        handleClose={handleClose}
        currentGameIndex={gameIndex}
        currentTeam={currentTeam}
        opponent={opponent}
      />
      {isLoading ? (
        <Loader
          type="TailSpin"
          color="#ff3366"
          height={200}
          width={200}
          timeout={3000}
          className="main-page-loader-cont"
        />
      ) : (
        <div className={styles.sliderContainer}>
          <div className={styles.socialBtnWraper}>
            {/* <ScreenshotButton getScreenshot={getScreenshot} />
            <FBshare url={currentURL.pathname} image={image} />
            <TwitterShare url={currentURL.pathname} /> */}
          </div>
          <Swiper
            id="main-slider"
            tag="section"
            wrapperTag="ul"
            navigation
            scrollbar={{ draggable: true }}
            slidesPerView={1}
            grabCursor={true}
            onSlideChange={(swiper) => {
              slideChanged(swiper.activeIndex);
            }}
            initialSlide={currGame || 1}
          >
            {allGames?.map((slide, index) => (
              <SwiperSlide key={slide.event_id} tag="li">
                <div className="screenshot-container" ref={saveRefs(index)}>
                  <div className={styles.teamWraper}>
                    <div>
                      <span
                        className={`${styles.teamsMainTitle} ${styles.cityName}`}
                      >
                        {team}
                      </span>{" "}
                      {league === "NBA" && (
                        <span className={styles.teamsMainTitle}>
                          {teamNickname}
                        </span>
                      )}
                    </div>
                    <span className={styles.versus}>
                      {slide.event_location === "0" ||
                      slide.event_location === "2"
                        ? "VS"
                        : "AT"}
                    </span>
                    <span className={styles.teamsMainTitle}>
                      {slide.event_text}
                    </span>
                  </div>
                  <div className={styles.dateContainer}>
                    <Moment element="span" format="dddd, MMMM D,  YYYY">
                      {dateFormat(slide.event_start)}
                    </Moment>{" "}
                    <span>@</span>{" "}
                    <Moment element="span" format="hh:mm A z">
                      {dateFormat(slide.event_start)}
                    </Moment>
                  </div>
                  <TvChannel channel={slide.event_tv_channel} />
                  <GameResult
                    date={slide.event_start}
                    result={slide.event_outcome}
                  />
                  {/* {slide.event_physical_location && (
                    <Location location={slide.event_physical_location} />
                  )} */}
                </div>
                {/* <button
                  type="button"
                  id={slide.event_id}
                  onClick={() =>
                    handleShow(slide.event_id, team, slide.event_text)
                  }
                  className={styles.infoBtn}
                >
                  <svg
                    id="Capa_1"
                    enableBackground="new 0 0 524.235 524.235"
                    height="512"
                    viewBox="0 0 524.235 524.235"
                    width="512"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g fill="#ff0241">
                      <path d="m262.118 0c-144.53 0-262.118 117.588-262.118 262.118s117.588 262.118 262.118 262.118 262.118-117.588 262.118-262.118-117.589-262.118-262.118-262.118zm17.05 417.639c-12.453 2.076-37.232 7.261-49.815 8.303-10.651.882-20.702-5.215-26.829-13.967-6.143-8.751-7.615-19.95-3.968-29.997l49.547-136.242h-51.515c-.044-28.389 21.25-49.263 48.485-57.274 12.997-3.824 37.212-9.057 49.809-8.255 7.547.48 20.702 5.215 26.829 13.967 6.143 8.751 7.615 19.95 3.968 29.997l-49.547 136.242h51.499c.01 28.356-20.49 52.564-48.463 57.226zm15.714-253.815c-18.096 0-32.765-14.671-32.765-32.765 0-18.096 14.669-32.765 32.765-32.765s32.765 14.669 32.765 32.765c0 18.095-14.668 32.765-32.765 32.765z" />
                    </g>
                  </svg>
                </button> */}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </>
  );
}
