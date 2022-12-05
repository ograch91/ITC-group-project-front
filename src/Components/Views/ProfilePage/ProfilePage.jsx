import { Header } from '../../StaticElements/Header/Header';
import { ContentWrapper } from '../../Layout/ContentWrapper/ContentWrapper';
import { ProfileSetting } from '../../ActiveElements/ProfileSetting/ProfileSetting';
import style from './ProfilePage.module.css';

export const ProfilePage = () => {
  return (
    <div className={style.ProfilePage}>
      <Header title="Settings"/>
      <ContentWrapper>
      <ProfileSetting/>
      </ContentWrapper>
    </div>
  )
}
