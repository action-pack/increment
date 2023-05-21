# Increment Variable
[![Build](https://github.com/action-pack/increment/actions/workflows/build.yml/badge.svg)](https://github.com/action-pack/increment/)
[![Version](https://img.shields.io/github/v/tag/action-pack/increment?label=version&sort=semver&color=066da5)](https://github.com/marketplace/actions/increment-variable)
[![Size](https://img.shields.io/github/size/action-pack/increment/dist/index.js?branch=release/v2.1&label=size&color=066da5)](https://github.com/action-pack/increment/)

Action to increment a repository variable by one. Useful for increasing a version number for example.

## Usage

```YAML
uses: action-pack/increment@v2
with:
  name: 'MY_VARIABLE'
  token: ${{ secrets.REPO_ACCESS_TOKEN }}
```

## Inputs

### name

**Required** `String` Variable name.

### token

**Required** `String` Repository [Access token](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token)

### owner

**Optional** `String` Owners name.

### repository

**Optional** `String` Repository name.

### org

**Optional** `Boolean` Indicates the repo is an [organization](https://docs.github.com/en/github/setting-up-and-managing-organizations-and-teams/about-organizations).
