import React from 'react'
import {useNavigate, useLocation} from 'react-router-dom'
import {ReactComponent as ExploreIcon} from '../assets/svg/exploreIcon.svg'
import {ReactComponent as OfferIcon} from '../assets/svg/localOfferIcon.svg'
import {ReactComponent as PersonOutlineIcon} from '../assets/svg/personOutlineIcon.svg'




function Navbar() {

  const navigate = useNavigate();
  const location = useLocation();

  const pathMatchRoute = (route) =>{
    if (route === location.pathname ){
      return true
    }
  }

  return (
    <div>
      
      <footer className='navbar'>
          <nav className='navbarNav'>
            <ul className='navbarListItems'>
              <li className='navbarListItem'>
                <ExploreIcon  onClick ={() => navigate('/')} 
                  fill= {pathMatchRoute('/') ? '#2c2c2c' : '#8f8f8f' } 
                  width='36px'
                  height='36px'
                />
                <p
                className={pathMatchRoute('/') ? 'navbarListItemNameActive' : 'navbarListItemName'}
                >
                  Explore
                </p>
              </li>
              <li className='navbarListItem' >
                <OfferIcon  onClick ={() => navigate('/offer')}
                  fill= {pathMatchRoute('/offer') ? '#2c2c2c' : '#8f8f8f' } 
                  width='36px'
                  height='36px'
                />
                <p
                className={pathMatchRoute('/offer') ? 'navbarListItemNameActive' : 'navbarListItemName'}
                >
                  Offers
                </p>
              </li>
              <li className='navbarListItem' >
                <PersonOutlineIcon  onClick ={() => navigate('/profile')}
                  fill={pathMatchRoute('/profile') ? '#2c2c2c' : '#8f8f8f' } 
                  width='36px'
                  height='36px'
                />
                <p
                className={pathMatchRoute('/profile') ? 'navbarListItemNameActive' : 'navbarListItemName'}
                >
                  Profile
                </p>
              </li>
            </ul>
          </nav>
    </footer>

    </div>
  )
}

export default Navbar