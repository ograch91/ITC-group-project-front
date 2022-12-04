import { Header } from '../../StaticElements/Header/Header';
import {SettingsForm} from  "../../ActiveElements/SettingsForm/SettingsForm"
import { ContentWrapper } from '../../Layout/ContentWrapper/ContentWrapper';
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
