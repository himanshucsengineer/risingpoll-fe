import DefaultLayout from '@/components/layouts/defaultLayout'
import Image from 'next/image'
import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import '../../assets/css/howtouse.css'

export default function Howtoplay() {
  return (
    <DefaultLayout>
        <Container>
            <div className='howtoplay-main'>
                <h3>How To Play</h3>
                <p>Welcome to our Quiz Game — the perfect way to test how well your friends know you and have loads of fun at the same time! Just follow these simple steps to get started:</p>
                <Row>
                    <Col md="3">
                        <Image src={'/Ramji.jpg'} alt='how to play' width={300} height={300}/>
                        <h5>Step 1 Choose Your Quiz</h5>
                        <p>Browse our selection of quizzes and pick your favorite one. You can choose quizzes in various languages, so select the one that best suits you!</p>
                    </Col>
                    <Col md="3">
                        <Image src={'/Ramji.jpg'} alt='how to play' width={300} height={300}/>
                        <h5>Step 2 Enter Your Name</h5>
                        <p>Browse our selection of quizzes and pick your favorite one. You can choose quizzes in various languages, so select the one that best suits you!</p>
                    </Col>
                    <Col md="3">
                        <Image src={'/Ramji.jpg'} alt='how to play' width={300} height={300}/>
                        <h5>Step 3 Answer the Questions</h5>
                        <p>Browse our selection of quizzes and pick your favorite one. You can choose quizzes in various languages, so select the one that best suits you!</p>
                    </Col>
                    <Col md="3">
                        <Image src={'/Ramji.jpg'} alt='how to play' width={300} height={300}/>
                        <h5>Step 4 Check the Results</h5>
                        <p>Browse our selection of quizzes and pick your favorite one. You can choose quizzes in various languages, so select the one that best suits you!</p>
                    </Col>
                </Row>
            </div>
        </Container>
    </DefaultLayout>
  )
}
