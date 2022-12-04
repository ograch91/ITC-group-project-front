import { Header } from '../../StaticElements/Header/Header';
import { ContentWrapper } from '../../Layout/ContentWrapper/ContentWrapper';
import { SettingsForm } from '../../ActiveElements/SettingsForm/SettingsForm';
import style from './ProfilePage.module.css';

export const ProfilePage = () => {
  return (
    <div className={style.ProfilePage}>
      <Header title="Settings"/>
      <ContentWrapper>
      <SettingsForm/>
      </ContentWrapper>
    </div>
  )
}
