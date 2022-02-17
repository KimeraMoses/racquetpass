import { Field } from 'redux-form';

// Custom Components
import { Heading, Description, CloseButton, CustomInput } from 'web/components';

// Styles
import './SelectString.styles.scss';

export function SelectString({ t }) {
  return (
    <>
      <div className="select-string">
        <div className="select-string__heading">
          <Heading customClass="select-string__heading-text">
            {t('odrSelect')}
          </Heading>
          <CloseButton />
        </div>
        <div className="select-string__text-container">
          <Description customClass="select-string__text-container-text">
            {t('odrSelectDesc')}
          </Description>
        </div>
      </div>
    </>
  );
}
