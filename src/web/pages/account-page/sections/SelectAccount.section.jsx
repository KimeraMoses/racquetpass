import { BackButton, Heading, AccountCard } from 'web/components';
// import {} from 'web/components';
// import { } from 'web/components/atoms/Heading.atom';

import './SelectAccount.styles.scss';

export function SelectAccount({ t }) {
  return (
    <>
      <div className="select-account">
        <div className="select-account__header-container">
          <div className="select-account__header-container-heading">
            <BackButton />
            <Heading>{t('odrCreateBtn')}</Heading>
          </div>
          <div className="select-account__button-container">
            <button className="select-account__button-container-btn">
              {t('homeSignin')}
            </button>
          </div>
        </div>
        <div className="select-account__card-container">
          <AccountCard
            heading="I'm a Player"
            description="Get started with a new account as a player."
            img="/img/accountpage/Image.png"
          />
          <AccountCard
            heading="I'm a Stringer"
            description="Get started with a new account as a stringer."
            img="/img/accountpage/stringer.png"
          />
        </div>
      </div>
    </>
  );
}
