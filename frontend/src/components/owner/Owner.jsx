import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';

const Owner = () => {

  const [Owner, setOwner]=useState(null);
  const [loading, setLoading]=useState(true);

  useEffect(()=>{
    axios.get('http://localhost:4000/api/owner/')
    .then((res)=>{
      setOwner(res.data);
      setLoading(false);
    })
    .catch(()=>{
      alert("Owner not found");
      setLoading(false);
    });
  });

  if(loading) return <div className='text-center-p-5'>Loading...</div>
  if(!Owner) return <div className='text-center p-5'>No Owner found</div>

  return (
    <>
        <div className='container mt-5'>
          <div className='row'>
            <div className='col-md-4 text-center'>
              <img 
                src={Owner.imageUrl || "https://via.placeholder.com/300" }
                alt={Owner.fullName}
                className='img-fluid rounded shadow'
                style={{maxHeight: "350px", objectFit: "cover"}}
              />
            </div>
            <div className='col-md-8'>
                <div className='card-border-0 shadow'>
                  <div className='card-body'>
                    <h1 className='card-title display-5'>{Owner.fullName}</h1>
                    <p className='text-muted'>Owner</p>
                    <hr />
                    <ul className='list-group list-group-flush'>
                      <li className='list-group-item'>
                        <strong>Email: </strong>{Owner.email || "-"}
                      </li>
                      <li className='list-group-item'>
                        <strong>Age: </strong>{Owner.age || "-"}
                      </li>
                      <li className='list-group-item'>
                        <strong>Email: </strong>{Owner.email || "-"}
                      </li>
                      <li className='list-group-item'>
                        <strong>Course: </strong>{Owner.course || "-"}
                      </li>
                    </ul>
                  </div>
                </div>
            </div>
          </div>
        </div>
    </>
  )
}

export default Owner