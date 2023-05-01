# Set Variable
[![Build](https://github.com/kroese/set-variable/actions/workflows/build.yml/badge.svg)](https://github.com/kroese/set-variable/actions/workflows/build.yml)
[![Version](https://img.shields.io/github/v/tag/kroese/set-variable?label=version&color=066da5)](https://github.com/kroese/set-variable/)
[![Size](https://img.shields.io/github/size/kroese/set-variable/dist/index.js?branch=release/v3&label=size&color=066da5)](https://github.com/kroese/set-variable/)

Action to set repository variables.

## Usage

```YAML
uses: kroese/set-variable@v3
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

### owner

**Optional** `String` Owners name.

### repository

**Optional** `String` Repository name.

### org

**Optional** `Boolean` Indicates the repo is an [organization](https://docs.github.com/en/github/setting-up-and-managing-organizations-and-teams/about-organizations).
