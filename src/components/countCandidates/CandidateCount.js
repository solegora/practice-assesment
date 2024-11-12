import React , { useEffect, useState }  from "react";
import data from "../../libs/services/endpoint.json"
import './candidateCount.css'

export const CandidateCount =( )=> {

const [candidateCount, setCandidateCount] = useState(data.length)

useEffect(() => {
    setCandidateCount(data.length);
  }, []);

return (
    <div className="candidateCount"> {candidateCount} Interview Requests</div>
)

}