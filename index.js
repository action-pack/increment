const core = require("@actions/core");
const github = require("@actions/github");

const token = core.getInput("token");
const octokit = github.getOctokit(token);

const name = input("name", "1");
const amount = input("amount", "1");
const push_to_org = (input("org", "") !== "");
const owner = input("owner", github.context.payload.repository.owner.login);
const repository = input("repository", github.context.payload.repository.name);

function path_() {

  if (push_to_org) return "/orgs/" + owner;
  if (repository.includes("/")) return "/repos/" + repository;

  return "/repos/" + owner + "/" + repository;

}

function input(name, def) {

  let inp = core.getInput(name).trim();
  if (inp === "" || inp.toLowerCase() === "false") return def;

  return inp;

}

function increment(string, amount) {
  // Extract string's numbers
  var numbers = string.match(/\d+/g) || [];

  // Increment the last number by the amount
  var lastNumberIndex = numbers.length - 1;
  var lastNumber = parseInt(numbers[lastNumberIndex], 10) || 0;
  numbers[lastNumberIndex] = (lastNumber + parseInt(amount, 10)).toString();

  // Reconstruct the string with incremented numbers and leading zeroes
  var result = string.replace(/\d+/g, function(match) {
    var currentNumber = numbers.shift();
    if (match.startsWith("0")) {
      while (currentNumber.length < match.length) {
        currentNumber = "0" + currentNumber;
      }
    }
    return currentNumber;
  });

  return result;
}

const createVariable = (data) => {

  let url = "POST " + path_();
  url += "/actions/variables";

  return octokit.request(url, {
    owner: owner,
    repo: repository,
    name: name,
    value: data
  });
};

const setVariable = (data) => {

  let url = "PATCH " + path_();
  url += "/actions/variables/" + name;

  return octokit.request(url, {
    owner: owner,
    repo: repository,
    name: name,
    value: data
  });
};

const getVariable = (varname) => {

  let url = "GET " + path_();
  url += "/actions/variables/" + varname;

  return octokit.request(url, {
    owner: owner,
    repo: repository,
    name: varname
  });
};

const bootstrap = async () => {

  let exists = false;
  let old_value = "";

  try {

    const response = await getVariable(name);

    exists = response.status === 200;
    if (exists) old_value = response.data.value;

  } catch (e) {
    // Variable does not exist
  }

  try {

    if (name === "") {
      throw new Error("No name was specified!");
    }

    if (exists) {

      let new_value = increment(old_value, amount);
      const response = await setVariable(new_value);

      if (response.status === 204) {
        core.setOutput("value", new_value);
        if (parseInt(amount, 10) === 0) {
          return ("Amount was set to zero, value stays at " + old_value + ".");
        }
        if (parseInt(amount, 10) < 0) {
          return ("Succesfully decremented " + name + " from " + old_value + " to " + new_value + ".");
        }
        if (parseInt(amount, 10) > 0) {
          return ("Succesfully incremented " + name + " from " + old_value + " to " + new_value + ".");
        }
      }

      throw new Error("ERROR: Wrong status was returned: " + response.status);

    } else {

      const response = await createVariable(amount);

      if (response.status === 201) {
        core.setOutput("value", amount);
        return "Succesfully created variable " + name + " with value " + amount + ".";
      }

      throw new Error("ERROR: Wrong status was returned: " + response.status);
    }

  } catch (e) {
    core.setFailed(path_() + ": " + e.message);
    console.error(e);
  }
};

bootstrap()
  .then(
    (result) => {
      // eslint-disable-next-line no-console
      if (result != null) {
        console.log(result);
      }
    },
    (err) => {
      // eslint-disable-next-line no-console
      core.setFailed(err.message);
      console.error(err);
    }
  )
  .then(() => {
    process.exit();
  });
