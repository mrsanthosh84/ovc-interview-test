import React, { Component } from 'react'
import { connect } from 'react-redux';
import Cell from './Cell';

import getData from '../redux/actions/dataActions';



export class Table extends Component {

	componentDidMount() {
		this.props.getData()
	}

	// render function that maps headings provided in props into a cell component which
	// is returned to the table component
	renderHeadingRow =  (_cell, cellIndex) => {
		const {headings} = this.props;

		return (
			<Cell 
				key={`heading-${cellIndex}`}
				content={headings[cellIndex]}
				header={true}
				/>
		)
	}


	render() {

		const { UI: {loading}, headings, user } = this.props;
		console.log(user);

		const theadMarkup = (
			<tr key="heading">
				{headings.map(this.renderHeadingRow)}
			</tr>
		)

		const tbodyMarkup = user.data.map((user, index) => (
			<tr key={`row-${index}`}>
				<td>{user.name}</td>
				<td><a href={`mailto:${user.email}`}>{user.email}</a></td>
				<td>{user.address.city}</td>
				<td>{user.company.name}</td>
			</tr>
		))

		return (
			<table className="Table">
				<thead>{theadMarkup}</thead>
				<tbody>{tbodyMarkup}</tbody>
			</table>
		)
	}
}

// map our redux store/state to the component props
const mapStateToProps = state => ({
	user: state.data,
	UI: state.UI
})

export default connect(mapStateToProps, { getData })(Table)