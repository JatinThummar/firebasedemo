import logo from "./logo.svg";
import "./App.css";
import { Auth } from "./component/Auth";

import { db, auth, storage } from "./config/firebase";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import { useEffect, useState } from "react";

function App() {
  const [movieList, setMovieList] = useState([]);

  // New Movie States
  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newReleaseDate, setNewReleaseDate] = useState(0);
  const [rating, setRating] = useState(0);

  // Update Title State
  const [updatedTitle, setUpdatedTitle] = useState("");

  // File Upload State
  const [fileUpload, setFileUpload] = useState(null);

  const moviesCollectionRef = collection(db, "movies");

  const getMovieList = async () => {
    try {
      const data = await getDocs(moviesCollectionRef);
      const filteredData = data.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      }));
      console.log("filteredData", filteredData);
      setMovieList(filteredData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getMovieList();
  }, []);

  const onSubmitMovie = async () => {
    try {
      await addDoc(moviesCollectionRef, {
        title: newMovieTitle,
        releaseDate: newReleaseDate,
        rating: rating,
        userId: auth?.currentUser?.uid,
      });
      getMovieList();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteMovie = async id => {
    const movieDoc = doc(db, "movies", id);
    console.log("movieDoc", movieDoc);
    await deleteDoc(movieDoc);
    getMovieList();
  };

  const updateMovieTitle = async id => {
    const movieDoc = doc(db, "movies", id);
    await updateDoc(movieDoc, { title: updatedTitle });
    getMovieList();
  };

  const uploadFile = async () => {
    if (!fileUpload) return;
    const filesFolderRef = ref(storage, `projectFiles/${fileUpload.name}`);
    try {
      await uploadBytes(filesFolderRef, fileUpload);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="App">
      <Auth />

      <div>
        <input
          placeholder="Movie title..."
          onChange={e => setNewMovieTitle(e.target.value)}
        />
        <input
          placeholder="Release Date..."
          type="number"
          onChange={e => setNewReleaseDate(Number(e.target.value))}
        />
        <input
          type="number"
          value={rating}
          onChange={e => setRating(e.target.value)}
        />
        <button onClick={onSubmitMovie}> Submit Movie</button>
      </div>

      <div>
        {movieList.map(movie => (
          <div>
            <h3 style={{ color: "green" }}>{movie.title}</h3>
            <p> Date: {movie.releaseDate} </p>
            <p> Rating: {movie.rating} </p>

            <button onClick={() => deleteMovie(movie.id)}> Delete Movie</button>

            <input
              placeholder="new title..."
              onChange={e => setUpdatedTitle(e.target.value)}
            />
            <button onClick={() => updateMovieTitle(movie.id)}>
              {" "}
              Update Title
            </button>
          </div>
        ))}
      </div>

      <div>
        <input type="file" onChange={e => setFileUpload(e.target.files[0])} />
        <button onClick={uploadFile}> Upload File </button>
      </div>
    </div>
  );
}

export default App;
