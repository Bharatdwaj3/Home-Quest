import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';

const Tenant = () => {

  const [tenant, setTenant]=useState(null);
  const [loading, setLoading]=useState(true);

  useEffect(()=>{
    axios.get('http://localhost:4001/api/tenant/')
    .then((res)=>{
      setTenant(res.data);
      setLoading(false);
    })
    .catch(()=>{
      alert("Tenant not found");
      setLoading(false);
    });
  });

  if(loading) return <div className='text-center-p-5'>Loading...</div>
  if(!tenant) return <div className='text-center p-5'>No Tenant found</div>

  return (
    <>
        <div className='container mt-5'>
          <div className='row'>
            <div className='col-md-4 text-center'>
              <img 
                src={tenant.imageUrl || "https://via.placeholder.com/300" }
                alt={tenant.fullName}
                className='img-fluid rounded shadow'
                style={{maxHeight: "350px", objectFit: "cover"}}
              />
            </div>
            <div className='col-md-8'>
                <div className='card-border-0 shadow'>
                  <div className='card-body'>
                    <h1 className='card-title display-5'>{tenant.fullName}</h1>
                    <p className='text-muted'>Tenant</p>
                    <hr />
                    <ul className='list-group list-group-flush'>
                      <li className='list-group-item'>
                        <strong>Email: </strong>{tenant.email || "-"}
                      </li>
                      <li className='list-group-item'>
                        <strong>Age: </strong>{tenant.age || "-"}
                      </li>
                      <li className='list-group-item'>
                        <strong>Email: </strong>{tenant.email || "-"}
                      </li>
                      <li className='list-group-item'>
                        <strong>Course: </strong>{tenant.course || "-"}
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

export default Tenant