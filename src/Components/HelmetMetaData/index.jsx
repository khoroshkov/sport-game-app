import React from "react";
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";

export default function HelmetMetaData({ quote, title, img, desc, hashtag }) {
  let location = useLocation();
  const baseURl = "https://joebredley.com";
  let currentUrl = baseURl + location.pathname;
  let mainQuote = quote !== undefined ? quote : "Sample text for quote";
  let mainTitlle =
    title !== undefined
      ? title
      : "Sample main title of Joe Bredley website for sport games";
  let image =
    img !== undefined
      ? img
      : "https://images.unsplash.com/photo-1541335958429-e7b267c834b0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80";
  let description =
    desc !== undefined
      ? desc
      : "This is a sample description of shared page from Joe Bradley website! ";
  let hashtags =
    hashtag !== undefined
      ? hashtag
      : [
          "#sport",
          "#americanfootbal",
          "#game",
          "#bigbluetime",
          "#sportgame",
          "#usa",
          "#kentucky",
        ];
  return (
    <Helmet>
      <title>{mainTitlle}</title>
      <meta charset="utf-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="csrf_token" content="" />
      <meta property="type" content="website" />
      <meta property="url" content={currentUrl} />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
      <meta name="theme-color" content="#ffffff" />
      <meta name="_token" content="" />
      <meta name="robots" content="noodp" />
      <meta property="title" content={title} />
      <meta property="quote" content={mainQuote} />
      <meta name="description" content={description} />
      <meta property="image" content={image} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:quote" content={mainQuote} />
      <meta
        property="og:hashtag"
        content={hashtags.map((hashtag) => hashtag)}
      />
      <meta property="og:image" content={image} />
      <meta content="image/*" property="og:image:type" />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:site_name" content="CampersTribe" />
      <meta property="og:description" content={description} />
    </Helmet>
  );
}
