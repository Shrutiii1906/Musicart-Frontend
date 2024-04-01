import React, { useState } from 'react';
import styles from './OrderConfirm.module.css';
import musicartlogo from '../../assets/images/musicartlogo.png';
import confetti from '../../assets/images/confetti.png';
import cartplus from '../../assets/images/cartplus.png';
import home from '../../assets/images/home.png';
import userlogout from '../../assets/images/userlogout.png';
import { useNavigate } from 'react-router-dom';
import cartcount from '../../assets/images/cartcount.png';

export default function OrderConfirm() {

  const navigate = useNavigate();
  const setchosenoption = (i, j, k) => {

    if (document.getElementById(i).style.borderColor == 'rgb(255, 255, 255)')
      document.getElementById(i).style.borderColor = '#2E0052';
    else
      document.getElementById(i).style.borderColor = '#FFFFFF';

    document.getElementById(j).style.borderColor = '#FFFFFF';
    document.getElementById(k).style.borderColor = '#FFFFFF';

    if (i == 'home')
      setTimeout(() => { navigate('/') }, 1000);
    else if (i == 'cartplus')
      setTimeout(() => { navigate('/view-cart') }, 1000);
    else
      setTimeout(() => { navigate('/login') }, 1000);

  }

  return (
    <>
      <div className={styles.navbar}>
        <div className={styles.musicartlogo}>
          <img src={musicartlogo} className={styles.music} alt='' />
          <div className={styles.title}>Musicart</div>
        </div>
      </div>
      <div className={styles.musicartlogo2}>
        <img src={musicartlogo} className={styles.music2} alt='' />
        <div className={styles.title2}>Musicart</div>
      </div>
      <div className={styles.container}>
        <img src={confetti} className={styles.confetti} alt='' />
        <div className={styles.success}>Order is placed successfully!</div>

        <div className={styles.confirm2}>You  will be receiving a confirmation email with</div>
        <div className={styles.confirm3}>order details</div>

        <div className={styles.confirm}>You  will be receiving a confirmation email with order details</div>
        <div className={styles.home} onClick={() => { navigate('/') }}>Go back to Home page</div>
      </div>
      <div className={styles.bottom}>Musicart | All rights reserved</div>

      <div className={styles.bottom2}>

        <div style={{ width: '10vw', height: '5vh', marginLeft: '2.5vw' }} onClick={() => setchosenoption('home', 'cart', 'logout')} >
          <div className={styles.horizontalbar} style={{ borderColor: 'rgb(255, 255, 255)' }} id='home' />
          <img src={home} style={{ marginLeft: '1.5vw', marginTop: '1.4vh' }} alt='' />
          <div style={{ marginLeft: '0.9vw' }}>Home</div>
        </div>

        <div style={{ width: '10vw', height: '5vh', marginLeft: '33vw' }} onClick={() => setchosenoption('cart', 'home', 'logout')}>
          <div className={styles.horizontalbar} style={{ borderColor: 'rgb(255, 255, 255)' }} id='cart' />
          <img src={cartcount} style={{ marginLeft: '7vw', width: '1rem', height: '1rem' }} alt='' />
          <div className={styles.noitems}>0</div>
          <img src={cartplus} style={{ marginLeft: '1.5vw', marginTop: '-0.8vh', width: '1.2rem', height: '1.2rem' }} alt='' />
          <div>Cart</div>
        </div>

        <div style={{ width: '10vw', height: '5vh', marginLeft: '31.5vw' }} onClick={() => setchosenoption('logout', 'home', 'cart')}>
          <div className={styles.horizontalbar} style={{ borderColor: 'rgb(255, 255, 255)' }} id='logout' />
          <img src={userlogout} alt='' style={{ marginLeft: '1.5vw', marginTop: '1.4vh' }} />
          <div style={{ marginTop: '0.8vh' }}>Logout</div>
        </div>
        
      </div>
    </>
  )
}
