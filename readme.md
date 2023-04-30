# Set Secret
[![Release](https://github.com/kroese/set-secret/actions/workflows/build.yml/badge.svg)](https://github.com/kroese/set-secret/actions/workflows/build.yml)

Action to create or update a secret in a repository.

## Usage

```YAML
uses: kroese/set-secret@v2
with:
  name: 'MY_SECRET_NAME'
  value: 'Lorem ipsun dolor simit'
  repository: ${{ github.repository }}
  token: ${{ secrets.REPO_ACCESS_TOKEN }}
```

## Inputs

### name

**Required** `String` Secret name.

### value

**Required** `String` Secret value to store.

### token

**Required** `String` Repository [Access token](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token)

### org

**Optional** `Boolean` Indicates the repo is an [organization](https://docs.github.com/en/github/setting-up-and-managing-organizations-and-teams/about-organizations).
