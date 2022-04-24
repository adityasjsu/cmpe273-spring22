const assert = require("assert");
const { get } = require("./index");
const axios = require("axios");

describe("Testing login post request- 1", () => {
  it("returns user name when the user logs in.", async () => {
    const response = await axios.post("http://localhost:4000/api/login", {
      email: "admin@sjsu.edu",
      password: "admin123",
    });
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.data[0].name, "Admin");
  });
});

describe("Testing login post request - 2", () => {
  it("returns Wrong Password when user sends invalid credentials.", async () => {
    try {
      const response = await axios.post("http://localhost:4000/api/login", {
        email: "admin2@sjsu.edu",
        password: "admin123",
      });
    
    } catch (err) {
      assert.strictEqual(response.status, 200);
      assert.strictEqual(response.data, "Wrong Password");
    }
  });
});

describe("Testing logout get request - 1", () => {
  it("returns Logged Out when user clicks the logout button", async () => {
    await axios.post("http://localhost:4000/api/login", {
      email: "admin@sjsu.edu",
      password: "admin123",
    });
    const response = await axios.get("http://localhost:4000/api/logout");
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.data, "Logged Out");
  });
});

describe("Testing fetching shopname with the help of email id", async () => {
  it("returns shopname of user w.r.t his email address", async () => {
    const response = await axios.get("http://localhost:4000/api/shops/usershop/"+"admin@sjsu.edu");
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.data[0].name, "adminshop");
  });
});

describe("Testing fetching items from the backend", async () => {
  it("checks if backend is returning items", async () => {
    const response = await axios.get("http://localhost:4000/api/items/");
    assert.strictEqual(response.status, 200);
    assert.notEqual(response.data, null);
  });
});