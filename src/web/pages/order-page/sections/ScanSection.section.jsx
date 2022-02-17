import React from 'react';
import { Field } from 'redux-form';
// Custom Components
import { Heading, SubHeading, Description, CloseButton } from 'web/components';
// Styles
import './ScanSection.styles.scss';

export function ScanSection({ t }) {
  return (
    <div className="scan-section">
      <div className="scan-section__heading">
        <Heading>{t('odrHeading')}</Heading>
        <CloseButton />
      </div>
    </div>
  );
}
