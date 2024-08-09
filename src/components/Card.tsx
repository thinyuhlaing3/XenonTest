import { Navigate, useNavigate } from "react-router-dom"
import Card1 from "../img/Card(1).png"
import Card2 from "../img/Card(2).png"
import { config } from "../config"
interface Props{
text:string
routeKey : string
photo1 :string
photo2:string
}
export default function Card ({text,routeKey,photo1,photo2}:Props) {
    const navigate = useNavigate()
    const baseUrl = config.baseUrl
   
    return(
        
    <div className="card-container">
    <div className="left-column">
      <h1>
        Get
        <span className="highlight">FREE</span>
      </h1>
      <h1>{text.split(" ")[0]}
<br></br>
{text.split(" ")[1]}
      </h1>
      <a  className="register-button" onClick={() => navigate(`/${baseUrl}/${routeKey}/register`)}>REGISTER NOW</a>
    </div>

    <div className="right-column">
      <img src={photo1} alt="Business Card Front" id="image1" />
      <img src={photo2} alt="Business Card Back" id="image2" />
    </div>
  </div>
    )
}