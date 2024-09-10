import agent from '@/utils/agent'
import { Facebook, Instagram, Twitter } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { Button, Col, Container, Row, Spinner } from 'react-bootstrap'
import { toast } from 'react-toastify'

export default function Footer() {
    const [email, setEmail] = useState();
    const [loading , setLoading] = useState(false);
    
    const handleSubmit = async () => {

        if(email){
            const data = {
                email
            }
            try {
                setLoading(true);
                const response = await agent.post('/newslatter', data)
                if (response.success == true) {
                    toast.success(response.message)
                } else {
                    toast.error(response.message)
                }
            } catch (err) {
                if(err.status === 400){
                    for(let i=0; i<err.response.data.message.length; i++){
                        toast.error(err.response.data.message[i])
                    }
                }else{
                    toast.error(err.response.data.message)
                }
            } finally {
                setLoading(false);
            }
        }else{
            toast.error('email is required')
        }
        
    }


  return (
    <><div className='top-footer'>
        <Container>
            <Row>
                <Col md="4" className='mb-2'>
                    <h4>Company Information</h4>
                    <Image src={'/logo.png'} width={70} height={70} alt='logo'/>
                    <p>Gather opinions and insights with Rising Poll - the user-friendly platform for creating and participating in engaging polls. Join us today to start polling!</p>
                </Col>
                <Col md="4" className='mb-2'>
                    <h4>Important Links</h4>
                    <Link href={'privacy-policy'} ><p className='mt-3'>Privacy Policy</p></Link>
                    <Link href={'terms-conditions'}><p>Terms & Consitions</p></Link>
                    <Link href={'disclaimer'}><p>Disclaimer</p></Link>
                    <Link href={'/#contact-us'}><p>Contact Us</p></Link>
                </Col>
                <Col md="4" className='mb-2'>
                    <h4>Subscribe Us</h4>
                    <div className='newslatter'>
                        <div className='left'>
                            <input type='email' name='email' placeholder='email' onChange={(e)=>{setEmail(e.target.value)}} className='form-control'/>
                        </div>
                        <div className='right'>
                            <Button  disabled={loading} onClick={handleSubmit}>
                                {loading ? <Spinner animation="border" size="sm" /> : 'Subscribe'}
                            </Button>
                        </div>
                    </div>
                    <div className='social-connect'>
                        <Link href={''}><span className='social-icon'><Facebook /></span></Link>
                        <Link href={''}><span className='social-icon'><Instagram /></span></Link>
                        <Link href={''}><span className='social-icon'><Twitter /></span></Link>
                    </div>
                </Col>
            </Row>
        </Container>
    </div>
    <div className='bottom-footer'>
        <h5>©Risingpoll. All rights reserved.</h5>
    </div></>
  )
}
