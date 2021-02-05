import React, { useState, useEffect, useRef } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Scrollbar } from "swiper";
import Loader from "react-loader-spinner";
import { createFileName, useScreenshot } from "use-react-screenshot";
import Moment from "react-moment";
import "moment-timezone";
import dateFormat from "../../helpers/dateFormat";
import "swiper/swiper-bundle.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import GameResult from "../GameResult";
import Modal from "../Modal";
import FBshare from "../FBshare";
// import HelmetMetaData from "../HelmetMetaData";
import TwitterShare from "../TwitterShare";
import ScreenshotIcon from "../../img/icons/screenshot-icon.svg";
import ScreenshotButton from "../SreenshotButton";
import TvChannel from "../TvChannel";
import Location from "../Location";

SwiperCore.use([Navigation, Scrollbar]);

export default function MainSlider({
  team,
  slides,
  isLoading,
  currentGameIndex,
}) {
  const history = useHistory();

  // const currentGame = useSelector((state) => state?.games?.current);
  // console.log("currentGame", currentGame);

  //number of all slides
  const allSlides = slides?.length;

  const [progress, setProgress] = useState(currentGameIndex);
  const currentURL = useLocation();

  const [currentTeam, setCurrentTeam] = useState("");
  const [opponent, setOpponent] = useState("");
  const [gameIndex, setGameIndex] = useState(null);

  const [image, takeScreenShot] = useScreenshot();
  const [isShowModal, setIsShowModal] = useState(false);

  // create refs array of all games slides - need for screenshot
  const refsArr = [...new Array(allSlides?.length)]?.map((_, index) => index);
  const screenshotRef = useRef(refsArr);
  const saveRefs = (index) => (element) => {
    screenshotRef.current[index] = element;
  };

  useEffect(() => {
    history.replace(`/${team}/games/${progress}`);
  }, [progress, history, team]);

  useEffect(() => {
    if (image) {
      download(image, { name: "sample-image", extension: "png" });
    }
  }, [image]);

  function slideChanged(index) {
    setProgress(index);
  }

  //screnshot function
  const getScreenshot = () => {
    if (screenshotRef.current[progress])
      takeScreenShot(screenshotRef.current[progress]);
  };

  // download sreenshot function
  function download(image, { name = "img", extension = "png" } = {}) {
    const a = document.createElement("a");
    a.href = image;
    a.download = createFileName(extension, name);
    a.click();
  }

  // modal functions show - hide
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
      {/* <HelmetMetaData></HelmetMetaData> */}
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
        />
      ) : (
        <div className="slider-container">
          <div className="social-btn-wraper">
            <ScreenshotButton
              getScreenshot={getScreenshot}
              ScreenshotIcon={ScreenshotIcon}
            />
            <FBshare url={currentURL.pathname} image={image} />
            <TwitterShare url={currentURL.pathname} />
          </div>

          {/* <div className="navigation-wrapper">
          <HomeButton />
        </div> */}

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
            initialSlide={currentGameIndex}
          >
            {slides?.map((slide, index) => (
              <SwiperSlide key={slide.event_id} tag="li">
                <div className="screenshot-container" ref={saveRefs(index)}>
                  <div className="team-wraper">
                    <span className="teams-main-title">{team}</span>
                    <span className="versus">
                      {slide.event_location === "0" ||
                      slide.event_location === "2"
                        ? "VS"
                        : "AT"}
                    </span>
                    <span className="teams-main-title">{slide.event_text}</span>
                  </div>
                  <div className="date-container">
                    <Moment element="span" format="dddd, MMMM D,  YYYY">
                      {dateFormat(slide.event_start)}
                    </Moment>{" "}
                    <span>@</span>{" "}
                    <Moment element="span" format="hh:mm A z">
                      {dateFormat(slide.event_start)}
                    </Moment>
                    {/* <p>{slide.is_current_event ? "current game" : ""}</p> */}
                  </div>
                  <TvChannel channel={slide.event_tv_channel} />
                  <GameResult
                    date={slide.event_start}
                    result={slide.event_outcome}
                  />
                  {slide.event_physical_location && (
                    <Location location={slide.event_physical_location} />
                  )}
                </div>
                <button
                  type="button"
                  id={slide.event_id}
                  onClick={() =>
                    handleShow(slide.event_id, team, slide.event_text)
                  }
                  className="info-btn"
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
                </button>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </>
  );
}
