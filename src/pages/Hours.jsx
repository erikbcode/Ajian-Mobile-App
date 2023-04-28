import React, {useState, useEffect} from 'react'
import { database } from "../firebaseConfig";
import { Header } from '../components';
import { ref, set, get, onValue, push, update, remove, Query} from 'firebase/database';
import 'firebase/database';

const hoursRef = ref(database, `Hours`);

const Hours = () => {
  const [content, setContent] = useState("");
  var [hours, setHours] = useState([]);

  return (
  <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
    <Header title="Hours" />
    <textarea
        placeholder="Content"
        value={content}
        onChange={(event) => setContent(event.target.value)}
      ></textarea>
  </div>
  );
}

export default Hours