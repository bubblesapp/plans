import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {useAPI} from "../api/useAPI";
import {Plan as PlanModel} from '../models/Plan';
import _ from 'lodash';
import {Person} from "./Person";
import {Bubbles} from "./Bubbles";

export const Plan: React.FC = (props) => {
  const {id} = useParams();
  const [loading, setLoading] = useState(true);
  const [plan, setPlan] = useState<PlanModel>();
  const api = useAPI();
  const url = `https://cestquoileplan.com/${id}`;
  useEffect(() => {
    (async () => {
      if (!id) return;
      setLoading(true);
      setPlan(await api.getPlan(id));
      setLoading(false);
    })()
  }, [id])
  return (
    <div className={'plan-bg'}>
      <img src={'./plan_bubble1.png'} id={'plan_bubble1'} alt={'bubble'} />
      <img src={'./plan_bubble2.png'} id={'plan_bubble2'} alt={'bubble'} />
      <div className={'plan-wrapper'}>
        {loading ? (
          <></>
        ) : (
          <>
            <div>
              <p className={'text-medium'}>Bubbles</p>
            </div>
            <img alt={'Bubbles app icon'} src={'./app_icon_512x512.png'} id={'bubbles-icon'} />
            <div>
              <p className={'text-large'}>Faites des plans,<br />intelligemment !</p>
            </div>
            <div className={'plan'}>
              <p className={'text-medium'}>Après le confinement,</p>
              <p className={'text-large'}>{plan?.createdBy}</p>
              <p className={'text-medium'}>a prévu un(e)</p>
              <p className={'text-large'}>{plan?.activity}</p>
              <p className={'text-medium'}>avec</p>
              {_.map(plan?.people, (person, i) => (person.length > 0) ? <Person name={person} key={i} /> : null)}
            </div>
            <div className={'share'}>
              <p>Partager ce plan:</p>
              <p><a href={url}>cestquoileplan.com/{id}</a></p>
            </div>
            <div>
              <p className={'text-medium'}><strong>Et vous ?</strong><br />Après le confinement,<br />c'est quoi le plan ?</p>
            </div>
            <a href={'#footer'} className={'cta'} style={{padding: 0, textDecoration: "none"}}>Créer votre plan</a>
            <hr className={'blue-rule'} />
            <Bubbles />
          </>
        )}
      </div>
    </div>
  );
};
