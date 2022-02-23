import { Avatar, BackButton, Heading, HeadingButton } from 'web/components';
import './PlayerProfile.styles.scss';

const playerDetails = [
  { title: 'Birthday', value: 'Unspecified' },
  { title: 'Playing Level', value: 'Unspecified' },
  { title: 'Playing Hand', value: 'Unspecified' },
  { title: 'Playing Style', value: 'Style 1' },
  { title: 'Pro Playing Style Twin', value: 'Unspecified' },
];

export const PlayerProfile = ({ t }) => {
  return (
    <div className="player-profile">
      <div className="player-profile__heading">
        <div className="player-profile__heading-btn">
          <BackButton />
        </div>
        <div className="player-profile__heading-text">
          <Heading>Player Profile</Heading>
        </div>
      </div>

      <div className="player-profile__avatar">
        <div className="player-profile__avatar-img">
          <Avatar height={80} width={80} img="/img/player/1.png" />
        </div>
        <div className="player-profile__avatar-text">
          <div className="player-profile__avatar-text-name">
            <Heading>Player Name</Heading>
          </div>
          <div className="player-profile__avatar-text-btn">
            <HeadingButton text="Edit Profile" />
          </div>
        </div>
      </div>

      <div className="player-profile__details">
        {playerDetails.map((detail) => {
          const { title, value } = detail;
          return (
            <div className="player-profile__details-detail">
              <h4 className="player-profile__details-detail-heading">
                {title}
              </h4>
              <p className="player-profile__details-detail-text">{value}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
