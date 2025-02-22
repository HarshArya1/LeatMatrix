document.addEventListener("DOMContentLoaded",()=>{

    const searchButton = document.getElementById("search-btn");
    const resetButton=document.getElementById("reset-btn");
    const usernameInput = document.getElementById("user-input");
    const statsContainer = document.querySelector(".stats-container");
    const easyProgressCircle = document.querySelector(".easy-progress");
    const mediumProgressCircle = document.querySelector(".medium-progress");
    const hardProgressCircle = document.querySelector(".hard-progress");
    const easyLabel = document.getElementById("easy-label");
    const mediumLabel = document.getElementById("medium-label");
    const hardLabel = document.getElementById("hard-label");
    const cardStatsContainer = document.querySelector(".stats-cards");
    const displays1=document.getElementById('circle1');
    const displays2=document.getElementById('circle2');
    const displays3=document.getElementById('circle3');
    
    displays1.style.display="none";
    displays2.style.display="none";
    displays3.style.display="none";
    // return true or false based on a regex
    function validateUsername(username){
        if(username.trim()===""){
            alert("Username should not be empty");
            return false;
        }
        const regex=/^[A-Za-z\s'-]+$/;
        const isMatching=regex.test(username);
        if(!isMatching){
            alert("Invalid Username");
        }
        return isMatching;
    }

    async function fetechUserDetail(username){
        const url=`https://leetcode-stats-api.herokuapp.com/${username}`;
        try{
            searchButton.textContent="Searching..."
            searchButton.disabled=true;
            
            const response=await fetch(url);
            if(!response.ok){
                throw new Error("Unable to Fetch User Details");
            }
            const data=await response.json();

            DisplayuserData(data);
        }
        catch(error){
            statsContainer.innerHTML=`<p>No Data Found</p`;
        }
        finally{
            searchButton.textContent="Search"
            searchButton.disabled=false;
        }
    }

    function updateProgress(solved,total,label,circle){
        const progressDegree = (solved/total)*100;
        circle.style.setProperty("--progress-degree", `${progressDegree}%`);
        label.textContent= `${solved}/${total}`;
    }

    function ResetProgress(circle,label){
        circle.style.setProperty("--progress-degree", `${0}%`);
        label.textContent= ``;
    }

    function GenrateCard(data){
        const div=document.createElement('div');
        div.className="First";
        div.innerHTML=`Total Questions Solved:- ${data.totalSolved}`
        cardStatsContainer.append(div);

        const div2=document.createElement('div');
        div2.className="First";
        div2.innerHTML=`LeateCode Ranking:- ${data.ranking}`
        cardStatsContainer.append(div2);

        const div3=document.createElement('div');
        div3.className="First";
        div3.innerHTML=`Acceptance Rate:- ${data.acceptanceRate}`
        cardStatsContainer.append(div3);

        const div4=document.createElement('div');
        div4.className="First";
        div4.innerHTML=`Contribution Points:- ${data.contributionPoints}`
        cardStatsContainer.append(div4);

    }
    function DisplayuserData(data){
        const totalquestion=data.totalQuestions
        const totalHardquedtion=data.totalHard;
        const totalMediumquedtion=data.totalMedium;
        const totalEasyquedtion=data.totalEasy;

        const totalsolvedquestion=data.totalSolved;
        const totalsolvedHardquestion=data.hardSolved;
        const totalsolvedMediumquestion=data.mediumSolved;
        const totalsolvedEasyquestion=data.easySolved;

        updateProgress(totalsolvedEasyquestion,totalEasyquedtion,easyLabel,easyProgressCircle);
        updateProgress(totalsolvedMediumquestion,totalMediumquedtion,mediumLabel,mediumProgressCircle);
        updateProgress(totalsolvedHardquestion,totalHardquedtion,hardLabel,hardProgressCircle);
        
        GenrateCard(data);
    }


    searchButton.addEventListener('click',function(){
        const username=usernameInput.value;
        if(validateUsername(username)){
             // Reset previous data only if new data is fetched
             cardStatsContainer.innerHTML="";
             ResetProgress(easyProgressCircle,easyLabel);
             ResetProgress(mediumProgressCircle,mediumLabel);
             ResetProgress(hardProgressCircle,hardLabel);
            fetechUserDetail(username);
            displays1.style.display="flex";
            displays2.style.display="flex";
            displays3.style.display="flex";
        }

    })

    
    resetButton.addEventListener('click',()=>{
        cardStatsContainer.innerHTML="";
        usernameInput.value = "";
        displays1.style.display="none";
        displays2.style.display="none";
        displays3.style.display="none";
        ResetProgress(easyProgressCircle,easyLabel);
        ResetProgress(mediumProgressCircle,mediumLabel);
        ResetProgress(hardProgressCircle,hardLabel);
    })
})