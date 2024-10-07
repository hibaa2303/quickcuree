import cancer from './image/cancer.png'
import React from 'react'
import cancersss from './image/cancersss.png'
import child from './image/child.webp'
import adult from './image/adult.webp'
import did from './image/did.png'
import india from './image/india.png'
import lite from './image/lite.png'
import da from './image/da.jpg' 



function Cancer(){
    const Homepage=async()=>{
        window.location.replace("/Homepage")

    }
    return(
        <div className='canc '>
            <img className="cancer" alt="image" src={cancer}/>
            <div className="container p-4">
            <h2 className='fw-bold'>Access to quality cancer care does not occur by chance</h2>
            <p className="pt-2">Tata 1mg is here to support you and provide access to quality cancer care.</p>
        </div>
        <div>
            <div className='container d-flex'>
               <div className='box  '> <img className='navbar4 ' src='https://onemg.gumlet.io/staging/308ebd83-c1f8-499b-accf-fc9c9e73ef2c.svg'></img>
               <p>
                Tata Memorial Centre</p>
     </div>
            <div className='box  '> <img className='navbar4 'src='https://onemg.gumlet.io/staging/ff1111e4-3cb5-4f9c-ab19-7353e4076ceb.svg'></img>
            <p>Find cancer specialists</p>
            </div>
            <div className='box '> <img className='navbar4 ' src='https://onemg.gumlet.io/staging/592c21f5-b62c-44a1-adda-acbfaff44292.svg'></img>
            <p>Buy Cancer Medicines</p></div>
            <div className='box '> <img className='navbar4 'src='https://onemg.gumlet.io/staging/fe623d02-d64e-41be-b054-61a79b3f7d0b.svg'></img>
            <p>Get Financial Spport</p></div>
            <div className='box  '> <img className='navbar4 'src='https://onemg.gumlet.io/staging/e424a497-1d07-47fe-a5b9-688d728bf5d0.svg'></img>
            <p>Book Tests for Cancer</p></div>
  
            <div className='box  '> <img className='navbar4 'src='https://onemg.gumlet.io/staging/fff45a56-8545-45d4-b0b4-e39242091891.svg'></img>
            <p>Cancer Care NGOs</p></div>
            <div className='box  '> <img className='navbar5 'src='https://onemg.gumlet.io/staging/b50e6720-4d2e-43b2-82ad-0097b51e4798.svg'></img>
            <p>Patient Support Programs</p></div></div>
            </div>
            <div>
            <div className='container m-5'>
            <h2 className='fw-bold'>Major Types of Cancer
            </h2>
            <img className='caa p-3' alt="image" src={cancersss}/>
          </div></div>
          <div className='navbar6'>
          <div className='container p-4'>
            <h2 className='fw-bold p-2'>What Causes Cancer</h2>
           <h4 className='text-secondary'>Cancer comprises a complex group of diseases with many possible causes. While genetics play a major role in cancer, other causes of cancer can differ between children and adults.</h4>
           
           </div>
          
          <div className='container  d-flex'>
            <div className='box w-50 p-5'>
                <img className='' alt='image' src={child}/>
                <h3 className='fw-bold text-center'>Childhood cancers</h3>
                <p>A mutation or cell change that just happened by chance is a common cause for cancer in children.</p>

            </div>
            <div className='box w-50 p-5 '>
                <img className='' alt='image' src={adult}/>
                <h3 className='fw-bold text-center '>Adult cancers</h3>
                <p>In addition to mutations, lifestyle factors like smoking, tobacco, an unhealthy diet, lack of physical activity, working with toxic chemicals, or exposure to certain viruses may put adults at risk for cancers.</p>

            </div>

          </div>
          </div>
          
          <div className='navbar7'>
          <div className='container p-4'>
           <img className='w-100' alt='image' src={lite}/>
          </div></div>
          <img className="w-100"alt='image'src={india}/>
          <img className="w-100" alt='image'src={did}/>
          <img className="w-100" alt='image'src={da}/>
          </div>
          
            
    )
}
export default Cancer