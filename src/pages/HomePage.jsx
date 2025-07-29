import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./styles.css";

export default function HomePage() {
  const [jobs, setJobs] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchLocation, setSearchLocation] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/jobs")
      .then(res => res.json())
      .then(data => setJobs(data));
  }, []);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchTitle) params.append("title", searchTitle);
    if (searchLocation) params.append("location", searchLocation);

    fetch(`http://localhost:5000/api/jobs?${params.toString()}`)
      .then(res => res.json())
      .then(data => setJobs(data))
      .catch(err => console.error("Search error:", err));
  };

  return (
    <div className="container">
      <h1>Job Listings</h1>
      
      <div className="search-bar">
        <input
          type="search"
          placeholder="Search by job title"
          value={searchTitle}
          onChange={e => setSearchTitle(e.target.value)}
        />
        <input
          type="search"
          placeholder="Search by location"
          value={searchLocation}
          onChange={e => setSearchLocation(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <div className="job-list">
        {jobs.map(job => (
          <div className="job-card" key={job._id}>
            <h2>{job.title}</h2>
            <p>{job.company}</p>
            <p>{job.location}</p>
            <p>{job.type}</p>
            <Link to={`/job/${job._id}`}>View Details</Link>
          </div>
        ))}
      </div>

      <Link to="/add-job" className="add-job-btn">Add Job</Link>
    </div>
  );
}
