import React, {useState} from 'react';
import {Button} from "./Button";
import {useAPI} from "../api/useAPI";
import {useHistory} from 'react-router-dom';

export const Bubbles: React.FC = (props) => {
  const api = useAPI();
  const history = useHistory();
  const [agrees, setAgrees] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [isAddingEmail, setIsAddingEmail] = useState(false);

  const addEmail = async () => {
    try {
      setIsAddingEmail(true);
      if (agrees) {
        await api.addEmail(email);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsAddingEmail(false);
      history.push('/');
    }
  }

  return (
    <>
      <div>
        <p className={'text-large'}>Rejoignez la communauté</p>
      </div>
      <img alt={'Bubbles app icon'} src={'./app_icon_512x512.png'} id={'bubbles-icon'} />
      <p className={'text-large'}>Bubbles</p>
      <a href={'https://bubbles.community'}>https://bubbles.community</a>
      <div className={'bubbles-list-wrapper'}>
        <div className={'bubbles-list'}>
          <p className={'emoji'}>💞</p>
          <p className={'item-text'}>Veillez sur vos proches<br />et vos amis.</p>
        </div>
        <div className={'bubbles-list'}>
          <p className={'emoji'}>🔔</p>
          <p className={'item-text'}>Alertez et soyez alerté<br />anonymement en cas de<br />contamination possible.</p>
        </div>
        <div className={'bubbles-list'}>
          <p className={'emoji'}>🔒</p>
          <p className={'item-text'}>Gratuit, sans GPS ni Bluetooth,<br />respectueux de votre vie privée.</p>
        </div>
      </div>
      <div className={'bubbles-footer'}>
        <a id={'footer'} />
        <p>En attendant la sortie de Bubbles<br />et le déconfinement</p>
        <input type={'text'} name={'email'} id={'email-input'} value={email} onChange={(e) => setEmail(e.target.value)} placeholder={'Email'} />
        <div className={'agree'}>
          <input type="checkbox" checked={agrees} onChange={(e) => setAgrees(e.target.checked)} id="agree" name="agree" />
          <label htmlFor="agree">Me tenir informé par e-mail<br />de l'avancement du projet Bubbles</label>
        </div>
        <Button label={'Être tenu informé'} onPress={() => addEmail()} />
      </div>
      <Button label={'Créer votre plan'} onPress={() => addEmail()} />
    </>
  )
}
