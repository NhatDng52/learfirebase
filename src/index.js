// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import{
  getFirestore,collection,onSnapshot,addDoc, deleteDoc, doc,
  query, where 
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCQVhfhnMG3TPsgZaX2viK1AKiruUkpBvc",
  authDomain: "laptrinhnangcao-aeb32.firebaseapp.com",
  projectId: "laptrinhnangcao-aeb32",
  storageBucket: "laptrinhnangcao-aeb32.appspot.com",
  messagingSenderId: "280682153048",
  appId: "1:280682153048:web:73242b55214b6e9ec4762d",
  measurementId: "G-HBRLQSWFDL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore();
const colRef = collection(db,'books');
const q = query(colRef,where("author","==","patrick rothfuss"))

onSnapshot(q,(snapshot) =>{
    let books = []
    snapshot.docs.forEach((doc)=> {
      books.push({ ...doc.data(), id: doc.id})
    })
    console.log(books)
  })
  //adding documents
  const addBookForm = document.querySelector(' .add')
  addBookForm.addEventListener('submit',(e) =>{
    e.preventDefault()
    addDoc(colRef,{
      title: addBookForm.title.value,
      author: addBookForm.author.value
    })
    .then(()=>{
      addBookForm.reset()
    })
  })
  // deleting documents
  const deleteBookForm = document.querySelector('.delete')
  deleteBookForm.addEventListener('submit',(e)=>{
    e.preventDefault()

    const docRef = doc(db, 'books', deleteBookForm.id.value)

    deleteDoc(docRef)
      .then(()=>{
        deleteBookForm.reset()
      })
  })