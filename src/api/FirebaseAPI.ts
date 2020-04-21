import {API} from "./API";
import {Plan} from "../models/Plan";
import * as firebase from 'firebase/app';
import 'firebase/firestore';

export class FirebaseAPI implements API {
  constructor() {
    const config = {
      projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    };
    this.app = firebase.initializeApp(config);
  }

  app: firebase.app.App;

  getPlan = async (id: string): Promise<Plan> => {
    const doc = await this.app.firestore().collection('plans').doc(id).get();
    return doc.data() as Plan;
  }

  addPlan = async (plan: Plan): Promise<string> => {
    const ref = await this.app.firestore().collection('plans').add(plan);
    return ref.id;
  }

  addEmail = async (email: string): Promise<void> => {
    await this.app.firestore().collection('emails').add({email});
  }
}
