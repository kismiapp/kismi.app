import { useEffect, useState } from 'react';

const useCountDown = (targetDate,voteLock) => {
  const countDownDate = new Date(targetDate).getTime();

  const [countDown, setCountDown] = useState(countDownDate - new Date().getTime());


  useEffect(() => {
    const interval = setInterval(() => {
      if((countDownDate - new Date().getTime())===0){
        window.location.reload()
      }
      setCountDown(countDownDate - new Date().getTime());
    }, 1000);

    return () => clearInterval(interval);
  }, [countDownDate]);

  return getReturnValues(countDown,targetDate,voteLock);
};

const getReturnValues = (countDown,targetDate,voteLock) => {
  // calculate time left\

  if(targetDate){
    const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
    const hours = Math.floor((countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((countDown % (1000 * 60)) / 1000);
    if(days + hours + minutes + seconds <= 0 && voteLock === false){
      window.location.reload()
    }else{

    }
    return [days, hours, minutes, seconds];
  }
  return [null, null, null, null];
};

export default useCountDown;