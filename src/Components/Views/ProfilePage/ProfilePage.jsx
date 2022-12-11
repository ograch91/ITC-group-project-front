import { Header } from '../../StaticElements/Header/Header';
import { ContentWrapper } from '../../Layout/ContentWrapper/ContentWrapper';
import style from './ProfilePage.module.css';
import { ProfileDetails } from '../../Profile/ProfileDetails';
import { ProfileDetailsLoader } from '../../APILoaded/ProfileDetailsLoader';

export const ProfilePage = () => {
  return (
    <div className={style.ProfilePage}>
      <Header title="Settings"/>
      <ProfileDetailsLoader/>
    </div>
  )
}
