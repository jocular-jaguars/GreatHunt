# Project Name

> Pithy project description

## Team

  - __Product Owner__: Ron Fenolio
  - __Scrum Master__: Kristin Mayer
  - __Development Team Members__: Angel Tam, Heidi Kumar

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Team](#team)
1. [Contributing](#contributing)

## Usage

> Some usage instructions

## Requirements

- Node 0.10.x
- Redis 2.6.x
- Postgresql 9.1.x
- etc
- etc

## Development

### Installing Dependencies

From within the root directory:

```sh
sudo npm install -g bower
npm install
bower install
```

### Roadmap

View the project roadmap [here](https://github.com/jocular-jaguars/Thesis/issues)

### Adding Ionic to Files

1. Run "sudo npm install -g cordova ionic"
1. Run "ionic start hunt"
1. Hit n to avoid push notifications for ionic account
1. Move all files **except www folder, bower.json, scss folder, and package.json** from hunt to client
1. Delete hunt folder
1. Run "bower install"
1. Run "node server/server.js"
1. cd client
1. Run "ionic setup sass"
1. Run "ionic platform add ios"
1. Run "ionic build"
1. Run "ionic emulate ios"

### Adding Icons and Splash Screens

1. All files for icons and splash screens can be found in their respective folders within the www folder.
1. To use the icons, replace the current files with those in the icons folder. The files are placed under the path: client > platforms > ios > hunt > Resources > icons. Note that this can only be done after running the command "ionic build ios"
1. Using the splash files follows the same process, except you will be replacing the files from the splash folder within Resources.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
