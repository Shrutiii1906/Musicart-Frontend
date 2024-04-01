import React, { useState } from 'react';
import styles from './SignUp.module.css';
import musicartlogo from '../../assets/images/musicartlogo.png';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { signupUser } from '../../apis/auth';

export default function SignUp() {

  const navigate = useNavigate();
  const [name, Setname] = useState();
  const [mobile, Setmobile] = useState();
  const [email, Setemail] = useState();
  const [password, Setpassword] = useState();

  const [formdata, setformdata] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
  })

  const handlechange = (e) => {
    setformdata({ ...formdata, [e.target.name]: e.target.value });
    Setemail('');
    Setpassword('');
    Setname('');
    Setmobile('');
    document.getElementById('username').style.borderColor = '#B6B6B6';
    document.getElementById('useremail').style.borderColor = '#B6B6B6';
    document.getElementById('usermobile').style.borderColor = '#B6B6B6';
    document.getElementById('userpassword').style.borderColor = '#B6B6B6';
  }

  const signup = async () => {

    let b = true, c = true;

    if (!formdata.name) {
      Setname('*Required Field');
      document.getElementById('username').style.borderColor = '#FF0000';
      b = false;
    }

    if (formdata.name) {
      if (!formdata.name.trim() || !/^[A-Za-z\s]+$/.test(formdata.name)) {
        Setname('*Please provide a valid name');
        document.getElementById('username').style.borderColor = '#FF0000';
        c = false;
      }
    }

    if (!formdata.email) {
      Setemail('*Required Field');
      document.getElementById('useremail').style.borderColor = '#FF0000';
      b = false;
    }

    if (formdata.email) {
      if (!formdata.email.trim() || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formdata.email.replace(/\s/g, ''))) {
        Setemail('*Please provide a valid email address');
        document.getElementById('useremail').style.borderColor = '#FF0000';
        c = false;
      }
    }

    if (!formdata.mobile) {
      Setmobile('*Required Field');
      document.getElementById('usermobile').style.borderColor = '#FF0000';
      b = false;
    }

    if (formdata.mobile) {
      const pattern = new RegExp(/^\d{10,12}$/);
      if (!formdata.mobile.trim() || !pattern.test(formdata.mobile)) {
        Setmobile('*Please provide a valid mobile no.');
        document.getElementById('usermobile').style.borderColor = '#FF0000';
        c = false;
      }
    }

    if (!formdata.password) {
      Setpassword('*Required Field');
      document.getElementById('userpassword').style.borderColor = '#FF0000';
      b = false;
    }

    if (formdata.password) {
      if (!formdata.password.trim()) {
        Setpassword('*Please provide a valid password');
        document.getElementById('userpassword').style.borderColor = '#FF0000';
        c = false;
      }
    }

    if (b == false || c == false)
      return;

    const response = await signupUser({ ...formdata });
    if (response.success == 'false') {
      toast.error(response.message, { duration: 1000 });
      return;
    }
    else {
      localStorage.setItem("token", response.token);
      localStorage.setItem("username", response.name);
      localStorage.setItem("userid", response.userid);
      toast.success(response.message, { duration: 2000 });
      setTimeout(success, 3000);
    }
  }

  const success = () => {
    navigate('/');
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
          <div className={styles.containertitle}>Create Account</div>
          <div className={styles.dot}>.</div>
          <div className={styles.noaccount}>Don’t have an account?</div>
        </div>
        <div className={styles.yourname}>Your name</div>
        <input type='text' id='username' spellCheck={false} onChange={handlechange} name='name' value={formdata.name} className={styles.dem} required />
        <div className={styles.showerror}>{name}</div>
        <div className={styles.yourname}>Mobile number</div>
        <input type='text' id='usermobile' spellCheck={false} onChange={handlechange} name='mobile' value={formdata.mobile} className={styles.dem} required />
        <div className={styles.showerror}>{mobile}</div>
        <div className={styles.yourname}>Email Id</div>
        <input type='text' className={styles.dem} id='useremail' spellCheck={false} onChange={handlechange} name='email' value={formdata.email} required />
        <div className={styles.showerror}>{email}</div>
        <div className={styles.yourname}>Password</div>
        <input type='password' id='userpassword' spellCheck={false} onChange={handlechange} name='password' value={formdata.password} className={styles.pass} required />
        <div className={styles.showerror}>{password}</div>
        <div className={styles.authmobile}>
          By enrolling your mobile phone number, you consent to receive automated security notifications
          via text message from Musicart. Message and data rates may apply.
        </div>
        <div className={styles.continue} onClick={() => signup()}>Continue</div><Toaster />
        <div className={styles.agree}>
          By continuing, you agree to Musicart privacy notice and conditions of use.
        </div>
      </div>
      <div className={styles.already}>
        <div className={styles.account}>Already have an account?</div>
        <div className={styles.signin} onClick={() => { navigate('/login') }}><u>&nbsp;Sign in</u></div>
      </div>
      <div className={styles.bottom}>Musicart | All rights reserved</div>
    </>
  )
}
