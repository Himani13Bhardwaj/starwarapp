/*jshint esversion: 6 */
import React from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import './eventDetails.css';
class EventDashboard extends React.Component{
    id = 0;
    state = {
            events: []
    }
    data = [];
    constructor(props) {
        super(props);
        this.state.events = [ ];
        this.id = 0;
        this.data = JSON.parse(localStorage.getItem('Events'));
    }

    createData = (action, category, status, path, time) => {
      this.id = this.id + 1;
      const id = this.id;
      return { id, action, category, status, path, time };
    }

    componentDidMount() {
        const rows = [];
        if(this.data !== null) {
            for (var i = 0; i < this.data.length; i++) {
               const rowData = this.createData(this.data[i]['action'], this.data[i]['category'], this.data[i]['status'], this.data[i]['path'], this.data[i]['time'])
               rows.push(rowData);
            }
        }
        this.setState({ events: rows})
    }

    render() {

        return (
       <Paper className="Root">
             <Table>
               <TableHead>
                 <TableRow>
                   <TableCell>Event</TableCell>
                   <TableCell align="right">Category</TableCell>
                   <TableCell align="right">Status</TableCell>
                   <TableCell align="right">Path</TableCell>
                   <TableCell align="right">Time</TableCell>
                 </TableRow>
               </TableHead>
               <TableBody>
                 {this.state.events.map(row => (
                   <TableRow className="row" key={row.id}>
                     <TableCell component="th" scope="row">
                       {row.action}
                     </TableCell>
                     <TableCell align="right">{row.category}</TableCell>
                     <TableCell align="right">{row.status}</TableCell>
                     <TableCell align="right">{row.path}</TableCell>
                     <TableCell align="right">{row.time}</TableCell>
                   </TableRow>
                 ))}
               </TableBody>
             </Table>
           </Paper>
        )
    }
}
EventDashboard.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default EventDashboard;