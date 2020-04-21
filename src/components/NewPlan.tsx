import React, {useState} from 'react';
import _ from "lodash";
import {Button} from "./Button";
import {useAPI} from "../api/useAPI";
import * as yup from 'yup';
import {Plan} from "../models/Plan";
import {useHistory} from 'react-router-dom';

const validationSchema = yup.object().shape({
  activity: yup.string().required().max(255).min(2),
  createdBy: yup.string().required().max(255).min(2),
});
type FormValues = yup.InferType<typeof validationSchema>;
const initialValues: FormValues = {
  activity: '',
  createdBy: '',
};

export const NewPlan: React.FC = ({}) => {
  const [people, setPeople] = useState<string[]>(['Manu'])
  const [createdBy, setCreatedBy] = useState<string>('');
  const [activity, setActivity] = useState<string>('');
  const [isAddingPlan, setIsAddingPlan] = useState(false);
  const api = useAPI();
  const history = useHistory();

  const addPlan = async () => {
    try {
      setIsAddingPlan(true);
      const plan: Plan = {
        createdBy,
        people,
        activity,
      }
      const id = await api.addPlan(plan)
      history.push(`/${id}`)
    } catch (err) {
      console.log(err);
    } finally {
      setIsAddingPlan(false);
    }
  }

  return (
    <div className={'new-bg'}>
      <img src={'./new_bubble1.png'} id={'new_bubble1'} alt={'bubble'} />
      <img src={'./new_bubble2.png'} id={'new_bubble2'} alt={'bubble'} />
      <div className={'new-wrapper'}>
        <div>
          <p className={'text-medium'}>Bubbles</p>
        </div>
        <div>
          <p className={'text-large'}>Faites des plans,<br />intelligemment !</p>
        </div>
        <form>
          <p className={'text-medium'}>Après le confinement,<br />mon premier</p>
          <input type={'text'} name={'activity'} value={activity} onChange={(e) => setActivity(e.target.value)} placeholder={'Apéro, dîner, trip,...'} />
          <p className={'text-medium'}>ce sera avec</p>
          {_.map(people, (person, i) => <input className={'person-input'} type={'text'} name={`person${i}`} key={i} value={person} onChange={(e) => setPeople(people.map((p, index) => (index === i) ? e.target.value : p))} />)}
          <Button label={'+ Ajouter'} onPress={() => {
            console.log('Ajoter');
            setPeople([...people, ''])
          }} />
          <hr className={'white-rule'} />
          <input type={'text'} name={'createdBy'} value={createdBy} onChange={(e) => setCreatedBy(e.target.value)} placeholder={'Votre prénom'} />
          <Button label={'Partager'} onPress={() => addPlan()} />
        </form>
      </div>
    </div>
  )
}
