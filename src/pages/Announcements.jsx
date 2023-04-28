import React, {useState, useEffect} from 'react';
import { database } from "../firebaseConfig";
import { Header } from '../components';
import { ref, set, get, onValue, push, update, remove, Query, child, removeValue} from 'firebase/database';
import 'firebase/database';

const announcementsRef = ref(database, `Announcements`);
const messages = [];

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
  const keys = Announcements;
  //console.log(Announcements);
  //const ids = Object.id(Announcements);
  
  //console.log(Announcements.id);

  //Convert the strings into numbers for use in indexing
    const lookup = Announcements.map((key) => Number(key));
    const lastKey = lookup.length;

  function handleAddAnnouncement() {
    update(announcementsRef, {
      [lastKey]: content,
    });
    setContent("");
  }

  function handleDeleteAnnouncement(idNum) {
    console.log("Announements: " + Announcements);
    console.log("ID:\n" + idNum);
    const announcementRef = ref(database, `Announcements/${idNum}`);
    remove(announcementRef);
    //removeValue(announcementsRef);
  }


  return(
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
    <Header title="Add New Announcement:" />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(event) => setContent(event.target.value)}
      ></textarea>
      <button 
        type = "button"
        className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block"
        onClick={handleAddAnnouncement}>Add Announcement</button>
        <br></br>
        <br></br>
        <Header title="Current Announcements:" />
        
      <ul>
      {Announcements.map((singleAnnouncement, index) => (
        index !== 0 && (
        <li key={singleAnnouncement} style={{ display: 'flex', alignItems: 'center' }}>
          <p 
            style={{ border: '1px solid black', padding: '10px', marginBottom: '10px' }}>{singleAnnouncement}</p>
          <button 
            type = "button"
            className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block"
            onClick={() => handleDeleteAnnouncement(Announcements.indexOf(singleAnnouncement))}>
            Delete
          </button>
        </li>
      )))}
    </ul>
      
    </div>
  );
  
}
export default Announcements;