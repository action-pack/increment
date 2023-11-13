const core = require("@actions/core");
const github = require("@actions/github");

const name = core.getInput("name");
const token = core.getInput("token");
const octokit = github.getOctokit(token);

const context = github.context;
const repoName = context.payload.repository.name;
const ownerName = context.payload.repository.owner.login;

let amount = core.getInput("amount");
if (amount === "" || amount === "0") amount = "1";

let owner = core.getInput("owner");
if (owner === "" || owner === "false") owner = ownerName;

let repository = core.getInput("repository");
if (repository === "" || repository === "false") repository = repoName;

const push_to_org = core.getInput("org") !== "false";

function path_() {

  if (push_to_org) return "/orgs/" + owner;
  if (repository.includes("/")) return "/repos/" + repository;

  return "/repos/" + owner + "/" + repository;

}

function increment(string, amount) {

  // Extract string's number
  var number = string.match(/\d+/) === null ? 0 : string.match(/\d+/)[0];

  // Store number's length
  var numberLength = number.length;
  var leadingZeroes = number.startsWith("0");
  
  // Increment number by the amount
  number = (parseInt(number, 10) + parseInt(amount, 10)).toString();

  // If there were leading 0s, add them again
  if(leadingZeroes) {
    while (number.length < numberLength) {
      number = "0" + number;
    }
  }

  return string.replace(/[0-9]/g, "").concat(number);
}

const createVariable = (data) => {

  let url = "POST " + path_();
  url += "/actions/variables";

  return octokit.request(url, {
    owner: owner,
    repo: repository,
    name: name,
    value: data,
  });
};

const setVariable = (data) => {

  let url = "PATCH " + path_();
  url += "/actions/variables/" + name;

  return octokit.request(url, {
    owner: owner,
    repo: repository,
    name: name,
    value: data,
  });
};

const getVariable = (varname) => {

  let url = "GET " + path_();
  url += "/actions/variables/" + varname;

  return octokit.request(url, {
    owner: owner,
    repo: repository,
    name: varname,
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

    if (exists) {

      let new_value = increment(old_value, amount);
      const response = await setVariable(new_value);

      if (response.status === 204) {
        if (parseInt(amount, 10) < 0) {
          return ("Succesfully decremented " + name + " from " + old_value + " to " + new_value + ".");
        } else {
          return ("Succesfully incremented " + name + " from " + old_value + " to " + new_value + ".");
        }
      }

      throw new Error("ERROR: Wrong status was returned: " + response.status);

    } else {

      const response = await createVariable(amount);

      if (response.status === 201) {
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
    },
  )
  .then(() => {
    process.exit();
  });
