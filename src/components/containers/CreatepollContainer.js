'use client';
import agent from '@/utils/agent';
import Cookies from 'js-cookie';
import { Plus, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';
import axios from 'axios';



export default function CreatepollContainer() {

  const text = [
    'Select a language',
    'Create your poll below',
    'Title',
    'Type Your Question Here',
    'Answer Question',
    'Option',
    'Add Option',
    'Create Poll',
    '<h1 className="mt-5">Creating Engaging Polls on RisingPoll.com</h1><p>Whether you are a repeating user or a newcomer to our platform, this comprehensive guide will help you make the most of your poll-creating experience. In this article, we will walk you through the process of creating effective polls, discuss the different types of polls you can create, and provide some tips to maximize their impact.</p><h2>1. Getting Started with RisingPoll.com</h2><p>For those who are new to RisingPoll.com, the initial procedure involves creating a poll. Start by giving your poll a title, such as "How to Secure a Student Loan for MBA in the USA." Then, proceed to add your options, which could include choices like "Bank Loans" and "Private Loans from Business Owners."</p><h2>2. Who can create poll?</h2><p>Creating a poll on RisingPoll.com is accessible to anyone with an internet connection. The versatility of our platform means that you can tailor your polls to your specific needs and interests. Whether you belong to the banking sector, a college, or you are looking to start a new career in the USA, you can create polls that suit your objectives. The possibilities are limitless, making poll creation an enjoyable and inclusive experience for all. In essence, RisingPoll.com welcomes everyone to create and share their polls, ensuring that no one is left out of this engaging and interactive process.</p><h4>Which polls are the most common among our users?</h4><ul><li>"Who are the top lawyers in my country?"</li><li>"What is the best college to study MBA in Canada?"</li><li> "Which bank offers the best low-interest loans?"</li><li>"Which credit card companies provide the best credit limits?"</li><li>"Are backlinks beneficial for business SEO? Yes or no?"</li><li>"What is the best cloud service for hosting websites online?"</li><li>"Choose the best CRM software from the options below."</li><li>"Who will win the next football match?"</li><li>"Select the best car loan agency in New Delhi."</li><li>"Where is the best destination to travel during winter?"</li></ul><h2>Conclusion</h2><p>Creating engaging polls on RisingPoll.com is a fun and interactive way to gather opinions, make decisions, or simply engage with your audience. Whether you are conducting a simple yes/no poll or a more complex ranked choice poll, our platform offers you the tools to create and share your polls effortlessly.</p><p>By following the steps outlined in this guide and utilizing the various poll types available, you can effectively collect valuable insights and engage with your audience in a meaningful way. Do not forget to promote your polls on social media, encourage comments, and analyze the results to make the most of your poll-creating experience.</p><p>So, go ahead and start crafting your polls on RisingPoll.com today. Your audience is waiting to share their opinions and insights with you!</p>'
  ]

  const router = useRouter();
  const [options, setOptions] = useState([
    { option: '', vote: 0 },
    { option: '', vote: 0 },
  ]);
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState(text);

  const addOption = () => {
    setOptions([...options, { option: `Option ${options.length + 1}`, vote: 0 }]);
  };

  const removeOption = (indexToRemove) => {
    if (options.length > 2) {
      setOptions(options.filter((_, index) => index !== indexToRemove));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (title && options.length >= 2) {
      const data = {
        title,
        options,
      };
      try {
        setLoading(true);
        const response = await agent.post('/poll', data);
        if (response.success) {
          toast.success(response.message);
          // Save poll data to cookies
          Cookies.set('pollData', JSON.stringify(response.data), { expires: 1 });
          router.push('/share');
        } else {
          toast.error(response.message);
        }
      } catch (err) {
        if (err.status === 400) {
          err.response.data.message.forEach((msg) => toast.error(msg));
        } else {
          toast.error(err.response.data.message);
        }
      } finally {
        setLoading(false);
      }
    } else {
      toast.error('All Fields Are Required!');
    }
  };

  const changeLanguage = async (e) =>{
    
    if(e != 'en'){
      const options = {
        method: 'POST',
        url: 'https://ai-translate.p.rapidapi.com/translate',
        headers: {
          'x-rapidapi-key': 'ce1a64ec03msh97e9a54bb56d3cep143cf8jsn832cb5ff131f',
          'x-rapidapi-host': 'ai-translate.p.rapidapi.com',
          'Content-Type': 'application/json'
        },
        data: {
          texts: text,
          tl: e,
          sl: 'auto'
        }
      };
      
      try {
        const response = await axios.request(options);
        setLanguage(response.data.texts)
      } catch (error) {
        console.error(error);
      }
    }else{
      setLanguage(text)
    }
    

  }
  const htmlContent = language[8];

  return (
    <Container>
      <div className='create-poll-main'>
        <Row className='justify-content-center text-center'>
          <Col md="6">
            <h5>{language[0]}</h5>
            <select onChange={(e) => changeLanguage(e.target.value)} className='form-control'>
              <option value={'en'}>English</option>
              <option value={'hi'}>Hindi</option>
              <option value={'bn'}>Bengali</option>
              <option value={'te'}>Telugu</option>
              <option value={'mr'}>Marathi</option>
              <option value={'ta'}>Tamil</option>
              <option value={'gu'}>Gujarati</option>
              <option value={'ar'}>Arabic</option>
              <option value={'fr'}>French</option>
              <option value={'de'}>German</option>
              <option value={'es'}>Spanish</option>
            </select>
            <h3 className='mb-4 mt-5'>{language[1]} ⬇️</h3>
            <form onSubmit={handleSubmit} className='create-poll-form'>
              <p>{language[2]}</p>
              <input
                type='text'
                placeholder={language[3]}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className='form-control mb-5'
              />
              <p>{language[4]}</p>

              {options.map((option, index) => (
                <div key={index} className="option-field">
                  <input
                    type='text'
                    placeholder={`${language[5]} ${index + 1}`}
                    // value={}
                    onChange={(e) => {
                      const newOptions = [...options];
                      newOptions[index].option = e.target.value;
                      setOptions(newOptions);
                    }}
                    className='form-control mb-3'
                  />
                  {options.length > 2 && index >= 2 && (
                    <Button
                      onClick={() => removeOption(index)}
                      className="remove-btn"
                    >
                      <X />
                    </Button>
                  )}
                </div>
              ))}
              <div className='add-option'>
                <Button type="button" onClick={addOption}> <Plus /> {language[6]}</Button>
              </div>

              <Button type='submit' disabled={loading} className='create-poll'>
                {loading ? <Spinner animation="border" size="sm" /> : `${language[7]}`}
              </Button>
            </form>
          </Col>
        </Row>

        <div className='mt-5' dangerouslySetInnerHTML={{ __html: htmlContent }} />
      </div>
    </Container>
  );
}
