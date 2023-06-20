import React, { useEffect, useState } from "react"
import './App.css';
import Video from './pages/Video';
import db from './config/firebase';
import { collection, getDocs } from "firebase/firestore/lite"

function App() {

  let maxHeight;
  if(window.innerHeight <= 800){
    maxHeight = window.innerHeight
  }

  const [video, setVideos] = useState([])

  async function getVideos() {
    const videosCollection = collection(db, "videos")
    const videosSnapshot = await getDocs(videosCollection)
    const videosList = videosSnapshot.docs.map(doc => doc.data())
    setVideos(videosList)
  }

  useEffect(() => {
    getVideos();

  }, [])

  return (
    <div className="App" style={{ maxHeight: maxHeight + "px" }}>
      <div className="app__videos">

        {video.map((item) => {
          return (
            <Video
              likes={item.likes}
              messages={item.messages}
              shares={item.shares}
              name={item.name}
              description={item.description}
              music={item.music}
              url={item.url}
            />
          )
        })}


        {/* <Video
          likes={444}
          messages={555}
          shares={666}
          name="Pedro"
          description="Gato olhando"
          music="Clap your hands"
          url="https://firebasestorage.googleapis.com/v0/b/tiktok---jornada-41da6.appspot.com/o/Download.mp4?alt=media&token=56f49ab8-9dab-4e57-8c3c-45e3573a92da"
        /> */}


      </div>
    </div>
  );
}

export default App;
