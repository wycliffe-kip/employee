import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function EmpEdit() {
    const { empid } = useParams()
    //const [empData, empDataChange] = useState({})

    useEffect(() => {
        fetch("http://localhost:3000/transactions/" + empid)
            .then(res => res.json())
            .then((data) => {
                idChange(data.id)
                nameChange(data.name)
                emailChange(data.email)
                phoneChange(data.phone)
                activeChange(data.active)
            }).catch((err) => {
                console.log(err.message)
            })
    }, [])

    const [id, idChange] = useState("")
    const [name, nameChange] = useState("")
    const [email, emailChange] = useState("")
    const [phone, phoneChange] = useState("")
    const [active, activeChange] = useState(true)
    const [validation, valChange] = useState(false)

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        const empData = { id, name, email, phone, active }

        //console.log({id,name,email,phone,active})
        fetch("http://localhost:3000/employee/" + empid, {
            method: "PUT",
            header: { "Content-Type": "application/json" },
            body: JSON.stringify(empData)
        }).then(res => {
            alert('SAved successfully')
            navigate('/')

        }).catch((err) => {
            console.log(err.message)
        })
    }
    return (
        <div>
            <div className="row">
                <div className="offset-lg-3 col-lg-6">
                    <form className="container" onSubmit={handleSubmit}>
                        <div className="card" style={{ "textAlign": "left" }}>
                            <div className="card-title">
                                <h2>Employee Edit</h2>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>ID</label>
                                            <input value={id} disabled="disabled" className="form-control"></input>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Name</label>
                                            <input required value={name} onMouseDown={e => valChange(true)} onChange={e => nameChange(e.target.value)} className="form-control"></input>
                                            {name.length == validation && <span className="text-danger">Enter the name</span>}
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Email</label>
                                            <input value={email} onChange={e => emailChange(e.target.value)} className="form-control"></input>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Phone</label>
                                            <input value={phone} onChange={e => phoneChange(e.target.value)} className="form-control"></input>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-check">
                                            <input value={active} onChange={e => activeChange(e.target.checked)} type="checkbox" className="form-check-input"></input>
                                            <label className="form-check-label">Is Active</label>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <button className="btn btn-success" type="submit">Save</button>
                                        <Link to="/" className="btn btn-danger">Back</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EmpEdit