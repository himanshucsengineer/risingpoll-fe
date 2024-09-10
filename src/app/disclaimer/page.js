import DefaultLayout from '@/components/layouts/defaultLayout'
import React from 'react'
import { Container } from 'react-bootstrap'

export default function Disclaimer() {
  return (
      <DefaultLayout>
        <Container>
          <div className='privacy-policy-main'>
            <h1>Disclaimer</h1>
            <p>The content contained within Rising Poll user-generated polls is not created, reviewed, or approved by Rising Poll. It is important to note that the opinions and information expressed in these polls are solely those of the users who have created them and do not reflect the views or opinions of Rising Poll.</p>
            <p>If you come across any material that is offensive, inappropriate, or in violation of community guidelines, we strongly encourage you to use the "Report Content" feature that can be found in the drop-down menu on the site. This will allow our team to review the issue and take the necessary actions to address it.</p>
            <p>It is our commitment to maintain a safe and respectful community and we appreciate your efforts in helping us achieve this goal.</p>
            <h2>Rules for Rising Poll</h2>
            <ol>
              <li>Our rules are straightforward: create polls, express your opinion, and have a good time! However, it is important to avoid any behavior that could hurt, embarrass, or harm others.</li>
              <li>Do not create any polls or comments that contain illegal, abusive, or offensive information.</li>
              <li>Refrain from posting illegal, abusive, or offensive comments.</li>
              <li>You are solely responsible for the content you publish on Rising Poll.</li>
              <li>If you violate these rules in a severe manner, we may need to cooperate with law enforcement in your jurisdiction.</li>
            </ol>
          </div>
        </Container>
      </DefaultLayout>
  )
}
