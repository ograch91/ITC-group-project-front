import { useContext,useEffect } from 'react';
import { Header } from '../../StaticElements/Header/Header';
import { ContentWrapper } from '../../Layout/ContentWrapper/ContentWrapper';
import { ProfileDetailsLoader } from '../../APILoaded/ProfileDetailsLoader';
import { currentPageContext } from '../../../Context/CurrentPageContext';
import style from './ProfilePage.module.css';

export const ProfilePage = () => {


  const{currentPage,setCurrentPage}=useContext(currentPageContext);


  useEffect(()=>{

    setCurrentPage((currentPage)=>{return {...currentPage,Profile:true}});

    return(()=>{
      setCurrentPage((currentPage)=>{return {...currentPage,Profile:false}});
    })
  },[])



  return (
    <div className={style.ProfilePage}>
      <Header title="User Profile"/>
      <ContentWrapper>
      <ProfileDetailsLoader/>
      </ContentWrapper>
    </div>
  )
}
