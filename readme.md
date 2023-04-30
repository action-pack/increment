# Set Variable
[![Release](https://github.com/kroese/set-variable/actions/workflows/build.yml/badge.svg)](https://github.com/kroese/set-variable/actions/workflows/build.yml)

Action to set repository variables.

## Usage

```YAML
uses: kroese/set-variable@v2
with:
  name: 'MY_VARIABLE'
  value: 'Lorem ipsun dolor simit'
  token: ${{ secrets.REPO_ACCESS_TOKEN }}
```

## Inputs

### name

**Required** `String` Variable name.

### value

**Required** `String` Value to store.

### token

**Required** `String` Repository [Access token](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token)

### org

**Optional** `Boolean` Indicates the repo is an [organization](https://docs.github.com/en/github/setting-up-and-managing-organizations-and-teams/about-organizations).

### owner

**Optional** `String` Owners name.

### repository

**Optional** `String` Repository name.
