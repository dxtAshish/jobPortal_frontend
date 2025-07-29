import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./styles.css";

export default function JobDetailsPage() {
  const { _id } = useParams();
  const [job, setJob] = useState(null);
console.log(_id,"id from params")
  useEffect(() => {
    fetch(`http://localhost:5000/api/jobs/${_id}`)
      .then(res => res.json())
      .then(data => setJob(data));
  }, [_id]);
console.log(job)
  if (!job) return <p>Loading...</p>;

  return (
    <div className="details-container">
      <h1>{job.title}</h1>
      <p><strong>Company:</strong> {job.company}</p>
      <p><strong>Type:</strong> {job.type}</p>
      <p><strong>Location:</strong> {job.location}</p>
      <p><strong>Description:</strong></p>
      <p>{job.description}</p>
    </div>
  );
}