'use client'
import DefaultLayout from '@/components/layouts/defaultLayout';
import agent from '@/utils/agent';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Row, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';
import '../../assets/css/share.css'
import { MessageCircleMore } from 'lucide-react';
import Link from 'next/link';

export default function SharePollPage() {
  const router = useRouter();
  const [pollData, setPollData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const data = Cookies.get('pollData');
    if (data) {
      setPollData(JSON.parse(data));
    } else {
      router.replace('/');
    }
  }, [router]);

  // Function to handle copy URL button click
  const handleCopyUrl = () => {
    const url = `${process.env.NEXT_PUBLIC_APP_URL}poll/${pollData._id}`;
    navigator.clipboard.writeText(url)
      .then(() => {
        toast.success('URL copied to clipboard!');
      })
      .catch(() => {
        toast.error('Failed to copy URL');
      });
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      const response = await agent.del(`/poll/${pollData._id}`);
      if (response.success) {
        toast.success(response.message);
        Cookies.remove('pollData')
        router.push('/create-poll');
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
  };

  const pollUrl = `${process.env.NEXT_PUBLIC_APP_URL}/poll/${pollData?._id}`;
  const message = `I created this poll\nCan you vote here? I want to see who gets\nthe most votes\n👇🏻👇🏻\n*${pollUrl}*`;


  return (
    <DefaultLayout>
      <div className='share-main'>
        <Container>
          <Row className='justify-content-center'>
            <Col md="6">
              <Card>
                <h2>Your poll is ready</h2>
                <p>Share this link with your friends</p>
                <input value={`${process.env.NEXT_PUBLIC_APP_URL}poll/${pollData?._id}`} disabled className='mt-3' />
                <div className='flex'>
                  <div className='left'>
                    <Button onClick={handleCopyUrl}>Copy Url</Button>
                  </div>
                  <div className='right'>
                    <Button disabled={loading} onClick={handleDelete}>
                      {loading ? <Spinner animation="border" size="sm" /> : 'Delete'}
                    </Button>
                  </div>
                </div>
                <Link
                  href={`whatsapp://send?text=${encodeURIComponent(message)}`}
                  target="_blank"
                >
                  <Button className="share-wp">
                    <MessageCircleMore /> 👉🏻 Share On WhatsApp 👈🏻 <MessageCircleMore />
                  </Button>
                </Link>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </DefaultLayout>
  );
}
