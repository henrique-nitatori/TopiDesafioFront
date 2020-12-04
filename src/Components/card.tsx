import '../Styles/Components/card.css'

import ProfileImg from '../img/profile.svg'
import forkIcon from '../img/fork.svg'
import starIcon from '../img/star.svg'

interface ICard {
    profileImg?: string,
    ownerOfProject: string,
    projectName: string
    projectDescription: string,
    projectDateCreated: string,
    projectNumberOfStars: number,
    projectNumberOfForks: number
}


const Card: React.FC<ICard> = ({profileImg, ownerOfProject,projectName, projectDateCreated, projectDescription, projectNumberOfStars, projectNumberOfForks}) => {
  return (
      <div id="card">
          <header>
              <img src={profileImg || ProfileImg}  alt="Foto do usuário"/>
              <div className="profile">
                <span className="profile-name">{`${ownerOfProject} - ${projectName}`}</span>
                <span className="date">{projectDateCreated}</span>
              </div>
          </header>
          <section className="content">
                <div className="description">
                    {projectDescription}
                </div>
          </section>
            <div className="project-status">
                <div><img src={starIcon} alt="Ícone do número de estrelas"/><span>{projectNumberOfStars}</span></div>
                <div><img src={forkIcon} alt="Ícone do número de fork"/><span>{projectNumberOfForks}</span></div>
            </div>
      </div>
  );
}

export default Card;