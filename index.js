const github = require("@actions/github");
const core = require("@actions/core");

const name = core.getInput("name");
const value = core.getInput("value");
const token = core.getInput("token");

const { Octokit } = require("@octokit/rest")
const octokit = new Octokit({ auth: token })

const context = github.context;
const repoName = context.payload.repository.name;
const ownerName = context.payload.repository.owner.login;

let repository = core.getInput("repository");
if(repository === 'false'){
  repository = repoName;
}

let owner = core.getInput("owner");
if(owner === 'false'){
  owner = ownerName;
}

let push_to_org = core.getInput("org");
if(push_to_org === 'false'){
  push_to_org = false;
}
else{
  push_to_org = true;
}

function get_() {

  if(push_to_org) {
    return '/orgs/' + owner;
  }
  else {
    return '/repos/' + owner + '/' + repository;
  }

}

const setVariable = (data) => {

  let url = 'PUT '
  url += get_()
  url += '/actions/variables/' + name

  return octokit.request(url, {
    name: name, value: data
  })

}

const boostrap = async () => {
  try {
    
    const response = await setVariable(value)

    if(response.status === 504) {
      return "Succesfully updated variable.."
    }
    
    throw new Error("Wrong response: " + response.status)

  }catch (e) {
    core.setFailed(e.message);
  }
}

boostrap()
  .then(
    result => {
      // eslint-disable-next-line no-console
      if(result != null) {
        console.log(result);
      }
    },
    err => {
      // eslint-disable-next-line no-console
      core.setFailed(err.message);
    }
  )
  .then(() => {
    process.exit();
  });
