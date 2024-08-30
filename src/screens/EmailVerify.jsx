import React, { useState, useEffect } from 'react';
import styles from './EmailVerify.module.css';
import { checkverification } from "../store/action/userAppStorage";
import { useDispatch } from "react-redux";
//importing modals
import LoadingModal from "../components/Modal/LoadingModal";
import Modal from "../components/Modal/Modal";
//import routers
import { useNavigate, useParams } from 'react-router-dom';
import SubmitBtn from "../components/Submit";




function EmailVerify() {
    let [isLoading, setIsLoading] = useState(false)
    let [isError, setIsError] = useState(false)
    let [isErrorInfo, setIsErrorInfo] = useState('')
    let [isSignout, setIsSignout] = useState(false)
    let [preloader, setPreloader] = useState(true)
    const [time, setTime] = useState(350); // 3 minutes in seconds
    const [timerOn, setTimerOn] = useState(true);

    let { id } = useParams()
    //initialising reduzx
    let dispatch = useDispatch()

    //initialise router
    let navigate = useNavigate()

    //method to close handler
    const closeModal = () => {
        setIsError(false)
        setIsSignout(false)
    }

    useEffect(() => {
        if (!id) {
            navigate('/signup')
        }
    })


    useEffect(() => {
        setTimeout(() => {
            setPreloader(false)
        }, 5000)
    }, [])



    //this handler check if user email has been verified
    const continueHandler = async () => {
        let res = await dispatch(checkverification(id))
        if (!res.bool) {
            console.log(res)
            return
        }
        //navigation on sucessful api call to next page

        //navigate to phone number set-up


    }



    useEffect(() => {
        let interval = setInterval(continueHandler, 1000)
        return () => {
            clearInterval(interval)
        }
    })

    let submitHandler = () => {
        navigate('/signup')
    }



  
    useEffect(() => {
        const interval = setInterval(() => {
          if (timerOn && time > 0) {
            setTime(prevTime => prevTime - 1);
          }
        }, 1000);
    
        return () => clearInterval(interval);
      }, [timerOn, time]);
    
      const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      };


    return (<>




        {isLoading && <LoadingModal />}
        {isError && <Modal content={isErrorInfo} closeModal={closeModal} />}



        <div className={styles.screenContainer}>
            <div className={styles.innerContainer}>

                <h1 className={styles.verifyHead}>Verify your email</h1>

                <p className={styles.verifyParagraph}>We sent a verification email to <span> {id}</span>. Click the link inside to get started!</p>



                <p className={styles.verifyParagraph} style={{color:'green'}}>Arrive in  {formatTime(time)} </p>

                {/*<button onClick={() => setTimerOn(!timerOn)}>
                    {timerOn ? 'Pause' : 'Start'}
                </button>*/}
            

            <form onSubmit={(e) => {
                e.preventDefault()
                submitHandler()

            }}>
                <SubmitBtn text='Email didnt arrive ?' style={{ borderRadius: '8px', marginBottom: '20px', marginBottom: '15px', marginTop: '15px' }} />

            </form>

        </div>



    </div >



    </>

    );
}

export default EmailVerify;