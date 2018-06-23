import fire from 'firebase'

const config = {
    apiKey: "AIzaSyBFPIdZzDtOGLvSFu_lXXDqiv6IwPWhhso",
    authDomain: "mime-wireframes.firebaseapp.com",
    databaseURL: "https://mime-wireframes.firebaseio.com",
    projectId: "mime-wireframes",
    storageBucket: "",
    messagingSenderId: "112640428638"
  };

fire.initializeApp(config);

export default fire;