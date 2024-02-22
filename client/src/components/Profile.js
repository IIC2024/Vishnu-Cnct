import { useEffect, useState } from "react"
import { useUserContext } from "./UserContext";
import { useNavigate } from "react-router-dom";

export default function Profile(){
    const [userData, setUserData] = useState({
        userid: '',
        username: '',
        isfaculty: '',
        geeksForGeeksProfile: '',
        linkedinProfile: '',
        githubProfile: '',
        year: '',
        department: '',
        skills: [], // Array of skills
        projects: [], // Array of projects
        publications: [], // Array of publications
        posts: [], // Array of posts
        leetcodeProfile: '',
        courseraProfile: '',
        email: '',
        contactNumber: '',
        address: '',
        dateOfBirth: '',
        awards: [], // Array of awards
        achievements: []
      });
      const[userData1,setUserData1]=useState({
        userid:'',
        username: '',
        isfaculty: '',
        department: '',
        designation: '',
        email: '',
        contactNumber: '',
        address: '',
        dateOfBirth: '',
        publications: [],
        projects: [],
        linkedinProfile: '',
        googleScholarProfile: '',
        awards: [],
      })
      const Navigate = useNavigate();
      const { userId, isFaculty } = useUserContext();
      
      useEffect(() => {
        if (userId) {
          const url = `/profile/${userId}?isFaculty=${isFaculty}`;
          const fetchProfileDetails = async () => {
            try {
              const response = await fetch(process.env.REACT_APP_API_URL + url, {
                method: "GET",
              });
      
              if (response.status === 201) {
             
                  // Handle 201 status code
            
                  const data = await response.json();
                  if(isFaculty)
                  setUserData1(data);
                  else
                  setUserData(data);
          
              } else {
                alert("User Not Found");
                Navigate("/login");

                // Handle error appropriately
              }
            } catch (error) {
              console.error('Error fetching profile details:', error);
              // Handle error appropriately
            }
          };
      
          fetchProfileDetails();
        }
      }, [userId, isFaculty,Navigate]);
      

    return(<div>
        <h1>Profile</h1>
        {
            isFaculty ? (<div>
               <ul>
      {Object.entries(userData1).map(([key, value]) => (
        <li key={key}>
          {key}: {value}
        </li>
      ))}
    </ul>
                </div>):(<div>
                    <ul>
      {Object.entries(userData).map(([key, value]) => (
        <li key={key}>
          {key}: {value}
        </li>
      ))}
    </ul>
                </div>)
        }


</div>)
}