import firebase from 'firebase';
import { AD_FETCH_SUCCESS } from './types';

export const fetchAds = () => {
    let ads = [];
    ads.push({name:'a'});
    dispatch({type: AD_FETCH_SUCCESS, payload: ads});
    // return(dispatch) =>{
    //     firebase.database().ref('') 
    //     .on('value', snapshot => {
    //         snapshot.forEach(child=>{
    //             ads.push({name: child.val()});
    //         });
    //     }); 
    //     dispatch({type: AD_FETCH_SUCCESS, payload: ads});
    // };
};