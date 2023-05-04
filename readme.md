# Increment Variable
[![Build](https://github.com/kroese/increment/actions/workflows/build.yml/badge.svg)](https://github.com/kroese/increment/)
[![Version](https://img.shields.io/github/v/tag/kroese/increment?label=version&color=066da5)](https://github.com/kroese/increment/)
[![Size](https://img.shields.io/github/size/kroese/increment/dist/index.js?branch=release/v1&label=size&color=066da5)](https://github.com/kroese/increment/)

Action to increment a repository variable by 1. Useful for increasing a version number for example.

## Usage

```YAML
uses: kroese/increment@v1
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
