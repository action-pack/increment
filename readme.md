<h1 align="center">Increment Variable<br />
<div align="center">
  
  [![Build](https://github.com/action-pack/increment/actions/workflows/build.yml/badge.svg)](https://github.com/action-pack/increment/)
  [![Version](https://img.shields.io/github/v/tag/action-pack/increment?label=version&sort=semver&color=066da5)](https://github.com/marketplace/actions/increment-variable)
  [![Size](https://img.shields.io/github/size/action-pack/increment/dist/index.js?branch=release/v2.13&label=size&color=066da5)](https://github.com/action-pack/increment/)
  
</div></h1>

Action to increment a repository variable. Useful for increasing a version number for example.

## Features ✨

  - Automaticly creates the target variable if it does not exist
  - Supports alphanumeric variables, for example `ABC1` will be increased to `ABC2`
  - An `amount` parameter for if you want to increment by a custom amount

## Usage 🚀

```YAML
uses: action-pack/increment@v2
id: increment
with:
  name: 'MY_VARIABLE'
  token: ${{ secrets.REPO_ACCESS_TOKEN }}
```

## Inputs 📝

### name

**Required** `String` Variable name.

### amount

**Optional** `Integer` Increment by this amount (default = 1).

### token

**Required** `String` Repository [Access token](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token)

### owner

**Optional** `String` Owners name.

### repository

**Optional** `String` Repository name.

### org

**Optional** `Boolean` Indicates the repo is an [organization](https://docs.github.com/en/github/setting-up-and-managing-organizations-and-teams/about-organizations).

## FAQ 💬

  * ### How do I read the value after incrementing?

    If you need to get the value after the increment, use: `${{ steps.increment.outputs.value }}`

  * ### Why do I get the error '*Resource not accessible by integration*'?

    This will happen if you use ```secrets.GITHUB_TOKEN```.

    You need to create a [personal access token](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token) instead.

    Go to your Github settings, select 'Developer settings' --> 'Personal access tokens' --> 'Tokens (classic)' and create a new token. Store its value in a secret, for example ```MY_TOKEN```.

    Then refer to it like this:
    
    ```yaml
    token: ${{ secrets.MY_TOKEN }}
    ```

## Stars 🌟
[![Stars](https://starchart.cc/action-pack/increment.svg?variant=adaptive)](https://starchart.cc/action-pack/increment)
