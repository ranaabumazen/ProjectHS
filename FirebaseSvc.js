import firebase from 'firebase';
import uuid from 'uuid';

const config = {
    apiKey: 'AIzaSyAqVNbGz0SOca6qZ4HppFoMRTyj-QQdqSA',
    authDomain: 'newpr-8a746.firebaseapp.com',
    databaseURL: 'https://newpr-8a746.firebaseio.com',
    projectId: 'newpr-8a746',
    storageBucket: 'newpr-8a746.appspot.com',
    messagingSenderId: '291968886604'
}

class FirebaseSvc {
    state={pass:'',conpass:'',email:''}
  constructor() {
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
     // this.state ={pass:'',conpass:''}
    } else {
      console.log("firebase apps already running...")
    }
  }

  login = async(user,success_callback,failed_callback,EnteringPass) => {
    console.log("logging in");
    var userid = firebase.auth().currentUser
    firebase.database().ref('/users/').on('value', snapshot => {
      
        //pass= snapshot.val().password;
       
       
         
      });
  
    if(EnteringPass === pass){
       /* success_callback = true,
        failed_callback=false,*/
        console.log('INSERTED !');
        firebase.auth().signInAnonymously().then(success_callback, failed_callback).
        catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // ...
        });
       // const output = await firebase.auth().signInWithEmailAndPassword(user.email, passs)
    
       
        /*this.props.navigation.navigate('Chat', {
            name: this.state.name,
            //email: this.state.email,
            avatar: this.state.avatar,
          });*/
        
    }
    
        
    else {
        console.log('error');
      
    }
      }
    
  

  observeAuth = () =>
    firebase.auth().onAuthStateChanged(this.onAuthStateChanged);

  onAuthStateChanged = user => {
    if (!user) {
      try {
        this.login(user);
      } catch ({ message }) {
        console.log("Failed:" + message);
      }
    } else {
      console.log("Reusing auth...");
    }
  };

  createAccount = async (user) => {
      var currUser = firebase.auth().currentUser
   firebase.database().ref('/users/'+currUser.uid)
    .update({
      password:user.NewPassword
  
    }).then(function(){
        var userf = firebase.auth().currentUser;
        userf.updateProfile({ displayName: user.name})
        .then(function() {
          console.log("Updated displayName successfully. name:" + user.name);
          alert("User " + user.name + " was created successfully. Please login.");
        }, function(error) {
          console.warn("Error update displayName.");
        });
      }, function(error) {
        console.error("got error:" + typeof(error) + " string:" + error.message);
        alert("Create account failed. Error: "+error.message);
      });


    /*firebase.auth()
      .createUserWithEmailAndPassword(user.email, user.password)
      .then(function() {
        console.log("created user successfully. User email:" + user.email + " name:" + user.name);*/
     
  }

  uploadImage = async uri => {
    console.log('got image to upload. uri:' + uri);
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      const ref = firebase
        .storage()
        .ref('avatar')
        .child(uuid.v4());
      const task = ref.put(blob);
    
      return new Promise((resolve, reject) => {
        task.on(
          'state_changed',
          () => {
              /* noop but you can track the progress here */
          },
          reject /* this is where you would put an error callback! */,
          () => resolve(task.snapshot.downloadURL)
        );
      });
    } catch (err) {
      console.log('uploadImage try/catch error: ' + err.message); //Cannot load an empty url
    }
  }

  updateAvatar = (url) => {
    //await this.setState({ avatar: url });
    var userf = firebase.auth().currentUser;
    if (userf != null) {
      userf.updateProfile({ avatar: url})
      .then(function() {
        console.log("Updated avatar successfully. url:" + url);
        alert("Avatar image is saved successfully.");
      }, function(error) {
        console.warn("Error update avatar.");
        alert("Error update avatar. Error:" + error.message);
      });
    } else {
      console.log("can't update avatar, user is not login.");
      alert("Unable to update avatar. You must login first.");
    }
  }
     
  onLogout = user => {
    firebase.auth().signOut().then(function() {
      console.log("Sign-out successful.");
    }).catch(function(error) {
      console.log("An error happened when signing out");
    });
  }

  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }

  get ref() {
    return firebase.database().ref('messages');
  }

  parse = snapshot => {
    const { timestamp: numberStamp, text, user } = snapshot.val();
    const { key: id } = snapshot;
    const { key: _id } = snapshot; //needed for giftedchat
    const timestamp = new Date(numberStamp);

    const message = {
      id,
      _id,
      timestamp,
      text,
      user,
    };
    return message;
  };

  refOn = callback => {
    this.ref
      .limitToLast(20)
      .on('child_added', snapshot => callback(this.parse(snapshot)));
  }

  get timestamp() {
    return firebase.database.ServerValue.TIMESTAMP;
  }
  
  // send the message to the Backend
  send = messages => {
    for (let i = 0; i < messages.length; i++) {
      const { text, user } = messages[i];
      const message = {
        text,
        user,
        createdAt: this.timestamp,
      };
      this.ref.push(message);
    }
  };

  refOff() {
    this.ref.off();
  }
}

const firebaseSvc = new FirebaseSvc();
export default firebaseSvc;
