import React from "react";

export default function ListItem({ student, students, setStudents }) {
  let [checked, setChecked] = React.useState(false);

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

  React.useEffect(() => {
    setChecked(student.collected);
  }, [student]);

  return (
    <li
      className={`p-1 font-mono ${
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
          {student.name.padEnd(8)} | {student.plates.join(", ")}
        </span>
      </pre>
    </li>
  );
}
