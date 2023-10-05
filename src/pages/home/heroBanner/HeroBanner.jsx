import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.scss";
import useFetch from "../../../hooks/useFetch";
import { useSelector } from "react-redux";
import Img from "../../../components/lazyLoadImage/Img";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";


const HeroBanner = () => {
  const [background, setBackground] = useState("");
  const [query, setQuery] = useState("");
  const { url } = useSelector((state) => state.home);
  const navigate = useNavigate();
  const { data, loading } = useFetch(`/movie/upcoming`);
  useEffect(() => {
    const bg =
      url.backdrop +
      data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
    setBackground(bg);
  }, [data]);
  const searchQueryHandler = (e) => {
    if (e.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
    }
  };
  return (
    <div className="heroBanner">
      {!loading && <div className="backdrop-img">
        <Img src={background} />
      </div>}

      <ContentWrapper>
 <div className="opacity-layer"></div>
    
      <div className="wrapper">
        <div className="heroBannerContent">
          <span className="title">Bem Vindo</span>
          <span className="subTitle">
            Milhões de Filmes e Series de Tv para Descobrir, Navegue Agora!
          </span>
          <div className="searchInput">
            <input
              type="text"
              placeholder="O Poderoso Chefão..."
              className="input"
              onChange={(e) => setQuery(e.target.value)}
              onKeyUp={searchQueryHandler}
            />
            <button>Pesquisar</button>
          </div>
          
        </div>
      </div>
      </ContentWrapper>
    </div>
  );
};

export default HeroBanner;
