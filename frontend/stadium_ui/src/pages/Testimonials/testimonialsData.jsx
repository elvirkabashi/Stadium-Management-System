import image1 from "../../Assets/hospitality.jpg"
import image2 from "../../Assets/dardanet.jpg"
import image3 from "../../Assets/footballKit.jpg"
import { Link } from "react-router-dom";

export const testimonialsData =[
    {
        image:image1,
        review: "The ultimate way to enjoy the most iconic stadium in the world",
        name: "MEMBERSHIP",
        status: "CULINARY"
    },
    {
        image:image2,
        review: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi ipsam, ab itaque nam perferendis impedit sint",
        name: (
            <Link to="/fans">
              DARDANET
            </Link>
        ),
        status: "KOSOVA"
    },
    {
        image:image3,
        review: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi ipsam, ab itaque nam perferendis impedit sint",
        name: (
            <Link to="/shop">
              SHOP
            </Link>
        ),
        status: "GET YOUR OFFICIAL SHIRT"
    },
];






























































































































































