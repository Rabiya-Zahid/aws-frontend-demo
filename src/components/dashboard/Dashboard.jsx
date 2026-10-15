import  React ,{useState,useEffect}  from    'react';
import  "./dashboard.css"
import Navbar from "../Navbar";
const  Dashboard=()=>{
const   [repositories,setRepositories]=useState([]);
const   [searchQuery,setSearchQuery]=useState("");
const   [suggestedRepositories,setSuggestedRepositories]=useState([]);
const   [searchResults,setSearchResults]=useState([]);
const   [starredRepos,setStarredRepos]=useState([]);
useEffect(()=>{
    const   userId=localStorage.getItem("userId");
   
    const   fetchRepositories=async()=>{
        try{
        const   response=await  fetch(`http://localhost:3002/repo/user/${userId}`);
        const   data=await  response.json();
        setRepositories(data.repositories);
        }
        catch(err){
            console.error("Error while fetching repositories ",err);
        }
    };
    const   fetchSuggestedRepositories=async()=>{
        try{
            const   response=await  fetch(`http://localhost:3002/repo/all`);
            const   data=await response.json()  ;
            setSuggestedRepositories(data)  ; 
           
        }
        catch(err){
            console.error("Error while fetching suggested repositories ",err);
        }
    };
    fetchRepositories();
    fetchSuggestedRepositories();
},[]);
useEffect(()=>{
if(searchQuery==""){
    setSearchResults(repositories);
}
else{
    const   filteredRepo=repositories.filter((repo)=>{
      return  repo.name.toLowerCase().includes(searchQuery.toLowerCase())
    });
    setSearchResults(filteredRepo);
}
},[searchQuery,repositories]);
console.log("repositories:", repositories);
console.log("suggestedRepositories:", suggestedRepositories);
console.log("searchResults:", searchResults);
 const   handleStar=async(repoId)=>{
        const   userId=localStorage.getItem("userId");
        try{
            const   response=await  fetch(
                 `http://localhost:3002/repo/star/${userId}/${repoId}`,
            {
                method: "POST"
            }
            )
            if(response.ok){
            setStarredRepos([...starredRepos, repoId]);
        }
        }
        catch(err){
            console.error("Error starring repository  ",err);
        }

    };
return(
    <>
    <Navbar></Navbar>
    <section    id="dashboard">
        <aside>
            <h3>Suggested   Repositories</h3>
            {suggestedRepositories.map((repo)=>{
                return(
                    <div  key={repo._id}   >
                        <h4>{repo.name}</h4>
                        
                        <button onClick={()=>handleStar(repo._id)}>
                            {starredRepos.includes(repo._id)?"★" : "☆"}
                        </button>
                    </div>
                );
            })}
        </aside>
        <main>
             <h2>Your  Repositories</h2>
             <div   id='search'>
                <input type='text'  value={searchQuery} placeholder='Search..' onChange={(e)=>setSearchQuery(e.target.value)}   />
             </div>
            {searchResults.map((repo)=>{
                return(
                    <div    key={repo._id}>
                        <h4>{repo.name}</h4>
                        
                    </div>
                );
            })}
        </main>
        <aside>
            <h3>Upcoming    Events</h3>
            <ul>
                <li>
                    <p>
                    Tech    Conference-December-15
                </p>
                </li>
                <li>
                    <p>
                    Developer   Meetup-December-25
                </p>
                </li>
                <li>
                    <p>
                    React   Summit-Jan-5
                </p>
                </li>

            </ul>
        </aside>

    </section>
    </>
);

};
export  default Dashboard;