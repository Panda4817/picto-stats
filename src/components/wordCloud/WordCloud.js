import React, {useEffect, useState} from 'react';
import { TagCloud } from 'react-tagcloud';


function WordCloud() {
  const [data,setData]=useState([]);
  const getData=()=>{
    fetch('word.json'
    ,{
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    }
    )
      .then(function(response){
        return response.json();
      })
      .then(function(myJson) {
        console.log(myJson);
        setData(myJson)
      });
  }
  useEffect(()=>{
    getData()
  },[])
  
  return (
    <TagCloud
      minSize={12}
      maxSize={75}
      tags={data}
      shuffle={true}
      randomSeed={true}
      colorOptions={{
        luminosity: 'light'
     }}
    />
  );
}

export default WordCloud;