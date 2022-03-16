import {
  HeadingButton,
  Heading,
  SubmitButton,
  SearchCard,
} from 'web/components';

import './ProShop.styles.scss';

export const ProShop = ({ t, setCurrent }) => {
  return (
    <>
      <div className="proshop">
        <div>
          <div className="proshop__header">
            <div className="proshop__header-title">
              <HeadingButton drawer onClick={() => setCurrent('drawer')} />
              <Heading>Pro Shops</Heading>
            </div>
            <div className="proshop__header-btn">
              <HeadingButton
                text={'Edit'}
                onClick={() => setCurrent('editAccount')}
              />
            </div>
          </div>
          <div className="proshop__content">
            <SearchCard
              shop={{
                name: 'Jimmy’s Pro Shop',
                address: '123 Main Street, Seattle, WA',
              }}
            />
            <SearchCard
              shop={{
                name: 'Jimmy’s Pro Shop',
                address: '123 Main Street, Seattle, WA',
              }}
            />
          </div>
        </div>

        <div className="account-details-pt__btn">
          <SubmitButton onClick={() => setCurrent('drawer')}>
            Save Changes
          </SubmitButton>
        </div>
      </div>
    </>
  );
};
