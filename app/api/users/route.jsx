import { users } from "../../util/db";
import { NextResponse } from "next/server";
import fs from "fs";

//1 All Users Data

export function GET() {
  const data = users;
  return NextResponse.json({ data }, { status: 200 });
}

//4. Create New User

export async function POST(req, res) {
  // Getting Data From User
  let { id, name, age, email, password } = await req.json();

  // Checking If the data is provided
  if (!name || !email || !password) {
    return NextResponse.json(
      { result: "required field not found" },
      { status: 400 }
    );
  } else {
    // Add the new user to the in-memory array
    users.push({ id, name, age, email, password });
    const updatedUsersArray = users;
    const updatedData = JSON.stringify(updatedUsersArray, null, 2);
    fs.writeFileSync(
      "./app/util/db.js",
      `export const users = ${updatedData};`,
      "utf-8"
    );

    return NextResponse.json({ success: "User Successfully Created" });
  }
}

// 5.Update User

export async function PUT(req, res) {
  let { id, name, age, email, password } = await req.json();

  const userIndex = users.findIndex((user) => user.id === id);
  if (userIndex === -1) {
    return NextResponse.json({ result: "User Not Found" }, { status: 404 });
  }

  if (name) {
    users[userIndex].name = name;
  }
  if (age) {
    users[userIndex].age = age;
  }
  if (email) {
    users[userIndex].email = email;
  }
  if (password) {
    users[userIndex].password = password;
  }
  // Add the new user to the in-memory array
  users.push({ id, name, age, email, password });
  const updatedUsersArray = users;
  const updatedData = JSON.stringify(updatedUsersArray, null, 2);
  fs.writeFileSync(
    "./app/util/db.js",
    `export const users = ${updatedData};`,
    "utf-8"
  );

  return NextResponse.json({ success: "User Successfully Updated" });
}
