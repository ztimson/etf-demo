<!-- Header -->
<div id="top" align="center">
  <br />

  <!-- Logo -->
  <img src="https://git.zakscode.com/repo-avatars/0709db0c51d295d2d29b709865bd95f26e351f72a5c993ca63cd9ec4b4a07f43" alt="Logo" width="200" height="200">

  <!-- Title -->
  ### ETF Demo

  <!-- Description -->
  Recruitment project for Enjine

  <!-- Repo badges -->
  [![Version](https://img.shields.io/badge/dynamic/json.svg?label=Version&style=for-the-badge&url=https://git.zakscode.com/api/v1/repos/ztimson/etf-demo/tags&query=$[0].name)](https://git.zakscode.com/ztimson/etf-demo/tags)
  [![Pull Requests](https://img.shields.io/badge/dynamic/json.svg?label=Pull%20Requests&style=for-the-badge&url=https://git.zakscode.com/api/v1/repos/ztimson/etf-demo&query=open_pr_counter)](https://git.zakscode.com/ztimson/etf-demo/pulls)
  [![Issues](https://img.shields.io/badge/dynamic/json.svg?label=Issues&style=for-the-badge&url=https://git.zakscode.com/api/v1/repos/ztimson/etf-demo&query=open_issues_count)](https://git.zakscode.com/ztimson/etf-demo/issues)

  <!-- Links -->

  ---
  <div>
    <a href="https://git.zakscode.com/ztimson/etf-demo/releases" target="_blank">Release Notes</a>
    • <a href="https://git.zakscode.com/ztimson/etf-demo/issues/new?template=.github%2fissue_template%2fbug.md" target="_blank">Report a Bug</a>
    • <a href="https://git.zakscode.com/ztimson/etf-demo/issues/new?template=.github%2fissue_template%2fenhancement.md" target="_blank">Request a Feature</a>
  </div>

  ---
</div>

## Table of Contents
- [ETF Demo](#top)
    - [About](#about)
        - [Demo](#demo)
        - [Built With](#built-with)
    - [Setup](#setup)
        - [Production](#production)
        - [Development](#development)
    - [License](#license)

## About
While applying for a contract with Enjine, I was paid to create a sample program for comparing Electronically Traded Funds (ETF) files.

Using Angular, a user can upload two different CSV files & compare the differences using graphs.

This project was deployed using Firebase.

### Demo

Website: https://etf.zakscode.com

Demo CSV Files:
 - [data/Holding_details_FTSE_Canada_All_Cap_Index_ETF_(VCN).csv](./data/Holding_details_FTSE_Canada_All_Cap_Index_ETF_(VCN).csv)
 - [data/Holding_details_FTSE_Canada_Index_ETF_(VCE).csv](./data/Holding_details_FTSE_Canada_Index_ETF_(VCE).csv)
 - [data/Holding_details_FTSE_Canadian_Capped_REIT_Index_ETF_(VRE).csv](./data/Holding_details_FTSE_Canadian_Capped_REIT_Index_ETF_(VRE).csv)

### Built With
[![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular)](https://angular.io/)
[![Docker](https://img.shields.io/badge/Docker-384d54?style=for-the-badge&logo=docker)](https://docker.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org/)

## Setup

<details>
<summary>
  <h3 id="production" style="display: inline">
    Production
  </h3>
</summary>

#### Prerequisites
- [Docker](https://docs.docker.com/install/)

#### Instructions
1. Run the docker image: `docker run -p 80:80 git.zakscode.com/ztimson/etf:latest`
2. Open [http://localhost](http://localhost)
</details>

<details>
<summary>
  <h3 id="development" style="display: inline">
    Development
  </h3>
</summary>

#### Prerequisites
- [Node.js](https://nodejs.org/en/download)

#### Instructions
1. Install the dependencies: `npm install`
2. Start the Angular server: `npm run start`
3. Open [http://localhost:4200](http://localhost:4200)

</details>

## License
Copyright © 2023 Zakary Timson | All Rights Reserved

See the [license](./LICENSE) for more information.
