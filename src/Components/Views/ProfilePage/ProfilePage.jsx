import { Header } from '../../StaticElements/Header/Header';
import { ContentWrapper } from '../../Layout/ContentWrapper/ContentWrapper';
import { ProfileDetailsLoader } from '../../APILoaded/ProfileDetailsLoader';
import style from './ProfilePage.module.css';

export const ProfilePage = () => {
  return (
    <div className={style.ProfilePage}>
      <Header title="Settings"/>
      <ContentWrapper>
      <ProfileDetailsLoader/>
      </ContentWrapper>
    </div>
  )
}
