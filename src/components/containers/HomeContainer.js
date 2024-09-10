
'use client'
import agent from '@/utils/agent'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { Button, Card, Col, Container, Row, Spinner } from 'react-bootstrap'
import { toast } from 'react-toastify';

export default function HomeContainer() {

    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [subject, setSubject] = useState();
    const [desc, setDesc] = useState();
    const [loading , setLoading] = useState(false);
    
    const handleSubmit = async () => {
        if(name && email && subject && desc){
            const data = {
                name,
                email,
                subject,
                desc
            }
            try {
                setLoading(true);
                const response = await agent.post('/contact', data)
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
            toast.error("All Fields Are Required!")
        }
        
    }

    return (
        <><div className='home-section1'>
            <Container>
                <Row>
                    <Col md="6" className='homesection1-left'>
                        <h3>Create Polls on RisingPoll like never before</h3>
                        <p>Now get everyone’s opinion faster than ever by creating a poll only on RisingPoll.</p>
                        <div className='flex'>
                            <div className='left'>
                                <Link href={'/create-poll'}><Button>Create Poll</Button></Link>
                            </div>
                            <div className='right'>
                                <Link href={'/howtoplay'}><Button>Learn How</Button></Link>
                            </div>
                        </div>
                    </Col>
                    <Col md="6" className='homesection1-right'>
                        <Image src={'/img1.svg'} width={500} height={500} alt='custom image' />
                    </Col>
                </Row>
            </Container>

        </div>
            <div className='home-section2'>
                <Container>
                    <h3>What you can do with RisingPoll?</h3>
                    <Row className='mt-5'>
                        <Col md="4" className='mb-5'>
                            <Card>
                                <Image src={'/facebook_polls.svg'} width={50} height={50} alt='facebook polls' />
                                <h5>Create Poll</h5>
                                <p>Want to know which soccer player is the best or who should be the team leader? Create polls and get everyone is opinion in no time.</p>
                            </Card>
                        </Col>
                        <Col md="4" className='mb-5'>
                            <Card>
                                <Image src={'/political_polls.svg'} width={50} height={50} alt='Political polls' />
                                <h5>Graphical Result</h5>
                                <p>Not everyone likes numbers and we knew that, so we made a bar graph of your result for better understanding.</p>
                            </Card>
                        </Col>
                        <Col md="4" className='mb-5'>
                            <Card>
                                <Image src={'/customer_review_survey.svg'} width={50} height={50} alt='facebook polls' />
                                <h5>Answer Anonymously</h5>
                                <p>Many great opinions were never given for lack of courage. With us, people can give honest opinions anonymously.</p>
                            </Card>
                        </Col>
                    </Row>
                </Container>

            </div>

        <div className='contact-section' id='contact-us'>
            <Container>
                <Row>
                    <Col md="6" className='contact-section-left'>
                        <h3>Lets Connect with RisingPoll</h3>
                        <p>Discuss your query with RisingPoll, It will help us to build a strong platform.</p>
                    </Col>
                    <Col md="6" className='contact-section-right'>
                        <div className='form'>
                            <h5>Enter your details to contact</h5>
                            <input type='text' placeholder='Enter Your Full Name' onChange={(e)=>{setName(e.target.value)}}  className='form-control' required/>
                            <input type='email' placeholder='Enter Your Email' onChange={(e)=>{setEmail(e.target.value)}} className='form-control'/>
                            <input type='text' placeholder='Enter Subject' onChange={(e)=>{setSubject(e.target.value)}} className='form-control'/>
                            <textarea placeholder='Write Your Message...' rows={3} className='form-control' onChange={(e)=>{setDesc(e.target.value)}}></textarea>
                            <Button type='submit'  disabled={loading} onClick={handleSubmit}>
                                {loading ? <Spinner animation="border" size="sm" /> : 'Submit'}
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>

        </>

    )
}
