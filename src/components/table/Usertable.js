import React , { useState,useEffect }  from "react";
import data from "../../libs/services/endpoint.json"
import './usertable.css'
import { CandidateCount } from "../countCandidates/CandidateCount";
export const UserTable = () => {
    const [candidates, setCandidates] = useState(data);
    const [sortOrder, setSortOrder] = useState('asc');
      // add archived data 
      const [showArchived, setShowArchived] = useState(false);

    const sortDataByDate = () => {
      // sorting the data onclick
      const sortedData = [...data].sort((a, b) => {
        const dateA = new Date(a.last_comms.date_time);
        const dateB = new Date(b.last_comms.date_time);
        return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
      });
      // setting the data
      setCandidates(sortedData);
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    useEffect(() => {
      // adding this to check any changes to the candidate list,if you remove and add, it should add same time camera
      setCandidates(data);
    }, []);

    const [searchQuery, setSearchQuery] = useState('');
    const filteredCandidates = candidates.filter(candidate => {
      const matchesSearch = candidate.candidate.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = showArchived ? candidate.archived : true;
      return matchesSearch && matchesStatus;
    });

    const handleSearchChange = (e) => {
      setSearchQuery(e.target.value);
    };

      // Toggle archived status
      const toggleArchive = (index) => {
        const updatedCandidates = [...candidates];
        updatedCandidates[index].archived = !updatedCandidates[index].archived;
        setCandidates(updatedCandidates);
      };
    
    return (

      <>
      <div className="searchParent">
      <input
        type="text"
        placeholder="Search by name"
        value={searchQuery}
        onChange={handleSearchChange}
       className="search"
      />
      {/* unicode for search icon (google it) */}
       <span className="search-icon">&#128269;</span>


       <div className="archived">
        Show archived <input type="checkbox" checked={showArchived}onChange={() => setShowArchived(!showArchived)}/>
       </div>
      </div>

      
      <div className="table-container">
     <CandidateCount/>
      <table className="table">
        <thead>
          <tr>
            <th>Candidate</th>
            <th>Role</th>
            <th className="sortableHeader" onClick={sortDataByDate}>Last Communicated</th>
            <th>Salary</th>
            <th>Sent By</th>
          </tr>
        </thead>
        <tbody>
          {filteredCandidates.map((candidate, index) => (
            <tr key={index}>
              <td><img src={candidate.image} alt={candidate.candidate} /> {candidate.candidate}</td>
              <td>{candidate.role}</td>
              <td>{new Date(candidate.last_comms.date_time).toLocaleDateString()}</td>
              <td>${candidate.salary.toLocaleString()}</td>
              <td>{candidate.sent_by}</td>
              <td>
                <p onClick={() => toggleArchive(index)} className="archive-text">
                  {candidate.archived ? 'Unarchive' : 'Archive'}
                </p>
                </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
};