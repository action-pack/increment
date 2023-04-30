# Set Secret
[![Release](https://github.com/kroese/set-secret/actions/workflows/build.yml/badge.svg)](https://github.com/kroese/set-secret/actions/workflows/build.yml)

Action to create or update a secret in a repository.


## Inputs
### name
Secret name (required)

### value
Secret value (required)

### repository
Repository (optional)

If left empty current repository will be used.

### owner
Owner of repository (optional)
  
### push_to_org
Flag to use organization endpoint for secret
  
### token:
**Required** Repository [Access token](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token)

## Usage
### Custom repository
```YAML
uses: kroese/set-secret@v1
with:
  name: 'MY_SECRET_NAME'
  value: 'Lorem ipsun dolor simit'
  owner: hmanzur
  repository: actions-set-secret
  token: ${{ secrets.REPO_ACCESS_TOKEN }}
```
### Same repository from action
```YAML
uses: kroese/set-secret@v1
with:
  name: 'MY_SECRET_NAME'
  value: 'Lorem ipsun dolor simit'
  token: ${{ secrets.REPO_ACCESS_TOKEN }}
```

### Custom organization
```YAML
uses: kroese/set-secret@v1
with:
  name: 'MY_SECRET_NAME'
  value: 'Lorem ipsun dolor simit'
  owner: imobanco
  push_to_org: true
  token: ${{ secrets.REPO_ACCESS_TOKEN }}
```
### Same organization from action
```YAML
uses: kroese/set-secret@v1
with:
  name: 'MY_SECRET_NAME'
  value: 'Lorem ipsun dolor simit'
  push_to_org: true
  token: ${{ secrets.REPO_ACCESS_TOKEN }}
```
