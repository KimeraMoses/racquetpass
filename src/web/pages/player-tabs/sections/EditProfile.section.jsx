import {
  Avatar,
  Heading,
  HeadingButton,
  CustomInput,
  CustomSelect,
  CustomRadio,
  SubmitButton,
} from 'web/components';
import { Link } from 'react-router-dom';
import './EditProfile.styles.scss';
import { Field } from 'redux-form';

export const EditProfile = ({ t }) => {
  return (
    <div className="edit-profile">
      <div className="edit-profile__heading">
        <div className="edit-profile__heading-text">
          <Heading>Edit Player Profile</Heading>
        </div>
        <div className="edit-profile__heading-btn">
          <HeadingButton close />
        </div>
      </div>

      <div className="edit-profile__avatar">
        <div className="edit-profile__avatar-img">
          <Avatar height={80} width={80} img="/img/player/1.png" />
        </div>
        <div className="edit-profile__avatar-text">
          <div className="edit-profile__avatar-text-name">
            <Heading>Player Name</Heading>
          </div>
          <div className="edit-profile__avatar-text-btn">
            <Link to="#">Change Photo</Link>
          </div>
        </div>
      </div>

      <div className="edit-profile__form">
        <Field
          name="playerName"
          label="Name"
          placeholder="Naomi Osaki"
          type="text"
          component={CustomInput}
        />
        <Field
          name="birthday"
          label="Birthday"
          type="text"
          component={CustomInput}
        />
        <Field
          name="playingLevel"
          label="Playing Level"
          component={CustomSelect}
          options={[
            { label: 'One', value: 'one' },
            { label: 'Two', value: 'two' },
          ]}
        />
        <Field
          name="playingHand"
          label="Playing Hand"
          component={CustomSelect}
          options={[
            { label: 'Left', value: 'left' },
            { label: 'Right', value: 'right' },
          ]}
        />
        <CustomRadio
          name="playingStyle"
          label="Playing Style"
          options={[
            { label: 'Style 1', value: '1' },
            { label: 'Style 2', value: '2' },
            { label: 'Style 3', value: '3' },
            { label: 'Style 4', value: '4' },
          ]}
        />
        <Field
          name="proPlayerStyleTwin"
          label="Pro Player Style Twin"
          type="text"
          component={CustomInput}
        />
      </div>

      <div className="edit-profile__btn">
        <SubmitButton>Save Changes</SubmitButton>
      </div>
    </div>
  );
};
