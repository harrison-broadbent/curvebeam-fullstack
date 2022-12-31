/**
 * listItem
 *
 * An individual item in a studentList
 * Handles collecting/checking itself off and adding new plate values
 */

import React from "react";

export default function ListItem({ student, students, setStudents }) {
  let [checked, setChecked] = React.useState(student.collected);
  let [editMode, setEditMode] = React.useState(false);
  let [plateValues, setPlateValues] = React.useState(student.plates);

  // sync the checkbox state if we update our student somewhere else in the app
  // ie. updating the app with data from the backend
  React.useEffect(() => {
    setChecked(student.collected);
  }, [student]);

  // update the current student's collected status based on the checkbox status
  React.useEffect(() => {
    setStudents(
      students.map((s) => {
        if (s.name === student.name) {
          // this is the student for the current list item
          s.collected = checked;
        }
        return s;
      })
    );
  }, [checked]);

  // update the current students number plate values based on the plates input field
  React.useEffect(() => {
    setStudents(
      students.map((s) => {
        if (s.name === student.name) {
          // this is the student for the current list item
          s.plates = plateValues;
        }
        return s;
      })
    );
  }, [plateValues]);

  return (
    <li
      className={`p-0.5 font-mono text-sm ${
        student.highlighted === true ? "bg-red-300" : ""
      } ${student.collected === true ? "line-through" : ""}`}
    >
      <pre>
        <input
          type="checkbox"
          checked={checked}
          onChange={() => setChecked(!checked)}
        />
        <span className="ml-2">
          {student.name.padEnd(8)} |{" "}
          {/* display either a text input or text of the student number plates, depending on the editMode variable */}
          {editMode === true ? (
            <input
              className="border"
              value={plateValues}
              onChange={(e) =>
                setPlateValues(e.target.value.toUpperCase().split(","))
              }
            />
          ) : (
            student.plates.join(", ")
          )}
          <button
            onClick={() => setEditMode(!editMode)}
            className="border ml-1 px-2 text-lg rounded-md hover:bg-gray-200"
          >
            {editMode === true ? "💾" : "✎"}
          </button>
        </span>
      </pre>
    </li>
  );
}
