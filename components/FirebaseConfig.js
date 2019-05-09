import * as firebase from 'firebase';

export default class FirebaseConfig {
  constructor() {
    if(!firebase.apps.length) {
      this.init();
    }
    this.observeAuth();
  }

  init = () => {
    firebase.initializeApp({
      apiKey: 'AIzaSyAqVNbGz0SOca6qZ4HppFoMRTyj-QQdqSA',
      authDomain: 'newpr-8a746.firebaseapp.com',
      databaseURL: 'https://newpr-8a746.firebaseio.com',
      projectId: 'newpr-8a746',
      storageBucket: 'newpr-8a746.appspot.com',
      messagingSenderId: '291968886604'

    });
  }

  observeAuth = () => {
    firebase.auth().onAuthStateChanged(this.onAuthStateChanged);
  }

  onAuthStateChanged = user => {
    if(!user) {
      try {
        firebase.auth().signInAnonymously();
      } catch ({message}) {
        alert(message);
      }
    }
  }

  get ref() {
    return firebase.database().ref('messages');
  }

  on = callback =>
    this.ref
      .limitToLast(20)
      .on('child_added', snapshot => callback(this.parse(snapshot)));

  parse = snapshot => {
    const { timestamp: numberStamp, text, user } = snapshot.val();
    const { key: _id } = snapshot;
    const timestamp = new Date(numberStamp);
    const message = {
      _id,
      timestamp,
      text,
      user,
    };

    return message;
  }

  off() {
    this.ref.off();
  }

  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }

  get timestamp() {
    return firebase.database.ServerValue.TIMESTAMP;
  }

  send = (messages) => {
    for (let i = 0; i < messages.length; i++) {
      const { text, user } = messages[i];
      const message = {
        text,
        user,
        timestamp: this.timestamp,
      };
      this.append(message);
    }
  };

  append = message => this.ref.push(message);
}

/*let FirebaseConfig = new FirebaseConfigShared();
export default FirebaseConfig;*/