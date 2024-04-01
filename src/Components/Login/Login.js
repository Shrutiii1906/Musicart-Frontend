import React, { useState } from 'react';
import styles from './Login.module.css';
import musicartlogo from '../../assets/images/musicartlogo.png';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../apis/auth';

export default function Login() {

  const navigate = useNavigate();
  const [emailormobile, setEmailormobile] = useState();
  const [password, setPassword] = useState();

  const [formdata, setformdata] = useState({
    emailormobile: "",
    password: "",
  })

  const handlechange = (e) => {
    setformdata({ ...formdata, [e.target.name]: e.target.value });
    setEmailormobile('');
    setPassword('');
    document.getElementById('emailormobile').style.borderColor = '#B6B6B6';
    document.getElementById('password').style.borderColor = '#B6B6B6';
  }

  const login = async () => {

    let b = true, c = true;

    if (!formdata.emailormobile) {
      setEmailormobile('*Required Field');
      document.getElementById('emailormobile').style.borderColor = '#FF0000';
      b = false;
    }

    if (formdata.emailormobile) {
      if (!formdata.emailormobile.trim()) {
        setEmailormobile('*Please provide a valid email id or mobile no.');
        document.getElementById('emailormobile').style.borderColor = '#FF0000';
        c = false;
      }
    }

    if (!formdata.password) {
      setPassword('*Required Field');
      document.getElementById('password').style.borderColor = '#FF0000';
      b = false;
    }

    if (formdata.password) {
      if (!formdata.password.trim()) {
        setPassword('*Please provide a valid password');
        document.getElementById('password').style.borderColor = '#FF0000';
        c = false;
      }
    }

    if (b == false || c == false)
      return;

    const response = await loginUser({ ...formdata });
    if (response.success == 'false') {
      toast.error('Invalid credentials!!', { duration: 1000 });
      return;
    }
    else {
      localStorage.setItem("token", response.token);
      localStorage.setItem("username", response.name);
      localStorage.setItem("userid", response.userid);
      toast.success('You have been logged in!!', { duration: 2000 });
      setTimeout(success, 3000);
    }
  }

  const success = () => {
    navigate("/");
  }

  return (
    <>
      <div className={styles.navbar}></div>
      <div className={styles.welcome}>Welcome</div>
      <div className={styles.musicartlogo}>
        <img src={musicartlogo} alt='' className={styles.img} />
        <div className={styles.musicart}>Musicart</div>
      </div>
      <div className={styles.container}>
        <div style={{ display: 'flex' }}>
          <div className={styles.containertitle}>Sign in </div>
          <div className={styles.dot}>.</div>
          <div className={styles.already}>Already a customer?</div>
        </div>
        <div className={styles.yourname}>Enter your email or mobile number</div>
        <input type='text' spellCheck={false} required onChange={handlechange} name='emailormobile'
          value={formdata.emailormobile} id='emailormobile' className={styles.demo} />
        <div className={styles.showerror}>{emailormobile}</div>
        <div className={styles.yourname}>Password</div>
        <input type='password' spellCheck={false} required onChange={handlechange} name='password'
          value={formdata.password} id='password' className={styles.dem} />
        <div className={styles.showerror}>{password}</div>
        <div className={styles.continue} onClick={() => login()}>Continue</div><Toaster />
        <div className={styles.agree}>
          By continuing, you agree to Musicart privacy notice and conditions of use.
        </div>
      </div>
      <div className={styles.new}>
        <div className={styles.line}></div>
        <div className={styles.newmusicart}>New to Musicart?</div>
        <div className={styles.line}></div>
      </div>
      <div className={styles.acc} onClick={() => { navigate('/signup') }}>Create your Musicart account</div>
      <div className={styles.bottom}>Musicart | All rights reserved</div>
    </>
  )
}
