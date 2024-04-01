import React, { useState, useEffect } from 'react';
import styles from './ProductDetail.module.css';
import phonecallicon from '../../assets/images/phonecallicon.png';
import musicartlogo from '../../assets/images/musicartlogo.png';
import whitecart from '../../assets/images/whitecart.png';
import { useNavigate } from 'react-router-dom';
import { getproductinfo } from '../../apis/music';
import toast, { Toaster } from 'react-hot-toast';
import Star from './Star';

export default function ProductDetail() {

  const navigate = useNavigate();
  const [productfetch, setProductfetch] = useState();
  let response;
  const [image1, setImage1] = useState();
  const [image2, setImage2] = useState();
  const [image3, setImage3] = useState();
  const [image4, setImage4] = useState();
  let [cart, setCart] = useState();
  let [products, setProducts] = useState([]);

  useEffect(() => {
    fetchproductdetails();
  }, [products]);

  const fetchproductdetails = async () => {
    const productid = window.location.pathname?.split("/").slice(-1)[0];
    if (!productid) {
      toast.error('Wrong or invalid link!!', { duration: 1000 });
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }

    response = await getproductinfo(productid);
    if (response == undefined) {
      toast.error('No such product exists!!', { duration: 2000 });
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }

    setProductfetch(response);
    setImage1(response.images[0]);
    setImage2(response.images[1]);
    setImage3(response.images[2]);
    setImage4(response.images[3]);

    setProducts(JSON.parse(localStorage.getItem('Cart')));
    const object = products.find((object) => object.pname == productfetch.product_name);
    if (object) {
      setCart(object.count);
    }
  }

  const changeimage1 = () => {
    setImage1(productfetch.images[1]);
    setImage2(productfetch.images[0]);
    const temp = productfetch.images[1];
    productfetch.images[1] = productfetch.images[0];
    productfetch.images[0] = temp;
  }

  const changeimage2 = () => {
    setImage1(productfetch.images[2]);
    setImage3(productfetch.images[0]);
    const temp = productfetch.images[2];
    productfetch.images[2] = productfetch.images[0];
    productfetch.images[0] = temp;
  }

  const changeimage3 = () => {
    setImage1(productfetch.images[3]);
    setImage4(productfetch.images[0]);
    const temp = productfetch.images[3];
    productfetch.images[3] = productfetch.images[0];
    productfetch.images[0] = temp;
  }

  const addtocart = () => {
    //first add product to cart and then go to view cart page
    //raises a toast message if any particular product count crosses 8 and makes product unavailable
    if (localStorage.getItem('token')) {
      if (cart < 8) {
        setCart(++cart);
        setTimeout(() => {
          navigate('/view-cart');
        }, 1000);
        products.map((item) => {
          if (item.pname == productfetch.product_name)
            item.count = cart;
        })
        localStorage.setItem('Cart', JSON.stringify(products));
      }
      else
        toast.error("No more quantities of this product can be added!!");
    }
    else {
      toast.error("Please login or signup to add and buy products!!", { duration: 1000 });
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    }

  }

  return (
    <div>
      <div className={styles.navbar}>
        <div style={{ display: 'flex' }}>
          <img src={phonecallicon} alt='' className={styles.phonecallicon} />
          <div className={styles.phoneno}>912121131313</div>
          <div className={styles.off}>Get 50% off on selected items</div>
          <div className={styles.line}>|</div>
          <div className={styles.shopnow}>Shop Now</div>
          {localStorage.getItem('token') ?
            <>
              <div className={styles.logout} onClick={() => {/*localStorage.clear()*/ }}>Logout</div><Toaster />
            </>
            :
            ""
          }
        </div>
      </div>
      <div className={styles.title}>
        <img src={musicartlogo} className={styles.musicartlogo} alt='' />
        <div className={styles.musicart}>Musicart</div>
        <div className={styles.home} onClick={() => { navigate('/') }}>Home/&ensp;</div>
        {
          productfetch ?
            <>
              <div className={styles.productname}>{productfetch.product_name}</div>
            </>
            :
            ""
        }
        {
          localStorage.getItem('token') ?
            <>
              <div className={styles.cart}>
                <img src={whitecart} className={styles.whitecart} alt='' />
                <div className={styles.viewcart}>View Cart&ensp;{cart}</div>
              </div>
            </>
            :
            <>
              <div className={styles.cart}>
                <img src={whitecart} className={styles.whitecart} alt='' />
                <div className={styles.viewcart}>View Cart&ensp;0
                </div>
              </div>
            </>
        }
      </div>
      <div className={styles.back} onClick={() => { navigate('/') }}>Back to products</div>
      {
        productfetch ?
          <>
            <div className={styles.description}>{productfetch.description}</div>
            <div className={styles.twosections}>
              <div className={styles.imgcontainer}>
                <div>
                  <img src={image1} alt='' style={{ width: '26vw', height: '35vh', margin: '1vh' }} />
                </div>
                <div style={{ display: 'flex' }}>
                  <div className={styles.smallimagecontainer} style={{
                    width:
                      productfetch.product_name == 'JBL Quantum 600' || productfetch.product_name == 'Zebronics Zeb-Thunder' || productfetch.product_name == 'Sony WH-XB900N' || productfetch.product_name == 'Sony MDR-ZX110' ? '9vw' : '8vw'
                  }}>
                    <img src={image2} alt='' style={{ width: '7vw', height: '14vh', margin: '1vh' }} onClick={() => changeimage1()} />
                  </div>
                  <div className={styles.smallimagecontainer} style={{
                    marginLeft: '1vw', width:
                      productfetch.product_name == 'JBL Quantum 600' || productfetch.product_name == 'Zebronics Zeb-Thunder' || productfetch.product_name == 'Sony WH-XB900N' || productfetch.product_name == 'Sony MDR-ZX110' ? '9vw' : '8vw'
                  }}>
                    <img src={image3} alt='' style={{ width: '7vw', height: '14vh', margin: '1vh' }} onClick={() => changeimage2()} />
                  </div>
                  <div className={styles.smallimagecontainer} style={{
                    marginLeft: '1vw', width:
                      productfetch.product_name == 'JBL Quantum 600' || productfetch.product_name == 'Zebronics Zeb-Thunder' || productfetch.product_name == 'Sony WH-XB900N' || productfetch.product_name == 'Sony MDR-ZX110' ? '9vw' : '8vw'
                  }}>
                    <img src={image4} alt='' style={{ width: '7vw', height: '14vh', margin: '1vh' }} onClick={() => changeimage3()} />
                  </div>
                </div>
              </div>
              <div className={styles.productinfo}>
                <div className={styles.pname}>{productfetch.product_name}</div>
                <div style={{ display: 'flex' }}>
                  <div className={styles.stars}><Star stars={productfetch.rating} /></div>
                  <div className={styles.reviews}>({productfetch.reviews}&nbsp;Customer reviews)</div>
                </div>
                <div className={styles.price}>Price - ₹ {productfetch.price}</div>
                <div className={styles.colourandtype}>
                  {
                    productfetch.colour.map((item, index) => (
                      <span key={index}>{item} |</span>
                    ))
                  }
                  &nbsp;{productfetch.type}
                </div>
                <div className={styles.about}>About this item:-</div>
                <ul style={{ marginLeft: '-1vw', marginTop: '-0.2vh' }}>
                  {
                    productfetch.about.map((item, index) => (
                      <li key={index} className={styles.aboutitem}>{item}</li>
                    )

                    )
                  }
                </ul>
                <div style={{ display: 'flex' }}>
                  <div className={styles.available}>Available -&nbsp;</div>
                  <div className={styles.available} style={{ fontWeight: '400' }}>{
                    cart == 8 ? 'Not In stock' :
                      productfetch.
                        avalaibility
                  }</div>
                </div>
                <div style={{ display: 'flex', marginTop: '2.3vh' }}>
                  <div className={styles.available}>Brand -&nbsp;</div>
                  <div className={styles.available} style={{ fontWeight: '400' }}>{productfetch.brand}</div>
                </div>
                <div style={{ display: 'flex' }}>
                  <div className={styles.addtocart} onClick={() => addtocart()}>Add to cart</div><Toaster />
                  <div className={styles.addtocart} style={{ background: '#FFB800', marginLeft: '1vw' }} onClick={() => addtocart()}>Buy Now</div><Toaster />
                </div>
              </div>
            </div>
          </>
          :
          ""
      }
      <div className={styles.bottom}>Musicart | All rights reserved</div>
    </div>
  )
}
