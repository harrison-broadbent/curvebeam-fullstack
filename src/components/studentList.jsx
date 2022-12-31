/**
 * StudentList
 *
 * Maps list of students into their individual lists
 * also handles resetting a list back to default, and calculating the remaining students
 */

import React from "react";
import ListItem from "./listItem";

export default function StudentList({
  defaultStudents,
  students,
  setStudents,
}) {
  const resetList = () => setStudents(defaultStudents);

  return (
    <>
      <ul className="font-mono list-disc">
        {students.map((student) => {
          return (
            <ListItem
              key={student.id}
              student={student}
              students={students}
              setStudents={setStudents}
            />
          );
        })}
        <br />
        <p className="font-bold">
          Remaining students:{" "}
          {students.reduce(
            (sum, student) => (sum += student.collected === false ? 1 : 0),
            0
          )}
        </p>
        <button
          onClick={resetList}
          className="border p-0.5 rounded-md hover:bg-gray-200"
        >
          Reset
        </button>
      </ul>
    </>
  );
}
