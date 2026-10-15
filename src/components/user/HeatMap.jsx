import  React,{useEffect,useState} from "react";
import  HeatMap from    "@uiw/react-heat-map";
//Function  to  geenrate    random  activity

const   getPanelColors=(maxCount)=>{
const   colors={}
for(let i=0;i<=maxCount;i++){
    const   greenValue=Math.floor((i/maxCount)*255);
    colors[i]=`rgb(0,${greenValue},0)`;
}
return  colors;
};
const   HeatMapProfile=()=>{
    const   [activityData,setActivityData]=useState([]);
    const   [panelColors,setPanelColors]=useState({});
    const   today=new   Date().getFullYear();;
    const   startDate=new Date(today,0,1)  ;

    const   endDate=    new Date(today+1,0,1);
   
    useEffect(()=>{
        const   fetchData=async()=>{
            try{
                const   userId=localStorage.getItem("userId");
                if(!userId){
                    console.error("User Id not found    in  local storage");
                    return;
                }
                const   response=await  fetch(`http://localhost:3002/activity/${userId}`);
                if(!response.ok){
                    throw   new Error("Failed to fecth activity");
                }
                const   data=await  response.json();
                setActivityData(data);
//              setActivityData(
//   data.map((item) => ({
//     ...item,
//     date: item.date.replace(/-/g, "/")
//   }))
// );
                const   maxCount=Math.max(0,...data.map((item)=>item.count));
                setPanelColors(getPanelColors(maxCount));
            } catch(err)  {
                console.error("Error during fethcing activity ",err);
            }
        };
        fetchData();
             },[]);
    return(
        <div style={{ width: "100%", minWidth: 0, overflowX: "auto" }}>
            <h4>Recent  Contributions</h4>
            <HeatMap    className="HeatMapProfile" width={800} style={{width:"700px",maxWidth:'100%',height:'400px',color:'white'}} value={activityData} weekLabels
            ={["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]} startDate={startDate}  endDate={endDate}  rectSize={10} space={2} rectProps={{rx:3.0}} panelColors={panelColors}
           
    ></HeatMap>
        </div>
    )

};
export  default HeatMapProfile;