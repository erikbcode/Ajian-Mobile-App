import React, {useState, useEffect} from 'react';
import { database } from "../firebaseConfig";
import { Header } from '../components';
import { ref, set, get, onValue, push, update, remove, Query} from 'firebase/database';
import 'firebase/database';

const announcementsRef = ref(database, `Announcements`);

const Announcements = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  var [Announcements, setAnnouncements] = useState([]);

  //Maintain variable
  useEffect(() => {

    //Retrieve the data from firebase
    get (announcementsRef).then((snapshot) => {
      setAnnouncements(snapshot.val());
    })

  }, [Announcements])
  const keys = Object.keys(Announcements);

  //Convert the strings into numbers for use in indexing
    const lookup = keys.map((key) => Number(key));
    const lastKey = lookup.length;

  function handleAddAnnouncement() {
    update(announcementsRef, {
      [lastKey]: content,
    });
    setContent("");
  }

  return(
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
    <Header title="Announcements" />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(event) => setContent(event.target.value)}
      ></textarea>
      <button 
        type = "button"
        className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block"
        onClick={handleAddAnnouncement}>Add Announcement</button>
      <ul>
        {/* Display a list of announcements */}
      </ul>
      
    </div>
  );
  
}
export default Announcements;