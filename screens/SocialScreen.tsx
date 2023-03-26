import {useState, useEffect} from 'react';
import React from 'react';
import {View, Image, Text, ScrollView,  } from 'react-native';
import MobileOrderButton from '../components/MobileOrderButton';
import { StyleSheet } from 'react-native';
import axios from 'axios';
import database from '@react-native-firebase/database';
import { firebase } from '@react-native-firebase/database';


interface IPost {
  id: number;
  title: string;
  body: string;
  text: string;
}

const defaultPosts:IPost[] = [];

const reference = firebase
  .app()
  .database('https://ajian-mobile-app-default-rtdb.firebaseio.com/')
  .ref('/Announcements/Top')
  .once('value')
  .then(snapshot => {
    console.log('User data: ', snapshot.val());
  });

const SocialScreen = () => {

  
 /* const [posts, setPosts]: [IPost[], (posts: IPost[]) => void] = React.useState(defaultPosts);
  const [loading, setLoading]: [boolean, (loading: boolean) => void] = React.useState<boolean>(true);
  const [error, setError]: [string, (error: string) => void] = React.useState("");

  React.useEffect(() => {
    axios
    .get<IPost[]>("https://jsonplaceholder.typicode.com/posts")  
    //.get<IPost[]>("https://api.twitter.com/2/users/863195788167565313/tweets")  
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

    <View style = {styles.container}>
    <ScrollView>
      {posts.map((post) => (

          <View key={post.id} style = {styles.tweetBox}>
              <Text style = {styles.title}>{post.title + '\n'}</Text>
              <Text style = {styles.text}>{post.body + '\n'}</Text>
            </View>
      ))

      }
    </ScrollView>

    </View>
    
  )*/

  database()
  .ref('/users/123')
  .once('value')
  .then(snapshot => {
    console.log('User data: ', snapshot.val());
  });




  
}


const styles = StyleSheet.create({
  container: {
    borderColor: 'rgb(135, 31, 31)', 
    borderWidth: 5, 
    backgroundColor: 'rgb(135, 31, 31)'  
  },

  text: {
  fontFamily: 'Aboreto',
  fontSize: 12, 
  textAlign: 'center',
  backgroundColor: 'rgb(254, 251, 234)'
  },

  title: {
    fontFamily: 'Times New Roman',
    fontSize: 12, 
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: 'rgb(254, 251, 234)'
    },

  tweetBox: {
    borderColor: 'rgb(135, 31, 31)', 
    borderWidth: 20
  }
});

export default SocialScreen;