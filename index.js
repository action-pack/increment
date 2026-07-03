const core = require("@actions/core");
const github = require("@actions/github");

const token = core.getInput("token");
const octokit = github.getOctokit(token);

const name = input("name", "1");
const amount = input("amount", "1");

const visibility = input("visibility", "all");
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

function parseAmount(amount) {
  const step = Number.parseInt(amount, 10);

  if (!Number.isInteger(step) || step.toString() !== amount.trim()) {
    throw new Error(`Invalid amount '${amount}', expected an integer.`);
  }

  return step;
}

function increment(string, step) {
  const value = String(string || "");

  // Extract string's numbers
  const matches = [...value.matchAll(/\d+/g)];

  if (matches.length === 0) {
    throw new Error(`Value '${value}' does not contain a number to increment.`);
  }

  // Increment the last number by the amount
  const lastMatch = matches[matches.length - 1];
  const oldNumber = lastMatch[0];
  const oldIndex = lastMatch.index;

  let newNumber = (Number.parseInt(oldNumber, 10) + step).toString();

  // Reconstruct the string with incremented number and leading zeroes
  if (oldNumber.startsWith("0") && !newNumber.startsWith("-")) {
    newNumber = newNumber.padStart(oldNumber.length, "0");
  }

  return value.slice(0, oldIndex) + newNumber + value.slice(oldIndex + oldNumber.length);
}

const createVariable = (data) => {

  let url = "POST " + path_();
  url += "/actions/variables";

  if (push_to_org) {
    return octokit.request(url, {
      name: name,
      visibility: visibility,
      value: data
    });
  }

  return octokit.request(url, {
    name: name,
    value: data
  });
};

const setVariable = (data) => {

  let url = "PATCH " + path_();
  url += "/actions/variables/" + encodeURIComponent(name);

  return octokit.request(url, {
    name: name,
    value: data
  });
};

const getVariable = (varname) => {

  let url = "GET " + path_();
  url += "/actions/variables/" + encodeURIComponent(varname);

  return octokit.request(url);
};

const bootstrap = async () => {

  let exists = false;
  let old_value = "";
  const step = parseAmount(amount);

  try {

    if (name === "") {
      throw new Error("No name was specified!");
    }

    const response = await getVariable(name);

    exists = response.status === 200;
    if (exists) old_value = response.data.value;

  } catch (e) {
    if (e.status !== 404) {
      core.setFailed(path_() + ": " + e.message);
      console.error(e);
      return;
    }

    // Variable does not exist
  }

  try {

    if (exists) {

      let new_value = increment(old_value, step);
      const response = await setVariable(new_value);

      if (response.status === 204) {
        core.setOutput("value", new_value);
        if (step === 0) {
          return ("Amount was set to zero, value stays at " + old_value + ".");
        }
        if (step < 0) {
          return ("Successfully decremented " + name + " from " + old_value + " to " + new_value + ".");
        }
        if (step > 0) {
          return ("Successfully incremented " + name + " from " + old_value + " to " + new_value + ".");
        }
      }

      throw new Error("ERROR: Wrong status was returned: " + response.status);

    } else {

      const value = step.toString();
      const response = await createVariable(value);

      if (response.status === 201) {
        core.setOutput("value", value);
        return "Successfully created variable " + name + " with value " + value + ".";
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
