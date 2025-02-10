import React from 'react'

const UserCard = (user) => {
  
    return (
    <div>
  <div className="card bg-base-100 w-96 shadow-xl max-h-70" key={user._id}>
  <figure>
    <img
      src={user.photoUrl}
      alt={user.firstName} 
      height={100}/>
  </figure>
  <div className="card-body">
    <h2 className="card-title">
      {user.firstName+" "+user.lastName}
      <div className="badge badge-accent">Pro</div>
    </h2>
    <p>{user.about}</p>
    <div className="card-actions justify-end">
      <div className="btn btn-success">Interested</div>
      <div className="btn btn-secondary">Ignore</div>
    </div>
  </div>
</div> 

{/* {user.map((person)=>(<div className="card bg-base-100 w-96 shadow-xl max-h-70" key={person._id}>
  <figure>
    <img
      src={person.photoUrl}
      alt={person.firstName} 
      height={100}/>
  </figure>
  <div className="card-body">
    <h2 className="card-title">
      {person.firstName+" "+person.lastName}
      <div className="badge badge-accent">Pro</div>
    </h2>
    <p>{person.about}</p>
    <div className="card-actions justify-end">
      <div className="btn btn-success">Interested</div>
      <div className="btn btn-secondary">Ignore</div>
    </div>
  </div>
</div>))} */}
    </div>
  )
}

export default UserCard;