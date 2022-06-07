import { useEffect, useState } from 'react';
import Drawer from 'react-modern-drawer';
import { useLocation, useNavigate } from 'react-router-dom';

// Custom Components
import { Avatar, HeadingButton, Heading, Tabs } from 'web/components';
import { Tick, Shop, Inventory, Payment, Logout } from 'web/icons';
//import styles 👇
import 'react-modern-drawer/dist/index.css';
import './index.scss';

export const CustomDrawer = ({ show, setShow, activeLink }) => {
  const toggleDrawer = () => {
    setShow((prevState) => !prevState);
  };

  const [active, setActive] = useState('');

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location?.pathname === '/tasks') {
      setActive('1');
    } else if (activeLink === 'inventory') {
      setActive('3');
    } else if (activeLink === 'proshop') {
      setActive('2');
    } else if (activeLink === 'payment') {
      setActive('4');
    }
  }, [location?.pathname, activeLink]);

  return (
    <>
      <Drawer
        open={show}
        onClose={toggleDrawer}
        direction="left"
        className="bla bla bla"
        size={`${80}vw`}
      >
        <div className="inventory-dashboard mt-[40px]">
          <div className="inventory-dashboard__profile">
            <div className="inventory-dashboard__profile-avatar">
              <Avatar height={102} width={102} img="/img/player/1.png" />
              <div className="inventory-dashboard__profile-avatar-text">
                <Heading customClass="inventory-dashboard__profile-avatar-text-heading">
                  Andre's Awesome Pro Racquets
                </Heading>
              </div>
            </div>
            <div className="inventory-dashboard__profile-close">
              <HeadingButton
                close
                height="48px"
                width="48px"
                onClick={() => setShow(false)}
              />
            </div>
          </div>

          <div className="inventory-dashboard__menu">
            <Tabs
              tabs={[
                {
                  title: 'Your Orders',
                  Icon: Tick,
                  active: active === '1',
                  onClick: () => {
                    setActive('1');
                    navigate('/tasks');
                    setShow(false);
                  },
                },
                {
                  title: 'Shop Settings',
                  Icon: Shop,
                  active: active === '2',
                  onClick: () => {
                    setActive('2');
                    navigate('/inventory?active=proshop');
                    setShow(false);
                  },
                },
                {
                  title: 'Inventory',
                  Icon: Inventory,
                  active: active === '3',
                  onClick: () => {
                    setActive('3');
                    navigate('/inventory?active=inventory');
                    setShow(false);
                  },
                },
                {
                  title: 'Payment Methods',
                  Icon: Payment,
                  active: active === '4',
                  onClick: () => {
                    setActive('4');
                    navigate('/inventory?active=payment');
                    setShow(false);
                  },
                },
                {
                  title: 'Logout',
                  Icon: Logout,
                  active: active === '5',
                  onClick: () => {
                    navigate('/login');
                    setShow(false);
                  },
                },
              ]}
            />
          </div>
        </div>
      </Drawer>
    </>
  );
};
