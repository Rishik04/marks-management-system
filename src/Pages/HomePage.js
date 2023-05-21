import React from 'react'
import MainHeader from '../Components/MainHeader'
import './HomePage.scss';

export const HomePage = () => {
  return (
    <div className='home-page'>
        <MainHeader />

        <div className="Container">
            <div className="wrapper">
                <div className="home-left">Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero accusantium maiores ad est. Enim provident, excepturi saepe non, eos impedit sunt nam quod quibusdam quaerat, recusandae ullam eaque voluptatem! Inventore.</div>
                <div className="home-right">
                <img src="https://i.gifer.com/Owm.gif" alt="" />
                </div>
            </div>
        </div>
    </div>
  )
}
