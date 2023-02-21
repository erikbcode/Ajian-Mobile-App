import {useState} from 'react';
import React from 'react';
import { View, Image, Text, ScrollView } from 'react-native';
import MobileOrderButton from '../components/MobileOrderButton';
import { StyleSheet } from 'react-native';
import axios from 'axios';

interface IPost {
  id: number;
  title: string;
  body: string;
}

const defaultPosts:IPost[] = [];

const SocialScreen = () => {

  const [posts, setPosts]: [IPost[], (posts: IPost[]) => void] = React.useState(defaultPosts);
  const [loading, setLoading]: [boolean, (loading: boolean) => void] = React.useState<boolean>(true);
  const [error, setError]: [string, (error: string) => void] = React.useState("");

  React.useEffect(() => {
    axios
    .get<IPost[]>("https://jsonplaceholder.typicode.com/posts")  
    .then(response => {
      setPosts(response.data);
      setLoading(false);
    })
    .catch(ex => {
      const error =
      ex.response.status === 404
        ? "Resource Not found"
        : "An unexpected error has occurred";
      setError(error);
      setLoading(false);
    });
  }, []);

  return(

    <View>
    <ScrollView>
      {posts.map((post) => (

          <View key={post.id}>
              <Text>{post.title}</Text>
              <Text>{post.body}</Text>
            </View>
      ))

      }
    </ScrollView>
    </View>
  )
 /* return (
    <div className="App">
     <ul className="posts">
       {posts.map((post) => (
        <li key={post.id}>
         <h3>{post.title}</h3>
         <p>{post.body}</p>
        </li>
      ))}
     </ul>
     {error && <p className="error">{error}</p>}
   </div>
   );*/

   return (
    <text> post.body</text>
   )
}


/*const SocialScreen = () => {
  
  

  return (
    
  <View>
    <Text>
      {'\n\n\n'}
    </Text>

    <Text>
    </Text>

   

  </View>

 

  );
};*/

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(135, 31, 31)',
  },

  words: {
  fontFamily: 'Aboreto',
  fontSize: 60, 
  textAlign: 'center',
  },
});

export default SocialScreen;