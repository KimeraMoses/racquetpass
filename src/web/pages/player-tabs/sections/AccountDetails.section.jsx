import { Heading, HeadingButton, SubmitButton } from 'web/components';
import './AccountDetails.styles.scss';

const playerDetails = [
  { title: 'Name', value: 'Naomi Osaki' },
  { title: 'Email Address', value: 'naomi.osaki@gmail.com' },
  { title: 'Phone', value: 'Unspecified' },
];

export const AccountDetails = ({ t, setCurrent }) => {
  return (
    <div className="account-details-pt">
      <div>
        <div className="account-details-pt__menu-bar">
          <div className="account-details-pt__menu-bar-drawer-title">
            <HeadingButton drawer onClick={() => setCurrent('drawer')} />
            <Heading>Account Details</Heading>
          </div>
          <div className="account-details-pt__menu-bar-scan">
            <HeadingButton
              text={'Edit'}
              onClick={() => setCurrent('editAccount')}
            />
          </div>
        </div>

        <div className="account-details-pt__details">
          {playerDetails.map((detail) => {
            const { title, value } = detail;
            return (
              <div className="account-details-pt__details-detail">
                <h4 className="account-details-pt__details-detail-heading">
                  {title}
                </h4>
                <p className="account-details-pt__details-detail-text">
                  {value}
                </p>
              </div>
            );
          })}
          <div className="account-details-pt__details-detail">
            <h4 className="account-details-pt__details-detail-heading">
              Password
            </h4>
            <div className="account-details-pt__details-detail-field">
              <p className="account-details-pt__details-detail-field-text">
                ••••••••••••
              </p>
              <HeadingButton text={'Reset'} />
            </div>
          </div>
        </div>
      </div>

      <div className="account-details-pt__btn">
        <SubmitButton onClick={() => setCurrent('drawer')}>
          Save Changes
        </SubmitButton>
      </div>
    </div>
  );
};
