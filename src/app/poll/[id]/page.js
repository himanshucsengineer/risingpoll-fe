'use client'
import DefaultLayout from '@/components/layouts/defaultLayout';
import agent from '@/utils/agent';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Card, Col, Container, Row, Button, Form, ProgressBar } from 'react-bootstrap';
import { toast } from 'react-toastify';
import '../../../assets/css/poll.css';
import Link from 'next/link';
import { MessageCircleMore } from 'lucide-react';

export default function Vote() {
  const { id } = useParams(); // Destructure the id from useParams
  const router = useRouter();
  const [pollData, setPollData] = useState(null); // Store the fetched poll data
  const [selectedOption, setSelectedOption] = useState(''); // State to store selected option
  const [showResults, setShowResults] = useState(false); // State to control whether to show results or not
  const [totalVotes, setTotalVotes] = useState(0);

  useEffect(() => {
    const fetchPollData = async () => {
      try {
        const response = await agent.get(`/poll/${id}`);
        if (response.success === false) {
          router.push('/not-found');
        } else {
          setPollData(response.data); // Save the fetched data
        }
      } catch (err) {
        console.error(err);
        router.push('/not-found');
      }
    };

    if (id) {
      fetchPollData(); // Fetch the poll data when id is available
    }
  }, [id, router]);

  // Handle the vote submission
  const handleVote = async () => {
    if (!selectedOption) {
      toast.error("Please select an option before voting.");
      return;
    }

    const updatedPollData = { ...pollData };
    
    // Find the selected option and increment its vote count
    const updatedOptions = updatedPollData.options.map((option) => {
      if (option.option === selectedOption) {
        return { ...option, vote: option.vote + 1 }; // Increment the vote count
      }
      return option;
    });
  
    const data = {
      title: updatedPollData.title,
      options: updatedOptions, // Send updated options with incremented votes
    };
  
    try {
      const response = await agent.patch(`/poll/${id}`, data); // Assuming this endpoint updates the poll
  
      if (response.success) {
        toast.success("Vote submitted successfully!");
        
        // Refetch poll data to update the vote count in UI
        const newPollData = await agent.get(`/poll/${id}`);
        setPollData(newPollData.data);

        // Reset selected option for allowing the user to vote again
        setSelectedOption('');
      } else {
        toast.error("Failed to submit vote.");
      }
    } catch (err) {
      toast.error("An error occurred while submitting your vote.");
    }
  };

  const handleResult = () => {
    setShowResults(true); // Show the results when the button is clicked
    const total = pollData.options.reduce((sum, opt) => sum + opt.vote, 0);
    setTotalVotes(total); // Calculate total votes once
  };

  const handleBack = () => {
    setShowResults(false); // Hide the results and show the voting options again
  };

  const pollUrl = `${process.env.NEXT_PUBLIC_APP_URL}/poll/${pollData?._id}`;
  const message = `I created this poll\nCan you vote here? I want to see who gets\nthe most votes\n👇🏻👇🏻\n*${pollUrl}*`;

  return (
    <DefaultLayout>
      <Container>
        <div className='vote-now-main'>
          <Row className='justify-content-center'>
            <Col md="6">
              <Card>
                {pollData ? (
                  <>
                    {/* Conditional Rendering: Show Vote Form if showResults is false */}
                    {!showResults ? (
                      <div className='d-block'>
                        <h3>{pollData.title}</h3>
                        <Form>
                          {/* Render poll options as radio buttons */}
                          {pollData.options.map((option, index) => (
                            <Form.Check
                              key={index}
                              type="radio"
                              id={`option-${index}`}
                              label={option.option}
                              name="poll-option"
                              value={option.option}
                              checked={selectedOption === option.option}
                              onChange={() => setSelectedOption(option.option)}
                            />
                          ))}
                        </Form>
                        <div className='flex'>
                          <div className='left'>
                            <Button onClick={handleVote} className="mt-3">Vote</Button>
                          </div>
                          <div className='right'>
                            <Button onClick={handleResult} className="mt-3">Show Result</Button>
                          </div>
                        </div>
                        <Button className="mt-3">
                          <Link href={'/create-poll'}>Create Your Poll</Link>
                        </Button>
                      </div>
                    ) : (
                      /* Conditional Rendering: Show Results if showResults is true */
                      <div className='d-block'>
                        <h3>{pollData.title} </h3>
                        {pollData.options.map((option, index) => {
                          const percentage = totalVotes ? Math.round((option.vote / totalVotes) * 100) : 0;
                          return (
                            <div key={index}>
                              <div className='show-result-flex'>
                                <div className='left'>{option.option}</div>
                                <div className='middle'>
                                  <ProgressBar now={percentage} label={`${percentage}%`} />
                                </div>
                                <div className='right'>({percentage}%) {option.vote}</div>
                              </div>
                            </div>
                          );
                        })}
                        <div className='show-result-flex'>
                          <div className='left'></div>
                          <div className='middle'></div>
                          <div className='right'>Total Votes: {totalVotes}</div>
                        </div>
                        <Button onClick={handleBack} className="mt-3">Back</Button>
                      </div>
                    )}
                  </>
                ) : (
                  <p>Loading poll data...</p>
                )}
              </Card>
            </Col>
          </Row>
        </div>
      </Container>

      <Link
        href={`whatsapp://send?text=${encodeURIComponent(message)}`}
        target="_blank"
      >
        <Button className="share-on-wp">
          <MessageCircleMore /> 👉🏻 Share On WhatsApp 👈🏻 <MessageCircleMore />
        </Button>
      </Link>
    </DefaultLayout>
  );
}
