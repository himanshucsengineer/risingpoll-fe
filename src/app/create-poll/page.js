import CreatepollContainer from '@/components/containers/CreatepollContainer'
import DefaultLayout from '@/components/layouts/defaultLayout'
import React from 'react'
import '../../assets/css/createpoll.css'

export default function CreatePoll() {
  return (
    <DefaultLayout>
        <CreatepollContainer />
    </DefaultLayout>
  )
}
