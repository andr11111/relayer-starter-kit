import React, { Component } from "react";
import { FormControl } from "react-bootstrap";

class TimeUnitSelect extends Component {
    getTimeUnits() {
        return [
            {
                label: "Hour",
                value: "hours",
            },
            {
                label: "Day",
                value: "days",
            },
            {
                label: "Week",
                value: "weeks",
            },
            {
                label: "Month",
                value: "months",
            },
            {
                label: "Year",
                value: "years",
            },
        ];
    }

    render() {
        const { name, onChange, defaultValue } = this.props;

        const timeUnits = this.getTimeUnits();

        return (
            <FormControl
                name={name}
                onChange={onChange}
                componentClass="select"
                placeholder="select"
                defaultValue={defaultValue}>
                {timeUnits.map((unit) => (
                    <option key={unit.value} value={unit.value}>
                        {unit.label}
                    </option>
                ))}
            </FormControl>
        );
    }
}

export default TimeUnitSelect;
