import Card from "../components/Card";
import Card1 from "../img/Card(1).png";
import Card2 from "../img/Card(2).png";
import PhotoFrame from "../img/Frame.png";

export default function CampingPage() {
    return (
        <div className="camping-container">
            <Card routeKey="bc" text="Business Card" photo1={Card1} photo2={Card2} />
            <Card routeKey="pf" text="Photo Frame" photo1={PhotoFrame} photo2={PhotoFrame} />
        </div>
    );
}
