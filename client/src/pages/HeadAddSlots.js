import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Spinner } from 'reactstrap';
import Axios from 'axios';

class HeadAddSlots extends Component {
 
    state={
        Slot:"Select Slot",
        Day:"Select Day",
        Committee:"Select Committee",
        interviewer:"Select Interviewer",
        committees:[],
        Highboards:[],
        loaded:false
    }

    async componentDidMount() {
        await Axios.get('/api/committees')
        .then(res=>this.setState({committees:res.data.data}))
        .catch(err=>console.log(err))

        await Axios.get('/api/highboards')
        .then(res=>this.setState({Highboards:res.data.data,loaded:true}))
        .then(console.log('ssss'))
        .catch(err=>console.log(err))


    }
    selectDay = (e)=>{
        this.setState({Day:e.target.value})
    }
    selectHead = (e)=>{
        this.setState({interviewer:e.target.value})
    }
    selectCommittee = (e)=>{
        this.setState({Committee:e.target.value})
    }
     selectSlot = (e)=>{
        this.setState({Slot:e.target.value})
    }
    submit = (e)=>{
        e.preventDefault()
        var errors=""
        const {Slot, Day,Committee,interviewer} = this.state 
        if(Slot==='Select Slot')
            errors+= "Please select a slot \n"
        if(Day==='Select Day')
            errors+="Please select a day \n" 
        if(Committee==='Select Committee')
            errors+= "Please select a Committee \n"
        if(interviewer==='Select Interviewer')
            errors+="Please select an interviewer \n" 

        if(errors.length>0)
            alert(errors)
        else{
            Axios.post('/api/schedules/', 
                {
                    slot:this.state.slot,
                    day:this.state.day,
                    interviewer:this.state.interviewer,
                    committee:this.state.committee,
                    reserved:false
                })
            .then(res=>{
                console.log(res.data.message)
            })
            .catch(err=>console.log(err))//we will handle this error later
        }

    }
 
    render () {
    return this.state.loaded?
        (
            <div>
                <Form>
                <FormGroup>
                        <Label for="exampleSelectHead">Head to interview</Label>
                        <Input type="select" name="selectHead" id="exampleSelectHead" onClick={(e)=>this.selectHead(e)}>
                            <option>Select Interviewer</option>
                           {this.state.Highboards.map(head=>{
                                return <option>{head.fullName}</option>

                            })}
                        </Input>
                </FormGroup>
                <FormGroup>
                        <Label for="exampleSelectHead">Committee</Label>
                        <Input type="select" name="selectHead" id="exampleSelectHead" onClick={(e)=>this.selectCommittee(e)}>
                            <option>Select Committee</option>
                            {this.state.committees.map(committee=>{
                                return <option>{committee.name}</option>

                            })}
                        </Input>
                </FormGroup>
                <FormGroup>
                        <Label for="exampleSelectDay">Day</Label>
                        <Input type="select" name="selectDay" id="exampleSelectDay" onClick={(e)=>this.selectDay(e)}>
                            <option>Select Day</option>
                            <option>Sunday</option>
                            <option>Monday</option>
                            <option>Tuesday</option>
                            <option>wednesday</option>
                            <option>Thursday</option>
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleSelect">Slot</Label>
                        <Input type="select" name="selectSlot" id="exampleSelectSlot" onClick={(e)=>this.selectSlot(e)}>
                            <option>Select Slot</option>
                            <option>First</option>
                            <option>gap first and second</option>
                            <option>Second</option>
                            <option>gap second and third</option>
                            <option>Third</option>
                            <option>gap third and fourth</option>
                            <option>fourth</option>
                            <option>gap fourth and fifth</option>
                            <option>fifth</option>
                            <option>after hours</option>
                        </Input>
                    </FormGroup>
                    <Button onClick={(e)=>this.submit(e)}>Submit</Button>
                </Form>
            </div>
        )
        :
        (
            <div>
                <p>loading please wait</p>
                <Spinner color="primary" /><Spinner color="primary" />

            </div>
        )
  }
}

export default HeadAddSlots
