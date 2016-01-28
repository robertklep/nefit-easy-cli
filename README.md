# Nefit Easy™ command line interface

Command line interface for communications with Nefit/Bosch backend.

## Use in moderation!

Each command that you execute using this tool will set up a new connection to the backend, which is relatively CPU-intensive (for both the client and the backend).

If you want to run commands periodically (say, more than once every few minutes), you should consider running the [HTTP server](https://github.com/robertklep/nefit-easy-http-server), which opens a connection to the backend at startup and reuses it for all commands sent to it. The HTTP server will (eventually) support all the commands that the CLI tool supports.

## Installation

```
$ npm i nefit-easy-cli -g
```

This will install the `easy` client in a well-known "bin/" directory (`npm
config get prefix` will show you where)

## Options

```

easy – Nefit Easy™ client

Usage:
  easy [options] status
  easy [options] pressure
  easy [options] location
  easy [options] active-program
  easy [options] program-data
  easy [options] display-code
  easy [options] supply-temperature
  easy [options] gas-usage [<page> | "?"]
  easy [options] get <uri>
  easy [options] put <uri> <data>
  easy [options] set temperature <value>
  easy [options] set active-program <value>
  easy [options] decrypt [--type=TYPE] <base64>

Options:
  -h --help            Show this screen
  -v --version         Show version
  -V --verbose         Be more verbose
  --serial=SERIAL      Nefit Easy™ serial number
  --access-key=KEY     Nefit Easy™ access key
  --password=PASSWORD  Nefit Easy™ password
  --timeout=TIMEOUT    Request timeout in seconds [default: 30]
  --type=TYPE          Message type ('chat', 'alarm', 'email') [default: chat]
  --pretty             Pretty-print JSON output

Instead of specifying serial number, access key or password through
options, you can also define them through environment variables:

  NEFIT_SERIAL_NUMBER
  NEFIT_ACCESS_KEY
  NEFIT_PASSWORD

The temperature value for "set temperature" can be prefixed with a specifier
to conditionally set the temperature if the current temperature doesn't
already meet the specification. For example, to set the temperature to 21°C,
unless it's not already set higher:

  $ easy set temperature '>21'

```
