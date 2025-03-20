import React, { useEffect, useState } from "react";
import "./Treinamento.css";
import InfiniteScroll from "react-infinite-scroll-component";
import { videoArray } from "./videoArray.js";
import YouTube from "react-youtube";
import ListaDeVideos from "./ListaDeVideos";
import empresaLogo from "../../assets/logo-branco-info.png";
import styled from "styled-components";

const DownloadButton = styled.button`
  background-color: #5b0390;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-family: "Montserrat", "sans-serif";
  margin-top: 20px;
  &:hover {
    background-color: #470270;
  }
`;

const Treinamentos = () => {
  const [dados, setDados] = useState({});
  const [dataSource, setDataSource] = useState(videoArray);
  const [videoIndex, setVideoIndex] = useState(0);

  const changeIndex = (index: number) => {
    setVideoIndex(index);
  };

  const opts: any = {
    width: "100%",
    height: window.innerWidth < 1024 ? "360" : "570",
    playerVars: {
      autoplay: 0,
    },
  };

  return (
    <div className="main-training-container">
      <div className="main-training-content">
        <div className="main-video-container">
          <p className="class-name">{dataSource[videoIndex].titulo}</p>
          <h5 className="playlist-name">Playlist de treinamentos</h5>

          <YouTube
            videoId={dataSource[videoIndex].videoId}
            opts={opts}
            title={"Teste"}
          />
          {videoIndex == 0 ||
          videoIndex == 2 ||
          videoIndex == 3 ||
          videoIndex == 7 ? (
            <DownloadButton>
              <a
                style={{ textDecoration: "none", color: "white" }}
                target="blank"
                href={require(`./aula${videoIndex + 1}.pdf`)}
              >
                Baixar material de apoio
              </a>
            </DownloadButton>
          ) : (
            ""
          )}
        </div>
        <div className="playlist-section">
          <div className="progress-section">
            <img width={"20%"} src={empresaLogo} alt="" />
          </div>

          <div className="classes-main-container">
            <div>
              <InfiniteScroll
                endMessage={<p>Você finalizou o treinamento!</p>}
                dataLength={dataSource.length}
                height={500}
                hasMore={false}
                next={() => {}}
                loader={<p>Carregando...</p>}
              >
                {dados && dataSource && (
                  <ListaDeVideos
                    dados={dados}
                    fn={changeIndex}
                    dataSource={dataSource}
                  />
                )}
              </InfiniteScroll>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Treinamentos;
