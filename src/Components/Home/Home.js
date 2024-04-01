import React, { useEffect, useState } from 'react';
import styles from './Home.module.css';
import phonecallicon from '../../assets/images/phonecall,png';
import musicartlogo from '../../assets/images/musicartlogo.png';
import bgimage from '../../assets/images/bgimage.png';
import searchicon from '../../assets/images/searchicon.png';
import gridview from '../../assets/images/gridview.png';
import listview from '../../assets/images/listview.png';
import whitecart from '../../assets/images/whitecart.png';
import feedback from '../../assets/images/feedback.png';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { addFeedback } from '../../apis/auth';

export default function Home() {

  const navigate = useNavigate();
  const [init, setInit] = useState();
  const [typeoffeedback, setTypeoffeedback] = useState('');
  const [feedbackcontent, setFeedbackcontent] = useState('');
  const [products, setProducts] = useState([]);

  useEffect(() => {

    if (localStorage.getItem('username')) {
      setInit(localStorage.getItem('username').split(" ").map((word) => word[0]).join(''));
    }

    if(localStorage.getItem('Cart')){
      setProducts(JSON.parse(localStorage.getItem('Cart')));
    }
    else
    {
      const myArray = [
        {
          pname: 'Sony WH-1000XM4',
          count: 0,
        },
        {
          pname: 'JBL Quantum 600',
          count: 0,
        },
        {
          pname: 'Zebronics Zeb-Thunder',
          count: 0,
        },
        {
          pname: 'pTron Studio Lite',
          count: 0,
        },
        {
          pname: 'Marshall Major III',
          count: 0,
        },
        {
          pname: 'bOAT Rockerz 510',
          count: 0,
        },
        {
          pname: 'Sony WH-XB900N',
          count: 0,
        },
        {
          pname: 'JBL Tune 500BT',
          count: 0,
        },
        {
          pname: 'ZEBRONICS Zeb-Duke',
          count: 0,
        },
        {
          pname: 'pTron Boom Ultima',
          count: 0,
        },
        {
          pname: 'Marshall Major II',
          count: 0,
        },
        {
          pname: 'bOAT Bassheads 900',
          count: 0,
        },
        {
          pname: 'Sony MDR-ZX110',
          count: 0,
        }
      ];
      localStorage.setItem('Cart' , JSON.stringify(myArray));
    }

  }, []);

  const openorclosepopup = (i) => {
    if (document.getElementById(i).style.visibility == 'hidden')
      document.getElementById(i).style.visibility = 'visible';
    else
      document.getElementById(i).style.visibility = 'hidden';
  }

  const setfeedbackchoice = (i) => {
    document.getElementById('choicetype').innerHTML = i;
    document.getElementById('feedbackchoice').style.visibility = 'hidden';
    document.getElementById('feedbacktypecontainer').style.borderColor = '#919191';
    setTypeoffeedback('');
  }

  const submit = async () => {
    let b = true;

    if (document.getElementById('choicetype').innerHTML == 'Choose the type') {
      document.getElementById('feedbacktypecontainer').style.borderColor = '#FF0E0E';
      setTypeoffeedback('*Required Field');
      b = false;
    }

    if (document.getElementById('textfeedback').value == '') {
      document.getElementById('textfeedback').style.borderColor = '#FF0E0E';
      setFeedbackcontent('*Required Field');
      b = false;
    }

    if (document.getElementById('textfeedback').value != '') {
      if (!document.getElementById('textfeedback').value.trim()) {
        document.getElementById('textfeedback').style.borderColor = '#FF0E0E';
        setFeedbackcontent('');
        b = false;
      }
    }

    if (b == true) {

      const id = localStorage.getItem('userid');
      const feedbacktype = document.getElementById('choicetype').innerHTML;
      const feedbackcontent = document.getElementById('textfeedback').value;
      const response = await addFeedback({ id, feedbacktype, feedbackcontent });

      if (document.getElementById('choicetype').innerHTML != 'Choose the type')
        document.getElementById('choicetype').innerHTML = 'Choose the type';

      if (document.getElementById('textfeedback').value != '')
        document.getElementById('textfeedback').value = '';

      toast.success(response.message);

      setTimeout(() => {
        document.getElementById('feedback-container').style.visibility = 'hidden';
      }, 2000);

    }
  }

  return (
    <>
      <div className={styles.navbar}>
        <div style={{ display: 'flex' }}>
          <img src={phonecallicon} alt='' className={styles.phonecallicon} />
          <div className={styles.phoneno}>912121131313</div>
          <div className={styles.off}>Get 50% off on selected items</div>
          <div className={styles.line}>|</div>
          <div className={styles.shopnow}>Shop Now</div>
        </div>
      </div>
      <div className={styles.title}>
        <img src={musicartlogo} className={styles.musicartlogo} alt='' />
        <div className={styles.musicart}>Musicart</div>
        <div className={styles.home} onClick={() => { navigate('/') }}>Home</div>
        {localStorage.getItem('token') ?
          <>
            <div className={styles.home} onClick={() => { navigate('/invoice') }}>Invoice</div>
            <div className={styles.cart}>
              <img src={whitecart} className={styles.whitecart} alt='' />
              <div className={styles.viewcart}>View Cart&ensp;0</div>
            </div>
            <div className={styles.userinfo} onClick={() => openorclosepopup('menu')}>
              <div className={styles.initials}>{init}</div>
            </div>
          </>
          :
          ""
        }
      </div>
      <div className={styles.ad}>
        <div className={styles.grab}>
          Grab upto 50% off on
          Selected headphones
        </div>
        {localStorage.getItem('token') ?
          <div className={styles.usermenu} id='menu' style={{ visibility: 'hidden' }}>
            <div className={styles.name}>{localStorage.getItem('username')}</div>
            <div className={styles.line2}></div>
            <div className={styles.logout}>Logout</div>
          </div>
          :
          ""
        }
      </div>
      <img src={bgimage} alt='' className={styles.bgimage} />
      <div className={styles.searchbar}>
        <img src={searchicon} alt='' className={styles.searchicon} />
        <input className={styles.searcharea} type='text' placeholder='Search by Product Name' />
      </div>
      <div className={styles.filteringarea}>
        <img src={gridview} alt='' className={styles.grid} />
        <img src={listview} alt='' className={styles.list} />
      </div>
      {localStorage.getItem('token') ?
        <>
          <div className={styles.feedbackcontainer} id='feedback-container' style={{ visibility: 'hidden' }}>
            <div className={styles.typeoffeedback}>Type of feedback</div>
            <div className={styles.typeselect} onClick={() => openorclosepopup('feedbackchoice')} id='feedbacktypecontainer' >
              <div id='choicetype' style={{ width: '8vw' }}>Choose the type</div>
              <div style={{ marginLeft: '3.5vw' }}>v</div>
            </div>
            <div className={styles.options} style={{ visibility: 'hidden' }} id='feedbackchoice'>
              <div style={{ paddingLeft: '0.5vw', paddingTop: '1vh' }} onClick={() => setfeedbackchoice('Bugs')}>Bugs</div>
              <div className={styles.line3}></div>
              <div style={{ paddingLeft: '0.5vw', paddingTop: '1vh' }} onClick={() => setfeedbackchoice('Feedback')}>Feedback</div>
              <div className={styles.line3}></div>
              <div style={{ paddingLeft: '0.5vw', paddingTop: '1vh' }} onClick={() => setfeedbackchoice('Query')}>Query</div>
            </div>
            <div className={styles.error}>{typeoffeedback}</div>
            <div className={styles.feedback}>Feedback</div>
            <textarea className={styles.feedbacktext} spellCheck={false} placeholder='Type your feedback' id='textfeedback' onChange={() => { document.getElementById('textfeedback').style.borderColor = '#919191'; setFeedbackcontent(''); }}></textarea>
            <div className={styles.error2}>{feedbackcontent}</div>
            <div className={styles.submit} onClick={() => submit()}>Submit</div><Toaster />
            <div style={{ height: '1vh' }} />
          </div>
          <div className={styles.userfeedback} onClick={() => openorclosepopup('feedback-container')}>
            <img src={feedback} alt='' className={styles.feedbackimage} />
          </div>
        </>
        :
        ""
      }
      <div className={styles.bottom}>Musicart | All rights reserved</div>
    </>
  )
}
