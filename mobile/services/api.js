import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import {firebaseConfig} from '../config'

class ApiService {
    constructor(fbConfig) {
        firebase.initializeApp(fbConfig)
        this.fb = firebase
    }

    fetchPeople = () => this.fb.firestore()
        .collection('people')
        .get()
        .then(processCollectionResponse)

    onPeopleChange = (callback) => this.fb.firestore()
        .collection('people')
        .onSnapshot(data => callback(processCollectionResponse(data)))

}

function processCollectionResponse(response) {
    return response.docs.map(doc => ({ ...doc.data(), id: doc.id }))
}

export default new ApiService(firebaseConfig)
