import {useEffect, useState} from 'react'
//this custom hook save data on the local storage

const PREFIX = 'whatsApp-clone-'; //to prevent conflict inside local storage with other apps
export default function useLocalStorage(key, initialValue) {
   const prefixedKey = PREFIX + key;
   const [value, setValue] = useState(()=>{
       const jsonValue = localStorage.getItem(prefixedKey);
       
       if (jsonValue!= null) return JSON.parse(jsonValue)

       if(typeof initialValue === 'function'){
           return initialValue()
       }else{
           return initialValue
       }
   })

   useEffect(() => {
     localStorage.setItem(prefixedKey, JSON.stringify(value));
   }, [prefixedKey, value])

   return [value, setValue];
}
