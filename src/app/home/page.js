import HomeContainer from '@/components/containers/HomeContainer'
import DefaultLayout from '@/components/layouts/defaultLayout'
import React from 'react'
import '../../assets/css/home.css'

export default function Home() {
  return (
    <DefaultLayout >
      <HomeContainer />
    </DefaultLayout>
  )
}
