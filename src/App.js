import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import MovieList from "./components/MovieList";
import MovieListHeading from "./components/MovieListHeading.jsx";
import ScrollContainer from "react-indiana-drag-scroll";
import SearchBox from "./components/SearchBox ";

function App() {
  const [movies, setMovies] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  //검색어로 영화데이터 요청
  const getMovieRequest = async (searchValue) => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=581b2060`;

    //자바스크립트는 비동기이므로 await를 붙여서 영화데이터를 다바도 다음코드 실행
    //async/awit 함께 사용 둘중하나 없으면 에러
    const response = await fetch(url);
    const responseJson = await response.json();
    if (responseJson.Search) {
      //결과가 있을경우에만 업데이트 없는데 업데이트해서 오류남
      setMovies(responseJson.Search);
    }
  };

  //검색어가 바뀔때 한번 함수 실행 2자이상시
  useEffect(() => {
    if (searchValue.length > 3) {
      getMovieRequest(searchValue);
    }
  }, [searchValue]);

  //브라우저 저장소에서 선호작 영화들을 가져옴 앱 시작시 1번 실행
  useEffect(() => {
    const movieFavourites = JSON.parse(localStorage.getItem("favourites"));
    if (movieFavourites) {
      setFavourites(movieFavourites);
    }
  }, []);

  //브라우저에 저장하기
  const saveToLocalStorage = (items) => {
    localStorage.setItem("favourites", JSON.stringify(items));
  };

  //선호작에 영화를 추가하기
  const addFavouriteMovie = (movie) => {
    const newList = [...favourites, movie];
    setFavourites(newList); //새 선호작으로 업데이트
    saveToLocalStorage(newList); //저장하기
  };

  //선호작을 제거하는 함수(id가 같으면 필터로 제거)
  const removeMovie = (movie) => {
    const newList = favourites.filter(
      (favourite) => favourite.imdbID !== movie.imdbID
    );

    setFavourites(newList);
    saveToLocalStorage(newList);
  };

  return (
    <div className="container-fluid movie-app">
      <div className="row align-items-center my-4 ">
        <MovieListHeading heading="영화 검색과 선호작 등록" />
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>
      <ScrollContainer className="row scroll-container">
        <MovieList
          movies={movies}
          handleClick={addFavouriteMovie}
          addMovie={true}
        />
      </ScrollContainer>
      <div className="row align-items-center my-4 ">
        <MovieListHeading heading="내선호작" />
      </div>
      <ScrollContainer className="row scroll-container">
        <MovieList
          movies={favourites}
          handleClick={removeMovie}
          addMovie={false}
        />
      </ScrollContainer>
    </div>
  );
}

export default App;
