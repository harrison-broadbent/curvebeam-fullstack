import * as React from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, child, get, set } from "firebase/database";

import StudentList from "./components/studentList";

// Imports TailwindCSS styles into the main app
import "./index.css";

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
  let [errorMsg, setErrorMsg] = React.useState(""); // search box error message
  let [searchText, setSearchText] = React.useState(""); // search box current text

  // config information for the firebase database
  const firebaseConfig = {
    apiKey: "AIzaSyDGpdStowTvGZ9hsQIGgtYvtuqE4pGup-A",
    authDomain: "curvebeam-fullstack.firebaseapp.com",
    projectId: "curvebeam-fullstack",
    storageBucket: "curvebeam-fullstack.appspot.com",
    messagingSenderId: "118396580823",
    appId: "1:118396580823:web:c3948fc8a1c904c098d192",
    databaseURL: "https://curvebeam-fullstack-default-rtdb.firebaseio.com",
  };
  const app = initializeApp(firebaseConfig);

  // get initial application data from firebase
  React.useEffect(() => {
    // get initial app state
    const database = getDatabase();
    get(ref(database))
      .then((snapshot) => {
        // set student groups according to database data
        setStudentGroup1(snapshot.val().sg1);
        setStudentGroup2(snapshot.val().sg2);
        console.log("Successfully get initial firebase data");
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // save application data to backend whenever a student group is updated
  // We set a timeout of 1000ms, and if no other changes are made then we save
  // (ie. maintain a bit of a buffer so we aren't sending heaps of queries to the backend)
  React.useEffect(() => {
    const database = getDatabase();
    const backendSaveService = setTimeout(() => {
      // format the data to match firebase
      // and set highlighted to false on all records
      const data = {
        sg1: studentGroup1.map((s) => {
          s.highlighted = false;
          return s;
        }),
        sg2: studentGroup2.map((s) => {
          s.highlighted = false;
          return s;
        }),
      };

      set(ref(database), data);
      console.log("Saved data to firebase", data, studentGroup1, studentGroup2);
    }, 1000);

    return () => clearInterval(backendSaveService);
  }, [studentGroup1, studentGroup2]);

  // highlight students if the search text matches or partially matches one of their number plates
  React.useEffect(() => {
    let foundResult = false;

    setStudentGroup1(
      studentGroup1.map((student) => {
        if (
          searchText.length > 0 &&
          student.collected === false &&
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
          student.collected === false &&
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

      <div className="p-2 mt-6 flex flex-col">
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
