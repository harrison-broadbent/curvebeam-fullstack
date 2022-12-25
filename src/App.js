/**
 * TODO:
 * [X] Search for number plate
 * [X] Reset each list
 * [X] check off students as they leave
 * [X] count remaining students
 * [ ] error message if number plate DNE
 * [ ]
 */

import "./index.css";
import StudentList from "./components/studentList";
import * as React from "react";

export default function App() {
  let defaultStudentGroup1 = [
    {
      name: "Angela",
      id: 1,
      plates: ["ZNJ033", "AIV328"],
      collected: false,
      highlighted: false,
    },
    {
      name: "Bertie",
      id: 2,
      plates: ["ZBH014"],
      collected: false,
      highlighted: false,
    },
    {
      name: "Chrissy",
      id: 3,
      plates: ["SQN020", "AIV328"],
      collected: false,
      highlighted: false,
    },
    {
      name: "Denise",
      id: 4,
      plates: ["ABC123"],
      collected: false,
      highlighted: false,
    },
    {
      name: "Ellie",
      id: 5,
      plates: ["ABC123"],
      collected: false,
      highlighted: false,
    },
    {
      name: "Frannie",
      id: 6,
      plates: ["ZZZ000"],
      collected: false,
      highlighted: false,
    },
    {
      name: "Georgie",
      id: 7,
      plates: ["1DR1WP"],
      collected: false,
      highlighted: false,
    },
    {
      name: "Hennie",
      id: 8,
      plates: ["FOP847"],
      collected: false,
      highlighted: false,
    },
    {
      name: "Imogen",
      id: 9,
      plates: ["1FHF33"],
      collected: false,
      highlighted: false,
    },
    {
      name: "Janice",
      id: 10,
      plates: ["4DR4MG"],
      collected: false,
      highlighted: false,
    },
  ];
  let defaultStudentGroup2 = [
    {
      name: "Aaron",
      id: 1,
      plates: ["ABC123", "AIV328"],
      collected: false,
      highlighted: false,
    },
    {
      name: "Bart",
      id: 2,
      plates: ["TOP001"],
      collected: false,
      highlighted: false,
    },
    {
      name: "Chris",
      id: 3,
      plates: ["XIP111", "OZB644"],
      collected: false,
      highlighted: false,
    },
    {
      name: "Danny",
      id: 4,
      plates: ["OZB644"],
      collected: false,
      highlighted: false,
    },
    {
      name: "Errol",
      id: 5,
      plates: ["AAJ846"],
      collected: false,
      highlighted: false,
    },
    {
      name: "Frank",
      id: 6,
      plates: ["AKI182"],
      collected: false,
      highlighted: false,
    },
    {
      name: "Garry",
      id: 7,
      plates: ["GHH011"],
      collected: false,
      highlighted: false,
    },
    {
      name: "Gerbert",
      id: 8,
      plates: ["GHH011", "ABJ748"],
      collected: false,
      highlighted: false,
    },
    {
      name: "Isaac",
      id: 9,
      plates: ["YOO745"],
      collected: false,
      highlighted: false,
    },
    {
      name: "Jack",
      id: 10,
      plates: ["NBB033"],
      collected: false,
      highlighted: false,
    },
    {
      name: "Kieran",
      id: 11,
      plates: ["YHH999"],
      collected: false,
      highlighted: false,
    },
    {
      name: "Liam",
      id: 12,
      plates: ["YHH999"],
      collected: false,
      highlighted: false,
    },
    {
      name: "Montery",
      id: 13,
      plates: ["JJJ857"],
      collected: false,
      highlighted: false,
    },
    {
      name: "Neil",
      id: 14,
      plates: ["1BH2NZ"],
      collected: false,
      highlighted: false,
    },
    {
      name: "Oswald",
      id: 15,
      plates: ["1JT6SL"],
      collected: false,
      highlighted: false,
    },
  ];

  let [studentGroup1, setStudentGroup1] = React.useState(defaultStudentGroup1);
  let [studentGroup2, setStudentGroup2] = React.useState(defaultStudentGroup2);
  let [errorMsg, setErrorMsg] = React.useState("");

  let [searchText, setSearchText] = React.useState("");
  React.useEffect(() => {
    let foundResult = false;

    setStudentGroup1(
      studentGroup1.map((student) => {
        if (
          searchText.length > 0 &&
          student.plates
            .join("")
            .toUpperCase()
            .includes(searchText.toUpperCase())
        ) {
          student.highlighted = true;
          foundResult = true;
        } else {
          student.highlighted = false;
        }
        return student;
      })
    );

    setStudentGroup2(
      studentGroup2.map((student) => {
        if (
          searchText.length > 0 &&
          student.plates
            .join("")
            .toUpperCase()
            .includes(searchText.toUpperCase())
        ) {
          student.highlighted = true;
          foundResult = true;
        } else {
          student.highlighted = false;
        }
        return student;
      })
    );

    if (foundResult === false && searchText.length > 0) {
      setErrorMsg("ERROR: No results found");
    } else {
      setErrorMsg("");
    }
  }, [searchText]);

  return (
    <div className="mx-auto w-3/4 mt-8">
      <h1 className="font-bold text-2xl mx-auto underline">
        CurveBeamAI Assessment — Student Pickup
      </h1>
      <p className="font-lighter text-sm ">Harrison Broadbent, 2022</p>
      <div className="flex flex-row justify-around">
        <div className="mt-8">
          <h2 className="font-semibold underline mb-2">Class 1</h2>
          <StudentList
            defaultStudents={defaultStudentGroup1}
            students={studentGroup1}
            setStudents={setStudentGroup1}
          />
        </div>
        <div className="mt-8">
          <h2 className="font-semibold underline mb-2">Class 2</h2>
          <StudentList
            defaultStudents={defaultStudentGroup2}
            students={studentGroup2}
            setStudents={setStudentGroup2}
          />
        </div>
      </div>

      <div className="p-4 mt-12 flex flex-col">
        <label htmlFor="searchInput">Search for a number plate: </label>
        <input
          type="text"
          className="border"
          name="searchInput"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <p className="mt-1 font-bold text-red-700">{errorMsg}</p>
      </div>
    </div>
  );
}
